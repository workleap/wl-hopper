/* eslint-disable max-len */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { toolsInfo } from "./utils/toolsInfo";

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
# Objective
Generate a JSX implementation of the selected Figma frame using Hopper Design System components, ensuring visual and structural fidelity.

Begin with a concise checklist (5-10 bullets) of what you will do; keep items conceptual, not implementation-level.

# Instructions

## 1. Initial Code Generation
- Utilize Figma MCP tools ('#get_image', '#get_code', '#get_variable_defs') for initial extraction.
- Map visuals from '#get_image' directly to Hopper components.
- Use '#get_code' mainly to extract styling values (colors, sizes, fonts), not for component structure.
- **CRITICAL:** Preserve all text from Figma exactly, without alteration.

## 2. Hopper Design System Refinement

### Component Selection
- ALWAYS prioritize using higher-level/semantic components. For example prioritize using TextField instead of HtmlInput, or Grid instead of Div when appropriate.
- CRITICAL: Always check component props/API before using any component.
- Always call '#${toolsInfo.get_component_props.name}' tool provided by MCP for ANY component you haven't used before.

### Styling
- All styling must use Hopper design tokens—never raw CSS values or inline styles.
- **IMPORTANT** design system tokens ARE DIFFERENT from component style props values. You MUST NOT use the CSS variable names for style props directly. Find the correct mapping value in the tokens documentation provided by "#${toolsInfo.get_design_tokens.name}" tool.
- When transferring any token value to a component prop, perform the following replacements on the token value: remove the substrings "hop-", "-border", "-surface", "-text", "-icon", "elevation-", "shape-", "space-", "border-", "radius-", "dataviz-", "shadow-", "font-family-", "font-size-", "font-weight-", and "line-height-". For example: "--hop-neutral-text-weak-active" becomes "neutral-weak-active", and "space-inset-md" becomes "inset-sm".
- Prioritize proper design system usage over quick fixes
- Refine generated code by consulting the Hopper Design System MCP server and documentation.

## 3. Implementation
- **CRITICAL: BEFORE STARTING,** review all relevant token categories (spacing, colors, typography, etc.) and styling, not just when you hit errors. Call '#${toolsInfo.get_design_tokens.name}' and '#${toolsInfo.get_guide.name}' tools provided by Hopper MCP to get them.
- Build out the implementation entirely with Hopper components and patterns.
- Use '#get_image' again to compare your result with the original Figma frame until a pixel-perfect match is achieved.
- Iterate as needed; after each adjustment, repeat the comparison.
- After each code edit, validate result in 1-2 lines and proceed or self-correct if validation fails.
- Run Typescript type-checking on the final code to ensure no type errors.
- CRITICAL: Run final validation with '#${toolsInfo.validate_component_structure.name}' tool provided by Hopper MCP before considering task complete.

## 4. Q&A
- Validate the component structure after major changes, not just at the end.
- Use '#get_image' for the last time to compare your result with the original Figma frame. IT MUST be a pixel perfect. Otherwise review your work.

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
