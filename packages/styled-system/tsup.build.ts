import { createCssModuleEsbuildPlugin } from "@hopper-ui/tsup-css-module-plugin";
import { defineBuildConfig } from "@workleap/tsup-configs";

import packageJson from "./package.json";

export default defineBuildConfig({
    entry: [
        "./src/**/*.(ts|tsx)"
    ],
    target: "es2019", // We set target ES2019 since ES2020 syntax is not supported by older versions of storybook (used in orbiter)
    esbuildPlugins: [
        createCssModuleEsbuildPlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: packageJson.version
        })]
});
