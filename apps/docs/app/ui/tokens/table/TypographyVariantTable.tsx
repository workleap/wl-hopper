"use client";

import TypographyPreview from "@/app/ui/tokens/preview/TypographyPreview";
import Code from "@/components/code/Code";
import Table from "@/components/table/Table";

import { ThemeContext } from "@/context/theme/ThemeProvider";
import { useContext } from "react";
import { getTokens, type TokenValue } from "../allDataTokens";
import "./tokenTable.css";

interface TypographyVariantTableProps {
    tokenType: "semantic";
    type: string;
}

const TypographyVariantTable = ({ type, tokenType }: TypographyVariantTableProps) => {
    const { theme } = useContext(ThemeContext);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenData = (getTokens(theme)[tokenType] as any)["fontWeight"];

    const filteredDataByType: Array<TokenValue> = tokenData.filter((item: TokenValue) =>
        item.name.includes(type)
    );

    const filteredDataByWeightVariation: Array<TokenValue> = filteredDataByType.filter(item =>
        item.name.includes("bold") ||
        item.name.includes("semibold") ||
        item.name.includes("medium")
    );

    const listItems = filteredDataByWeightVariation.map(item => {
        const fontWeight = item.value;

        return {
            name: <Code value={`--${item.name}`}>{`--${item.name}`}</Code>,
            value: fontWeight,
            preview: <TypographyPreview values={{ fontWeight }} />
        };
    });

    return (
        <Table
            head={["Name", "Value", "Preview"]}
            className="hd-typo-table"
            data={listItems}
            ariaLabel="Typography"
            lastColumnAlignment="right"
        />
    );
};

export default TypographyVariantTable;
