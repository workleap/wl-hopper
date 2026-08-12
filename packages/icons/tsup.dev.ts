import { createCssModuleEsbuildPlugin } from "@hopper-ui/tsup-css-module-plugin";
import { defineDevConfig } from "@workleap/tsup-configs";

import packageJson from "./package.json";

export default defineDevConfig({
    entry: ["./src/*.(ts|tsx)"],
    esbuildPlugins: [
        createCssModuleEsbuildPlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
            hashPrefix: packageJson.version
        })
    ]
});
