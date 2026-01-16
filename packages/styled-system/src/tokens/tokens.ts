import { DarkSemanticTokens } from "./generated/darkSemanticTokens.ts";
import { CoreTokens, SemanticTokens } from "./generated/lightSemanticTokens.ts";

export const Tokens = {
    Core: CoreTokens,
    Semantic: SemanticTokens,
    DarkSemantic: DarkSemanticTokens
};

export type { HopperCssVar, HopperTokenKey } from "./generated/styledSystemToTokenMappings.ts";
