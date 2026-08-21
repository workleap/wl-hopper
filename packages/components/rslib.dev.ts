import { defineHopperRslibDevConfig } from "@hopper-ui/rslib-config";

import packageJson from "./package.json" with { type: "json" };

export default defineHopperRslibDevConfig({
    version: packageJson.version,
    intl: true,
    aggregateCss: true,
    // src/index.css is a bare @import aggregator, so its imports must be inlined to stay valid.
    inlineCssImports: true
});
