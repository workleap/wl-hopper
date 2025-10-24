import { mdxToReact } from "./mdxToMarkdown.ai";

interface MdxProps {
    children: string | string[];
}

export const Mdx = async ({ children }: MdxProps) => {
    const Component = await mdxToReact(Array.isArray(children) ? children.join("\n") : children);

    return Component;
};

