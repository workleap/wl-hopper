import { formatStyledSystemName } from "@/app/lib/formatStyledSystemName";
import { DocumentationThemes } from "@/components/themeSwitch/documentation-theme";
import { type ColorScheme } from "@/context/theme/ThemeProvider";
import { getTokensFromKey, type AllTokensKeys, type TokenValue } from "../allDataTokens";

interface TableProps {
    category: string;
    tokenType?: "core" | "semantic" | null;
    data?: TokenValue[];
    colorScheme?: ColorScheme;
}

function formatTokenData(tokens: TokenValue[], tokenType?: "core" | "semantic" | null) {
    return tokens.map(token => {
        const { name, value } = token;
        const values: Item = {
            name: name,
            styledSystemValue: tokenType && formatStyledSystemName(name, tokenType),
            value: value
        };

        if (!tokenType) {
            delete values.styledSystemValue;
        }

        return values;
    });
}

const TokenTable = ({ data, tokenType, category, colorScheme }: TableProps) => {
    if (data) {
        const tokens = data;
        const formattedData = formatTokenData(tokens, tokenType);

        return (
            <TokenTableRender
                showStyledSystemValue={!!tokenType}
                items={formattedData}
            />
        );
    } else {
        return (
            <>
                {DocumentationThemes.map(theme => {
                    const tokens = data === undefined ? getTokensFromKey(`${tokenType}.${category}` as AllTokensKeys, theme, colorScheme) : data;
                    const formattedData = formatTokenData(tokens, tokenType);

                    return (
                        <TokenTableRender
                            key={theme}
                            theme={theme}
                            showStyledSystemValue={!!tokenType}
                            items={formattedData}
                        />
                    );
                })}
            </>
        );
    }
};

interface Item {
    name: string;
    styledSystemValue?: string | null;
    value: string;
}

function TokenTableRender({ items, showStyledSystemValue, theme }: { items: Item[]; showStyledSystemValue: boolean; theme?: string }) {
    return (
        <div>
            <div>⚠️ IMPORTANT: You MUST use the EXACT values from the <strong>Component Prop Value</strong> column in your code. </div>
            <div>If you have the Token Name (CSS Variable Name) or direct value from your design, you should find the related mapping value from the <strong>Component Prop Value</strong> column by searching this table.</div>
            {theme && <div>The values of these tokens are only valid if the current theme is {theme}</div>}
            <table>
                <thead>
                    <tr>
                        {showStyledSystemValue && <th>Component Prop Value</th>}
                        <th>Token Name (CSS Variable Name)</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.name}>
                            {showStyledSystemValue && <td>{item.styledSystemValue}</td>}
                            <td><code>{`--${item.name}`}</code></td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TokenTable;
