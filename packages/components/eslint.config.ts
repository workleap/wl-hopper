import { defineReactLibraryConfig } from "@workleap/eslint-configs";
import { defineConfig } from "eslint/config";

export default defineConfig([
    defineReactLibraryConfig(import.meta.dirname, {
        core: {
            rules: {
                "no-console": ["warn", { "allow": ["warn", "error"] }], // We want to log warning in components
                "no-param-reassign": "off" // This is a frequent RAC pattern
            }
        },
        react: {
            rules: {
                "react/destructuring-assignment": "off", // This is a frequent RAC pattern
                "react-hooks/immutability": "off", // This is a frequent RAC pattern
                "react-hooks/set-state-in-effect": "off" // This is a new hook, in an existing codebase. It currently causes errors in some of my examples
            }
        },
        jsxAlly: {
            rules: {
                "jsx-a11y/label-has-associated-control": "off" // we are a component library, consumers will handle this
            }
        }
    }),
    {
        files: ["src/**/src/*"],
        rules: {
            "no-restricted-imports": ["error", {
                "patterns": [
                    {
                        "group": ["../**/src/*"],
                        "message": "Please import from the nearest index.ts file instead. ../../typography/Text/src/Text.tsx -> ../../typography/Text/index.ts"
                    },
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
                    },
                    {
                        "name": "@hopper-ui/components",
                        "message": "import { anything } from \"@hopper-ui/components\" inside /src needs to be avoided. It should only be used in docs and tests."
                    }
                ]
            }]
        }
    },
    {
        files: ["src/**/tests/*"],
        rules: {
            "no-restricted-imports": ["error", {
                "patterns": [
                    {
                        "group": ["../../../**/src/*"],
                        "message": "Please import from the nearest index.ts file instead. example: ../../utils/src/file.tsx -> ../../utils/index.ts"
                    },
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
    },
    {
        files: ["src/**/docs/*"],
        rules: {
            "no-restricted-imports": ["error", {
                "patterns": [
                    {
                        "group": ["../../**/src/*"],
                        "message": "Please import from the nearest index.ts file instead. example: ../../utils/src/file.tsx -> ../../utils/index.ts"
                    },
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
]
);
