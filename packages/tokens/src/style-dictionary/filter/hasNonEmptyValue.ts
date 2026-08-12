import type { TransformedToken } from "style-dictionary/types";

export const hasNonEmptyValue = (token: TransformedToken): boolean => token.$value !== "" && token.$value != null;
