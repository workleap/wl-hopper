"use client";

import TokenTable from "@/app/ui/tokens/table/TokenTable.tsx";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import "@hopper-ui/tokens/fonts.css";
import { useContext, useMemo } from "react";
import { getTokensFromKey, type AllTokensKeys } from "../allDataTokens";

interface TableSectionProps {
    categories: string[];
    excludedCategories?: string[];
    categoryKey: string;
    tokenType: "core" | "semantic";
    colorScheme?: "light" | "dark";
}

const TableSection = ({ categories, excludedCategories, categoryKey, tokenType, colorScheme }: TableSectionProps) => {
    const { theme } = useContext(ThemeContext);
    const data = getTokensFromKey(`${tokenType}.${categoryKey}` as AllTokensKeys, theme, colorScheme);

    const categoryTokens = useMemo(() => {
        return data.filter(token => {
            const excludedCategoryTokens = excludedCategories?.some(category => token.name.includes(category));

            return categories.some(category => token.name.includes(category)) && !excludedCategoryTokens;
        });
    }, [data, excludedCategories, categories]);

    return (
        <div className="hd-table-section">
            <TokenTable tokenType={tokenType} category={categoryKey} colorScheme={colorScheme} data={categoryTokens} />
        </div>
    );
};

export default TableSection;
