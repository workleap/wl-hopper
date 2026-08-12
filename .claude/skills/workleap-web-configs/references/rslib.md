# Rslib Configuration

## Table of Contents

- [Overview](#overview)
- [Available Functions](#available-functions)
- [Installation](#installation)
- [Setup Requirements](#setup-requirements)
- [Build Configuration](#build-configuration)
- [Development Configuration](#development-configuration)
- [Storybook Configuration](#storybook-configuration)
- [Configuration Transformers](#configuration-transformers)
- [CLI Scripts](#cli-scripts)
- [Type Declarations](#type-declarations)
- [Bundleless vs Bundle](#bundleless-vs-bundle)
- [Turborepo Setup](#turborepo-setup)

## Overview

`@workleap/rslib-configs` provides Rslib configurations for library projects. Rslib is powered by Rsbuild and Rspack.

**Features**: JavaScript, TypeScript, CSS (modules + LightningCSS), React, SVG as components, declaration files (.d.ts), watch mode, source maps.

**Target environment**: ESM, ESNext

## Available Functions

| Function | Use Case |
|----------|----------|
| `defineDevConfig` | Watch mode for development |
| `defineBuildConfig` | Production build for publication |
| `defineStorybookConfig` | Storybook integration |

## Installation

```bash
pnpm add -D @workleap/rslib-configs @rslib/core
```

For Storybook, also add:

```bash
pnpm add -D storybook-react-rsbuild storybook-addon-rslib
```

## Setup Requirements

### tsconfig.build.json

Required for bundleless output (default). The `include` must point to source files:

```json
// tsconfig.build.json
{
    "extends": "@workleap/typescript-configs/library.json",
    "include": ["src"],
    "exclude": ["dist", "node_modules"]
}
```

### package.json (for publishing)

Include source files for debugging with source maps:

```json
{
    "files": ["src", "dist", "CHANGELOG.md", "README.md"]
}
```

## Build Configuration

### Basic Setup

```ts
// rslib.build.ts
import { defineBuildConfig } from "@workleap/rslib-configs";
import path from "node:path";

export default defineBuildConfig({
    tsconfigPath: path.resolve("./tsconfig.build.json")
});
```

**Note**: `tsconfigPath` is required when using bundleless output (the default). It tells Rslib which files to include based on the tsconfig's `include` field.

### Predefined Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | object | `{ index: "./src/**" }` (bundleless) or `{ index: ["./src/index.ts", "./src/index.js"] }` (bundle) | Entry points |
| `syntax` | string | `esnext` | Output syntax target |
| `bundle` | boolean | `false` | Single bundle vs bundleless |
| `tsconfigPath` | string | undefined | Path to tsconfig (required for bundleless) |
| `dts` | object/false | `true` | Generate .d.ts files |
| `target` | string | `web` | Output target |
| `distPath` | string | `dist` | Output directory |
| `plugins` | array | `[]` | Rsbuild plugins |
| `sourceMap` | false/object | `{ js: "source-map", css: true }` | Source maps |
| `react` | true/function | disabled | React transformation |
| `svgr` | true/function | disabled | SVG as React components |

### Examples

React library:

```ts
import { defineBuildConfig } from "@workleap/rslib-configs";
import path from "node:path";

export default defineBuildConfig({
    tsconfigPath: path.resolve("./tsconfig.build.json"),
    react: true,
    svgr: true
});
```

Bundled output:

```ts
export default defineBuildConfig({
    bundle: true,
    react: true
});
```

Node target:

```ts
export default defineBuildConfig({
    target: "node",
    tsconfigPath: path.resolve("./tsconfig.build.json")
});
```

Custom syntax:

```ts
export default defineBuildConfig({
    syntax: "es2024",
    tsconfigPath: path.resolve("./tsconfig.build.json")
});
```

Disable declaration files:

```ts
export default defineBuildConfig({
    dts: false,
    tsconfigPath: path.resolve("./tsconfig.build.json")
});
```

## Development Configuration

### Basic Setup

```ts
// rslib.dev.ts
import { defineDevConfig } from "@workleap/rslib-configs";
import path from "node:path";

export default defineDevConfig({
    tsconfigPath: path.resolve("./tsconfig.build.json")
});
```

**Note**: `tsconfigPath` is required when using bundleless output (the default).

### Predefined Options

Same as build config, except:

| Option | Default Difference |
|--------|-------------------|
| `dts` | `false` (disabled in dev) |
| `sourceMap` | `{ js: "cheap-module-source-map", css: true }` |

### Example

```ts
import { defineDevConfig } from "@workleap/rslib-configs";
import path from "node:path";

export default defineDevConfig({
    tsconfigPath: path.resolve("./tsconfig.build.json"),
    react: true
});
```

## Storybook Configuration

### Setup

```ts
// .storybook/rslib.config.ts
import { defineStorybookConfig } from "@workleap/rslib-configs";

export default defineStorybookConfig();
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from "storybook-react-rsbuild";

const storybookConfig: StorybookConfig = {
    framework: "storybook-react-rsbuild",
    addons: ["storybook-addon-rslib"],
    stories: ["../../src/**/*.stories.(tsx|mdx)"]
};

export default storybookConfig;
```

### Predefined Options

| Option | Type | Default |
|--------|------|---------|
| `plugins` | array | `[]` |
| `sourceMap` | false/object | `{ js: "cheap-module-source-map", css: true }` |
| `react` | false/function | enabled |
| `svgr` | false/function | enabled |

## Configuration Transformers

```ts
import { defineBuildConfig, type RslibConfigTransformer } from "@workleap/rslib-configs";
import type { RslibConfig } from "@rslib/core";

const customTransformer: RslibConfigTransformer = (config: RslibConfig, context) => {
    if (context.environment === "build") {
        // modify config
    }
    return config;
};

export default defineBuildConfig({
    transformers: [customTransformer]
});
```

Context: `environment` ("dev" | "build" | "storybook")

## CLI Scripts

### Development (Watch Mode)

```json
{ "dev": "rslib build -w -c ./rslib.dev.ts" }
```

### Build

```json
{ "build": "rslib build -c rslib.build.ts" }
```

### Storybook

```json
{
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
}
```

## Type Declarations

### SVG Files

```ts
// src/env.d.ts
declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
```

### CSS Modules

```ts
// src/env.d.ts
/// <reference types="@rsbuild/core/types" />
```

Note: Reference `@rsbuild/core`, not `@rslib/core`.

## Bundleless vs Bundle

**Bundleless (default, recommended)**: Outputs individual files matching source structure. Better for tree-shaking by consuming bundlers.

**Bundle**: Outputs a single file. Bundlers must tree-shake within the file, which is less predictable.

```ts
// Bundleless (default)
export default defineBuildConfig({
    bundle: false, // default
    tsconfigPath: path.resolve("./tsconfig.build.json")
});

// Bundle
export default defineBuildConfig({
    bundle: true
});
```

## Turborepo Setup

### turbo.json

```json
{
    "$schema": "https://turbo.build/schema.json",
    "ui": "tui",
    "tasks": {
        "dev": {
            "dependsOn": ["^build"],
            "cache": false,
            "persistent": true
        },
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**", "storybook-static/**"]
        }
    }
}
```

### Workspace Scripts

```json
{
    "dev-lib": "turbo run dev --filter=./packages/lib",
    "build-lib": "turbo run build --filter=./packages/lib"
}
```

## Version Requirements (v2.0)

`@workleap/rslib-configs` v2.0 tracks Rslib `0.21+` (Rsbuild 2.0 / Rspack 2.0). No public API of `defineBuildConfig`, `defineDevConfig`, or `defineStorybookConfig` changed in this release — most changes are upstream.

- **Node.js `20.19+` or `22.12+`** required (Node.js 18 is no longer supported).
- Upgrade command: `pnpm add -D @workleap/rslib-configs @rslib/core@^0.21.0`
- `@rsbuild/core` is now pure ESM — import it from ESM files.
- `experiments.advancedEsm` is now the default (the option is ignored); remove it if previously set via a transformer.
- Type rename: `StartServerResult` → `StartDevServerResult` in `@rslib/core`.
