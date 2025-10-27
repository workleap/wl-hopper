import type { Heading, Root } from "mdast";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export async function updateMarkdownHeadingLevels(markdown: string, n: number): Promise<string> {
    const processor =
        unified()
            .use(remarkParse)
            .use(remarkStringify);

    const tree = processor.parse(markdown);

    visit(tree, "heading", (node: Heading) => {
        const newLevel = node.depth + n;
        if (newLevel < 1 || newLevel > 6) {
            throw new Error(`Heading level out of bounds: ${newLevel}. Must be between 1 and 6. Node: ${JSON.stringify(node)}`);
        }
        node.depth = newLevel as 1 | 2 | 3 | 4 | 5 | 6;
    });

    const updatedTree = await processor.run(tree);

    return processor.stringify(updatedTree as Root);
}
