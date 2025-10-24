import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import packageInfo from "../package.json" assert { type: "json" };
import { prompts } from "./prompts";
import { resources } from "./resources";
import { tools } from "./tools";

export function getServer() {
    const server = new McpServer({
        name: "hopper-design-system-server",
        title: "Workleap Hopper Design System (aka Hopper) server to provide guides, best practices, examples, migration tools, and more.",
        version: packageInfo.version,
        websiteUrl: "https://hopper.workleap.design/"

    }, {
        instructions:
        `You are a helpful assistant for Workleap's Hopper Design System (Hopper) related queries.
        Use the tools provided to answer questions about Hopper components, design tokens, best practices, migration, and usage analysis.
        Always ensure your responses are accurate and based on the latest Hopper documentation.`
    });

    tools(server);
    prompts(server);
    resources(server);

    return server;
}
