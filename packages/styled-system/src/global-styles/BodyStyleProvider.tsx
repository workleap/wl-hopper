import { useRef, useState, type RefObject } from "react";

import { useColorSchemeContext, type ColorScheme } from "../color-scheme/ColorSchemeContext.ts";
import { StyledSystemRootCssClass } from "../tokens/generated/styledSystemConstants.ts";
import type { HopperTokenKey } from "../tokens/generated/styledSystemToTokenMappings.ts";
import { isNil } from "../utils/assertion.ts";
import { useInsertStyleElement } from "../utils/useInsertStyleElement.ts";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect.ts";
import { ThemeComputedStyle } from "../utils/useThemeComputedStyle.ts";

interface CosmeticStyles {
    color: string;
    backgroundColor: string;
    lineHeight: string;
    fontFamily: string;
    fontSize: string;
    colorScheme: ColorScheme;
}

const BodyTokens = {
    color: "--hop-neutral-text",
    backgroundColor: "--hop-neutral-surface",
    lineHeight: "--hop-body-md-line-height",
    fontFamily: "--hop-body-md-font-family",
    fontSize: "--hop-body-md-font-size"
} satisfies Record<string, HopperTokenKey>;

/* The BodyStyleProvider injects fonts and body styles on the body.
* Since tokens are injected on a dom element inside the body, tokens can not be used in the body styles.
* This component makes sure that the body styles are injected without referring to tokens.
*/
export function BodyStyleProvider() {
    const ref = useRef<HTMLDivElement>(null);
    const { colorScheme } = useColorSchemeContext();
    const [cosmeticStyles, setCosmeticStyles] = useState<CosmeticStyles | undefined>(undefined);

    useIsomorphicLayoutEffect(() => {
        if (ref.current) {
            const computedStyle = new ThemeComputedStyle(ref as RefObject<Element>, `.${StyledSystemRootCssClass}`);

            const color = computedStyle.getPropertyValue(BodyTokens.color);
            const backgroundColor = computedStyle.getPropertyValue(BodyTokens.backgroundColor);
            const fontFamily = computedStyle.getPropertyValue(BodyTokens.fontFamily);
            const lineHeight = computedStyle.getPropertyValue(BodyTokens.lineHeight);
            const fontSize = computedStyle.getPropertyValue(BodyTokens.fontSize);

            setCosmeticStyles({ colorScheme, color, backgroundColor, lineHeight, fontFamily, fontSize });
        }
        // This hook needs to be executed when the colorScheme changes
    }, [ref, colorScheme]);

    useInsertStyleElement(
        `hop-body-styles-${StyledSystemRootCssClass}`,
        isNil(cosmeticStyles) ? "" : generateBodyCssContent(cosmeticStyles)
    );

    return (
        <div ref={ref}></div>
    );
}

function generateBodyCssContent({ color, backgroundColor, fontFamily, lineHeight, fontSize }: CosmeticStyles) {
    return `
            body {
                -webkit-font-smoothing: antialiased;
                font-family: ${fontFamily}, Arial, sans-serif;
                line-height: ${lineHeight};
                font-size: ${fontSize};
                color: ${color};
                background-color: ${backgroundColor};
                margin: 0;
                padding: 0;
            }

            @media not (prefers-reduced-motion) {
                body {
                    scroll-behavior: smooth;
                }
            }
        `;
}
