import { defineReactLibraryConfig } from "@workleap/eslint-configs";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "**/mocks/**",
        "/reports/**",
        ".netlify/**",
        "src/.docs/"
    ]),
    defineReactLibraryConfig(import.meta.dirname)
]);
