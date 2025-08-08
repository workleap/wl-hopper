import TokenTable from "@/app/ui/tokens/table/TokenTable.ai";

import { useMemo } from "react";

interface TokenProps {
    name: string;
    value: string;
}

interface TableSectionProps {
    tokens: TokenProps[];
    categories: string[];
    excludedCategories?: string[];
    tokenType?: "core" | "semantic";
}

const TableSection = ({ tokens, categories, excludedCategories, tokenType }: TableSectionProps) => {
    const categoryTokens = useMemo(() => {
        return tokens.filter(token => {
            const excludedCategoryTokens = excludedCategories?.some(category => token.name.includes(category));

            return categories.some(category => token.name.includes(category)) && !excludedCategoryTokens;
        });
    }, [tokens, categories, excludedCategories]);

    return (
        <TokenTable tokenType={tokenType} data={categoryTokens} />
    );
};

export default TableSection;
