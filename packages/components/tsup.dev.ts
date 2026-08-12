import { createCssModuleEsbuildPlugin } from "@hopper-ui/tsup-css-module-plugin";
import { createIntlEsbuildPlugin } from "@hopper-ui/tsup-intl-plugin";
import { defineDevConfig } from "@workleap/tsup-configs";

import packageJson from "./package.json" with { type: "json" };

export default defineDevConfig({
    entry: ["./src/index.(ts|tsx)", "./src/**/src/**/*.(ts|tsx)"],
    esbuildPlugins: [
        createCssModuleEsbuildPlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: packageJson.version
        }),
        createIntlEsbuildPlugin()
    ]
});
