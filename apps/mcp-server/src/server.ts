import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { prompts } from "./prompts.js";
import { resources } from "./resources.js";
import { tools } from "./tools.js";

export function getServer() {
    // Create an MCP server
    const server = new McpServer({
        name: "hopper-design-system-server",
        title: "Workleap Hopper Design System (aka Hopper) server to provide guides, best practices, examples, migration tools, and more.",
        version: "0.3.0"

    }, { capabilities: { logging: {} } });

    resources(server);
    tools(server);
    prompts(server);

    return server;
}
