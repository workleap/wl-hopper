import type { Rsbuild, RslibConfig, Syntax } from "@rslib/core";
import { type RslibConfigTransformer, defineBuildConfig, defineDevConfig } from "@workleap/rslib-configs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

/**
 * Every source file becomes its own output file in bundleless mode, so the entry set has to be
 * wider than it looks:
 *  - the index barrels must be entries, because "dist/index.js" re-exports them and
 *    nothing else would emit them;
 *  - CSS must be entries too. rslib rewrites a "./X.module.css" import to
 *    "./X.module.js" and externalizes it, so without a CSS entry that class-map module is
 *    never emitted and the whole "dist" fails to resolve.
 *
 * Docs, tests and stories are excluded by negation; tinyglobby moves "!" patterns into its ignore list.
 */
const DEFAULT_ENTRY = [
    "./src/**/*.{ts,tsx,css}",
    "!./src/**/docs/**",
    "!./src/**/tests/**",
    "!./src/**/*.stories.{ts,tsx}",
    "!./src/**/*.test.{ts,tsx}"
];

/**
 * ES2019 rather than the preset's esnext: ES2020 syntax is not supported by the older Storybook that
 * Orbiter still runs, and Orbiter consumes the published packages.
 */
const SYNTAX: Syntax = "es2019";

const TSCONFIG_PATH = "./tsconfig.build.json";

/** ICU message catalogues, compiled to JS modules by the intl loader. */
const INTL_ENTRY = "./src/**/intl/*.json";

/** Scratch directory for the CSS aggregation pass; the build script moves the stylesheet out and deletes it. */
export const CSS_BUNDLE_DIR = "./dist-css";

export interface HopperRslibOptions {
    /**
     * The consuming package's version. It is baked into the CSS-module class names so two Hopper
     * versions loaded on the same page cannot collide, replacing postcss-modules' "hashPrefix".
     */
    version: string;
    /** Compile ICU messages in "intl*.json" through @internationalized/string-compiler. */
    intl?: boolean;
    /** Emit a single aggregated stylesheet alongside the per-file bundleless CSS. Build only. */
    aggregateCss?: boolean;
    /**
     * Inline every "@import" in the aggregated stylesheet instead of leaving workspace packages
     * external. Only needed by a package whose global CSS carries "@import" rules - see the note on
     * the aggregation entry. Leaving it off keeps a sibling package's CSS out of this one's sheet.
     */
    inlineCssImports?: boolean;
    /** Extra globs to keep out of the entry set, on top of the docs/tests/stories defaults. */
    ignore?: string[];
    entry?: string[];
}

/**
 * Reproduces the class-name scheme the tsup build produced, minus the "[name]__" prefix. The version
 * is interpolated literally - Rspack has no hash-salt option - with dots replaced, since an
 * unescaped dot is not valid inside a class selector.
 */
function createCssModuleTransformer(version: string): RslibConfigTransformer {
    return config => ({
        ...config,
        output: {
            ...config.output,
            cssModules: {
                ...config.output?.cssModules,
                exportLocalsConvention: "asIs",
                localIdentName: `[local]___${version.replaceAll(".", "-")}___[hash:base64:5]`
            }
        }
    });
}

/** "javascript/auto" is what bypasses Rspack's built-in JSON handling so the loader output is used as a module. */
function createIntlTransformer(): RslibConfigTransformer {
    return config => ({
        ...config,
        tools: {
            ...config.tools,
            rspack: (_rspackConfig, { appendRules }) => {
                appendRules({
                    test: /(intl).*\.json$/,
                    type: "javascript/auto",
                    loader: require.resolve("./intl-loader.js")
                });
            }
        }
    });
}

/**
 * Builds the "lib" array, and it has to own the entries outright.
 *
 * rslib merges each lib entry over the shared config with mergeRsbuildConfig, which *concatenates*
 * arrays rather than replacing them - so a "source.entry" left at the root leaks its globs into
 * every lib entry, and the bundle-mode entry below then rejects them outright. The root entry is
 * therefore cleared and each lib entry carries its own.
 *
 * The second entry exists because bundleless output emits one stylesheet per source file, while
 * "<pkg>/index.css" is a documented public entry point that has to stay a single self-contained
 * file. Packages whose global CSS carries "@import" rules opt into "inlineCssImports" so those
 * imports are inlined instead of preserved - see the note on the aggregation entry below.
 *
 * rslib runs each lib entry as its own rsbuild environment, so this still costs only one
 * "rslib build" invocation, and the JS it emits is discarded by the build script.
 */
function createLibTransformer(
    entry: string[],
    aggregateCss: boolean,
    inlineCssImports: boolean
): RslibConfigTransformer {
    return (config, { environment }) => {
        const [primary, ...rest] = config.lib;
        const { entry: _rootEntry, ...sharedSource } = config.source ?? {};

        const lib = [
            {
                ...primary,
                source: { entry: { index: entry } satisfies Rsbuild.RsbuildEntry },
                // tsc emits declarations with the source ".tsx" specifiers intact -
                // "rewriteRelativeImportExtensions" does not cover declaration output - so rslib has to
                // rewrite them. It matches TS extensions but is off by default.
                redirect: { dts: { extension: true } }
            },
            ...rest
        ];

        // Watch mode cannot re-run the post-build move, and the per-file CSS the bundleless pass
        // emits is imported by the emitted JS, so styles still resolve for a bundler in dev.
        if (aggregateCss && environment === "build") {
            lib.push({
                ...primary,
                bundle: true,
                dts: false,
                // Only when the package's global CSS has "@import" rules. css-loader emits inlined
                // content ahead of preserved at-rules, so a partially-inlined sheet puts its
                // surviving "@import"s after real rules and browsers discard them. Inlining
                // everything keeps at-rule order valid. The JS this pass emits is discarded either
                // way. Packages without "@import" rules leave this on, so a sibling package's CSS
                // does not get copied into their stylesheet.
                ...(inlineCssImports && { autoExternal: false }),
                source: { entry: { index: "./src/index.ts" } satisfies Rsbuild.RsbuildEntry },
                output: { distPath: { root: CSS_BUNDLE_DIR } }
            });
        }

        return {
            ...config,
            source: sharedSource,
            lib,
            tools: config.tools
        };
    };
}

function resolveOptions({
    version,
    intl = false,
    aggregateCss = false,
    inlineCssImports = false,
    ignore = [],
    entry = DEFAULT_ENTRY
}: HopperRslibOptions) {
    const transformers: RslibConfigTransformer[] = [createCssModuleTransformer(version)];

    if (intl) {
        transformers.push(createIntlTransformer());
    }

    // The compiled intl modules have to be entries for the same reason the CSS does: rslib
    // rewrites "../intl/en-US.json" to "../intl/en-US.js" and externalizes it, so without an
    // entry that module is never emitted.
    const entryPatterns = intl ? [...entry, INTL_ENTRY] : entry;

    // Must run last: it rewrites the "lib" array the other transformers leave alone.
    transformers.push(
        createLibTransformer([...entryPatterns, ...ignore.map(glob => `!${glob}`)], aggregateCss, inlineCssImports)
    );

    return {
        syntax: SYNTAX,
        tsconfigPath: path.resolve(TSCONFIG_PATH),
        react: true as const,
        transformers
    };
}

/** Shared Rslib build config factory for the publishable Hopper packages. */
export function defineHopperRslibBuildConfig(options: HopperRslibOptions): RslibConfig {
    return defineBuildConfig(resolveOptions(options));
}

/** Shared Rslib watch-mode config factory for the publishable Hopper packages. */
export function defineHopperRslibDevConfig(options: HopperRslibOptions): RslibConfig {
    return defineDevConfig(resolveOptions(options));
}
