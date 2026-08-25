import { mergeRsbuildConfig } from "@rsbuild/core";
import { defineStorybookConfig } from "@workleap/rsbuild-configs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

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
                                    loader: require.resolve("@hopper-ui/rslib-config/intl-loader")
                                }
                            ]
                        }
                    }
                }
            })
    ]
});
