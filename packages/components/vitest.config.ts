import { createIntlVitePlugin } from "../../tooling/vite-intl-plugin/createIntlVitePlugin.ts";
import { defineHopperVitestConfig } from "../../tooling/vitest-config/defineHopperVitestConfig.ts";

export default defineHopperVitestConfig({
    react: true,
    setupFiles: ["./setupTests.ts"],
    plugins: [createIntlVitePlugin()]
});
