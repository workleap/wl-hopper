import { readFileSync } from "fs";
import { globSync } from "glob";
import path from "path";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

/**
 * The AI docs pipeline runs as a plain Node script, outside of Next.js, so it cannot use the
 * contentlayer-generated document set the website relies on. It only ever needs these four
 * frontmatter fields, none of which is a contentlayer computed field, so they are read straight off
 * the MDX sources instead. That keeps `build:ai-docs` independent of contentlayer.
 */
export interface ComponentFrontMatter {
    title: string;
    description?: string;
    category?: string;
    status?: string;
}

const CONTENT_COMPONENTS = "content/components";

function readComponents(): ComponentFrontMatter[] {
    const root = path.join(process.cwd(), CONTENT_COMPONENTS);
    // `glob` treats backslashes as escape characters, so the pattern has to use posix separators.
    const files = globSync(`${root.replaceAll("\\", "/")}/**/*.mdx`, { nodir: true });

    return (
        files
            // Mirrors contentlayer's directory walk so the generated documents keep their current order.
            .sort((a, b) => a.localeCompare(b))
            .map(file => {
                const vfile = new VFile({ value: readFileSync(file, "utf-8") });
                matter(vfile);

                return vfile.data.matter as ComponentFrontMatter;
            })
            .filter(frontMatter => frontMatter?.title)
    );
}

export const allComponents = readComponents();
