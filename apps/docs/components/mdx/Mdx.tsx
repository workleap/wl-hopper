import { components } from "@/components/mdx/components.tsx";
import { useMDXComponent } from "next-contentlayer2/hooks";

interface MdxProps {
    code: string;
}

const Mdx = ({ code }: MdxProps) => {
    const Component = useMDXComponent(code);

    return <Component components={components} />;
};

export default Mdx;
