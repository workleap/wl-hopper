import { files } from "@docs/ai";
import type { ColorScheme, GuideSection, Theme, TokenCategory } from "./constants";

export interface UrlGuideFile {
    url: string;
    size?: number;
    estimatedTokens?: number;
}
export interface IndexFile {
    path: string;
    size?: number;
    estimatedTokens?: number;
}

export const GuideFiles: Record<GuideSection, UrlGuideFile | IndexFile> = {
    installation: files.gettingStarted.index,
    styles: files.styledSystem.index,
    icons: files.icons.brief.index,
    "components-list": files.components.full.componentList,
    "color-schemes": files.components.concepts.colorSchemes,
    layout: files.components.concepts.layout,
    "controlled-mode": files.components.concepts.controlledMode,
    forms: files.components.concepts.forms,
    slots: files.components.concepts.slots,
    internationalization: files.components.concepts.internationalization,
    "escape-hatches": files.styledSystem.escapeHatches,
    "figma-conventions": files.ai.figmaConventions,
    tokens: files.tokens.overview.introduction,
    "utility-hooks": files.components.utilities.index,
    changelog: files.changelogs,
    "tooling-cli": {
        url: "https://raw.githubusercontent.com/workleap/wl-design-systems-migrations/refs/heads/main/README.md"
    }
};

export const TokenGuideFiles: Record<TokenCategory, IndexFile> = {
    "semantic-color": files.tokens.semantic.color,
    "semantic-elevation": files.tokens.semantic.elevation,
    "semantic-shape": files.tokens.semantic.shape,
    "semantic-space": files.tokens.semantic.space,
    "semantic-typography": files.tokens.semantic.typography,
    "core-border-radius": files.tokens.core.borderRadius,
    "core-color": files.tokens.core.color,
    "core-dimensions": files.tokens.core.dimensions,
    "core-font-family": files.tokens.core.fontFamily,
    "core-font-size": files.tokens.core.fontSize,
    "core-font-weight": files.tokens.core.fontWeight,
    "core-line-height": files.tokens.core.lineHeight,
    "core-motion": files.tokens.core.motion,
    "core-shadow": files.tokens.core.shadow,
    "all-semantic": files.tokens.semantic.index,
    "all-core": files.tokens.core.index,
    all: files.tokens.index
};

export function getTokenMapFiles(
    theme: Theme,
    colorScheme: ColorScheme
): Record<TokenCategory, IndexFile[]> {
    const themeMaps = files.tokens.maps[theme]?.[colorScheme];

    if (!themeMaps) {
        throw new Error(`Token maps not found for theme: ${theme}, colorScheme: ${colorScheme}`);
    }

    return {
        all: [themeMaps.all],
        "all-core": [themeMaps.core],
        "all-semantic": [themeMaps.semantic],
        "core-border-radius": [themeMaps.coreBorderRadius],
        "core-color": [themeMaps.coreColor],
        "core-dimensions": [themeMaps.coreSize],
        "core-font-family": [themeMaps.coreFontFamily],
        "core-font-size": [themeMaps.coreFontSize],
        "core-font-weight": [themeMaps.coreFontWeight],
        "core-line-height": [themeMaps.coreLineHeight],
        "core-motion": [themeMaps.coreDuration, themeMaps.coreTimingFunction],
        "core-shadow": [themeMaps.coreShadow],
        "semantic-shape": [themeMaps.semanticBorderRadius],
        "semantic-space": [themeMaps.semanticPaddingSize, themeMaps.semanticMarginSize],
        "semantic-typography": [
            themeMaps.semanticFontFamily,
            themeMaps.semanticFontSize,
            themeMaps.semanticFontWeight,
            themeMaps.semanticLineHeight,
            themeMaps.semanticTopOffset
        ],
        "semantic-color": [themeMaps.semanticColor],
        "semantic-elevation": [themeMaps.semanticShadow]
    };
}
