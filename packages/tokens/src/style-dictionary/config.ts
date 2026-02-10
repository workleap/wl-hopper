import type { Config, File } from "style-dictionary";

import { BUILD_PATH, DOCS_BUILD_PATH, HOPPER_PREFIX, STORYBOOK_BUILD_PATH, STYLED_SYSTEM_BUILD_PATH, STYLED_SYSTEM_THEME_BUILD_PATH, StyledSystemRootCssClass } from "./constant.ts";

export const fontsConfig: Config = {
    "source": ["src/tokens/asset/*.tokens.json"],
    "platforms": {
        "css-font-face": {
            "transforms": ["name/cti/kebab", "attribute/font"],
            "buildPath": `${BUILD_PATH}`,
            "files": [
                {
                    "destination": "fonts.css",
                    "format": "font-face",
                    "filter": {
                        "attributes": {
                            "category": "asset",
                            "type": "font"
                        }
                    }
                }
            ]
        }
    }
};

export function getStyledSystemTokensConfig(mode: "light" | "dark", theme: string): Config {
    const isLightMode = mode === "light";

    const core = "src/tokens/core/*.tokens.json";
    const semanticLight = `src/tokens/semantic/${theme}/light/*.tokens.json`;
    const semanticDark = `src/tokens/semantic/${theme}/dark/*.tokens.json`;
    const components = `src/tokens/components/${theme}/*.tokens.json`;

    return {
        "source": isLightMode ? [core, semanticLight, components] : [semanticDark],
        "include": isLightMode ? [] : [core],
        "platforms": {
            "css": {
                "transformGroup": "custom/css", // We want the same values and name as the ones shown in css
                "buildPath": STYLED_SYSTEM_THEME_BUILD_PATH,
                "prefix": HOPPER_PREFIX,
                "options": {
                    "fileHeader": "typescript-file-header"
                },
                "files": [
                    {
                        "destination": `${theme}/${mode}.css`,
                        "format": "css/variables",
                        "options": {
                            "outputReferences": true,
                            "selector": isLightMode ? `.${StyledSystemRootCssClass}-${theme}` : `.${StyledSystemRootCssClass}-${theme}-${mode}`
                        }
                    }
                ]

            }
        }
    };
}

export function getStyledSystemTokenMappingConfig(theme: string): Config {
    return {
        "source": [
            "src/tokens/core/*.tokens.json",
            `src/tokens/semantic/${theme}/light/*.tokens.json`
        ],
        "platforms": {
            "typescript": {
                "transformGroup": "custom/css", // We want the same values and name as the ones shown in css
                "buildPath": STYLED_SYSTEM_BUILD_PATH,
                "prefix": HOPPER_PREFIX,
                "options": {
                    "fileHeader": "typescript-file-header"
                },
                "files": [
                    {
                        "destination": "styledSystemToTokenMappings.ts",
                        "format": "custom/ts-token-mapping",
                        "options": {
                            "outputReferences": true
                        }
                    }
                ]

            }
        }
    };
};

export function getStyleDictionaryConfig(mode: "light" | "dark", theme: string): Config {
    const isLightMode = mode === "light";

    const lightConfig: File = {
        "destination": `${theme}/tokens.css`,
        "format": "css/variables",
        "options": {
            "outputReferences": true
        }
    };

    const darkConfig: File = {
        "destination": `${theme}/dark/tokens.css`,
        "format": "css/dark-mode",
        "options": {
            "outputReferences": true
        }
    };

    const core = "src/tokens/core/*.tokens.json";
    const semanticLight = `src/tokens/semantic/${theme}/light/*.tokens.json`;
    const semanticDark = `src/tokens/semantic/${theme}/dark/*.tokens.json`;
    const components = `src/tokens/components/${theme}/*.tokens.json`;

    return {
        "source": isLightMode ? [core, semanticLight, components] : [semanticDark],
        "include": isLightMode ? [] : [core],
        "platforms": {
            "css": {
                "transformGroup": "custom/css",
                "buildPath": BUILD_PATH,
                "prefix": HOPPER_PREFIX,
                "files": [
                    isLightMode ? lightConfig : darkConfig,
                    {
                        "destination": isLightMode ? `${STORYBOOK_BUILD_PATH}/datas/${theme}/tokens.json` : `${STORYBOOK_BUILD_PATH}/datas/${theme}/tokens-dark.json`,
                        "format": "custom/doc",
                        "filter": "colors",
                        "options": {
                            "outputReferences": true
                        }
                    },
                    {
                        "destination": isLightMode ? `${DOCS_BUILD_PATH}/datas/${theme}/tokens.json` : `${DOCS_BUILD_PATH}/datas/${theme}/tokens-dark.json`,
                        "format": "custom/json",
                        "options": {
                            "outputReferences": true
                        }
                    }
                ]
            }
        }
    };
}
