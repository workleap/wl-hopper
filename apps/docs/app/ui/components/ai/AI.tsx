"use client";

import type { PropsWithChildren } from "react";

function AI({ children }: PropsWithChildren) {
    // Toggle this to show or hide the AI component
    const showAi = false;

    if (!showAi) {
        return null;
    }

    return children;
}

export default AI;
