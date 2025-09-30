import type { Config } from "jest";

import { swcConfig } from "./swc.jest";

const config: Config = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    moduleNameMapper: {
        "^@docs/ai$": "<rootDir>/src/tests/mocks/aiFiles.ts",
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    cacheDirectory: "./node_modules/.cache/jest",
    resolver: "<rootDir>/../../tooling/intl-jest-resolver/jestResolver.cjs",
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};

export default config;
