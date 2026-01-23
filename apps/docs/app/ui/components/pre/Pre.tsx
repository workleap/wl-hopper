"use client";

import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import LangIcon from "@/app/ui/components/pre/langIcon/LangIcon";
import CopyButton from "@/components/copyButton/CopyButton.tsx";

import "./pre.css";

export type PreProps = DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
    "data-language"?: string;
    raw?: string;
    className?: string;
    theme?: "light" | "dark";
};

const Pre = ({ children, className, title, "data-language": dataLanguage, raw, theme = "dark", ...props }: PreProps) => {
    const classes = clsx("hd-pre", {
        "hd-pre--title": title
    }, className);

    const langContent = dataLanguage && (
        <span className="hd-pre-header__lang">
            <LangIcon lang={dataLanguage} className="hd-pre-header__lang-icon" />
        </span>
    );

    const titleContent = <span className="hd-pre-header__title">{title}</span>;
    const isOnDark = !title;

    const copyButton = raw && <CopyButton onDark={isOnDark} text={raw} />;

    return (
        <pre data-color-scheme={theme} className={classes} tabIndex={-1} {...props}>
            {title && (
                <div className="hd-pre-header">
                    <div className="hd-pre-header__info">
                        {langContent}
                        {titleContent}
                    </div>
                    {copyButton}
                </div>
            )}
            <div className="hd-pre__code">
                {children}
            </div>
            {!title && <div className="hd-pre__action">{copyButton}</div>}
        </pre>
    );
};

export default Pre;
