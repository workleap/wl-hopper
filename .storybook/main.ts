import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Options as SwcOptions } from "@swc/core";
import { createRequire } from "node:module";
import path, { dirname, join } from "path";
import type { Options } from "storybook/internal/types";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import { swcConfig as SwcBuildConfig } from "./swc.build.ts";
import { swcConfig as SwcDevConfig } from "./swc.dev.ts";

const require = createRequire(import.meta.url);

// We sometimes need to disable the lazyCompilation to properly run the test runner on stories
const isLazyCompilation = !(process.env.STORYBOOK_NO_LAZY === "true");

const storybookConfig: StorybookConfig = {
    stories: [
        "../packages/**/*.stories.@(ts|tsx)"
    ],
    addons: [
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-docs")
    ],
    framework: getAbsolutePath("@storybook/react-webpack5"),
    core: {
        builder: {
            name: getAbsolutePath("@storybook/builder-webpack5"),
            options: {
                lazyCompilation: isLazyCompilation
            }
        }
    },
    swc: (_: SwcOptions, { configType }: Options): SwcOptions => {
        return configType === "PRODUCTION" ? SwcBuildConfig : SwcDevConfig;
    },
    webpackFinal(config, { configType }) {
        config.resolve = {
            ...config.resolve,
            plugins: [
                ...(config.resolve?.plugins ?? []),
                new TsconfigPathsPlugin({
                    configFile: "./tsconfig.json",
                    extensions: config.resolve?.extensions
                })
            ]
        };

        config.plugins = [
            ...(config.plugins ?? []),
            configType !== "PRODUCTION" && new ReactRefreshWebpackPlugin({
                overlay: {
                    sockIntegration: "whm"
                }
            })
        ].filter(Boolean);

        // Modify the css-loader options to simplify the class names
        // By default, with the config, the classnames are like this: GETEs8cGi4WwwvV1ooFy MUs8LC8twKwy5uAnhOWJ PafTkO4uwI6M3m4HX7JI
        // With this new config, the classnames are like this: hop-Button___GETEs hop-Button--primary___MUs8L hop-Button--md___PafTk
        for (const rule of config.module?.rules ?? []) {
            if (typeof rule === "object" && rule?.use && Array.isArray(rule.use)) {
                for (const loader of rule.use) {
                    if (typeof loader === "object" && loader?.loader?.includes("css-loader")) {
                        const cssLoader = loader;
                        if (cssLoader && typeof cssLoader === "object") {
                            const previousOptions = typeof cssLoader.options === "string" ? { } : cssLoader.options;
                            cssLoader.options = {
                                ...previousOptions,
                                modules: {
                                    ...((typeof previousOptions?.modules === "string" ? { mode: previousOptions?.modules } : previousOptions?.modules)),
                                    auto: true,
                                    localIdentName: "[local]___[hash:base64:5]"
                                }
                            };
                        }
                    }
                }
            }
        }

        // This is a custom loader that will be used to load the intl json files and convert them to a format that can
        // be used by the react-aria useLocalizedStringFormatter hook for formatting.
        config.module?.rules?.push({
            loader: path.resolve(".storybook/intl-loader.js"),
            test: /(intl).*\.json$/,
            type: "javascript/auto"
        });

        return config;
    }
};

export default storybookConfig;

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, "package.json")));
}
