import { defineTypeScriptLibraryConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

import sharedConfig from "../../tooling/eslint-shared-config/import-order.ts";

export default defineConfig([
    globalIgnores([
        "**/datas/**"
    ]),
    sharedConfig,
    defineTypeScriptLibraryConfig(import.meta.dirname, {
        core: {
            rules: {
                "no-restricted-imports": ["error", {
                    "patterns": [
                        {
                            "group": ["../../index.ts", "../index.ts", "../../../index.ts", "./index.ts"],
                            "message": "Avoid importing from index.ts files directly next or above the current file"
                        }
                    ],
                    "paths": [
                        {
                            "name": "react",
                            "importNames": ["default"],
                            "message": "import React from \"react\" is no longer necessary and should be avoided. "
                        }
                    ]
                }]
            }
        }
    })
]);
