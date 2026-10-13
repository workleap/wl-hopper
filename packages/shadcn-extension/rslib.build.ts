import { defineHopperRslibBuildConfig } from "@hopper-ui/rslib-config";

import packageJson from "./package.json" with { type: "json" };

export default defineHopperRslibBuildConfig({
    version: packageJson.version
});
