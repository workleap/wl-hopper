import fs from "fs";
import path from "path";
import StyleDictionary from "style-dictionary";

import { fontsConfig, getStyleDictionaryConfig, getStyledSystemTokenMappingConfig, getStyledSystemTokensConfig } from "./config.ts";
import { AUTO_GENERATED_COMMENT, HOPPER_PREFIX, STYLED_SYSTEM_BUILD_PATH, STYLED_SYSTEM_THEME_BUILD_PATH, StyledSystemRootCssClass } from "./constant.ts";
import { isColorType } from "./filter/isColorType.ts";
import { isDarkTokens } from "./filter/isDarkTokens.ts";
import { customTsTokenMapping } from "./format/customTsTokenMapping.ts";
import { cssDarkMode, customDoc, customJson, fontFace } from "./format/index.ts";
import { getAvailableThemes } from "./helpers/getThemes.ts";
import { w3cTokenJsonParser } from "./parser/w3cTokenParser.ts";
import { attributeFont, isSizeType, pxToRem } from "./transform/index.ts";

const { fileHeader } = StyleDictionary.formatHelpers;

// Filters
StyleDictionary.registerFilter({
    name: "mode/dark",
    matcher: isDarkTokens
});

StyleDictionary.registerFilter({
    name: "colors",
    matcher: isColorType
});

// Transform
StyleDictionary.registerTransform({
    name: "pxToRem",
    type: "value",
    matcher: isSizeType,
    transformer: pxToRem
});

StyleDictionary.registerTransform({
    name: "attribute/font",
    type: "attribute",
    transformer: attributeFont
});

StyleDictionary.registerTransformGroup({
    name: "custom/css",
    transforms: StyleDictionary.transformGroup["css"].concat(["pxToRem"])
});

// Format
StyleDictionary.registerFormat({
    name: "font-face",
    formatter: fontFace
});

StyleDictionary.registerFormat({
    name: "css/dark-mode",
    formatter: cssDarkMode
});

StyleDictionary.registerFormat({
    name: "custom/doc",
    formatter: customDoc
});

StyleDictionary.registerFormat({
    name: "custom/json",
    formatter: customJson
});

StyleDictionary.registerFormat({
    name: "custom/ts-token-mapping",
    formatter: ({ dictionary, file }) => {
        return fileHeader({ file }) + customTsTokenMapping({ dictionary });
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

// Parser
StyleDictionary.registerParser(w3cTokenJsonParser);

// Build
console.log("\nBuild started...");

console.log("\n|- 🔤 Building fonts...");
StyleDictionary.extend(fontsConfig).buildAllPlatforms();

console.log("\n|- 🔤 Detecting Themes...");
const themes = getAvailableThemes();
console.log(`   - Found themes: ${themes.join(", ")}`);

console.log("\n|- 🔤 Building constants...");
buildStyledSystemConstants(themes);

for (const theme of themes) {
    console.log(`\n|- 🎨 Building theme: ${theme}...`);

    console.log(`\n|- 🌞️ Default tokens for \`${theme}\`...`);
    StyleDictionary.extend(getStyleDictionaryConfig("light", theme)).buildAllPlatforms();

    console.log(`\n|- 🌙 Building dark mode for \`${theme}\`...`);
    StyleDictionary.extend(getStyleDictionaryConfig("dark", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System tokens for \`${theme}\`... `);
    StyleDictionary.extend(getStyledSystemTokensConfig("light", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System dark tokens for \`${theme}\`...`);
    StyleDictionary.extend(getStyledSystemTokensConfig("dark", theme)).buildAllPlatforms();

    console.log(`\n|- 💅 Building Styled System theme for \`${theme}\`...`);
    buildStyleSystemTheme(theme);
}

console.log("\n|- 💅 Building Styled System token mappings...");
StyleDictionary.extend(getStyledSystemTokenMappingConfig(themes.find(theme => theme === "workleap") || themes[0])).buildAllPlatforms();

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
