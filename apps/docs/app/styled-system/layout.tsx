import type { ReactNode } from "react";
import Wrapper from "../ui/layout/wrapper/Wrapper";

export default function StyledSystemLayout({ children }: { children: ReactNode }) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}
