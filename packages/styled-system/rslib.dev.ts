import { defineHopperRslibDevConfig } from "@hopper-ui/rslib-config";

import packageJson from "./package.json" with { type: "json" };

export default defineHopperRslibDevConfig({
    version: packageJson.version,
    copy: [{ from: "src/theme/generated", to: "theme/generated" }]
});
