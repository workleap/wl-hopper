import { defineConfig } from "vitest/config";

// mcp-server has its own Vitest config (not the shared Hopper factory): its tests
// live directly under `src/**/tests/` (no `vitest` subfolder), and it relies on the
// tsconfig `paths` alias `@docs/ai` → `src/tests/mocks/aiFiles.ts`, resolved here by
// Vite 8's native tsconfig-paths support (the same mapping Jest did via `moduleNameMapper`).
export default defineConfig({
    // Vite 8 resolves tsconfig `paths` natively (replaces vite-tsconfig-paths).
    resolve: { tsconfigPaths: true },
    cacheDir: "./node_modules/.cache/vitest",
    test: {
        globals: true,
        clearMocks: true,
        environment: "jsdom",
        setupFiles: ["./setupTests.ts"],
        include: ["src/**/tests/**/*.test.ts"],
        exclude: ["**/node_modules/**", "**/dist/**"],
        reporters: "verbose"
    }
});
