import { env } from "../env.js";

export function getAllowedHosts(): string[] | undefined {
    const result = [];
    for (const host of env.ALLOWED_HOSTS.split(",")) {
        if (host === "") {
            continue;
        }
        if (host.includes(":")) {
            result.push(host);
        } else {
            result.push(`${host}:${env.PORT}`); // Add default port for HTTP
        }
    }

    return result.length === 0 ? undefined : result;
}
