import type { TransformedToken } from "style-dictionary";

import { formatTokens } from "./index.js";

export function formatTokensByType(types: string[], tokens: TransformedToken[]) {
    return types.map(type => {
        const data = tokens.filter(token => {
            return token.type === type;
        });

        return formatTokens(data, type);
    }).filter(([, typeTokens]) => typeTokens.length > 0);
}
