import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { prompts } from "./prompts.js";
import { tools } from "./tools.js";

export function setupServer() {
    // Create an MCP server
    const server = new McpServer({
        name: "hopper-mcp",
        version: "0.2.0"
    });

    // Set up tools and prompts for the server
    tools(server);
    prompts(server);

    return server;
}
