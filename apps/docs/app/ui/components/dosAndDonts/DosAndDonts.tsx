"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { formatCode } from "@/app/lib/formatingCode";
import { HighlightCode } from "@/components/highlightCode";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { HopperProvider, Tag, Text, type ColorScheme } from "@hopper-ui/components";
import { CheckmarkIcon, DismissIcon } from "@hopper-ui/icons";
import { useContext, useEffect, useState, type ComponentProps } from "react";
import Card from "../card/Card";

export interface DosAndDontsProps extends Omit<ComponentProps<"div">, "children">{
    dos: string;
    donts: string;
}

function DosAndDonts({ dos, donts, className }: DosAndDontsProps) {
    const { colorMode } = useContext(ThemeContext);
    const theme = colorMode as ColorScheme;
    const dosAndDontsClass = clsx("hd-dosAndDonts", className);

    const [doCode, setDoCode] = useState("");
    const [dontCode, setDontCode] = useState("");

    useEffect(() => {
        const formatCodes = async () => {
            try {
                const formattedDoCode = await formatCode(dos, "tsx");
                const formattedDontCode = await formatCode(donts, "tsx");

                setDoCode(formattedDoCode);
                setDontCode(formattedDontCode);
            } catch (error) {
                console.error("Error formatting code:", error);
            }
        };

        formatCodes();
    }, [dos, donts]);

    const renderCard = (variant: "do" | "dont") => {
        const code = variant === "do" ? doCode : dontCode;

        return (
            <Card size="sm" className="hd-dosAndDonts__card">
                <Tag variant={variant === "do" ? "positive" : "negative"}>
                    {variant === "do" ? <CheckmarkIcon /> : <DismissIcon />}
                    <Text size="sm">{variant === "do" ? "Do" : "Don't"}</Text>
                </Tag>
                <HighlightCode code={code} />
            </Card>
        );
    };

    return (
        <HopperProvider colorScheme={theme} className={dosAndDontsClass}>
            {renderCard("do")}
            {renderCard("dont")}
        </HopperProvider>
    );
}

export default DosAndDonts;
