import type { TransformedToken } from "style-dictionary/types";

export const isColorType = (token: TransformedToken): boolean => token.$type === "color";
