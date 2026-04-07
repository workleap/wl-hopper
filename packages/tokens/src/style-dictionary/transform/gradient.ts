import type { TransformedToken } from "style-dictionary";

export function isGradientToken(token: TransformedToken): boolean {
    return token.type === "gradient"
        && typeof token.value === "string";
}

export function gradientCssLinear(token: TransformedToken): string {
    return `linear-gradient(${token.value})`;
}
