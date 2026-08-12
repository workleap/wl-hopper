# ESLint Configuration

## Overview

`@workleap/eslint-configs` provides ESLint 9+ flat config configurations by project type. Uses ESLint for stylistic rules (not Prettier).

**Target environment**: ESM, ESNext, Node

## Available Configurations

| Function | Use Case |
|----------|----------|
| `defineWebApplicationConfig` | React + TypeScript web applications |
| `defineReactLibraryConfig` | TypeScript libraries WITH React |
| `defineTypeScriptLibraryConfig` | TypeScript libraries WITHOUT React |
| `defineMonorepoWorkspaceConfig` | Monorepo workspace root |

## Installation

### Polyrepo

```bash
pnpm add -D @workleap/eslint-configs @eslint/js @typescript-eslint/parser @types/node eslint typescript-eslint
```

### Turborepo (Workspace Root)

```bash
pnpm add -D @workleap/eslint-configs @eslint/js @typescript-eslint/parser @types/node eslint typescript-eslint turbo
```

### Turborepo (Project)

```bash
pnpm add -D @workleap/eslint-configs @eslint/js @typescript-eslint/parser @types/node eslint typescript-eslint
```

## Configuration Examples

### Web Application

```ts
// eslint.config.ts
import { defineWebApplicationConfig } from "@workleap/eslint-configs";

export default defineWebApplicationConfig(import.meta.dirname);
```

### React Library

```ts
// eslint.config.ts
import { defineReactLibraryConfig } from "@workleap/eslint-configs";

export default defineReactLibraryConfig(import.meta.dirname);
```

With React Compiler:

```ts
export default defineReactLibraryConfig(import.meta.dirname, {
    react: { compiler: true }
});
```

### TypeScript Library (No React)

```ts
// eslint.config.ts
import { defineTypeScriptLibraryConfig } from "@workleap/eslint-configs";

export default defineTypeScriptLibraryConfig(import.meta.dirname);
```

### Monorepo Workspace Root

```ts
// eslint.config.ts
import { defineMonorepoWorkspaceConfig } from "@workleap/eslint-configs";

export default defineMonorepoWorkspaceConfig(import.meta.dirname);
```

## Customization

### Disable a Rule

```ts
export default defineWebApplicationConfig(import.meta.dirname, {
    core: { "no-var": "off" }
});
```

### Change Rule Severity

```ts
export default defineWebApplicationConfig(import.meta.dirname, {
    jsxAlly: { "jsx-a11y/alt-text": "error" }
});
```

### Change Rule Value

```ts
export default defineWebApplicationConfig(import.meta.dirname, {
    typescript: { "@stylistic/quote-props": "off" }
});
```

### Use Jest Instead of Vitest

```ts
export default defineWebApplicationConfig(import.meta.dirname, {
    testFramework: "jest"
});
```

### Add a Plugin

Prefer the plugin's `extends` option when the plugin supports it:

```ts
import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import { defineConfig } from "eslint/config";
import myPlugin from "eslint-plugin-myplugin";

export default defineConfig([
    {
        extends: [myPlugin],
        rules: { "myPlugin/rule": "warn" }
    },
    defineWebApplicationConfig(import.meta.dirname)
]);
```

Or register the plugin manually:

```ts
import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import { defineConfig } from "eslint/config";
import myPlugin from "eslint-plugin-myplugin";

export default defineConfig([
    {
        plugins: { myPlugin },
        rules: { "myPlugin/rule": "warn" }
    },
    defineWebApplicationConfig(import.meta.dirname)
]);
```

### Ignore Files

```ts
import { defineWebApplicationConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["packages", "samples", "docs"]),
    defineWebApplicationConfig(import.meta.dirname)
]);
```

Default ignored: `node_modules`, `dist`, `storybook-static`, `.git`, `.turbo`

## Rule Categories

| Category | Description |
|----------|-------------|
| `core` | ESLint recommended + eslint-plugin-import |
| `jest` | eslint-plugin-jest rules |
| `json` | eslint-plugin-jsonc rules |
| `jsxAlly` | eslint-plugin-jsx-a11y rules |
| `packageJson` | eslint-plugin-package-json rules |
| `react` | eslint-plugin-react + hooks + @stylistic JSX |
| `storybook` | eslint-plugin-storybook rules |
| `testingLibrary` | eslint-plugin-testing-library rules |
| `typescript` | typescript-eslint + @stylistic rules |
| `vitest` | @vitest/eslint-plugin rules |
| `yaml` | eslint-plugin-yaml rules |

## CLI Scripts

### Polyrepo

```json
{
    "lint:eslint": "eslint . --max-warnings=0 --cache --cache-location node_modules/.cache/eslint"
}
```

### Turborepo Workspace

```json
{
    "lint": "turbo run lint --continue",
    "eslint": "eslint . --max-warnings=0 --cache --cache-location node_modules/.cache/eslint"
}
```

### Turborepo Project

```json
{
    "eslint": "eslint . --max-warnings=0 --cache --cache-location node_modules/.cache/eslint"
}
```

## Turborepo Configuration

```json
// turbo.json
{
    "$schema": "https://turbo.build/schema.json",
    "ui": "tui",
    "tasks": {
        "lint": { "dependsOn": ["eslint"] },
        "//#eslint": { "outputs": ["node_modules/.cache/eslint"] },
        "eslint": { "outputs": ["node_modules/.cache/eslint"] }
    }
}
```

## VS Code Integration

Install `dbaeumer.vscode-eslint` extension.

```json
// .vscode/settings.json
{
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit",
        "source.sortImports": "explicit"
    },
    "editor.formatOnSave": true,
    "typescript.format.enable": false,
    "javascript.format.enable": false,
    "json.format.enable": false,
    "eslint.probe": ["javascript", "javascriptreact", "typescript", "typescriptreact", "json", "jsonc", "yaml"]
}
```

## EditorConfig (Recommended)

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 4

[*.md]
trim_trailing_whitespace = false
```

Install `EditorConfig.EditorConfig` VS Code extension.

## Troubleshooting

### "File not found by the project service"

The file is not included in `tsconfig.json`. Either:
1. Add the file pattern to the `include` field
2. Remove the `include` field entirely (TypeScript includes all files by default)
