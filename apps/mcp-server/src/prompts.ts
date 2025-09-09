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
                    - ALWAYS prioritize using semantic tokens when possible.
                    - NEVER EVER use emojis or special characters as icons. USE PROVIDED ICONS.
                    - NEVER EVER use raw HTML(e.g. div, span, table, etx.) or Style(e.g. style={margin: 13px}). Use Hopper components and styles.

                    - Always consider responsiveness and accessibility.

                    Task:
                    ${query}
                `
            }
        }]
    })
    );

    server.registerPrompt("generate_code_from_figma_design", {
        title: "Generate code from the provided figma design",
        description:
            "Use this prompt to properly generate code from figma design. This prompt relies on Figma MCP.",
        argsSchema: { figma_design_url: z.string() }
    }, ({ figma_design_url }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text:
                `
                    Developer: # Objective
                    Generate a JSX implementation of the selected Figma frame using Hopper Design System components, ensuring visual and structural fidelity.

                    Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.

                    # Instructions
                    1. **Initial Code Generation**
                    - Utilize Figma MCP tools ('#get_image', '#get_code', '#get_variable_defs') for initial extraction.
                    - Map visuals from '#get_image' directly to Hopper components.
                    - Use '#get_code' mainly to extract styling values (colors, sizes, fonts), not for component structure.
                    - **CRITICAL:** Preserve all text from Figma exactly, without alteration.

                    2. **Hopper Design System Refinement**
                    - The design is already based on the Hopper Design System; ensure strict use of Hopper patterns.
                    - Refine generated code by consulting the Hopper Design System MCP server and documentation.
                    - All styling must use Hopper design tokens—never raw CSS values or inline styles.

                    3. **Implementation and QA**
                    - Build out the implementation entirely with Hopper components and patterns.
                    - Use '#get_image' again to compare your result with the original Figma frame until a pixel-perfect match is achieved.
                    - Iterate as needed; after each adjustment, repeat the comparison.
                    - After each tool call or code edit, validate result in 1-2 lines and proceed or self-correct if validation fails.
                    - Run final validation with '#validate_component_structure' to ensure Hopper compliance.

                    # Output
                    Return only the complete JSX implementation using Hopper components. No additional output, explanations, or validation reports are required.

                    # Context
                    Figma design: '${figma_design_url}'

                    ## Deliverable
                    A pixel-perfect, structurally sound Hopper Design System implementation matching the selected Figma frame.
                `
            }
        }]
    })
    );
}
