/* eslint-disable max-len */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { toolsInfo } from "./utils/toolsInfo";

export function prompts(server: McpServer) {
    server.registerPrompt("build_hopper_app", {
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
# Objective
Generate a JSX implementation of the selected Figma frame using Hopper Design System components, ensuring visual and structural fidelity.

Begin with a concise checklist (5-10 bullets) of what you will do; keep items conceptual, not implementation-level.

# Instructions

## 1. Initial Code Generation
- Utilize Figma MCP tools ('#get_screenshot' and '#get_code') for initial extraction.
- Map visuals from '#get_screenshot' directly to Hopper components.
- Use '#get_code' mainly to extract styling values (colors, sizes, fonts), not for component structure.
- **CRITICAL:** Preserve all text from Figma exactly, without alteration.

## 2. Hopper Design System Refinement

### Component Selection
- ALWAYS prioritize using higher-level/semantic components. For example prioritize using TextField instead of HtmlInput, or Grid instead of Div when appropriate.
- CRITICAL: Always call '#${toolsInfo.get_component_usage.name}' before diving into props - it shows real-world patterns.
- Always call '#${toolsInfo.get_component_props.name}' tool provided by MCP for ANY component you haven't used before.

### Styling
- All styling must use Hopper design tokens—never raw CSS values or inline styles.
- **IMPORTANT** Design system tokens ARE DIFFERENT from component style props values. You MUST NOT use token names for component style props directly. To find the correct mapping value: use the "#${toolsInfo.get_design_tokens_map.name}" tool to find the correct prop value.
- Prioritize proper design system usage over quick fixes
- Refine generated code by consulting the Hopper Design System MCP server and documentation.

## 3. Implementation
- **CRITICAL: START WITH,** fetching all the following resources before start coding, not just when you hit errors.
    - Call '#${toolsInfo.get_design_tokens_map.name}' to get the correct mapping from tokens to prop values.
    - Call '#${toolsInfo.get_guide.name}(styles)' to get the relevant styling guidance.
    - Call '#${toolsInfo.get_guide.name}(layout)' to understand correct layout practices.
- Build out the implementation entirely with Hopper components and patterns.
- Use '#get_screenshot' again to compare your result with the original Figma frame until a pixel-perfect match is achieved.
- Iterate as needed; after each adjustment, repeat the comparison.
- After each code edit, validate result in 1-2 lines and proceed or self-correct if validation fails.
- Run Typescript type-checking on the final code to ensure no type errors.
- CRITICAL: Run final validation with '#${toolsInfo.validate_component_structure.name}' tool provided by Hopper MCP before considering task complete.

## 4. QA
- Validate the component structure after major changes, not just at the end.
- Use '#get_screenshot' for the last time to compare your result with the original Figma frame. IT MUST be a pixel perfect. Otherwise review your work.
- The code must pass TypeScript compilation with zero errors before considering it complete. Run type checking frequently during development.

# Output
Return only the complete JSX implementation using Hopper components that perfectly matches the original Figma design. No additional output, explanations, or validation reports are required.

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
