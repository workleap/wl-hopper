# Migrating `packages/*` from Jest to Vitest

> **Status:** Proposed (not yet validated by a prototype run).
> **Scope:** the five published workspaces under `packages/*` — `components`, `icons`, `styled-system`, `svg-icons`, `tokens` — plus shared `tooling/`. The Next.js site and everything under `apps/` are **out of scope**.

## TL;DR

- Replace **Jest 29 + `@swc/jest`** with **Vitest**. Vitest's built-in **esbuild** transform makes **SWC unnecessary** — `@swc/jest`, the five `swc.jest.ts` files, and `@workleap/swc-configs` (for tests) all go away.
- No React plugin is needed: `@workleap/typescript-configs` sets `jsx: "react-jsx"` (automatic runtime), which esbuild handles natively.
- Switch the DOM engine **jsdom → happy-dom** (already anticipated by a TODO in `setupTests.ts`). This removes the `TextEncoder`/`TextDecoder` polyfill and the `jest-fetch-mock` hack.
- Low code churn: `describe/it/expect` stay working via `globals: true`; only `jest.*` → `vi.*` in **13 files** needs editing.
- Two custom Jest pieces are re-implemented: the **intl JSON compiler** (Jest `resolver` → Vite plugin) and **CSS class mapping** (`identity-obj-proxy` → Vitest's native CSS-modules handling).

This matches Workleap's own recommendation in [`wl-web-configs` › Vitest](https://workleap.github.io/wl-web-configs/vitest/setup-turborepo/), which uses a plain `defineConfig` from `vitest/config` with **no** `@workleap/vitest-configs` wrapper and **no** SWC.

---

## Table of contents

1. [Why Vitest](#1-why-vitest)
2. [Current state](#2-current-state-jest)
3. [Target state](#3-target-state-vitest)
4. [Jest → Vitest mapping](#4-jest--vitest-mapping)
5. [Custom pieces to re-implement](#5-custom-pieces-to-re-implement)
6. [Configuration](#6-configuration)
7. [Dependency changes](#7-dependency-changes)
8. [Code changes](#8-code-changes)
9. [Risks & validation](#9-risks--validation)
10. [Effort estimate](#10-effort-estimate)
11. [Runbook](#11-runbook)

---

## 1. Why Vitest

- **Drops the SWC toolchain.** Today each package needs `@swc/jest`, `@swc/core`, `@swc/helpers`, and `@workleap/swc-configs` purely to transform TS/TSX for Jest. Vitest transforms with esbuild out of the box — fewer moving parts and fewer dependencies to keep in sync.
- **One tool, ESM-native.** Removes the `--experimental-vm-modules` flag and the `jest-environment-jsdom@30` / `jest@29` version skew currently in the tree.
- **Aligned with Workleap tooling.** `wl-web-configs` documents Vitest as the recommended runner; the build already uses Vite-adjacent (esbuild) tooling via tsup.
- **Faster feedback** on watch/HMR, and a single config surface (`vitest.config.ts`) instead of `jest.config.ts` + `swc.jest.ts` per package.

## 2. Current state (Jest)

- **Orchestration:** Turborepo `test` task; root script
  `cross-env NODE_OPTIONS=--experimental-vm-modules turbo run test --continue`. Each package's script is just `jest`.
- **Config:** a root [jest.config.ts](jest.config.ts) using `projects: ["<rootDir>/packages/*"]`, plus one `jest.config.ts` per package. Two shapes:
  - **jsdom + React** — `components`, `icons`, `styled-system`: `testEnvironment: "jsdom"`, `@swc/jest` transform, CSS → `identity-obj-proxy`, tsconfig `paths` via `ts-jest`'s `pathsToModuleNameMapper`, `setupFilesAfterEach: ["setupTests.ts"]`. `components` also sets a custom `resolver`.
  - **node** — `svg-icons`, `tokens`: `testEnvironment: "node"`, `@swc/jest` transform, no setup file, no mappers.
- **Transform:** `@swc/jest` configured by each package's `swc.jest.ts` → `defineJestConfig({ react: true|false })` from `@workleap/swc-configs`.
- **Tests:** 158 files, all `*.test.ts` / `*.test.tsx`, nested under `src/**/tests/jest/`. Many paired `*.ssr.test.tsx` SSR variants. No `.snap` files, no coverage configured.
- **Shared test utils:** `@hopper-ui/test-utils` ([tooling/test-utils](tooling/test-utils)) provides a themed `render`/`renderHook` wrapping `<HopperProvider>` — framework-agnostic, no changes needed.

## 3. Target state (Vitest)

- Vitest per package via a thin `vitest.config.ts`, backed by a small shared factory in `tooling/` so the happy-dom/globals/CSS boilerplate isn't copy-pasted five times.
- esbuild transform (no SWC). `globals: true` so existing tests keep using bare `describe/it/expect`.
- **happy-dom** for the React packages; **node** for `svg-icons`/`tokens`.
- Tests move from `src/**/tests/jest/` → `src/**/tests/vitest/`.

## 4. Jest → Vitest mapping

| Jest today | Vitest replacement |
|---|---|
| `@swc/jest` transform + `swc.jest.ts` | esbuild (built-in) — **delete both** |
| `testEnvironment: "jsdom"` / `"node"` | `test.environment: "happy-dom"` / `"node"` |
| `setupFilesAfterEach: ["setupTests.ts"]` | `test.setupFiles: ["./setupTests.ts"]` |
| `moduleNameMapper: { "\\.css$": "identity-obj-proxy" }` | `test.css.modules.classNameStrategy: "non-scoped"` — drop `identity-obj-proxy` |
| `pathsToModuleNameMapper` (`ts-jest`) | `vite-tsconfig-paths` plugin — drop `ts-jest` |
| custom `resolver` → [jestResolver.cjs](tooling/intl-jest-resolver/jestResolver.cjs) | small **Vite plugin** (see §5) |
| `clearMocks: true` | `test.clearMocks: true` |
| `verbose: true` | `test.reporters: "verbose"` |
| `jest.*` (38 uses / 13 files) | `vi.*` (global with `globals: true`) |
| `@testing-library/jest-dom/jest-globals` | `@testing-library/jest-dom/vitest` |
| `NODE_OPTIONS=--experimental-vm-modules` | not needed |
| turbo `outputs: ["node_modules/.cache/jest"]` | `["node_modules/.cache/vitest/**"]` |

## 5. Custom pieces to re-implement

### 5.1 intl JSON compiler (Vite plugin)

`components` imports `intl*.json` message files that must be compiled with `@internationalized/string-compiler`. Today this happens twice: a Jest `resolver` ([jestResolver.cjs](tooling/intl-jest-resolver/jestResolver.cjs)) for tests, and a tsup esbuild plugin ([createIntlEsbuildPlugin.ts](tooling/tsup-intl-plugin/createIntlEsbuildPlugin.ts)) for the build. Vitest has no `resolver` hook, so re-implement it as a Vite plugin (new `tooling/vite-intl-plugin/`, mirroring `@hopper-ui/tsup-intl-plugin`):

```ts
// tooling/vite-intl-plugin/createIntlVitePlugin.ts
import { compileStrings } from "@internationalized/string-compiler";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

const INTL_RE = /intl.*\.json$/;
// A `\0` prefix marks the module as virtual (Vite skips fs/other resolvers);
// the ".js" suffix stops Vite's built-in JSON plugin from re-parsing our
// compiled JS output as JSON.
const PREFIX = "\0intl:";
const SUFFIX = ".js";

export function createIntlVitePlugin(): Plugin {
    return {
        name: "hopper-vite-intl",
        enforce: "pre",
        async resolveId(source, importer) {
            if (INTL_RE.test(source)) {
                const resolved = await this.resolve(source, importer, { skipSelf: true });
                if (resolved) {
                    return PREFIX + resolved.id + SUFFIX;
                }
            }

            return null;
        },
        load(id) {
            if (id.startsWith(PREFIX)) {
                const file = id.slice(PREFIX.length, -SUFFIX.length);

                return compileStrings(JSON.parse(readFileSync(file, "utf8")));
            }

            return null;
        }
    };
}
```

No caching is needed (Vite caches transforms), so this is simpler than the Jest resolver. Wire it into `components`' config only. The tsup build plugin is untouched. Once validated, delete `tooling/intl-jest-resolver/`.

> **Validate this first** on `components` — it's the least mechanical part. If a test imports an `intl*.json` and errors with a JSON parse failure, the built-in `vite:json` plugin is racing this one; the `\0…​.js` virtual id above is what prevents that.

### 5.2 CSS

Jest mapped every `.css` import to `identity-obj-proxy` (accessing `styles.foo` returns `"foo"`). Vitest reproduces this natively for CSS Modules with `test.css.modules.classNameStrategy: "non-scoped"` (returns the literal class name); plain `.css` is ignored by default. Drop `identity-obj-proxy`.

### 5.3 tsconfig paths

`vite-tsconfig-paths` reads each package's `tsconfig.json` `paths` (replacing `pathsToModuleNameMapper`). Required for the three React packages; harmless for the node ones.

## 6. Configuration

### 6.1 Shared factory — `tooling/vitest-config/`

```ts
// tooling/vitest-config/defineHopperVitestConfig.ts
import type { PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type UserConfig } from "vitest/config";

export interface HopperVitestOptions {
    /** true → happy-dom + CSS-module handling; false → node env */
    react?: boolean;
    setupFiles?: string[];
    plugins?: PluginOption[];
}

export function defineHopperVitestConfig({
    react = false,
    setupFiles = [],
    plugins = []
}: HopperVitestOptions = {}): UserConfig {
    return defineConfig({
        plugins: [tsconfigPaths(), ...plugins],
        cacheDir: "./node_modules/.cache/vitest",
        test: {
            globals: true,
            clearMocks: true,
            environment: react ? "happy-dom" : "node",
            setupFiles,
            include: ["src/**/tests/vitest/**/*.test.{ts,tsx}"],
            exclude: ["**/node_modules/**", "**/dist/**"],
            reporters: "verbose",
            ...(react && { css: { modules: { classNameStrategy: "non-scoped" } } })
        }
    });
}
```

### 6.2 Per-package `vitest.config.ts`

```ts
// packages/components/vitest.config.ts
import { defineHopperVitestConfig } from "@hopper-ui/vitest-config";
import { createIntlVitePlugin } from "@hopper-ui/vite-intl-plugin";

export default defineHopperVitestConfig({
    react: true,
    setupFiles: ["./setupTests.ts"],
    plugins: [createIntlVitePlugin()]
});
```

```ts
// packages/icons/vitest.config.ts  &  packages/styled-system/vitest.config.ts
import { defineHopperVitestConfig } from "@hopper-ui/vitest-config";

export default defineHopperVitestConfig({
    react: true,
    setupFiles: ["./setupTests.ts"]
});
```

```ts
// packages/svg-icons/vitest.config.ts  &  packages/tokens/vitest.config.ts
import { defineHopperVitestConfig } from "@hopper-ui/vitest-config";

export default defineHopperVitestConfig();
```

### 6.3 Turbo + scripts

`turbo.json`:

```json
"test": {
    "outputs": ["node_modules/.cache/vitest/**"]
}
```

Root `package.json` (drop `cross-env` + flag):

```json
"test": "turbo run test --continue"
```

Each package `package.json`:

```json
"test": "vitest run"
```

### 6.4 TypeScript globals

Remove `@types/jest`. To keep `describe/it/expect/vi` typed in test files, add a reference file (the `components` tsconfig already includes `../../types/*`):

```ts
// types/vitest.d.ts
/// <reference types="vitest/globals" />
```

`@testing-library/jest-dom/vitest` (imported in the setup files) augments `expect`'s matcher types automatically. Prefer this over a `compilerOptions.types` array so the default `@types/*` inclusion isn't clobbered.

## 7. Dependency changes

**Remove:** `jest`, `jest-resolve`, `ts-jest`, `@types/jest`, `jest-environment-jsdom`, `jest-fetch-mock`, `identity-obj-proxy`, `@swc/jest`, and `@workleap/swc-configs` *(verify it isn't imported outside `swc.jest.ts`)*. Drop `cross-env NODE_OPTIONS=--experimental-vm-modules` from the root `test` script only.

**Add:** `vitest`, `happy-dom`, `vite-tsconfig-paths`. Optional: `@vitest/coverage-v8` (no coverage is configured today), `@vitest/eslint-plugin`.

**Keep:** `@testing-library/react` / `dom` / `user-event`, `react-test-renderer`, `@testing-library/jest-dom` (use the `/vitest` entry), `jest-fail-on-console` (works with Vitest — confirm the installed version auto-detects the runner).

> **`@swc/core` stays** if Storybook's `@storybook/addon-webpack5-compiler-swc` still needs it — check before removing.

## 8. Code changes

### 8.1 `jest.*` → `vi.*` (13 files)

`vi` is global with `globals: true`. Affected files:

- `components/src/avatar/tests/jest/Avatar.test.tsx`
- `components/src/buttons/tests/jest/{Button,LinkButton,ToggleButton}.test.tsx`
- `components/src/checkbox/tests/jest/{Checkbox,CheckboxGroup}.test.tsx`
- `components/src/inputs/tests/jest/{TextField,SearchField}.test.tsx`
- `components/src/modal/tests/jest/{Modal,CustomModal}.test.tsx`
- `components/src/radio/tests/jest/RadioGroup.test.tsx`
- `components/src/switch/tests/jest/Switch.test.tsx`
- `components/src/utils/tests/jest/useDebounce.test.ts`

Mechanical find/replace `jest.` → `vi.` covers `fn`, `spyOn`, `useFakeTimers`, `advanceTimersByTime`. **Manually review** any `jest.mock` (→ `vi.mock`; hoisting differs — use `vi.hoisted` if the factory closes over imports) and `jest.requireActual` (→ **`await vi.importActual`**, which is async).

### 8.2 setup files

```ts
// packages/components/setupTests.ts
import "@testing-library/jest-dom/vitest";
import failOnConsole from "jest-fail-on-console";

// happy-dom provides TextEncoder/TextDecoder, fetch, Request and matchMedia,
// so the jsdom-era util polyfill and jest-fetch-mock (added only to define
// `Request` for react-router) are no longer required.

failOnConsole();
```

```ts
// packages/icons/setupTests.ts  &  packages/styled-system/setupTests.ts
import "@testing-library/jest-dom/vitest";
import failOnConsole from "jest-fail-on-console";

failOnConsole();
```

### 8.3 Rename & delete

- `git mv` every `src/**/tests/jest/` → `src/**/tests/vitest/` (same depth, so relative `../../src/...` imports are unaffected).
- Delete: 6 `jest.config.ts` (root + 5 packages), 5 `swc.jest.ts`, and `tooling/intl-jest-resolver/`.

## 9. Risks & validation

| # | Risk | Why | How to validate / mitigate |
|---|---|---|---|
| 1 | **happy-dom defines `matchMedia`** | jsdom lacks it, so feature-detection guards return `false` today: [useMediaQuery.ts](packages/styled-system/src/utils/useMediaQuery.ts), [BreakpointProvider.tsx](packages/styled-system/src/responsive/BreakpointProvider.tsx), SegmentedControl reduced-motion. Under happy-dom these paths turn **on**. | Run the `styled-system` suite. If behavior must match the old runs, mock `window.matchMedia` in the setup file. |
| 2 | **fetch / `Request`** | `jest-fetch-mock` was added only so `Request` existed for react-router. | Confirm the react-router-dependent `components` tests pass under happy-dom with `jest-fetch-mock` removed. No test uses its mock API, so this should be safe. |
| 3 | **react-aria / RAC parity** | Pointer/focus/layout behavior can differ jsdom → happy-dom. | Run the full `components` suite; watch for focus-management and pointer-event assertions. |
| 4 | **SSR tests** (`*.ssr.test.tsx`) | Currently run in jsdom under Jest. | Keep them in happy-dom (parity), or opt individual files into node with `// @vitest-environment node`. |
| 5 | **Fake timers** | `vi.useFakeTimers`/`advanceTimersByTime` parity for [useDebounce.test.ts](packages/components/src/utils/tests/jest/useDebounce.test.ts) and [mockImage.ts](tooling/test-utils/mockImage.ts) (100 ms `setTimeout`). | Covered by running those suites. |
| 6 | **`jest-fail-on-console`** | Must support the Vitest runner. | Verify the installed version; bump if needed. |

## 10. Effort estimate

**~2–3 dev-days for one engineer.**

- Shared factory + intl Vite plugin + per-package configs: ~1 day.
- `vi.*` codemod (13 files) + setup rewrites + folder rename + dep/script/turbo edits: ~0.5 day.
- Per-package validation of the risks above: ~1 day.

Low code churn; the effort is concentrated in validation, not rewriting.

## 11. Runbook

Do it package-by-package, smallest first, so each risk surfaces in isolation.

1. **Scaffold shared tooling.** Create `tooling/vitest-config/` (§6.1) and `tooling/vite-intl-plugin/` (§5.1) as workspace packages (`@hopper-ui/vitest-config`, `@hopper-ui/vite-intl-plugin`). Add `types/vitest.d.ts` (§6.4).
2. **Install/remove deps** (§7) at the root and per package; run the workspace install.
3. **Prototype on `icons`** (4 tests, React + happy-dom): add `vitest.config.ts`, rewrite `setupTests.ts`, `git mv tests/jest → tests/vitest`, set the `test` script, delete its `jest.config.ts` + `swc.jest.ts`. Run `pnpm --filter @hopper-ui/icons test` until green.
4. **`styled-system`** — same steps. Exercises the **`matchMedia`** risk (#1); resolve before moving on.
5. **`svg-icons` and `tokens`** — node env, `defineHopperVitestConfig()` with no options.
6. **`components`** — the big one. Add the intl Vite plugin, apply the `vi.*` codemod (§8.1), rewrite `setupTests.ts` (drop the polyfill + fetch mock), rename folders, delete configs. Run `pnpm --filter @hopper-ui/components test`; work through risks #2–#5.
7. **Repo wiring** — update `turbo.json` outputs, the root `test` script, and remove `tooling/intl-jest-resolver/` and all `jest.config.ts` / `swc.jest.ts`. Confirm `@types/jest` and SWC test deps are gone (keep `@swc/core` if Storybook needs it).
8. **Full sweep** — `pnpm test` (Turbo) green across all five packages. Run `pnpm lint` / typecheck to catch dangling `@types/jest` references.
9. **Flip the doc status** to _Validated_ and note any deviations discovered during the prototype.

### Validation checklist

- [ ] `icons`, `styled-system`, `svg-icons`, `tokens`, `components` suites each green on Vitest.
- [ ] `styled-system` `matchMedia`-dependent tests behave as intended under happy-dom.
- [ ] `components` react-router tests pass without `jest-fetch-mock`.
- [ ] SSR (`*.ssr.test.tsx`) tests pass.
- [ ] Fake-timer tests (`useDebounce`, image mocks) pass.
- [ ] `pnpm test`, `pnpm lint`, and typecheck all clean.
- [ ] No remaining references to `jest`, `@swc/jest`, `ts-jest`, `identity-obj-proxy`, `@types/jest` in `packages/` or `tooling/`.
