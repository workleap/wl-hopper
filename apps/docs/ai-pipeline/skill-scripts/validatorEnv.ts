import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * Stands in for apps/mcp-server/src/env.ts when the validator is bundled into the Hopper skill.
 *
 * The MCP server resolves its data files against a deployed docs folder. Inside the skill the
 * same files live in `references/`, one level up from `scripts/`, so `DOCS_PATH` points there
 * and the validator's `join(env.DOCS_PATH, files.<...>.path)` calls keep working unchanged.
 * This is why the skill mirrors the AI docs layout for `tokens/maps` and `styled-system`.
 */
const scriptDirectory = dirname(fileURLToPath(import.meta.url));

export const env = {
    DOCS_PATH: process.env.HOPPER_SKILL_DOCS_PATH || join(scriptDirectory, "..", "references"),
    PORT: "0",
    ALLOWED_HOSTS: "",
    ENV: "production" as const
};
