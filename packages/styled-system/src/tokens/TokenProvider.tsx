import { StyledSystemRootCssClass } from "../styledSystemRootCssClass.ts";
import { useInsertStyleElement } from "../utils/useInsertStyleElement.ts";

import { Tokens } from "./tokens.ts";

/** The TokenProvider injects tokens in the document's head.
 * This is a component and not a hook, so it's easier to conditionally call it
 * @example
 * assuming different versions of the design system loaded at the same time, one with version 1, the other with version 2.0.0
 *  <head>
 *      <style id="hop-tokens-1-0-0">
 *          .hop-1-0-0 {
 *              --token: red
 *          }
 *       </style>
 *       <style id="hop-tokens-2-0-0">
 *          .hop-2-0-0 {
 *              --token: blue
 *          }
 *       </style>
 *   </head>
 */
export function TokenProvider() {
    useInsertStyleElement(
        `hop-tokens-${StyledSystemRootCssClass}`,
        tokensToCssString(`.hop.${StyledSystemRootCssClass}`, Tokens.Core),
        false
    );

    useInsertStyleElement(
        `hop-tokens-semantic-${StyledSystemRootCssClass}`,
        tokensToCssString(`.hop.${StyledSystemRootCssClass}`, Tokens.Semantic),
        false
    );

    useInsertStyleElement(
        `hop-tokens-semantic-dark-${StyledSystemRootCssClass}`,
        tokensToCssString(`.hop.${StyledSystemRootCssClass}.${StyledSystemRootCssClass}-dark`, Tokens.DarkSemantic),
        false
    );

    return null;
}

function tokensToCssString(selector: string, tokens: Record<string, string>) {
    const cssValues = Object.entries(tokens).reduce((acc, [key, value]) => {
        return `${acc} ${key}: ${value};`;
    }, "");

    return `${selector} {${cssValues}\n}`;
}
