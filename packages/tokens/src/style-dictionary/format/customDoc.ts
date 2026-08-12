import type { Dictionary } from "style-dictionary/types";

export const customDoc = function ({ dictionary }: { dictionary: Dictionary }) {
    const docFormat = dictionary.allTokens.map(token => {
        const { name, $value } = token;

        return {
            name,
            value: $value
        };
    });

    return JSON.stringify(docFormat, null, 2);
};
