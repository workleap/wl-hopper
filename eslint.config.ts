import { defineMonorepoWorkspaceConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "packages/**",
        "apps/**"
    ]),
    defineMonorepoWorkspaceConfig(import.meta.dirname)
]);
