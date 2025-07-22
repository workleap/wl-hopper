import { mdxToReact } from "./mdxToMarkdown";

interface MdxProps {
    code: string;

}

export const Mdx = async ({ code }: MdxProps) => {
    const Component = await mdxToReact(code);

    return Component;
};


