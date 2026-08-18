import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { gzipSync } from "zlib";
import { join, relative } from "path";
import { collectFiles } from "./collectFiles.ts";

const BLOCK = 512;
const NAME_FIELD = 100;

function pad(value: string, length: number) {
    return Buffer.concat([Buffer.from(value, "utf8"), Buffer.alloc(length - Buffer.byteLength(value))], length);
}

function octal(value: number, length: number) {
    // ustar numeric fields are zero-padded octal terminated by NUL.
    return pad(value.toString(8).padStart(length - 1, "0"), length);
}

/**
 * One 512-byte ustar header. Only regular files are emitted — no directory entries, because the
 * `skills` CLI rejects any archive path whose segments include "." and treats every entry as a
 * file, so a trailing-slash directory entry would land as a stray empty file.
 */
function header(path: string, size: number, mtime: number) {
    if (Buffer.byteLength(path) > NAME_FIELD) {
        throw new Error(
            `Archive path "${path}" is longer than ${NAME_FIELD} bytes, which plain ustar cannot represent.`
        );
    }

    const block = Buffer.alloc(BLOCK);
    pad(path, NAME_FIELD).copy(block, 0);
    octal(0o644, 8).copy(block, 100); // mode
    octal(0, 8).copy(block, 108); // uid
    octal(0, 8).copy(block, 116); // gid
    octal(size, 12).copy(block, 124);
    octal(mtime, 12).copy(block, 136);
    block.write("0", 156); // typeflag: regular file
    block.write("ustar\0", 257);
    block.write("00", 263);

    // The checksum is computed with its own field read as spaces.
    block.fill(" ", 148, 156);
    let checksum = 0;
    for (const byte of block) {
        checksum += byte;
    }
    pad(`${checksum.toString(8).padStart(6, "0")}\0 `, 8).copy(block, 148);

    return block;
}

function padToBlock(size: number) {
    const remainder = size % BLOCK;

    return remainder === 0 ? Buffer.alloc(0) : Buffer.alloc(BLOCK - remainder);
}

export interface SkillArchive {
    fileName: string;
    digest: string;
    bytes: number;
}

/**
 * Packs a built skill into a single gzipped tar next to the manifest.
 *
 * This exists because of a defect in the `skills` CLI's per-file download path: it fires one
 * `fetch` per advertised file with no concurrency limit and swallows every failure
 * (`catch {}` → `null` → silently skipped). At this skill's size that reliably drops files —
 * measured 263-317 of 326 across runs, with `scripts/` missing every time, and no error shown.
 * The archive path (`$schema` 0.2.0) fetches once and verifies a digest, so an install is either
 * complete or a visible failure.
 */
export async function createSkillArchive(skillRoot: string, outputDir: string, name: string): Promise<SkillArchive> {
    const absolute = (await collectFiles(skillRoot)).sort();
    const chunks: Buffer[] = [];
    // Fixed mtime so the archive, and therefore its digest, only changes when content does.
    const mtime = 0;

    for (const file of absolute) {
        const path = relative(skillRoot, file).replaceAll("\\", "/");
        const content = await readFile(file);

        chunks.push(header(path, content.byteLength, mtime), content, padToBlock(content.byteLength));
    }

    // Two zero blocks terminate a tar stream.
    chunks.push(Buffer.alloc(BLOCK * 2));

    const gzipped = gzipSync(Buffer.concat(chunks), { level: 9 });
    const fileName = `${name}.tar.gz`;
    await writeFile(join(outputDir, fileName), gzipped);

    return {
        fileName,
        digest: `sha256:${createHash("sha256").update(gzipped).digest("hex")}`,
        bytes: gzipped.byteLength
    };
}
