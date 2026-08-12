import type { TransformedToken } from "style-dictionary/types";

export const handleTypes = (data: TransformedToken[]): string[] | undefined => {
    if (!data) {
        return;
    }

    const types = data.map((token: TransformedToken) => token.$type);
    const filtredTypes = types.filter((type): type is string => type !== undefined);

    return [...new Set(filtredTypes)];
};
