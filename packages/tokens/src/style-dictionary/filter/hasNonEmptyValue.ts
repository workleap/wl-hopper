import type { TransformedToken } from "style-dictionary";

export const hasNonEmptyValue = (token: TransformedToken): boolean => token.value !== "" && token.value != null;
