import type { TransformedToken } from "style-dictionary";

export function isSizeType(token: TransformedToken): boolean {
    const typeOfSize = ["size", "fontSize", "borderRadius"];

    if (token) {
        return (
            typeOfSize.includes(token.type)
        );
    }

    return false;
}

export function pxToRem(token: TransformedToken): string {
    if (parseInt(token.original.value) === 0) {
        return token.original.value;
    }

    return `${parseInt(token.value) / 16}rem`;
}
