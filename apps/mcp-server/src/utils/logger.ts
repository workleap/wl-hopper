import type { RequestInfo } from "@modelcontextprotocol/sdk/types.js";

import packageInfo from "../../package.json" assert { type: "json" };

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

export function trackEvent(event: (string & {}) | "error", data: object | null = {}, requestInfo?: RequestInfo) {
    const convertedData = errorToObject(data);
    let sessionId = requestInfo?.headers["mcp-session-id"] ? requestInfo.headers["mcp-session-id"] : "";
    const { sessionId: dataSessionId, ...modifiedData } = (convertedData != null && ("sessionId" in convertedData)) ? convertedData : { sessionId: null, ...convertedData };

    if (!sessionId && dataSessionId && typeof dataSessionId === "string") {
        sessionId = dataSessionId;
    }

    const logData = {
        sessionId: sessionId ? sessionId : undefined,
        data: modifiedData && Object.keys(modifiedData).length > 0 ? modifiedData : undefined,
        timestamp: new Date().toISOString(),
        version: packageInfo.version
    };

    if (event === "error") {
        console.error(`${event}, ${JSON.stringify(logData)}`);
    } else {
        console.info(`${event}, ${JSON.stringify(logData)}`);
    }
}

export function trackError(error: unknown, requestInfo?: RequestInfo) {
    return trackEvent("error", typeof error === "object" ? error : { error }, requestInfo);
}

