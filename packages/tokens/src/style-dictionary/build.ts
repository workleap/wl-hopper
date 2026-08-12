import fs from "fs";
import path from "path";
import StyleDictionary from "style-dictionary";
import "style-dictionary-utils"; // auto-registers gradient/css transform
import { fileHeader } from "style-dictionary/utils";

import { fontsConfig, getStyleDictionaryConfig, getStyledSystemTokenMappingConfig, getStyledSystemTokensConfig } from "./config.ts";
import { AUTO_GENERATED_COMMENT, HOPPER_PREFIX, STYLED_SYSTEM_BUILD_PATH, STYLED_SYSTEM_THEME_BUILD_PATH, StyledSystemRootCssClass } from "./constant.ts";
import { hasNonEmptyValue } from "./filter/hasNonEmptyValue.ts";
import { isColorType } from "./filter/isColorType.ts";
import { isDarkTokens } from "./filter/isDarkTokens.ts";
import { customTsTokenMapping } from "./format/customTsTokenMapping.ts";
import { cssDarkMode, customDoc, customJson, fontFace } from "./format/index.ts";
import { getAvailableThemes } from "./helpers/getThemes.ts";
import { attributeFont, gradientCssLinear, isGradientToken, isSizeType, pxToRem } from "./transform/index.ts";

// Filters
StyleDictionary.registerFilter({
    name: "mode/dark",
    filter: isDarkTokens
});

StyleDictionary.registerFilter({
    name: "colors",
    filter: isColorType
});

StyleDictionary.registerFilter({
    name: "non-empty-value",
    filter: hasNonEmptyValue
});

// Transform
StyleDictionary.registerTransform({
    name: "pxToRem",
    type: "value",
    filter: isSizeType,
    transform: pxToRem
});

StyleDictionary.registerTransform({
    name: "attribute/font",
    type: "attribute",
    transform: attributeFont
});

StyleDictionary.registerTransform({
    name: "gradient/css-linear",
    type: "value",
    transitive: true,
    filter: isGradientToken,
    transform: gradientCssLinear
});

StyleDictionary.registerTransformGroup({
    name: "custom/css",
    // Exclude the built-in "color/css" transform: in Style Dictionary v3 it matched via CTI
    // category (never "color" in this repo), so colors passed through untouched. v5's "color/css"
    // matches via DTCG `$type: color` and would re-serialize values like `transparent` or
    // `rgb(R G B / A)`. Dropping it preserves the exact v3 output.
    transforms: StyleDictionary.hooks.transformGroups["css"].filter(transform => transform !== "color/css").concat(["pxToRem", "gradient/css", "gradient/css-linear", "shadow/css"])
});

// Format
StyleDictionary.registerFormat({
    name: "font-face",
    format: fontFace
});

StyleDictionary.registerFormat({
    name: "css/dark-mode",
    format: cssDarkMode
});

StyleDictionary.registerFormat({
    name: "custom/doc",
    format: customDoc
});

StyleDictionary.registerFormat({
    name: "custom/json",
    format: customJson
});

StyleDictionary.registerFormat({
    name: "custom/ts-token-mapping",
    format: async ({ dictionary, file }) => {
        return await fileHeader({ file }) + customTsTokenMapping({ dictionary });
    }
});

// File Headers
StyleDictionary.registerFileHeader({
    name: "typescript-file-header",
    fileHeader: () => {
        return [
            AUTO_GENERATED_COMMENT
        ];
    }
});

// Build
console.log("\nBuild started...");

console.log("\n|- 🔤 Building fonts...");
await new StyleDictionary(fontsConfig).buildAllPlatforms();

console.log("\n|- 🔤 Detecting Themes...");
const themes = getAvailableThemes();
console.log(`   - Found themes: ${themes.join(", ")}`);

console.log("\n|- 🔤 Building constants...");
buildStyledSystemConstants(themes);

for (const theme of themes) {
    console.log(`\n|- 🎨 Building theme: ${theme}...`);

    console.log(`\n|- 🌞️ Default tokens for \`${theme}\`...`);
    await new StyleDictionary(getStyleDictionaryConfig("light", theme)).buildAllPlatforms();

    console.log(`\n|- 🌙 Building dark mode for \`${theme}\`...`);
    await new StyleDictionary(getStyleDictionaryConfig("dark", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System tokens for \`${theme}\`... `);
    await new StyleDictionary(getStyledSystemTokensConfig("light", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System dark tokens for \`${theme}\`...`);
    await new StyleDictionary(getStyledSystemTokensConfig("dark", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System theme for \`${theme}\`...`);
    buildStyleSystemTheme(theme);
}

console.log("\n|- 💅 Building Styled System token mappings...");
await new StyleDictionary(getStyledSystemTokenMappingConfig(themes.find(theme => theme === "workleap") || themes[0])).buildAllPlatforms();

console.log("\n🚀 Build completed!\n");

function buildStyledSystemConstants(themes: string[]) {
    let mappings = "";
    const cssPrefix = `--${HOPPER_PREFIX}`;
    mappings += `export const HopperRootCssClass = "${HOPPER_PREFIX}";\n`;
    mappings += `export const StyledSystemRootCssClass = "${StyledSystemRootCssClass}";\n`;
    mappings += `export const HopperVariablePrefix = "${cssPrefix}";\n\n`;
    mappings += `export type Theme = ${themes.map(x => `"${x}"`).join(" | ")};\n`;

    if (!fs.existsSync(STYLED_SYSTEM_BUILD_PATH)) {
        fs.mkdirSync(STYLED_SYSTEM_BUILD_PATH, { recursive: true });
    }
    fs.writeFileSync(path.join(STYLED_SYSTEM_BUILD_PATH, "styledSystemConstants.ts"), mappings);
}

function buildStyleSystemTheme(theme: string) {
    let themeFile = `/** ${AUTO_GENERATED_COMMENT} */\n\n`;
    themeFile += `@import url("./${theme}/light.css");\n`;
    themeFile += `@import url("./${theme}/dark.css");\n`;

    fs.writeFileSync(path.join(STYLED_SYSTEM_THEME_BUILD_PATH, `${theme}.css`), themeFile);
}
