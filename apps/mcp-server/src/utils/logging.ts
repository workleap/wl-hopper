import type { RequestInfo } from "@modelcontextprotocol/sdk/types.js";
import { ConsoleLogger } from "@workleap/logging";
import packageInfo from "../../package.json" assert { type: "json" };
import { env } from "../env.js";

const logger =  new ConsoleLogger();

function errorToObject(error: object | null) {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack
        };
    }

    return error;
}

export function trackEvent(event: string | "error", data: object | null = {}, requestInfo?: RequestInfo) {
    const convertedData = errorToObject(data);
    let sessionId = requestInfo && requestInfo.headers["mcp-session-id"] ? requestInfo.headers["mcp-session-id"] : "";
    const { sessionId: dataSessionId, ...modifiedData } = (convertedData != null && ("sessionId" in convertedData)) ? convertedData : { sessionId: null, ...convertedData };

    if (!sessionId && dataSessionId && typeof dataSessionId === "string") {
        sessionId = dataSessionId as string;
    }

    const logData = {
        sessionId: sessionId ? sessionId : undefined,
        data: modifiedData && Object.keys(modifiedData).length > 0 ? modifiedData : undefined,
        timestamp: new Date().toISOString(),
        version: packageInfo.version,
    };

    if (event === "error") {
        logger.error(`${event}, ${JSON.stringify(logData)}`, {style: { color: 'red' }});
    } else {
        logger.information(`${event}, ${JSON.stringify(logData)}`, {style: { color: 'blue' }});
    }
}

export function trackError(error: unknown, requestInfo?: RequestInfo) {
    return trackEvent("error", typeof error === "object" ? error : { error }, requestInfo);
}

