import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import * as mdx from "eslint-plugin-mdx";
import { defineConfig, globalIgnores } from "eslint/config";

// TODO: once i migrate to next 16, i need to re-add the next plugin in this config
export default defineConfig([
    globalIgnores([
        "datas/*",
        ".next",
        ".contentlayer",
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts"
    ]),
    {
        ...mdx.flat,
    },
    defineWebApplicationConfig(import.meta.dirname),
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

