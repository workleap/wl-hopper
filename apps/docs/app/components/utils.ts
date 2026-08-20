import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

async function readFile(src: string) {
    const fileContent = await fs.readFile(src, "utf8");

    const { content, frontmatter } = await compileMDX<object>({
        source: fileContent,
        options: {
            // next-mdx-remote 6 blocks JS expressions in MDX by default. All MDX here is
            // first-party and checked into this repo, so allow expressions but keep the
            // dangerous-globals guard on.
            blockJS: false,
            blockDangerousJS: true,
            parseFrontmatter: true,
            mdxOptions: { remarkPlugins: [] }
        }
    });

    return { content, frontmatter };
}

const MIGRATION_NOTES_PATH = path.join(process.cwd(), "..", "..", "packages", "components", "src");

export async function getMigrationNotes(src: string) {
    const file = `${path.join(MIGRATION_NOTES_PATH, src)}.md`;

    return await readFile(file);
}
