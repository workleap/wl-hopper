import type { ReactNode } from "react";

interface TagProps {
    children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
    //TODO: it is generating the content in new line. we need to fix it.
    //return <Mdx>{`**${children}**`}</Mdx>;
    return <>
        <i>{children}</i>
    </>;
};

export default Tag;
