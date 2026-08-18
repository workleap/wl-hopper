/**
 * CLI entry point for the Hopper skill's code validator.
 *
 * This is the skill's stand-in for the MCP server's `validate_hopper_code` tool. It bundles the
 * very same `validatorService` from apps/mcp-server, so there is one implementation of the rules;
 * only the parser and the data-file locations are swapped at bundle time (see validatorParser.ts
 * and validatorEnv.ts).
 *
 * Usage:
 *   node scripts/validate-hopper-code.mjs <file...>
 *   cat Component.tsx | node scripts/validate-hopper-code.mjs
 *
 * Exits 1 when any file has errors, so it can gate a task.
 */
import { validateHopperCode } from "../../../mcp-server/src/services/validatorService/index.ts";
import type { ValidationResult } from "../../../mcp-server/src/services/validatorService/types.ts";
import { readFile } from "fs/promises";

function formatMessages(label: string, messages: ValidationResult["errors"]) {
    return messages.map(({ message, line, column }) => {
        const position = line !== undefined ? `${line}:${column ?? 0} ` : "";

        return `  ${label} ${position}${message}`;
    });
}

function report(source: string, result: ValidationResult) {
    const lines = [...formatMessages("error  ", result.errors), ...formatMessages("warning", result.warnings)];

    if (lines.length === 0) {
        console.log(`✅ ${source}: no issues`);

        return;
    }

    console.log(`${result.errors.length > 0 ? "❌" : "⚠️ "} ${source}`);
    console.log(lines.join("\n"));
}

async function readStdin() {
    const chunks: Buffer[] = [];

    for await (const chunk of process.stdin) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf8");
}

async function main() {
    const paths = process.argv.slice(2).filter(argument => !argument.startsWith("-"));
    let hasErrors = false;

    if (paths.length === 0) {
        if (process.stdin.isTTY) {
            console.error("Usage: node scripts/validate-hopper-code.mjs <file...>   (or pipe code on stdin)");
            process.exit(2);
        }

        const result = await validateHopperCode(await readStdin());
        report("<stdin>", result);
        hasErrors = result.errors.length > 0;
    } else {
        for (const path of paths) {
            const result = await validateHopperCode(await readFile(path, "utf8"));
            report(path, result);
            hasErrors ||= result.errors.length > 0;
        }
    }

    if (hasErrors) {
        process.exit(1);
    }
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
});
