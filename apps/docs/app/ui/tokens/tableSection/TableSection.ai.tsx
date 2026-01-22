import TokenTable from "@/app/ui/tokens/table/TokenTable.ai";

import { DocumentationThemes } from "@/components/themeSwitch/ThemeSwitch";
import { Fragment } from "react";
import { getTokensFromKey, type AllTokensKeys, type TokenValue } from "../allDataTokens";

interface TableSectionProps {
    categories: string[];
    excludedCategories?: string[];
    categoryKey: string;
    tokenType: "core" | "semantic";
}

function getCategory(tokens: TokenValue[], { categories, excludedCategories }: TableSectionProps) {
    return tokens.filter(token => {
        const excludedCategoryTokens = excludedCategories?.some(category => token.name.includes(category));

        return categories.some(category => token.name.includes(category)) && !excludedCategoryTokens;
    });
}

const TableSection = ({ categoryKey, categories, excludedCategories, tokenType }: TableSectionProps) => {
    return (
        <>
            {DocumentationThemes.map(theme => {
                const data = getTokensFromKey(`${tokenType}.${categoryKey}` as AllTokensKeys, theme);
                const categoryTokens = getCategory(data, { categoryKey, categories, excludedCategories, tokenType });

                return (
                    <Fragment key={theme}>
                        <div>Tokens for theme: {theme}</div>
                        <TokenTable tokenType={tokenType} category={categoryKey} data={categoryTokens} />
                    </Fragment>
                );
            })}
        </>
    );
};

export default TableSection;
