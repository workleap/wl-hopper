import { createCssModuleEsbuildPlugin } from "@hopper-ui/tsup-css-module-plugin";
import { createIntlEsbuildPlugin } from "@hopper-ui/tsup-intl-plugin";
import { defineBuildConfig } from "@workleap/tsup-configs";

import packageJson from "./package.json";

const isNetlify = process.env.NETLIFY === "true";

export default defineBuildConfig({
    entry: isNetlify ? ["./src/index.(ts|tsx)"] : ["./src/index.(ts|tsx)", "./src/**/src/**/*.(ts|tsx)"],
    target: "es2019", // We set target ES2019 since ES2020 syntax is not supported by older versions of storybook (used in orbiter)
    dts: !isNetlify,
    esbuildPlugins: [
        createCssModuleEsbuildPlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: packageJson.version
        }),
        createIntlEsbuildPlugin()
    ]
});
