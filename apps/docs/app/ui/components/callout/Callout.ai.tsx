
import type { ReactNode } from "react";

export interface CalloutProps {
    children: ReactNode;
    variant?: "information" | "success" | "warning" | "error" | "message";
}

export function Callout({ variant = "information", children }: CalloutProps) {
    return (
        <blockquote>
            <strong>{variant}</strong>
            {children}
        </blockquote>
    );
}

