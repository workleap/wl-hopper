import type { Dictionary } from "style-dictionary";

import { isDarkTokens } from "../filter/isDarkTokens.ts";

export const cssDarkMode = function ({ dictionary }: { dictionary: Dictionary }) {
    const darkTokens = dictionary.allTokens.filter(isDarkTokens).map(token => {
        let value = token.original.value;

        if (dictionary.usesReference(value)) {
            const refs = dictionary.getReferences(value);
            refs.forEach(ref => {
                value = value.replaceAll(`{${ref.path.join(".")}}`, `var(--${ref.name})`);
            });
        }

        return `  --${token.name}: ${value};`;
    }).join("\n");

    return `[data-mode="dark"] {\n${darkTokens}\n}`;
};
