import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// eslint-disable-next-line
import packageInfo from "../package.json" assert { type: "json" };
import { prompts } from "./prompts.js";
import { resources } from "./resources";
import { tools } from "./tools.js";

export function getServer() {
    const server = new McpServer({
        name: "hopper-design-system-server",
        title: "Workleap Hopper Design System (aka Hopper) server to provide guides, best practices, examples, migration tools, and more.",
        version: packageInfo.version

    });

    tools(server);
    prompts(server);
    resources(server);

    return server;
}
