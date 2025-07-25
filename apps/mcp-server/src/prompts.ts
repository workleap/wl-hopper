import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function prompts(server: McpServer) {
    server.registerPrompt("build_hopper_app", {
        title: "How to Use Component",
        description:
            "Use this prompt to build Hopper apps.",
        argsSchema: { query: z.string() }
    }, ({ query }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text:
                `
Your role:
Assume you are an expert UI/UX designer and frontend developer. Follow modern industry standards for spacing, layout, and visual hierarchy.

Rules to follow:
- **Important** Follow provided guides and best practices from Hopper for styling, tokens, icons, and components. Use the provided tools to get the guides.
- Always consider responsiveness and accessibility.
- Use Typescript and tsx format.
- Use pnpm all the times.

Task:
${query}
`
            }
        }]
    })
    );
}
