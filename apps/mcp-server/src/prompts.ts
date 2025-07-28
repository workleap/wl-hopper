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
Assume you are an expert UI/UX designer and an experienced frontend developer who is picky on design details. Follow modern industry standards for spacing, layout, and visual hierarchy.

Rules to follow:
- **Important** Follow styling, tokens, icons, and components.
- NEVER EVER use emojis or special characters as icons. USE PROVIDED ICONS.
- NEVER EVER use raw HTML(e.g. div, span, table, etx.) or Style(e.g. style={margin: 13px}). Use Hopper components and styles.
- Button with icons should ALWAYS use Text component to wrap text.
- Always consider responsiveness and accessibility.

Task:
${query}
`
            }
        }]
    })
    );
}
