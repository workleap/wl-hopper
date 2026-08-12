"use client";

import Table from "@/components/table/Table";

import Preview from "@/app/ui/tokens/preview/Preview";
import Code from "@/components/code/Code";

import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName";
import { type ColorScheme, ThemeContext } from "@/context/theme/ThemeProvider";
import { type ReactNode, useContext } from "react";
import { type AllTokensKeys, type TokenValue, getTokensFromKey } from "../allDataTokens";
import "./tokenTable.css";

interface TableProps {
    category: string;
    noPreview?: boolean;
    tokenType: "core" | "semantic" | "components";
    data?: TokenValue[];
    colorScheme?: ColorScheme;
}

const TokenTable = ({ category, data, noPreview = false, tokenType, colorScheme }: TableProps) => {
    const { theme } = useContext(ThemeContext);
    const tokens =
        data === undefined ? getTokensFromKey(`${tokenType}.${category}` as AllTokensKeys, theme, colorScheme) : data;
    const formattedData = tokens.map(token => {
        const { name, value } = token;
        const values: Record<string, ReactNode> = {
            name: <Code value={`--${name}`}>{`--${name}`}</Code>,
            styledSystemValue: tokenType && formatStyledSystemName(name, tokenType),
            value,
            preview: !noPreview && <Preview value={value} name={name} category={category} />
        };

        if (!tokenType) {
            delete values.styledSystemValue;
        }

        if (noPreview) {
            delete values.preview;
        }

        return values;
    });
    const columns = ["Name", tokenType && "Styled-System Value", "Value", !noPreview && "Preview"].filter(
        Boolean
    ) as string[];

    return <Table head={columns} data={formattedData} lastColumnAlignment="right" ariaLabel="Tokens" />;
};

export default TokenTable;
