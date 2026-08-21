import { mergeRsbuildConfig } from "@rsbuild/core";
import { defineStorybookConfig } from "@workleap/rsbuild-configs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const thisDir = dirname(fileURLToPath(import.meta.url));

export default defineStorybookConfig({
    transformers: [
        config =>
            mergeRsbuildConfig(config, {
                resolve: {
                    // Resolves @hopper-ui/* to ./src/index.ts, mirroring `customConditions` in the root tsconfig.
                    conditionNames: ["hopper-source"]
                },
                output: {
                    cssModules: {
                        localIdentName: "[local]___[hash:base64:5]",
                        exportLocalsConvention: "asIs"
                    }
                },
                tools: {
                    rspack: {
                        module: {
                            rules: [
                                {
                                    // `javascript/auto` bypasses Rspack's built-in JSON handling.
                                    test: /(intl).*\.json$/,
                                    type: "javascript/auto",
                                    loader: resolve(thisDir, "intl-loader.js")
                                }
                            ]
                        }
                    }
                }
            })
    ]
});
