import type { TransformedToken } from "style-dictionary";

import { HOPPER_PREFIX } from "../constant.ts";

interface LinearGradientValue {
    topColor: string;
    bottomColor: string;
    direction?: string;
}

function refToCssVar(ref: string): string {
    const path = ref.replace(/^\{/, "").replace(/\}$/, "").split(".").join("-");

    return `var(--${HOPPER_PREFIX}-${path})`;
}

export function isLinearGradientType(token: TransformedToken): boolean {
    return token.type === "linearGradient";
}

export function linearGradientTransform(token: TransformedToken): string {
    const original = token.original.value as LinearGradientValue;
    const direction = original.direction ?? "180deg";
    const fromVar = refToCssVar(original.topColor);
    const toVar = refToCssVar(original.bottomColor);

    return `linear-gradient(${direction}, ${fromVar} 0%, ${toVar} 100%)`;
}
