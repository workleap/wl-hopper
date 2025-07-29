"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { HighlightCode } from "@/components/highlightCode";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { HopperProvider, Tag, Text, type ColorScheme, type TagProps } from "@hopper-ui/components";
import { useContext, type ReactNode } from "react";
import Card from "../card/Card";

type Variant = "do" | "dont";

interface DosAndDontsCardProps {
    variant: TagProps["variant"];
    textValue: string;
}

const VariantToCard: Record<Variant, DosAndDontsCardProps> = {
    "do": {
        variant: "positive",
        textValue: "Do"
    },
    "dont": {
        variant: "negative",
        textValue: "Don't"
    }
};

interface DosAndDontsItem {
    explanation?: string;
    code?: string;
}

export interface DosAndDontsProps {
    children?: ReactNode;
    className?: string;
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
        const { variant: tagVariant, textValue } = cardProps;
        const { explanation, code } = item;

        return (
            <Card size="sm" className="hd-dosAndDonts__card">
                <Tag variant={tagVariant}>
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
    // const [formattedCode, setFormattedCode] = useState("");

    // useEffect(() => {
    //     const format = async () => {
    //         try {
    //             const prettierCode = await prettier.format(code, {
    //                 parser: "typescript",
    //                 plugins: [pluginBabel, pluginTypescript, pluginEstree],
    //                 semi: true,
    //                 tabWidth: 2
    //             });

    //             const mdxCode = await formatCode(prettierCode.trimEnd(), "tsx");
    //             setFormattedCode(mdxCode);
    //         } catch (error) {
    //             console.error("Error formatting code:", error);
    //             setFormattedCode(code);
    //         }
    //     };

    //     format();
    // }, [code]);

    // if (!formattedCode) {
    //     return null;
    // }

    return <HighlightCode code={code} />;
}

export default DosAndDonts;
