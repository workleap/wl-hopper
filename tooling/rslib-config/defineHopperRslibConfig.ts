import type { RslibConfig } from "@rslib/core";
import { type RslibConfigTransformer, defineBuildConfig, defineDevConfig } from "@workleap/rslib-configs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const TSCONFIG_PATH = "./tsconfig.build.json";

type CopyPatterns = NonNullable<NonNullable<RslibConfig["output"]>["copy"]>;

export interface HopperRslibOptions {
    /**
     * The consuming package's version. It is baked into the CSS-module class names so two Hopper
     * versions loaded on the same page cannot collide, replacing postcss-modules' "hashPrefix".
     */
    version: string;
    /** Compile ICU messages in "intl*.json" through @internationalized/string-compiler. */
    intl?: boolean;
    /** Static files to copy into "dist", as rsbuild "output.copy" patterns. */
    copy?: CopyPatterns;
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

function createCopyTransformer(patterns: CopyPatterns): RslibConfigTransformer {
    return config => ({
        ...config,
        output: {
            ...config.output,
            copy: patterns
        }
    });
}

/**
 * The JavaScript is bundled but declarations are not, so the emitted ".d.ts" files still reference
 * each other - and tsc leaves the source ".tsx" specifiers intact, since
 * "rewriteRelativeImportExtensions" does not cover declaration output. rslib can rewrite them (its
 * matcher covers TS extensions) but ships the redirect off by default.
 */
function createDtsRedirectTransformer(): RslibConfigTransformer {
    return config => ({
        ...config,
        lib: config.lib.map(entry => ({ ...entry, redirect: { dts: { extension: true } } }))
    });
}

function resolveOptions({ version, intl = false, copy }: HopperRslibOptions) {
    const transformers: RslibConfigTransformer[] = [createCssModuleTransformer(version)];

    if (intl) {
        transformers.push(createIntlTransformer());
    }

    if (copy) {
        transformers.push(createCopyTransformer(copy));
    }

    transformers.push(createDtsRedirectTransformer());

    return {
        // Bundled rather than bundleless. "exports" only exposes "." and "./index.css", so the
        // internal layout was never reachable anyway, and bundling is what keeps the CSS contract
        // simple: rsbuild extracts one stylesheet per entry and leaves it out of the JS graph,
        // which is exactly what the published packages have always shipped.
        bundle: true,
        // Set explicitly: the preset's bundle-mode default is ["./src/index.ts", "./src/index.js"],
        // and bundle mode validates every entry file exists.
        entry: { index: "./src/index.ts" },
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
