import { useRef, useState, type RefObject } from "react";

import { useColorSchemeContext, type ColorScheme } from "../color-scheme/ColorSchemeContext.ts";
import { useThemeContext } from "../theme/ThemeContext.ts";
import { StyledSystemRootCssClass, type Theme } from "../tokens/generated/styledSystemConstants.ts";
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
    "workleap": {
        color: "--hop-neutral-text",
        backgroundColor: "--hop-neutral-surface",
        lineHeight: "--hop-body-md-line-height",
        fontFamily: "--hop-body-md-font-family",
        fontSize: "--hop-body-md-font-size"
    },
    "sharegate": {
        color: "--hop-neutral-text",
        backgroundColor: "--hop-neutral-surface-weakest",
        lineHeight: "--hop-body-md-line-height",
        fontFamily: "--hop-body-md-font-family",
        fontSize: "--hop-body-md-font-size"
    }
} as const satisfies Record<Theme, Record<string, HopperTokenKey>>;

/* The BodyStyleProvider injects fonts and body styles on the body.
* Since tokens are injected on a dom element inside the body, tokens can not be used in the body styles.
* This component makes sure that the body styles are injected without referring to tokens.
*/
export function BodyStyleProvider() {
    const ref = useRef<HTMLDivElement>(null);
    const { colorScheme } = useColorSchemeContext();
    const { theme } = useThemeContext();
    const [cosmeticStyles, setCosmeticStyles] = useState<CosmeticStyles | undefined>(undefined);

    useIsomorphicLayoutEffect(() => {
        if (ref.current) {
            const computedStyle = new ThemeComputedStyle(ref as RefObject<Element>, `.${StyledSystemRootCssClass}`);

            const color = computedStyle.getPropertyValue(BodyTokens[theme].color);
            const backgroundColor = computedStyle.getPropertyValue(BodyTokens[theme].backgroundColor);
            const fontFamily = computedStyle.getPropertyValue(BodyTokens[theme].fontFamily);
            const lineHeight = computedStyle.getPropertyValue(BodyTokens[theme].lineHeight);
            const fontSize = computedStyle.getPropertyValue(BodyTokens[theme].fontSize);

            setCosmeticStyles({ colorScheme, color, backgroundColor, lineHeight, fontFamily, fontSize });
        }
        // This hook needs to be executed when the colorScheme or theme changes
    }, [ref, colorScheme, theme]);

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
