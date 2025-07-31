import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const envSchema = z.object({
    LOG_FILE: z.string(),
    PORT: z.string().default("3000"),
    ALLOWED_HOSTS: z.string().default("")
});

export const env = process.env.NODE_ENV === "production" ? envSchema.parse(process.env) : {
    LOG_FILE: join(dirname(fileURLToPath(import.meta.url)), "../logs/user-interactions.log.jsonl"),
    PORT: "3300",
    ALLOWED_HOSTS: ""
};

