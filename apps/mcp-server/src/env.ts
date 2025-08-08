import { join } from "path";
import { z } from "zod";

const environmentVariablesSchema = z.object({
    LOG_FILE: z.string().optional(),
    PORT: z.string().default("3000"),
    ALLOWED_HOSTS: z.string().default(""),
    DOCS_PATH: z.string().optional()
});

// Extended schema: DOC_PATH is required and schema is named configSchema
const configSchema = environmentVariablesSchema.extend({
    DOCS_PATH: z.string(),
    ENV: z.enum(["development", "production"])
});

export const env = getEnv();

function getEnv(): z.infer<typeof configSchema> {
    if (process.env.IS_NETLIFY_FUNCTION === "true") {
        return {
            LOG_FILE: undefined, // No log file in Netlify environment
            DOCS_PATH: join(import.meta.dirname, "./docs"),
            PORT: "3300",
            ALLOWED_HOSTS: "",
            ENV: "production"
        };
    } else if (process.env.NODE_ENV === "production") {
        const ev = environmentVariablesSchema.parse(process.env);

        return {
            ...ev,
            DOCS_PATH: ev.DOCS_PATH || join(import.meta.dirname, "./docs"),
            ENV: "production"
        };
    } else {//local Express development
        return {
            LOG_FILE: join(import.meta.dirname, "../logs/user-interactions.log.jsonl"),
            DOCS_PATH: join(import.meta.dirname, "../../docs/dist/ai"),
            PORT: "3300",
            ALLOWED_HOSTS: "",
            ENV: "development"
        };
    }
}
