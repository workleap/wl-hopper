import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { prompts } from "./prompts.js";
import { tools } from "./tools.js";


// Create an MCP server
const server = new McpServer({
    name: "hopper-mcp",
    version: "0.2.0"
});

tools(server);
prompts(server);


// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);


/*
prompt to test:

Create a simple React app using Hopper Design System to manage products.

Functional requirements:
- It should have title, quantity fields and a button to save.
- It should shows the created product on the bottom of the form (product list).
- Products should be saved in local storage. No need to have any API call.
- Products should be removable from the list.
- The page should have a button on top to switch between dark and light mode.

Non-functional requirements:
- Use Hopper design system components, icons and best practices.
- Just create a simple React app (Vite).
- Try to use icons from Hopper for different part of the page.
*/
