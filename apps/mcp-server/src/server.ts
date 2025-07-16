import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { prompts } from "./prompts.js";
import { resources } from "./resources.js";
import { tools } from "./tools.js";

export function setupServer() {
    // Create an MCP server
    const server = new McpServer({
        name: "hopper-mcp",
        version: "0.2.0"
    });

    resources(server);
    tools(server);
    prompts(server);

    return server;
}
