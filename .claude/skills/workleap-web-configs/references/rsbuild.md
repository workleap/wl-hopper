# Rsbuild Configuration

## Table of Contents

- [Overview](#overview)
- [Available Functions](#available-functions)
- [Installation](#installation)
- [Setup Requirements](#setup-requirements)
- [Development Configuration](#development-configuration)
- [Build Configuration](#build-configuration)
- [Storybook Configuration](#storybook-configuration)
- [Configuration Transformers](#configuration-transformers)
- [CLI Scripts](#cli-scripts)
- [Type Declarations](#type-declarations)
- [SVG Import](#svg-import)
- [Turborepo Setup](#turborepo-setup)

## Overview

`@workleap/rsbuild-configs` provides Rsbuild configurations for web applications. Rsbuild is a high-performance bundler powered by Rspack (Rust-based webpack port).

**Features**: JavaScript, TypeScript, CSS (modules + LightningCSS), React, SVG as components, PNG/JPEG/GIF, HMR/Fast Refresh, source maps, minification.

**Target environment**: As per Browserslist configuration.

## Available Functions

| Function | Use Case |
|----------|----------|
| `defineDevConfig` | Development server |
| `defineBuildConfig` | Production build |
| `defineStorybookConfig` | Storybook integration |

## Installation

```bash
pnpm add -D @workleap/rsbuild-configs @workleap/browserslist-config @rsbuild/core @rspack/core browserslist
```

For Storybook, also add:

```bash
pnpm add -D storybook-react-rsbuild
```

## Setup Requirements

### 1. HTML Template

Create `public/index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <link href="<%=assetPrefix%>/favicon.png" rel="icon">
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### 2. Browserslist

Create `.browserslistrc`:

```text
extends @workleap/browserslist-config
```

## Development Configuration

### Basic Setup

```ts
// rsbuild.dev.ts
import { defineDevConfig } from "@workleap/rsbuild-configs";

export default defineDevConfig();
```

### Predefined Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | object | `{ index: "./src/index.tsx" }` | Entry points |
| `https` | boolean/object | `false` | Enable HTTPS |
| `host` | string | `localhost` | Dev server host |
| `port` | number | `8080` | Dev server port |
| `assetPrefix` | string | `/` | Asset URL prefix |
| `plugins` | array | `[]` | Rsbuild plugins |
| `html` | false/function | default template | HTML template config |
| `lazyCompilation` | boolean | `false` | Enable lazy compilation |
| `hmr` | boolean | `true` | Enable HMR |
| `fastRefresh` | boolean | `true` | Enable Fast Refresh |
| `sourceMap` | false/object | `{ js: "cheap-module-source-map", css: true }` | Source maps |
| `overlay` | false | undefined | Error overlay |
| `writeToDisk` | true | undefined | Write output to disk |
| `setup` | function/array | undefined | `server.setup` hook for custom middleware |
| `react` | false/function | enabled | React transformation |
| `svgr` | false/function | enabled | SVG as React components |
| `verbose` | boolean | `false` | Verbose logging |
| `environmentVariables` | object | `{}` | App environment variables |

### Examples

HTTPS with custom port:

```ts
export default defineDevConfig({
    https: true,
    port: 3000
});
```

Custom entry:

```ts
export default defineDevConfig({
    entry: { index: "./src/main.tsx" }
});
```

Environment variables:

```ts
export default defineDevConfig({
    environmentVariables: {
        "DEBUG": process.env.DEBUG === "true"
    }
});
```

Disable React transformation:

```ts
export default defineDevConfig({
    react: false
});
```

Custom dev-server middleware via `setup`:

```ts
export default defineDevConfig({
    setup: ({ server, action }) => {
        if (action === "dev") {
            server.middlewares.use((req, res, next) => {
                next();
            });
        }
    }
});
```

## Build Configuration

### Basic Setup

```ts
// rsbuild.build.ts
import { defineBuildConfig } from "@workleap/rsbuild-configs";

export default defineBuildConfig();
```

### Predefined Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | object | `{ index: "./src/index.tsx" }` | Entry points |
| `distPath` | string | `dist` | Output directory |
| `assetPrefix` | string | `/` | Asset URL prefix |
| `plugins` | array | `[]` | Rsbuild plugins |
| `html` | false/function | default template | HTML template config |
| `minify` | false/object | `true` | Code minification |
| `optimize` | boolean/"readable" | `true` | Production optimization |
| `sourceMap` | false/object | `{ js: "source-map", css: true }` | Source maps |
| `polyfill` | "entry"/"usage"/"off" | `"usage"` | `output.polyfill` mode (core-js polyfills) |
| `splitChunks` | object/false | `{ preset: "per-package", chunks: "all" }` | `splitChunks` strategy |
| `react` | false/function | enabled | React transformation |
| `svgr` | false/function | enabled | SVG as React components |
| `compressImage` | false/function | enabled | Image compression |
| `verbose` | boolean | `false` | Verbose logging |
| `environmentVariables` | object | `{}` | App environment variables |

### Examples

Custom output path:

```ts
import path from "node:path";

export default defineBuildConfig({
    distPath: path.resolve("./build")
});
```

Disable minification (debugging):

```ts
export default defineBuildConfig({
    minify: false
});
```

Readable output (debugging):

```ts
export default defineBuildConfig({
    optimize: "readable"
});
```

Disable polyfills:

```ts
export default defineBuildConfig({
    polyfill: "off"
});
```

Opt out of code splitting (restores v1 behavior):

```ts
export default defineBuildConfig({
    splitChunks: false
});
```

Customize the split-chunks strategy:

```ts
export default defineBuildConfig({
    splitChunks: {
        preset: "single-vendor",
        chunks: "all"
    }
});
```

## Storybook Configuration

### Setup

```ts
// .storybook/rsbuild.config.ts
import { defineStorybookConfig } from "@workleap/rsbuild-configs";

export default defineStorybookConfig();
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from "storybook-react-rsbuild";

const storybookConfig: StorybookConfig = {
    framework: "storybook-react-rsbuild",
    stories: ["../../src/**/*.stories.(tsx|mdx)"]
};

export default storybookConfig;
```

### Predefined Options

| Option | Type | Default |
|--------|------|---------|
| `plugins` | array | `[]` |
| `lazyCompilation` | boolean | `true` |
| `sourceMap` | false/object | `{ js: "cheap-module-source-map", css: true }` |
| `react` | false/function | enabled |
| `svgr` | false/function | enabled |
| `verbose` | boolean | `false` |
| `environmentVariables` | object | `{}` |

## Configuration Transformers

For full control, use transformers:

```ts
import { defineDevConfig, type RsbuildConfigTransformer } from "@workleap/rsbuild-configs";
import type { RsbuildConfig } from "@rsbuild/core";

const customTransformer: RsbuildConfigTransformer = (config: RsbuildConfig, context) => {
    if (context.environment === "dev") {
        config.tools = config.tools ?? {};
        // modify config
    }
    return config;
};

export default defineDevConfig({
    transformers: [customTransformer]
});
```

Context properties: `environment` ("dev" | "build" | "storybook"), `verbose` (boolean)

## CLI Scripts

### Development

```json
{ "dev": "rsbuild dev --config ./rsbuild.dev.ts" }
```

### Build

```json
{ "build": "rsbuild build --config rsbuild.build.ts" }
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

Create `src/env.d.ts`:

```ts
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

For monorepos, include env.d.ts from dependencies:

```json
// tsconfig.json
{
    "include": [".", "../**/src/env.d.ts"]
}
```

## SVG Import

```tsx
import { ReactComponent as Logo } from "./logo.svg";

export const App = () => <Logo />;
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
    "dev-app": "turbo run dev --filter=./apps/app",
    "build-app": "turbo run build --filter=./apps/app"
}
```

## Deployment (SPA Redirect)

No specific deployment setup is recommended, but SPAs must serve `index.html` for direct URL access (refresh / deep links) instead of returning a 404. Add a `_redirects` file to the `public` folder — Rspack copies it into `dist` at build time:

```text
# public/_redirects
/* /index.html 200
```

## Version Requirements (v2.0)

`@workleap/rsbuild-configs` v4.0 upgrades to Rsbuild 2.0 / Rspack 2.0.

- **Node.js `20.19+` or `22.12+`** required (Node.js 18 is no longer supported).
- Upgrade command: `pnpm add -D @workleap/rsbuild-configs@^4.0.0 @rsbuild/core@^2.0.0 @rspack/core@^2.0.0`
- `core-js` is now a **direct dependency** of `@workleap/rsbuild-configs`; you can `pnpm remove core-js` from the app. The `polyfill` option defaults to `"usage"`.
- `@rsbuild/core` is now pure ESM — import it from ESM files.
- Module Federation users must explicitly `pnpm add -D @module-federation/runtime-tools` (no longer transitive via `@rsbuild/core`).
