"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { formatCode } from "@/app/lib/formatingCode";
import { HighlightCode } from "@/components/highlightCode";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { HopperProvider, Tag, Text, type ColorScheme, type TagProps } from "@hopper-ui/components";
import { CheckmarkIcon, DismissIcon } from "@hopper-ui/icons";
import pluginBabel from "prettier/plugins/babel";
import pluginEstree from "prettier/plugins/estree";
import pluginTypescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import { useContext, useEffect, useState, type ComponentProps, type ReactNode } from "react";
import Card from "../card/Card";

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

export interface DosAndDontsProps extends Omit<ComponentProps<"div">, "children"> {
    children?: ReactNode;
    dos?: DosAndDontsItem;
    donts?: DosAndDontsItem;
}

function DosAndDonts({ children, dos, donts, className }: DosAndDontsProps) {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode as ColorScheme;
    const dosAndDontsClass = clsx("hd-dosAndDonts", className);

    const renderCard = (variant: "do" | "dont") => {
        const item = variant === "do" ? dos : donts;

        if (!item) {
            return null;
        }

        const cardProps = VariantToCard[variant];
        const { icon, variant: tagVariant, textValue } = cardProps;
        const { explanation, code } = item;

        return (
            <Card size="sm" className="hd-dosAndDonts__card">
                <Tag variant={tagVariant} textValue={textValue}>
                    {icon}
                    <Text size="sm">{textValue}</Text>
                </Tag>
                {explanation}
                {code && <Example code={code} />}
            </Card>
        );
    };

    return (
        <HopperProvider colorScheme={theme} className={dosAndDontsClass}>
            {children}
            <div className="hd-dosAndDonts__explanation">
                {renderCard("do")}
                {renderCard("dont")}
            </div>
        </HopperProvider>
    );
}

interface ExampleProps {
    code: string;
}

function Example({ code }: ExampleProps) {
    const [formattedCode, setFormattedCode] = useState("");

    useEffect(() => {
        const format = async () => {
            const prettierCode = await prettier.format(code, {
                parser: "babel-ts",
                plugins: [pluginBabel, pluginTypescript, pluginEstree],
                semi: true,
                tabWidth: 2
            });

            const mdxCode = await formatCode(prettierCode.trimEnd(), "tsx");

            setFormattedCode(mdxCode);
        };

        format();
    }, [code]);

    return (
        <HighlightCode code={formattedCode} />
    );
}

export default DosAndDonts;
