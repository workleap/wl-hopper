import { components } from "@/components/mdx/components.ai";
import { iconData } from "@/content/icons/overview/data";
import tokensDark from "@/datas/tokens-dark.json";
import tokens from "@/datas/tokens.json";
import { compileMDX } from "next-mdx-remote/rsc";
import { renderToPipeableStream } from "react-dom/server";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { Writable } from "stream";
import { unified } from "unified";

async function renderToStringAsync(element: React.ReactElement): Promise<string> {
    // NOTE! React 19 is required for this function to work properly.

    return new Promise((resolve, reject) => {
        let html = "";
        const writable = new Writable({
            write(chunk, _encoding, callback) {
                html += chunk.toString();
                callback();
            }
        });

        const { pipe } = renderToPipeableStream(element, {
            onAllReady() {
                pipe(writable);
            },
            onError(err) {
                reject(err);
            }
        });

        writable.on("finish", () => resolve(html));
    });
}

export async function mdxToReact(mdxSource: string): Promise<React.ReactElement> {
    const compiled = await compileMDX({
        source: mdxSource,
        options: {
            scope: { // we need to set all import data here. otherwise, it will not be available in the mdx.
                iconData: iconData,
                tokens: tokens,
                tokensDark: tokensDark
            },
            parseFrontmatter: false,
            mdxOptions: { remarkPlugins: [], rehypePlugins: [] }
        },
        components: components
    });

    return compiled.content;
}


export async function mdxToMarkdown(mdxSource: string): Promise<string> {
    const compiled = await mdxToReact(mdxSource);
    const html = await renderToStringAsync(compiled);

    return String(await htmlToMarkdown(html));
}


export async function htmlToMarkdown(html: string): Promise<string> {
    const file = await unified()
        .use(rehypeParse, { fragment: true }) // parse HTML
        .use(remarkGfm)
        .use(rehypeRemark) // convert HAST → MDAST
        .use(remarkMdx)
        .use(remarkStringify, {
            bullet: "-"
        }) // stringify to markdown
        .process(html);

    return String(file);
}


