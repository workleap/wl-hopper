"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

import CopyButton from "@/components/copyButton/CopyButton";

import "./promptSnippet.css";

interface PromptSnippetProps {
    children: ReactNode;
}

export default function PromptSnippet({ children }: PromptSnippetProps) {
    return (
        <span className={clsx("hd-prompt-snippet__wrapper", "hd-prompt-snippet__wrapper--interactive")}>
            <span className="hd-prompt-snippet">{children}</span>
            <CopyButton text={String(children)} variant="ghost" className="hd-prompt-snippet__copy" />
        </span>
    );
};
