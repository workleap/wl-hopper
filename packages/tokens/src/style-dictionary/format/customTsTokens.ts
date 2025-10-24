import type { Dictionary, TransformedToken } from "style-dictionary";

import { handleTypes } from "../helpers/index.ts";

export const customTsTokens = function ({ dictionary }: { dictionary: Dictionary }) {
    const types = handleTypes(dictionary.allTokens);

    function getTokensByFamily(family: string) {
        return dictionary.allTokens.filter(token => {
            return token.filePath.includes(family);
        });
    }

    let tokens = "";
    if (types !== undefined) {
        const coreTokens = getTokensByFamily("core");
        const semanticTokens = getTokensByFamily("semantic");
        const darkSemanticTokens = getTokensByFamily("dark");

        const isLightMode = darkSemanticTokens.length === 0;

        if (isLightMode) {
            tokens += [
                formatTokenFamily("CoreTokens", coreTokens, dictionary),
                formatTokenFamily("SemanticTokens", semanticTokens, dictionary)
            ].join("\n");
        } else {
            tokens += formatTokenFamily("DarkSemanticTokens", darkSemanticTokens, dictionary);
        }
    }

    return tokens;
};

function formatTokenFamily(familyName: string, tokens: TransformedToken[], dictionary: Dictionary) {
    const formattedTokens = tokens.map(token => {
        const { name, value } = formatTypeScriptToken(token, dictionary);

        return `    "${name}": "${value}"`;
    }).join(",\n");

    return `export const ${familyName} = {\n${formattedTokens}\n};`;
}

function formatTypeScriptToken(token: TransformedToken, dictionary: Dictionary) {
    let value = token.value;

    if (dictionary.usesReference(token.original.value)) {
        const refs = dictionary.getReferences(token.original.value);
        refs.forEach(ref => {
            value = token.value.replace(ref.value, () => `var(--${ref.name})`);
        });
    }

    return {
        name: `--${token.name}`,
        value
    };
}
