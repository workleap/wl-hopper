import { createCssModuleEsbuildPlugin } from "@hopper-ui/tsup-css-module-plugin";
import { createIntlEsbuildPlugin } from "@hopper-ui/tsup-intl-plugin";
import { defineBuildConfig } from "@workleap/tsup-configs";

import packageJson from "./package.json";

export default defineBuildConfig({
    entry: ["./src/index.(ts|tsx)", "./src/**/src/**/*.(ts|tsx)"],
    target: "es2019", // We set target ES2019 since ES2020 syntax is not supported by older versions of storybook (used in orbiter)
    dts: process.env.NETLIFY !== "true",
    esbuildPlugins: [
        createCssModuleEsbuildPlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: packageJson.version
        }),
        createIntlEsbuildPlugin()
    ]
});
