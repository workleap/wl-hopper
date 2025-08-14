"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Div, HopperProvider, Tag, Text, type ColorScheme, type TagProps } from "@hopper-ui/components";
import { CheckmarkIcon, DismissIcon } from "@hopper-ui/icons";
import { Fragment, useContext, type ReactNode } from "react";
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
    example?: ReactNode;
}

export interface DosAndDontsProps {
    items: [{
        do?: DosAndDontsItem;
        dont?: DosAndDontsItem;
    }];
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
        const { explanation, example } = item;

        return (
            <Card size="sm" className="hd-dosAndDonts__card">
                {example &&
                    <Div flex="1" className={clsx("hd-dosAndDonts__example", `hd-dosAndDonts__example--${variant}`)}>
                        {example}
                    </Div>
                }
                <Tag variant={tagVariant} textValue={textValue}>
                    {icon}
                    <Text size="sm">{textValue}</Text>
                </Tag>
                <Div className="hd-dosAndDonts__explanation">
                    <Text size="sm">{explanation}</Text>
                </Div>
            </Card>
        );
    };

    return (
        <HopperProvider colorScheme={theme} className="hd-dosAndDonts">
            {items.map((item, index) => (
                <Fragment key={index}>
                    {renderCard("do", item.do)}
                    {renderCard("dont", item.dont)}
                </Fragment>
            ))}
        </HopperProvider>
    );
}

export default DosAndDonts;
