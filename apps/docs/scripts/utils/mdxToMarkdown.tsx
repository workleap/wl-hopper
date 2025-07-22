// scripts/mdxToMarkdown.ts

import { data } from "@/app/lib/contentConfig.ts";
import { components } from "@/components/mdx/components.ai";
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
    // https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#you-might-not-need-next-mdx-remote

    const compiled = await compileMDX({
        source: mdxSource,
        options: {
            scope: data,
            parseFrontmatter: false,
            mdxOptions: { }

            // mdxOptions: { remarkPlugins: [], rehypePlugins: rehypePluginOptions as unknown as [] } We don't need this plugin as it is only for html shows the code blocks prettier.
        },
        components: components
    });

    return compiled.content;
}


export async function mdxToMarkdown(mdxSource: string): Promise<string> {
    // https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#you-might-not-need-next-mdx-remote

    const compiled = await mdxToReact(mdxSource);


    const html = await renderToStringAsync(compiled);

    // const html = await (async () => {
    //     const stream = await renderToStringAsync(compiled.content);
    //     const response = new Response(stream);

    //     return await response.text(); // ← your final HTML string
    // })();

    // const compiled = await serialize(mdxSource, {
    //     scope: data,
    //     mdxOptions: {

    //         remarkPlugins: [ ]
    //     }
    // });

    // // const element = await MDXRemote({
    // //     ...compiled,
    // //     components
    // // });

    // const element = await <MDXRemote {...compiled} components={components} />;

    // const html = renderToStaticMarkup(element);

    return String(await htmlToMarkdown(html));
    // //return compiled.compiledSource;
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


