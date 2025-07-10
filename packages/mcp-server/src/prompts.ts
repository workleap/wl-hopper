import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function prompts(server: McpServer) {
    server.registerPrompt("how_to_use_component", {
        title: "How to Use Component",
        description:
            "Specific question or request to see how to add a Hopper component or modify an existing one.",
        argsSchema: { query: z.string() }
    }, ({ query }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text: `I need help adding a Hopper component or modifying an existing one.

    Here is my specific request: ${query}

    Please help me
    1. Adding a Hopper component using Hopper Design System best practices and provided props.
    2. Updating the already defined component to match the request.

    When formulating your response, make sure to:
    - Use the latest Hopper Design System best practices
    - Use the Hopper styled system and tokens

    The GraphQL operation should be ready to use with minimal modification.`
            }
        }]
    })
    );
}
