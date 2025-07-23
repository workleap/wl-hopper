"use client";

import { useEffect, useMemo, useState } from "react";
import * as prod from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import Pre from "@/app/ui/components/pre/Pre";
import InlineCode, { type InlineCodeProps } from "@/components/code/InlineCode.tsx";

export type Variant = "default" | "tiny";

export interface HighlightCodeProps {
    code: string;
    variant?: Variant;
}

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

function useProcessor(text: string, variant?: Variant) {
    const [Content, setContent] = useState(<></>);

    useEffect(() => {
        const options = {
            ...production,
            components: {
                pre: variant === "tiny" ? (props: InlineCodeProps) => <InlineCode variant="ghost" {...props} /> : Pre
            }
        };

        unified()
            .use(rehypeParse, { fragment: true })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .use(rehypeReact, options)
            .process(text)
            .then(file => {
                setContent(file.result);
            });
    }, [text, variant]);

    return Content;
}

export default function HighlightCode({ code, variant = "default" }: HighlightCodeProps) {
    const processor = useProcessor(code, variant);

    return useMemo(() => processor, [processor]);
}
