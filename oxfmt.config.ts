import { defineConfig } from "oxfmt";

export default defineConfig({
    printWidth: 120,
    tabWidth: 4,
    trailingComma: "none",
    arrowParens: "avoid",
    sortPackageJson: {
        sortScripts: false
    },
    overrides: [{ files: ["**/*.md"], options: { tabWidth: 2 } }],
    ignorePatterns: [
        "**/dist/**",
        "**/storybook-static/**",
        "**/.turbo/**",
        "pnpm-lock.yaml",
        // Generated files that must not be reformatted
        "**/CHANGELOG.md",
        "packages/tokens/**/datas/**",
        "packages/styled-system/src/theme/generated/**",
        "packages/styled-system/src/tokens/generated/**",
        "packages/icons/src/generated-icon-components/**",
        "packages/icons/src/generated-rich-icon-components/**",
        "apps/docs/.next/**",
        "apps/docs/.contentlayer/**",
        "apps/docs/out/**",
        "apps/docs/build/**",
        "apps/docs/next-env.d.ts",
        "apps/docs/public/ai-docs/**",
        "apps/docs/datas/**",
        "apps/mcp-server/**/mocks/**",
        "apps/mcp-server/reports/**",
        "apps/mcp-server/.netlify/**",
        "apps/mcp-server/src/.docs/**"
    ]
});
