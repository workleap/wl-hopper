import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { GuideSection } from "./config/constants";
import { toolsInfo } from "./config/toolsMetadata";

const figma_get_code = "'#get_design_context'";
const figma_get_screenshot = "'#get_screenshot'";

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

                    Essential workflow to follow:
                    1. Read "tokens", "styles", "layout", and "icons" guides to understand the design system concepts well.
                        - CRITICAL: Always check component props/API before using any component.
                        - Never assume standard CSS/HTML props work - each design system has its own API.
                        - Read each component's documentation CAREFULLY to follow its usage guidelines. Use "#${toolsInfo.get_component_doc.name}" tool.
                        - NEVER EVER USE emojis. The "icons" guide lists all available icons.
                    2. Read "installation" guide CAREFULLY and setup CSS correctly if Hopper is not already installed.
                        - DO NOT GO TO NEXT STEP UNTIL YOU ARE SURE THAT PACKAGES ARE INSTALLED AND CONFIGURED CORRECTLY.
                    3. Setup light/dark mode by following "color-schemes" guide if it is not already done.
                    4. AVOID trial-and-error and guessing approach. Use provided tools AS MUCH AS POSSIBLE.
                    5. ALWAYS Use "#${toolsInfo.validate_hopper_code.name}" tool when you used a component to ensure its structure is correct.

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

Begin with a concise checklist (min. 5-10 bullets) of what you will do; keep items conceptual, not implementation-level.

# Instructions

## 1. Initial Code Generation
- Utilize Figma MCP tools (${figma_get_code} and ${figma_get_screenshot}) for initial extraction.
- Map visuals from ${figma_get_screenshot} directly to Hopper components.
- Use ${figma_get_code} mainly to extract styling values (colors, sizes, fonts), not for component structure.
- **CRITICAL:** Preserve all text from Figma exactly, without alteration.

## 2. Hopper Design System Refinement

### Component Selection
- Check the '${"figma-conventions" satisfies GuideSection}' guide to see how 'data-name' attribute (returned from ${figma_get_code} tool) is mapped to a Hopper component.
- ALWAYS prioritize using higher-level/semantic components. For example prioritize using TextField instead of HtmlInput, or Grid instead of Div when appropriate.
- CRITICAL: Always call '#${toolsInfo.get_component_doc.name}("usage")' before diving into props - it shows real-world patterns.
- Always call '#${toolsInfo.get_component_doc.name}("props")' tool provided by MCP for ANY component you haven't used before.

### Styling
- All styling must use Hopper design semantic or core tokens—never raw CSS values or inline styles.
- **IMPORTANT** Design system tokens ARE DIFFERENT from component style props values. You MUST NOT use token names for component style props directly. To find the correct mapping value use the "#${toolsInfo.get_design_tokens.name}" tool to find the correct prop value.
- **CRITICAL**: Check the '${"escape-hatches" satisfies GuideSection}' guide for a COMPLETE WHITELIST of UNSAFE_* props.
    - If a prop IS in the whitelist (e.g., width, fontSize) → use "UNSAFE_propName" ONLY for CUSTOM values, otherwise use the propName directly WITHOUT UNSAFE_ prefix.
    - If a prop is NOT in the whitelist (e.g., position, overflow, cursor, opacity, left, top, inset) → ALWAYS use the propName directly WITHOUT UNSAFE_ prefix.
- Prioritize proper design system usage over quick fixes.
- Refine generated code by consulting the Hopper Design System MCP server and documentation.

## 3. Before Writing ANY Code
**CRITICAL: Complete this checklist FIRST:**

## 3.1 Understanding
- [ ] Fetch all the following resources before start coding, not just when you hit errors:
    - Call '#${toolsInfo.get_guide.name}(${"styles" satisfies GuideSection})' to get the relevant styling guidance.
    - Call '#${toolsInfo.get_guide.name}(${"escape-hatches" satisfies GuideSection})' to get a COMPLETE WHITELIST of available 'UNSAFE_*' props. Any prop not in that list **MUST** be used WITHOUT the UNSAFE_ prefix.
    - Call '#${toolsInfo.get_guide.name}(${"layout" satisfies GuideSection})' to understand correct layout practices.
    - Call '#${toolsInfo.get_guide.name}(${"icons" satisfies GuideSection})' to understand different icon type and their usage.
    - Call '#${toolsInfo.get_guide.name}(${"figma-conventions" satisfies GuideSection})' to understand how to interpret Figma elements → Hopper Component/ Hopper Icon/ Product Icon.

## 3.2 Component, Icon & Token Mapping
You MUST NOT proceed to implementation until you:
- [ ] Extract all unique token names(from ALL token categories) from ${figma_get_code} response.
    - [ ] Create a COMPLETE map of design tokens → component prop values for every token extracted by calling '#${toolsInfo.get_design_tokens.name}("all",<${toolsInfo.get_design_tokens.parameters.search_token_names.name}>)' and passing ONLY those token names via its '${toolsInfo.get_design_tokens.parameters.search_token_names.name}' parameter.
    - [ ] IF needed: Call '#${toolsInfo.get_design_tokens.name}("all")' without <${toolsInfo.get_design_tokens.parameters.search_token_names.name}> to cover ALL tokens.
    - [ ] Show the mapping to me when you are done.
- [ ] Extract all unique CSS values (e.g., "16px", "24px", "32px", "2rem", "3rem", "400", etc.) from ${figma_get_code} response.
    - [ ] Search for these CSS values in tokens by calling '#${toolsInfo.get_design_tokens.name}' and setting '${toolsInfo.get_design_tokens.parameters.search_css_values.name}' to fetched values to find matching tokens. e.g ["16px", "1rem","400", "Times"])
    - [ ] Create a map of CSS values → prop values (e.g., "16px" → "core_160", "24px" → "core_240")
    - [ ] Show the mapping to me when you are done.
- [ ] Create a COMPLETE map of ALL 'data-name' attributes → "Hopper Component, Hopper Icon, Product Icons/Logos/Images/Avatars" from Figma ${figma_get_code} response by following '${"figma-conventions" satisfies GuideSection}' guide.
    - **CRITICAL:** Product Icons are PRESERVED as EXACTLY as what you got.
    - **List every Product Icons/Logos/Images/Avatars occurrence with its image URL from ${figma_get_code}**
    - [ ] Show the mapping to me when you are done.

## 4. Implementation
- **CRITICAL:** Use tokens for ALL values (e.g. width, height, padding) that match available tokens. Never use UNSAFE_ for values that have tokens.
- Implement **ALL** Product Icons/Logos/Images/Avatars from your product icon map created in previous step.
- **Proactively** refer to your design token and component maps to ensure correct usage.
- Build out the implementation entirely with Hopper components and patterns.
- ENSURE you don't guess UNSAFE_ props. ONLY use UNSAFE_ props listed in the '${"escape-hatches" satisfies GuideSection}' guide.
- **CRITICAL**: Don't use Core_* tokens when you have **Semantic** tokens available. For example: gap, padding and margin props all support semantic tokens, and gap="core_80" is incorrect.
- Use ${figma_get_screenshot} again to compare your result with the original Figma frame until a pixel-perfect match is achieved.
- Iterate as needed; after each adjustment, repeat the comparison.
- After each code edit, validate result in 1-2 lines and proceed or self-correct if validation fails.
- Run Typescript type-checking on the final code to ensure no type errors.
- CRITICAL: Run final validation with '#${toolsInfo.validate_hopper_code.name}' tool provided by Hopper MCP before considering task complete.

## 5. QA
- [ ] Verify all UNSAFE_* props are in the '${"escape-hatches" satisfies GuideSection}' whitelist.
- [ ] Verify all selected Hopper icons are matched correctly with provided data-name attributes.
- [ ] Verify **ALL Product Icons/Logos/Images/Avatars** are preserved from the Figma design.
- [ ] **CRITICAL** Verify Core_* tokens are NOT used when Semantic tokens are available.
- [ ] Call '#${toolsInfo.validate_hopper_code.name}' tool after every major changes, not just at the end.
- [ ] Run detailed visual comparison: Check with "Chrome Dev Tools MCP server"'s "take_snapshot" tool that the generated code snapshot exactly matches the original Figma screenshot. IT MUST be pixel-perfect and color-perfect. Identify the differences and plan how to fix them.
- [ ] The code must pass TypeScript compilation with zero errors before considering it complete. Run type checking frequently during development.
- [ ] **SUPER CRITICAL**: The '#${toolsInfo.validate_hopper_code.name}' tool MUST return ZERO ERRORS before considering this task DONE. If there are ANY ERRORS, you MUST fix them ALL and re-validate until there are ZERO ERRORS.

# Output
Return only the complete JSX implementation using Hopper components that perfectly matches the original Figma design. No additional output, explanations, or validation reports are required.

# Context
Figma design: '${figma_design_url}'

# Deliverable
A pixel-perfect, structurally sound Hopper Design System implementation matching the selected Figma frame.
`
            }
        }]
    })
    );
}
