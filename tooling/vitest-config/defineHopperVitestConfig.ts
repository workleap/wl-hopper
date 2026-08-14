import type { PluginOption } from "vite";
import { defineConfig } from "vitest/config";

export interface HopperVitestOptions {
    /** true → jsdom + CSS-module class handling; false → node env */
    react?: boolean;
    setupFiles?: string[];
    plugins?: PluginOption[];
}

/**
 * Shared Vitest config factory for the Hopper packages. Replaces the per-package
 * Jest + `@swc/jest` setup: esbuild transforms TS/TSX out of the box, jsdom
 * provides the DOM, and `globals: true` keeps the existing bare
 * `describe/it/expect` calls working.
 *
 * jsdom (not happy-dom) is used deliberately, for parity with the previous Jest
 * runs: (1) `getComputedStyle` returns the literal `var(--hop-*)` value that
 * `toHaveStyle` assertions rely on (happy-dom returns empty for unresolved custom
 * properties); (2) jsdom has no `matchMedia`, so the styled-system feature-detect
 * guards keep returning false as they did under Jest.
 *
 * The `include` glob matches both test layouts: `components` keeps its tests under
 * `src/**`, while icons/styled-system/svg-icons/tokens keep them at the package
 * root under `tests/`.
 */
export function defineHopperVitestConfig({ react = false, setupFiles = [], plugins = [] }: HopperVitestOptions = {}) {
    return defineConfig({
        plugins,
        // `conditions: ["hopper-source"]` resolves internal `@hopper-ui/*` packages (including the
        // `tooling/*` packages) to their TS source via the `hopper-source` export condition on the
        // libs and the plain source `exports` on the tooling packages (no dist build needed). The
        // name is namespaced on purpose: a generic `source` condition would also redirect
        // third-party deps (e.g. `@internationalized/*`) to their untyped source.
        resolve: { conditions: ["hopper-source"] },
        cacheDir: "./node_modules/.cache/vitest",
        test: {
            globals: true,
            clearMocks: true,
            environment: react ? "jsdom" : "node",
            setupFiles,
            include: ["**/tests/vitest/**/*.test.{ts,tsx}"],
            exclude: ["**/node_modules/**", "**/dist/**"],
            reporters: "verbose",
            ...(react && { css: { modules: { classNameStrategy: "non-scoped" as const } } })
        }
    });
}
