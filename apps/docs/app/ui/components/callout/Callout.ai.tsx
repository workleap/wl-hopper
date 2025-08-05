import type { PropsWithChildren } from "react";

interface CalloutProps extends PropsWithChildren {
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
