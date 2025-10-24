import { DarkSemanticTokens } from "./generated/darkSemanticTokens.ts";
import { CoreTokens, SemanticTokens } from "./generated/lightSemanticTokens.ts";

export const Tokens = {
    Core: CoreTokens,
    Semantic: SemanticTokens,
    DarkSemantic: DarkSemanticTokens
};

export type HopperTokenKey = keyof typeof CoreTokens | keyof typeof SemanticTokens | keyof typeof DarkSemanticTokens;
export type HopperCssVar = `var(${HopperTokenKey})`;
