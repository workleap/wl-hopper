"use client";

import clsx from "clsx";
import { useState, type PropsWithChildren } from "react";
import { Button } from "react-aria-components";

import "./copyButton.css";

interface CopyButtonProps {
    variant?: "default" | "inline" | "ghost";
    text: string;
    onDark?: boolean;
    className?: string;
    onCopy?: () => void;
    copyMessage?: string;
}

const CopiedSvg = <svg width="24" height="24" className="hd-copy-button__icon" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m5 11.75 5 5 9-9.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>;

const CopySvg = <svg width="16" height="16" className="hd-copy-button__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.33337 9.99992H2.66671C2.31309 9.99992 1.97395 9.85944 1.7239 9.60939C1.47385 9.35935 1.33337 9.02021 1.33337 8.66659V2.66659C1.33337 2.31296 1.47385 1.97382 1.7239 1.72378C1.97395 1.47373 2.31309 1.33325 2.66671 1.33325H8.66671C9.02033 1.33325 9.35947 1.47373 9.60952 1.72378C9.85956 1.97382 10 2.31296 10 2.66659V3.33325" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const CopyButton = (
    { text, className, children, onCopy, variant = "default", onDark, copyMessage = "Copied!", ...rest }: PropsWithChildren<CopyButtonProps>) => {
    const [isCopied, setIsCopied] = useState(false);

    const classes = clsx("hd-copy-button", {
        [`hd-copy-button--${variant}`]: variant !== "default",
        "hd-copy-button--on-dark": onDark === true
    }, className);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        onCopy?.();

        const timer = setTimeout(() => {
            setIsCopied(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    };

    const status = (
        variant === "ghost"
            ? <span className="hd-copy-button__status">{copyMessage}</span>
            : CopiedSvg
    );

    const content = children ?? CopySvg;

    return (
        <Button isDisabled={isCopied} onPress={copy} className={classes} aria-label="Copy" {...rest}>
            {isCopied ? status : content}
        </Button>
    );
};

export default CopyButton;
