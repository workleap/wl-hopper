import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

async function readFile(src: string) {
    const fileContent = await fs.readFile(src, "utf8");

    const { content, frontmatter } = await compileMDX<object>({
        source: fileContent,
        options: {
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
