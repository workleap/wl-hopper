import { files } from "@docs/ai";
import type { GuideSection, TokenCategory } from "./constants";

export interface UrlGuideFile {
    url: string;
    size?: number;
    estimatedTokens?: number;
}

export const GuideFiles: Record<GuideSection, typeof files.gettingStarted.index | UrlGuideFile> = {
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
    "changelog": files.changelogs,
    "tooling-cli": {
        url: "https://raw.githubusercontent.com/workleap/wl-design-systems-migrations/refs/heads/main/README.md"
    }
};

export const TokenGuideFiles: Record<TokenCategory, typeof files.gettingStarted.index> = {
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

export const TokenMapFiles: Record<TokenCategory, typeof files.gettingStarted.index[]> = {
    all: [files.tokens.maps.all],
    "all-core": [files.tokens.maps.core],
    "all-semantic": [files.tokens.maps.semantic],
    "core-border-radius": [files.tokens.maps.coreBorderRadius],
    "core-color": [files.tokens.maps.coreColor],
    "core-dimensions": [files.tokens.maps.coreSize],
    "core-font-family": [files.tokens.maps.coreFontFamily],
    "core-font-size": [files.tokens.maps.coreFontSize],
    "core-font-weight": [files.tokens.maps.coreFontWeight],
    "core-line-height": [files.tokens.maps.coreLineHeight],
    "core-motion": [files.tokens.maps.coreDuration, files.tokens.maps.coreTimingFunction],
    "core-shadow": [files.tokens.maps.coreShadow],
    "semantic-shape": [files.tokens.maps.semanticBorderRadius],
    "semantic-space": [files.tokens.maps.semanticSize],
    "semantic-typography": [
        files.tokens.maps.semanticFontFamily,
        files.tokens.maps.semanticFontSize,
        files.tokens.maps.semanticFontWeight,
        files.tokens.maps.semanticLineHeight,
        files.tokens.maps.semanticTopOffset
    ],
    "semantic-color": [files.tokens.maps.semanticColor],
    "semantic-elevation": [files.tokens.maps.semanticShadow]
};
