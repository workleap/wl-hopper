import type { PluginOption } from "vite";
import { defineConfig } from "vitest/config";

export interface HopperVitestOptions {
    /** true → jsdom + CSS-module class handling; false → node env */
    react?: boolean;
    setupFiles?: string[];
    plugins?: PluginOption[];
}

/** Shared Vitest config factory for the Hopper packages. */
export function defineHopperVitestConfig({ react = false, setupFiles = [], plugins = [] }: HopperVitestOptions = {}) {
    return defineConfig({
        plugins,
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
