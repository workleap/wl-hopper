import type { TransformedToken } from "style-dictionary/types";

export const isDarkTokens = (token: TransformedToken): boolean => token.filePath.includes("dark");
