import { compileStrings } from "@internationalized/string-compiler";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

const INTL_RE = /intl.*\.json$/;
// A `\0` prefix marks the module as virtual (Vite skips fs / other resolvers);
// the ".js" suffix stops Vite's built-in JSON plugin from re-parsing our
// compiled JS output as JSON.
const PREFIX = "\0intl:";
const SUFFIX = ".js";

/**
 * Vite/Vitest equivalent of `tooling/intl-jest-resolver/jestResolver.cjs` and
 * the library build's intl loader: compiles `intl*.json` message files through
 * `@internationalized/string-compiler` so `components` can import them in tests.
 * Vitest has no Jest-style `resolver` hook, so this is a `resolveId`/`load` plugin.
 * No caching is needed — Vite caches transforms.
 */
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
