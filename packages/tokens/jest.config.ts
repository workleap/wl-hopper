import type { Config } from "jest";

import { swcConfig } from "./swc.jest.ts";

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    cacheDirectory: "./node_modules/.cache/jest",
    extensionsToTreatAsEsm: [".ts"]
};

export default config;
