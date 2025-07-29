"use client";

import type { ReactNode } from "react";

type Variant = "do" | "dont";

interface DosAndDontsCardProps {
    icon: ReactNode;
    textValue: string;
}

const VariantToCard: Record<Variant, DosAndDontsCardProps> = {
    "do": {
        icon: "✅",
        textValue: "Do"
    },
    "dont": {
        icon: "❌",
        textValue: "Don't"
    }
};

interface DosAndDontsItem {
    explanation?: string;
    code?: string;
}

export interface DosAndDontsProps {
    children?: ReactNode;
    dos?: DosAndDontsItem;
    donts?: DosAndDontsItem;
}

function DosAndDonts({ children, dos, donts }: DosAndDontsProps) {
    const renderCard = (variant: "do" | "dont") => {
        const item = variant === "do" ? dos : donts;

        if (!item) {
            return null;
        }

        const cardProps = VariantToCard[variant];
        const { icon, textValue } = cardProps;
        const { explanation, code } = item;

        return (
            <div>
                <div>
                    {icon}
                    {textValue}
                </div>
                {explanation}
                {code}
            </div>
        );
    };

    return (
        <>
            {children}
            <div className="hd-dosAndDonts__explanation">
                {renderCard("do")}
                {renderCard("dont")}
            </div>
        </>
    );
}

export default DosAndDonts;
