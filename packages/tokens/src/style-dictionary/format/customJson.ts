import type { Dictionary } from "style-dictionary/types";

import { handleTypes, formatTokensByType } from "../helpers/index.ts";

export const customJson = function ({ dictionary }: { dictionary: Dictionary }) {
    const types = handleTypes(dictionary.allTokens);

    function getTokensByFamily(family: string) {
        return dictionary.allTokens.filter(token => {
            return token.filePath.includes(family);
        });
    }

    const coreTokens = getTokensByFamily("core");
    const semanticTokens = getTokensByFamily("semantic");

    let tokens;
    if (types !== undefined) {
        const core = formatTokensByType(types, coreTokens);
        const semantic = formatTokensByType(types, semanticTokens);

        tokens = {
            "core": Object.fromEntries(core),
            "semantic": Object.fromEntries(semantic)
        };
    }

    return JSON.stringify(tokens, null, 2);
};
