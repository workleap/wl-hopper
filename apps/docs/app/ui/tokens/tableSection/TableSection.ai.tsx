import TokenTable from "@/app/ui/tokens/table/TokenTable.ai";

import { useMemo } from "react";
import { getTokensFromKey, type AllTokensKeys } from "../allDataTokens";

interface TableSectionProps {
    categories: string[];
    excludedCategories?: string[];
    categoryKey: string;
    tokenType: "core" | "semantic";
}

const TableSection = ({ categoryKey, categories, excludedCategories, tokenType }: TableSectionProps) => {
    const tokens = getTokensFromKey(`${tokenType}.${categoryKey}` as AllTokensKeys);
    const categoryTokens = useMemo(() => {
        return tokens.filter(token => {
            const excludedCategoryTokens = excludedCategories?.some(category => token.name.includes(category));

            return categories.some(category => token.name.includes(category)) && !excludedCategoryTokens;
        });
    }, [tokens, categories, excludedCategories]);

    return (
        <TokenTable tokenType={tokenType} category={categoryKey} data={categoryTokens} />
    );
};

export default TableSection;
