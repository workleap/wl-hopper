import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

const globals: Record<string, boolean> = {
    "AI": true,
    "BreakpointTable": true,
    "Card": true,
    "CardLink": true,
    "CardLinkList": true,
    "Callout": true,
    "Collapsible": true,
    "DosAndDonts": true,
    "Expand": true,
    "TokenTable": true,
    "PropsReferenceTable": true,
    "MotionPreview": true,
    "Figure": true,
    "Footnote": true,
    "TypographyTable": true,
    "TypographyVariantTable": true,
    "Tag": true,
    "Tabs": true,
    "TableSection": true,
    "SimpleTable": true,
    "Switcher": true,
    "IconSpecTable": true,
    "Overview": true,
    "PreviewComponent": true,
    "MigrateGuide": true,
    "PackageInstallation": true,
    "PropTable": true,
    "CodeOnlyExample": true,
    "Example": true,
    "ComposedComponents": true,
    "Link": true
};

export default defineConfig([
    globalIgnores([
        "datas/*"
    ]),
    {
        languageOptions: {
            globals: globals
        }
    },
    defineWebApplicationConfig(import.meta.dirname),
    {
        files: [
            "*.{js,jsx,ts,tsx}"
        ],
        ignores: ["scripts/**"],
        // "excludedFiles": "scripts/**",
        rules: {
            "no-console": [
                "warn",
                {
                    "allow": [
                        "warn",
                        "error"
                    ]
                }
            ],
            "react/destructuring-assignment": "off",
            "no-param-reassign": "off",
            "no-restricted-imports": [
                "error",
                {
                    "patterns": [
                        {
                            "group": [
                                "../../index.ts",
                                "../index.ts",
                                "../../../index.ts",
                                "./index.ts"
                            ],
                            "message": "Avoid importing from index.ts files directly next or above the current file"
                        }
                    ],
                    "paths": [
                        {
                            "name": "react",
                            "importNames": [
                                "default"
                            ],
                            "message": "import React from \"react\" is no longer necessary and should be avoided. "
                        }
                    ]
                }
            ]
        }
    }
]
);

