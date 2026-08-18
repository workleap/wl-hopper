import { createIntlVitePlugin } from "@hopper-ui/vite-intl-plugin";
import { defineHopperVitestConfig } from "@hopper-ui/vitest-config";

export default defineHopperVitestConfig({
    react: true,
    setupFiles: ["./setupTests.ts"],
    plugins: [createIntlVitePlugin()]
});
