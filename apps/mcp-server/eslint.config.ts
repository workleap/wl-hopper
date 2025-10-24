import { defineReactLibraryConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "**/mocks/**",
        "/reports/**"
    ]),
    defineReactLibraryConfig(import.meta.dirname)
]);
