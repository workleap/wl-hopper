import { data } from "@/app/lib/contentConfig.ts";
import { rehypePluginOptions } from "@/app/lib/rehypeConfig.ts";
import { components } from "@/components/mdx/components.tsx";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

export const CONTENT_PATH = path.join(process.cwd(), "content");
export const COMPONENT_PATH = path.join(CONTENT_PATH, "components");

export interface ComponentData {
    title: string;
    description: string;
    status?: string;
    alpha?: string;
    links?: { source: string; npm: string; issue: string; aria: string };
    order?: number;
}

async function parseFrontMatter(fileContent: string) {
    const { content, frontmatter } = await compileMDX<ComponentData>({
        source: fileContent,
        options: {
            scope: data,
            parseFrontmatter: true,
            mdxOptions: { remarkPlugins: [], rehypePlugins: rehypePluginOptions as unknown as [] }
        },
        components: components
    });

    return { content, frontmatter, raw: fileContent };
}

async function readMDXFile(filePath: string) {
    const rawContent = await fs.readFile(filePath, "utf-8");

    return await parseFrontMatter(rawContent);
}

async function getMDXDataFromFile(file: string) {
    const { frontmatter, content, raw } = await readMDXFile(file);
    const startIndex = file.indexOf(COMPONENT_PATH) + COMPONENT_PATH.length + 1;
    const slug = file.substring(startIndex, file.length - ".mdx".length);
    const slugs = slug.split(path.sep);

    return {
        slugs,
        frontmatter,
        content,
        raw
    };
}

export async function getComponentDetails(filePath: string) {
    const file = path.join(CONTENT_PATH, filePath);

    return getMDXDataFromFile(file);
}

