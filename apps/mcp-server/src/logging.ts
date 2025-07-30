import type { RequestInfo } from "@modelcontextprotocol/sdk/types.js";
import chalk from "chalk";
import winston from "winston";

import { env } from "./env.js";


// Configure winston logger for user interactions
const interactionLogger = winston.createLogger({
    level: "info",
    format:  winston.format.json({ space: 2 }),
    transports: [
        new winston.transports.File({
            filename: env.LOG_FILE,
            maxsize: 10 * 1024 * 1024, // 10MB
            maxFiles: 5,
            tailable: true,
            level: "info"
        })
    ]
});

if (process.env.NODE_ENV !== "production") {
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
        format: winston.format.combine(

            colorizeMessageOnly(),
            winston.format.timestamp(),
            winston.format.printf(info => `${info.message} ${info.data ?? ""} ${info.timestamp} sessionId: ${info.sessionId ?? "n/a"}`)


        )
    }));
}

export function trackEvent(event: string, data: object | null = {}, requestInfo?: RequestInfo) {
    let sessionId = requestInfo && requestInfo.headers["mcp-session-id"] ? requestInfo.headers["mcp-session-id"] : "";
    const { sessionId: dataSessionId, ...modifiedData } = data && "sessionId" in data ? data : { sessionId: null, ...data };

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
        console.log("--->", logData);
        interactionLogger.error(event, logData);
    } else {
        interactionLogger.info(event, logData);
    }
}

export function trackError(error: unknown, requestInfo?: RequestInfo) {
    return trackEvent("error", typeof error === "object" ? error : { error }, requestInfo);
}
