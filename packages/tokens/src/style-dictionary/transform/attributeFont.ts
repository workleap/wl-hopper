import type { TransformedToken } from "style-dictionary";

export interface AttributeFont {
    category: string;
    type: string;
    family: string;
    weight: string;
    style: string;
}

export function attributeFont(token: TransformedToken): AttributeFont {
    return ({
        category: token.path[0],
        type: token.path[1],
        family: token.path[2],
        style: token.path[3],
        weight: token.path[4]
    });
}
