"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { formatCode } from "@/app/lib/formatingCode";
import { HighlightCode } from "@/components/highlightCode";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Div, HopperProvider, Spinner, Tag, Text, type ColorScheme, type TagProps } from "@hopper-ui/components";
import { CheckmarkIcon, DismissIcon } from "@hopper-ui/icons";
import { useContext, useEffect, useState, type ReactNode } from "react";

type Variant = "do" | "dont";

interface DosAndDontsCardProps {
    icon: ReactNode;
    variant: TagProps["variant"];
    textValue: string;
}

const VariantToCard: Record<Variant, DosAndDontsCardProps> = {
    "do": {
        icon: <CheckmarkIcon />,
        variant: "positive",
        textValue: "Do"
    },
    "dont": {
        icon: <DismissIcon />,
        variant: "negative",
        textValue: "Don't"
    }
};

interface DosAndDontsItem {
    explanation?: string;
    code?: string;
}

export interface DosAndDontsProps {
    items: [{
        do?: DosAndDontsItem;
        dont?: DosAndDontsItem;
    }]
}

function DosAndDonts({ items }: DosAndDontsProps) {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode as ColorScheme;

    const renderCard = (variant: Variant, item?: DosAndDontsItem) => {
        if (!item) {
            return null;
        }

        const cardProps = VariantToCard[variant];
        const { icon, variant: tagVariant, textValue } = cardProps;
        const { explanation, code } = item;

        return (
            <div className="hd-dosAndDonts__item">
                {code &&
                    <Div className={clsx("hd-dosAndDonts__example", `hd-dosAndDonts__example--${variant}`)}>
                        <Example code={code} />
                    </Div>
                }
                <Tag variant={tagVariant}>
                    {icon}
                    <Text size="sm">{textValue}</Text>
                </Tag>
                <Div className="hd-dosAndDonts__explanation">
                    <Text size="sm">{explanation}</Text>
                </Div>
            </div>
        );
    };

    return (
        <HopperProvider colorScheme={theme} className="hd-dosAndDonts">
            {items.map(item => (
                <>
                    {renderCard("do", item.do)}
                    {renderCard("dont", item.dont)}
                </>
            ))}
        </HopperProvider>
    );
}

interface ExampleProps {
    code: string;
}

function Example({ code }: ExampleProps) {
    const [formattedCode, setFormattedCode] = useState<string>();

    useEffect(() => {
        const format = async () => {
            const response = await fetch("/api/format-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                console.error("Error formatting code: ", response.status);
            }

            const data = await response.json();
            const prettierFormattedCode = data.formattedCode;

            const mdxCode = await formatCode(prettierFormattedCode, "tsx");
            setFormattedCode(mdxCode);
        };

        format();
    }, [code]);

    if (!formattedCode) {
        return <Spinner />;
    }

    return <HighlightCode code={formattedCode} />;
}

export default DosAndDonts;
