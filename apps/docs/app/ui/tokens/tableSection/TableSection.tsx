"use client";

import TokenTable from "@/app/ui/tokens/table/TokenTable.tsx";

import "@hopper-ui/tokens/fonts.css";
import { useMemo } from "react";
import { getDataTokens } from "../getTokens";

interface TokenProps {
    name: string;
    value: string;
}

interface TableSectionProps {
    tokens: (dataTokens: ReturnType<typeof getDataTokens>) => TokenProps[];
    categories: string[];
    excludedCategories?: string[];
    categoryKey: string;
    tokenType?: "core" | "semantic";
    colorScheme?: "light" | "dark";
}

const TableSection = ({ tokens, categories, excludedCategories, categoryKey, tokenType, colorScheme }: TableSectionProps) => {
    const categoryTokens = useMemo(() => {
        return tokens(getDataTokens({
            colorScheme: colorScheme
        })).filter(token => {
            const excludedCategoryTokens = excludedCategories?.some(category => token.name.includes(category));

            return categories.some(category => token.name.includes(category)) && !excludedCategoryTokens;
        });
    }, [tokens, colorScheme, excludedCategories, categories]);

    return (
        <div className="hd-table-section">
            <TokenTable tokenType={tokenType} category={categoryKey} data={() => categoryTokens} />
        </div>
    );
};

export default TableSection;
