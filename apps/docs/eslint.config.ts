import nextPlugin from "@next/eslint-plugin-next";
import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import * as mdx from "eslint-plugin-mdx";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "datas/*",
        ".next",
        ".contentlayer",
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "public/ai-docs/**"
    ]),
    {
        ...mdx.flat
    },
    defineWebApplicationConfig(import.meta.dirname),
    {
        name: "next/core-web-vitals",
        plugins: {
            "@next/next": nextPlugin
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules
        }
    },
    {
        files: [
            "**/*.{js,jsx,ts,tsx,cjs,mjs}"
        ],
        ignores: ["scripts/**"],
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

