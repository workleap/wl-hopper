import { join } from "path";
import { cwd } from "process";
import { z } from "zod";

const envSchema = z.object({
    LOG_FILE: z.string(),
    PORT: z.string().default("3000"),
    ALLOWED_HOSTS: z.string()
});

export const env = process.env.NODE_ENV === "production" ? envSchema.parse(process.env) : {
    LOG_FILE: join(cwd(), "logs", "user-interactions.log.jsonl"),
    PORT: "3300",
    ALLOWED_HOSTS: "localhost,127.0.0.1"
};

