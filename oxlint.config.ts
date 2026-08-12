import { defineConfig } from "oxlint";

// Shared no-restricted-imports building blocks (ported from the former eslint configs).
const reactDefaultImport = {
    name: "react",
    importNames: ["default"],
    message: "import React from \"react\" is no longer necessary and should be avoided. "
};

const barrelImports = {
    group: ["../../index.ts", "../index.ts", "../../../index.ts", "./index.ts"],
    message: "Avoid importing from index.ts files directly next or above the current file"
};

export default defineConfig({
    plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y", "vitest", "nextjs"],
    categories: {
        correctness: "error",
        suspicious: "warn"
    },
    rules: {
        // Disabled rules
        "react/react-in-jsx-scope": "off",
        "import/no-unassigned-import": "off",
        "react/no-object-type-as-default-prop": "off",
        "jsx-a11y/no-autofocus": "off",
        "eslint/no-shadow": "off",
        "jsx-a11y/prefer-tag-over-role": "off",
        "eslint/no-underscore-dangle": "off", // wl-hopper uses the _ComponentName internal forwardRef pattern
        "unicorn/no-array-sort": "off", //Temporarily disabled .sort() on freshly-created arrays is idiomatic and safe here.
        "import/namespace": "off", // redundant with TypeScript; only false-positives on intentional dynamic icon lookups (IconLibrary[name])



        // Extra rules
        "typescript/consistent-type-imports": "warn",
        "eslint/no-var": "warn",
        "eslint/prefer-const": "warn",
        "eslint/eqeqeq": ["warn", "smart"],
        "eslint/curly": "warn",
        "eslint/no-param-reassign": "warn",
        "eslint/no-sequences": "warn",
        "eslint/no-useless-computed-key": "warn",
        "eslint/array-callback-return": "warn",
        "eslint/no-loop-func": "warn",
        "eslint/no-new-wrappers": "warn",
        "eslint/no-self-compare": "warn",
        "eslint/no-template-curly-in-string": "warn",
        "eslint/no-script-url": "warn",
        "react/button-has-type": "warn",
        "import/no-duplicates": "warn",
        "eslint/sort-imports": ["warn", { ignoreDeclarationSort: true }],
        "react/rules-of-hooks": "warn",
        "unicorn/consistent-function-scoping": "warn",
        "eslint/no-throw-literal": "warn",
        "import/no-cycle": "warn",
        "typescript/no-explicit-any": "warn",
        "unicorn/no-instanceof-builtins": "warn",
        "eslint/require-await": "warn",
        "react/jsx-no-useless-fragment": "warn",
        "react/no-array-index-key": "warn",
        "unicorn/prefer-array-some": "warn",
        "eslint/object-shorthand": "warn",

        // Base no-restricted-imports (applies everywhere unless overridden below).
        "eslint/no-restricted-imports": ["error", {
            patterns: [barrelImports],
            paths: [reactDefaultImport]
        }]
    },
    overrides: [
        {
            // Component source files must not deep-import sibling `src` files or the public barrel.
            files: ["packages/components/src/**/src/*"],
            rules: {
                "eslint/no-restricted-imports": ["error", {
                    patterns: [
                        {
                            group: ["../**/src/*"],
                            message: "Please import from the nearest index.ts file instead. ../../typography/Text/src/Text.tsx -> ../../typography/Text/index.ts"
                        },
                        barrelImports
                    ],
                    paths: [
                        reactDefaultImport,
                        {
                            name: "@hopper-ui/components",
                            message: "import { anything } from \"@hopper-ui/components\" inside /src needs to be avoided. It should only be used in docs and tests."
                        }
                    ]
                }]
            }
        },
        {
            files: ["packages/components/src/**/tests/*"],
            rules: {
                "eslint/no-restricted-imports": ["error", {
                    patterns: [
                        {
                            group: ["../../../**/src/*"],
                            message: "Please import from the nearest index.ts file instead. example: ../../utils/src/file.tsx -> ../../utils/index.ts"
                        },
                        barrelImports
                    ],
                    paths: [reactDefaultImport]
                }]
            }
        },
        {
            files: ["packages/components/src/**/docs/*"],
            rules: {
                "eslint/no-restricted-imports": ["error", {
                    patterns: [
                        {
                            group: ["../../**/src/*"],
                            message: "Please import from the nearest index.ts file instead. example: ../../utils/src/file.tsx -> ../../utils/index.ts"
                        },
                        barrelImports
                    ],
                    paths: [reactDefaultImport]
                }]
            }
        },
        {
            // RAC patterns + we want to keep warn-level console logging in these libraries/app.
            files: ["packages/components/**", "packages/styled-system/**", "packages/icons/**", "apps/docs/**"],
            rules: {
                "eslint/no-param-reassign": "off",
                "eslint/no-console": ["warn", { allow: ["warn", "error"] }],
                "jsx-a11y/label-has-associated-control": "off"
            }
        },
        {
            files: ["**/scripts/**"],
            rules: {
                "eslint/no-console": "off"
            }
        }
    ],
    ignorePatterns: [
        "**/dist/**",
        "**/storybook-static/**",
        "**/.turbo/**",
        // Generated design-token data & outputs
        "packages/tokens/**/datas/**",
        "packages/styled-system/src/theme/generated/**",
        "packages/styled-system/src/tokens/generated/**",
        // Generated icon components
        "packages/icons/src/generated-icon-components/**",
        "packages/icons/src/generated-rich-icon-components/**",
        // Next.js / contentlayer build output & generated docs
        "apps/docs/.next/**",
        "apps/docs/.contentlayer/**",
        "apps/docs/out/**",
        "apps/docs/build/**",
        "apps/docs/next-env.d.ts",
        "apps/docs/public/ai-docs/**",
        "apps/docs/datas/**",
        // mcp-server mocks / generated docs / reports
        "apps/mcp-server/**/mocks/**",
        "apps/mcp-server/reports/**",
        "apps/mcp-server/.netlify/**",
        "apps/mcp-server/src/.docs/**"
    ],
    options: {
        denyWarnings: true
    }
});
