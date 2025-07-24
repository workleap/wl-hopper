
import type { ReactNode } from "react";

interface CalloutProps {
    children: ReactNode;
    variant?: "information" | "success" | "warning" | "error" | "message";
}

export default function Callout({ variant = "information", children }: CalloutProps) {
    return (
        <blockquote>
            <strong>{variant}</strong>
            {children}
        </blockquote>
    );
}

