# TypeScript Configuration

## Overview

`@workleap/typescript-configs` provides TypeScript configurations by project type. Focuses on **linting only**; bundlers handle transpilation.

**Target environment**: ESM, ESNext

## Available Configurations

| Config | Use Case |
|--------|----------|
| `web-application.json` | React web applications |
| `library.json` | Libraries (with or without React) |
| `monorepo-workspace.json` | Monorepo workspace root |

### Advanced Composition Pieces

| Config | Description |
|--------|-------------|
| `core.json` | Basic rules shared by all configs |
| `react.json` | React-specific rules |

## Installation

### Polyrepo

```bash
pnpm add -D @workleap/typescript-configs typescript
```

### Turborepo (Workspace + Projects)

```bash
pnpm add -D @workleap/typescript-configs typescript turbo
```

## Configuration Examples

### Web Application

```json
// tsconfig.json
{
    "extends": ["@workleap/typescript-configs/web-application.json"],
    "exclude": ["dist", "node_modules"]
}
```

With Storybook:

```json
{
    "extends": ["@workleap/typescript-configs/web-application.json"],
    "include": ["**/*", ".storybook/*"],
    "exclude": ["dist", "node_modules"]
}
```

### Library

```json
// tsconfig.json
{
    "extends": ["@workleap/typescript-configs/library.json"],
    "exclude": ["dist", "node_modules"]
}
```

With Storybook:

```json
{
    "extends": ["@workleap/typescript-configs/library.json"],
    "include": ["**/*", ".storybook/*"],
    "exclude": ["dist", "node_modules", ".storybook/storybook-static"]
}
```

### Monorepo Workspace Root

```json
// tsconfig.json
{
    "extends": "@workleap/typescript-configs/monorepo-workspace.json",
    "exclude": ["packages", "node_modules"]
}
```

With Storybook:

```json
{
    "extends": "@workleap/typescript-configs/monorepo-workspace.json",
    "include": ["**/*", ".storybook/*"],
    "exclude": ["packages", "node_modules", ".storybook/storybook-static"]
}
```

## Customization

### Override a Compiler Option

```json
{
    "extends": ["@workleap/typescript-configs/web-application.json"],
    "compilerOptions": {
        "strict": false
    },
    "exclude": ["dist", "node_modules"]
}
```

### Non-ESM Projects (Migration)

To allow imports without file extensions during migration:

```json
{
    "extends": ["@workleap/typescript-configs/web-application.json"],
    "compilerOptions": {
        "moduleResolution": "Bundler",
        "module": "ESNext"
    },
    "exclude": ["dist", "node_modules"]
}
```

### Monorepo Path Mappings

For projects referencing other workspace packages without JIT packages:

```json
// packages/pkg-1/tsconfig.json
{
    "extends": "@workleap/typescript-configs/web-application.json",
    "compilerOptions": {
        "paths": {
            "@sample/components": ["../components/index.ts"],
            "@sample/utils": ["../utils/index.ts"]
        }
    },
    "exclude": ["dist", "node_modules"]
}
```

### Advanced: Custom Composition

For React projects needing custom setup:

```json
{
    "extends": "@workleap/typescript-configs/react",
    "compilerOptions": { /* custom options */ },
    "exclude": ["dist", "node_modules"]
}
```

For non-React projects:

```json
{
    "extends": "@workleap/typescript-configs/core",
    "compilerOptions": { /* custom options */ },
    "exclude": ["dist", "node_modules"]
}
```

## CLI Scripts

### Polyrepo

```json
{
    "lint:types": "tsc"
}
```

### Turborepo Workspace

```json
{
    "lint": "turbo run lint --continue",
    "typecheck": "tsgo"
}
```

### Turborepo Project

```json
{
    "typecheck": "tsgo"
}
```

## Turborepo Configuration

```json
// turbo.json
{
    "$schema": "https://turbo.build/schema.json",
    "ui": "tui",
    "tasks": {
        "lint": { "dependsOn": ["typecheck"] },
        "//#typecheck": { "outputs": ["node_modules/.cache/tsbuildinfo.json"] },
        "typecheck": { "outputs": ["node_modules/.cache/tsbuildinfo.json"] }
    }
}
```

## Migrate to tsgo

[TypeScript Go](https://github.com/microsoft/typescript-go) (`tsgo`) is a Go reimplementation of the compiler, meant as a drop-in replacement for `tsc` at the CLI level with much faster type-checking. It is mature enough for **type-checking** and the **VS Code** language service, but **not ready for ESLint** yet.

### 1. Exclude packages from minimum release age (PNPM)

`@typescript/native-preview` is released nightly, so it never meets a `minimumReleaseAge` threshold. Add it to the exclusion list.

Monorepo — `pnpm-workspace.yaml`:

```yaml
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - '@workleap*'
  - '@typescript/native-preview*'
```

Polyrepo — `.npmrc`:

```ini
minimum-release-age=1440
minimum-release-age-exclude=@workleap*,@typescript/native-preview*
```

The `*` suffix is required because the package installs a platform-specific binary dependency at install time.

### 2. Install the package

Add `@typescript/native-preview` as a dev dependency in **every** `package.json` that already includes `typescript`:

```bash
pnpm add -D @typescript/native-preview
```

### 3. Update typecheck scripts

Replace `tsc` with `tsgo`:

```json
{
    "typecheck": "tsgo"
}
```

### 4. VS Code

```json
// .vscode/settings.json
{
    // Comment out the existing library path until @typescript/native-preview is merged into typescript.
    // "typescript.tsdk": "node_modules\\typescript\\lib",
    "typescript.experimental.useTsgo": true,
    "typescript.tsdk": "node_modules\\@typescript\\native-preview\\lib"
}
```

If CI fails with `Unable to resolve ... platform`, temporarily disable the PNPM `minimumReleaseAge` feature.
