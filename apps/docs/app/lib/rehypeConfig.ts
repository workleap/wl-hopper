/* eslint-disable @typescript-eslint/no-explicit-any */
// this file is hard to type, since the unified version used between frontmatter and contentlayer are different and expecting different types.

import { visit } from "unist-util-visit";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { BuiltinTheme } from "shiki";

export const rehypeOptions: Options = {
    // Use one of Shiki's packaged themes
    theme: {
        light: "one-dark-pro" satisfies BuiltinTheme,
        dark: "one-dark-pro" satisfies BuiltinTheme
    },
    keepBackground: false,
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [{
                type: "text",
                value: " "
            }];
        }
    },
    onVisitHighlightedLine(node) {
        const nodeClass = node.properties.className;
        if (nodeClass && nodeClass.length > 0) {
            node.properties.className?.push("highlighted");
        } else {
            node.properties.className = ["highlighted"];
        }
    },
    onVisitHighlightedChars(node, id) {
        // Each word node has no className by default.
        node.properties.className = ["word"];

        if (id) {
            // If the word spans across syntax boundaries (e.g. punctuation), remove
            // colors from the child nodes.
            if (node.properties["data-rehype-pretty-code-wrapper"]) {
                node.children.forEach(childNode => {
                    if (childNode.type === "element") {
                        childNode.properties.style = "";
                    }
                });
            }

            node.properties.style = "";
            node.properties["data-word-id"] = id;
        }
    }
};

export const rehypePluginOptions: any[] = [
    () => (tree: any) => {
        visit(tree, node => {
            if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children;

                if (codeEl.tagName !== "code") {
                    return;
                }
                node.raw = codeEl.children?.[0].value;
            }
        });
    },
    [rehypePrettyCode, rehypeOptions],
    () => (tree: any) => {
        visit(tree, node => {
            if (node?.type === "element" && node?.tagName === "figure") {
                const titleChild = node.children.find((child: any) => {
                    return (
                        child.properties &&
                        "data-rehype-pretty-code-title" in child.properties
                    );
                });

                for (const child of node.children) {
                    if (child.tagName === "pre") {
                        child.properties["raw"] = node.raw;
                    }

                    if (titleChild) {
                        node.title = titleChild.children[0].value;
                        child.properties["title"] = node.title;
                    }
                }
            }
        });
    }
];
