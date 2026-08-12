"use client";

import type { ReactNode } from "react";

import Button from "@/components/button/Button.tsx";
import { Popover, PopoverTrigger } from "@/components/popover/Popover.tsx";

export function PropTableCodeExample({ children }: { children: ReactNode }) {
    if (!children) {
        return null;
    }

    return (
        <PopoverTrigger>
            <Button aria-label="example" variant="secondary" size="sm">
                Show example code
            </Button>
            <Popover>{children}</Popover>
        </PopoverTrigger>
    );
}
