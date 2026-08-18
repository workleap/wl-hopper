import { defineConfig } from "oxlint";

// Shared no-restricted-imports building blocks (ported from the former eslint configs).
const reactDefaultImport = {
    name: "react",
    importNames: ["default"],
    message: 'import React from "react" is no longer necessary and should be avoided. '
};

const barrelImports = {
    group: ["../../index.ts", "../index.ts", "../../../index.ts", "./index.ts"],
    message: "Avoid importing from index.ts files directly next or above the current file"
};

// Plugins enabled repo-wide. The `nextjs` plugin is NOT here on purpose — its rules only
// make sense for the Next.js app, so it is enabled via an apps/docs override below.
const basePlugins = ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y", "vitest"] as const;

export default defineConfig({
    plugins: [...basePlugins],
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
        "vitest/require-mock-type-parameters": "off", // we don't require explicit type params on vi.fn mocks
        "unicorn/no-array-reverse": "off", // like no-array-sort: mutating a freshly-created array is fine
        "unicorn/prefer-add-event-listener": "off", // the `el.on* = fn` + `= null` cleanup pattern is idiomatic here (e.g. new Image())
        "unicorn/consistent-function-scoping": "off", // too noisy; flags handlers/helpers defined inside components
        "eslint/require-await": "off", // async is often required by frameworks/interfaces (e.g. Next rewrites) without an await
        "oxc/no-async-endpoint-handlers": "off", // the MCP server intentionally uses async Express handlers
        "import/no-named-as-default": "off", // low-value; false-positives when a valid default also has a same-named named export

        "react/set-state-in-effect": "off",
        "react/immutability": "off",
        "react/refs": "off",
        "react/exhaustive-effect-dependencies": "off",
        "react/capitalized-calls": "off",
        "react/preserve-manual-memoization": "off",
        "react/memo-dependencies": "off",
        "react/hooks": "off",

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
        "eslint/no-throw-literal": "warn",
        // TODO(SGPD-9015): re-enable and untangle the ~39 pre-existing barrel re-export
        // cycles in packages/components (index.ts re-exports). Disabled for now — never
        // enforced under the old ESLint setup and fixing them is a separate refactor.
        "import/no-cycle": "off",
        "typescript/no-explicit-any": "warn",
        "unicorn/no-instanceof-builtins": "warn",
        "react/jsx-no-useless-fragment": "warn",
        "react/no-array-index-key": "warn",
        "unicorn/prefer-array-some": "warn",
        "eslint/object-shorthand": "warn",

        // Base no-restricted-imports (applies everywhere unless overridden below).
        "eslint/no-restricted-imports": [
            "error",
            {
                patterns: [barrelImports],
                paths: [reactDefaultImport]
            }
        ]
    },
    overrides: [
        {
            // Component source files must not deep-import sibling `src` files or the public barrel.
            files: ["packages/components/src/**/src/*"],
            rules: {
                "eslint/no-restricted-imports": [
                    "error",
                    {
                        patterns: [
                            {
                                group: ["../**/src/*"],
                                message:
                                    "Please import from the nearest index.ts file instead. ../../typography/Text/src/Text.tsx -> ../../typography/Text/index.ts"
                            },
                            barrelImports
                        ],
                        paths: [
                            reactDefaultImport,
                            {
                                name: "@hopper-ui/components",
                                message:
                                    'import { anything } from "@hopper-ui/components" inside /src needs to be avoided. It should only be used in docs and tests.'
                            }
                        ]
                    }
                ]
            }
        },
        {
            // Tests, Storybook stories, and in-repo component docs/examples are not shipped
            // code (this deliberately excludes apps/docs, the real Next.js app). Relax rules
            // that only make sense for library source, and allow importing the public barrel
            // (the whole point of a test/example).
            files: ["**/tests/**", "packages/**/docs/**", "**/*.stories.tsx", "**/*.stories.ts"],
            rules: {
                "react/jsx-key": "off",
                "react-hooks/rules-of-hooks": "off",
                "react/jsx-no-useless-fragment": "off", // intentional fragment fixtures in tests/demos
                "unicorn/no-new-array": "off", // demos/tests generate placeholder arrays
                "import/no-duplicates": "off",
                "typescript/consistent-type-imports": "off", // vi.importActual<typeof import("...")> is idiomatic in tests
                "eslint/no-restricted-imports": ["error", { paths: [reactDefaultImport] }]
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
            // skill-scripts are the CLI entry points bundled into the published agent Skill;
            // printing to stdout is their whole purpose, same as the build scripts.
            files: ["**/scripts/**", "**/skill-scripts/**"],
            rules: {
                "eslint/no-console": "off",
                "eslint/no-new": "off" // e.g. `new URL(x)` to validate a string in build scripts
            }
        },
        {
            // The nextjs plugin is enabled only for the docs app. Enabling a plugin in an
            // override does not auto-apply the global `categories`, so its rules must be
            // listed explicitly here (mirrors @next/eslint-plugin-next recommended + core-web-vitals).
            files: ["apps/docs/**"],
            plugins: [...basePlugins, "nextjs"],
            rules: {
                "nextjs/google-font-display": "warn",
                "nextjs/google-font-preconnect": "warn",
                "nextjs/inline-script-id": "warn",
                "nextjs/next-script-for-ga": "warn",
                "nextjs/no-assign-module-variable": "warn",
                "nextjs/no-async-client-component": "warn",
                "nextjs/no-before-interactive-script-outside-document": "warn",
                "nextjs/no-css-tags": "warn",
                "nextjs/no-document-import-in-page": "warn",
                "nextjs/no-duplicate-head": "warn",
                "nextjs/no-head-element": "warn",
                "nextjs/no-head-import-in-document": "warn",
                "nextjs/no-html-link-for-pages": "warn",
                "nextjs/no-img-element": "warn",
                "nextjs/no-page-custom-font": "warn",
                "nextjs/no-script-component-in-head": "warn",
                "nextjs/no-styled-jsx-in-document": "warn",
                "nextjs/no-sync-scripts": "warn",
                "nextjs/no-title-in-document-head": "warn",
                "nextjs/no-typos": "warn",
                "nextjs/no-unwanted-polyfillio": "warn"
            }
        }
    ],
    ignorePatterns: [
        "**/dist/**",
        "**/storybook-static/**",
        "**/.turbo/**",
        // Tooling / agent / CI metadata — managed elsewhere
        ".claude/**",
        ".agents/**",
        ".cursor/**",
        ".github/**",
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
        // Generated agent Skill, served at /.well-known/skills. Contains bundled scripts.
        "apps/docs/public/agent-skills/**",
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
