import type { RequestInfo } from "@modelcontextprotocol/sdk/types.js";
import chalk from "chalk";
import winston from "winston";

import { env } from "./env.js";

// function getLogFileTransport() {
//     if (!env.LOG_FILE) {
//         return undefined; // No log file configured
//     }
//     return new winston.transports.File({
//             filename: env.LOG_FILE,
//             maxsize: 10 * 1024 * 1024, // 10MB
//             maxFiles: 5,
//             tailable: true,
//             level: "info"
//         })
// }


// Configure winston logger for user interactions
const interactionLogger = winston.createLogger({
    level: "info",
    format:  winston.format.json({ space: 2 }),
    transports: [],
});

const colorizeMessageOnly = winston.format(info => {
    if (info.message) {
        info.message = chalk.yellow(info.message); // Only color the message
    }
    if (info.data) {
        info.data = chalk.cyan(JSON.stringify(info.data)); // Only color the data
    }

    return info;
});

interactionLogger.add(new winston.transports.Console({
    format: env.ENV === "production" ? undefined : winston.format.combine(

        colorizeMessageOnly(),
        winston.format.timestamp(),
        winston.format.printf(info => `${info.message} ${info.data ?? ""} ${info.timestamp} sessionId: ${info.sessionId ?? "n/a"}`)
    )
}));

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

export function trackEvent(event: string, data: object | null = {}, requestInfo?: RequestInfo) {
    const convertedData = errorToObject(data);
    let sessionId = requestInfo && requestInfo.headers["mcp-session-id"] ? requestInfo.headers["mcp-session-id"] : "";
    const { sessionId: dataSessionId, ...modifiedData } = (convertedData != null && ("sessionId" in convertedData)) ? convertedData : { sessionId: null, ...convertedData };

    if (!sessionId && dataSessionId && typeof dataSessionId === "string") {
        sessionId = dataSessionId as string;
    }


    const logData = {
        sessionId: sessionId ? sessionId : undefined,
        data: modifiedData && Object.keys(modifiedData).length > 0 ? modifiedData : undefined,
        timestamp: new Date().toISOString()
    };

    // Log to file using winston
    if (event === "error") {
        interactionLogger.error(event, logData);
    } else {
        interactionLogger.info(event, logData);
    }
}

export function trackError(error: unknown, requestInfo?: RequestInfo) {
    return trackEvent("error", typeof error === "object" ? error : { error }, requestInfo);
}

