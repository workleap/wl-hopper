"use client";

import clsx from "clsx";
import "./dosAndDonts.css";

import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Div, Grid, HopperProvider, Tag, Text, type TagProps } from "@hopper-ui/components";
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
    isForAiOnly?: boolean;
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
    const { colorScheme } = useContext(ThemeContext);
    const theme = colorScheme!;

    const renderCard = (variant: Variant, item?: DosAndDontsItem) => {
        if (!item || item.isForAiOnly) {
            return null;
        }

        const cardProps = VariantToCard[variant];
        const { icon, variant: tagVariant, textValue } = cardProps;
        const { explanation, example } = item;

        return (
            <Card size="sm" className="hd-dosAndDonts__card">
                {example && (
                    <Div flex="1" className={clsx("hd-dosAndDonts__example", `hd-dosAndDonts__example--${variant}`)}>
                        {example}
                    </Div>
                )}
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
        <HopperProvider colorScheme={theme}>
            <Grid
                width="100%"
                gap="inline-md"
                UNSAFE_templateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr"
                }}
            >
                {items.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                        {renderCard("do", item.do)}
                        {renderCard("dont", item.dont)}
                    </Fragment>
                ))}
            </Grid>
        </HopperProvider>
    );
}

export default DosAndDonts;
