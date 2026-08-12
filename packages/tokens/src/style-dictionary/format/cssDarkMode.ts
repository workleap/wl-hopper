import type { Dictionary } from "style-dictionary/types";
import { getReferences, usesReferences } from "style-dictionary/utils";

import { isDarkTokens } from "../filter/isDarkTokens.ts";

export const cssDarkMode = function ({ dictionary }: { dictionary: Dictionary }) {
    const darkTokens = dictionary.allTokens.filter(isDarkTokens).map(token => {
        let value = token.original.$value;

        if (usesReferences(value)) {
            const refs = getReferences(value, dictionary.tokens);
            refs.forEach(ref => {
                value = value.replaceAll(`{${ref.path.join(".")}}`, `var(--${ref.name})`);
            });
        }

        return `  --${token.name}: ${value};`;
    }).join("\n");

    return `[data-mode="dark"] {\n${darkTokens}\n}`;
};
