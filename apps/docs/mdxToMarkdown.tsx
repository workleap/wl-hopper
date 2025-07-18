// scripts/mdxToMarkdown.ts

import { data } from "@/app/lib/contentConfig.ts";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { components } from "./components/mdx/components.markdown";

/**
 * Converts an MDX string into rendered Markdown by evaluating JSX/JS expressions.
 */
export async function mdxToMarkdown(mdxSource: string): Promise<string> {
    // https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#you-might-not-need-next-mdx-remote

    // const compiled = await compileMDX({
    //     source: mdxSource,
    //     options: {
    //         scope: data,
    //         parseFrontmatter: true,
    //         mdxOptions: {
    //             //  useDynamicImport: true
    //             useDynamicImport: true,
    //         }
    //         // mdxOptions: { remarkPlugins: [], rehypePlugins: rehypePluginOptions as unknown as [] } We don't need this plugin as it is only for html shows the code blocks prettier.
    //     },
    //     components: components
    // });


    // const html = renderToStaticMarkup(<>{compiled.content}</>);


    const compiled = await serialize(mdxSource, {
        scope: data,
        mdxOptions: {

            remarkPlugins: [ ]
        }
    });

    // const element = await MDXRemote({
    //     ...compiled,
    //     components
    // });

    const element = await <MDXRemote {...compiled} components={components} />;

    const html = renderToStaticMarkup(element);

    return String(await htmlToMarkdown(html));
    //return compiled.compiledSource;
}


export async function htmlToMarkdown(html: string): Promise<string> {
    const file = await unified()
        .use(rehypeParse, { fragment: true }) // parse HTML
        .use(rehypeRemark) // convert HAST → MDAST
        .use(remarkStringify) // stringify to markdown
        .process(html);

    return String(file);
}


