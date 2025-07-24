import type {
    LinkProps as RACLinkProps
} from "react-aria-components";

export interface LinkProps extends RACLinkProps {
    children: React.ReactNode;
}

const Link = ({ href, children }: LinkProps) => {
    return (


        <a href={href}>
            {children}
        </a>
    );
};

export default Link;
