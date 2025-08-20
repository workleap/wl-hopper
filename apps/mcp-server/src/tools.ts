/* eslint-disable max-len */
import { files } from "@docs/ai";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
    CallToolResult
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { content, errorContent, toolContent } from "./utils/content.js";
import { getComponentDocumentation, getGuideDocumentation, GuideSections, TokenCategories } from "./utils/docs.js";
import { trackError, trackEvent } from "./utils/logging.js";
import { validateComponentStructure } from "./utils/validateComponentStructure.js";


export function tools(server: McpServer) {
    server.registerTool("get_started", {
        title: "Get Started",
        description:
        "Start with this tool. This service help you building app or part of it using Hopper Design System. Always start with calling this tool.",
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) : Promise<CallToolResult> => {
        trackEvent("get_started", {}, e?.requestInfo);

        return toolContent(content(`
            ALWAYS follow these steps:
            1. Read "installation" guide CAREFULLY and setup CSS correctly.
                - DO NOT GO TO NEXT STEP UNTIL YOU ARE SURE THAT PACKAGES ARE INSTALLED AND CONFIGURED CORRECTLY.
            2. Setup light/dark mode by following "color-schemes" guide.
            3. Read "styles", "tokens" and "icons" guides to understand the design system concepts well.
                - You MUST know the best practices BEFORE using components.
                - Read each component's documentation CAREFULLY to follow its usage guidelines. Use "get_component_documentation" tool.
                - The "icons" guide lists all available icons. NEVER EVER USE emojis.
            4. AVOID trial-and-error and guessing approach. Use provided tools AS MUCH AS POSSIBLE.
            5. ALWAYS Use validate_component_structure tool when you used a component to ensure its structure is correct.
            `));
    });

    server.registerTool("get_components_list", {
        title: "List all available components",
        description:
        "Get a list of all components in the Hopper Design System.",
        inputSchema: {},
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) : Promise<CallToolResult> => {
        trackEvent("get_components_list", {}, e?.requestInfo);

        return toolContent(await getGuideDocumentation("components-list"));
    });

    server.registerTool("get_component_usage", {
        title: "Get component usage documentation",
        description:
        `
        Includes component's anatomy, structure, examples, dos and don'ts, and best practices.
        **IT IS VERY IMPORTANT TO READ COMPONENT DOCUMENTATION BEFORE USING IT TO AVOID STRUCTURE MISTAKES.**
        `,
        inputSchema: {
            component_name: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name }, e): Promise<CallToolResult> => {
        trackEvent("get_component_usage", { componentName: component_name }, e?.requestInfo);

        return toolContent(
            await getComponentDocumentation(component_name, "usage"),
            content("Call get_component_props tool to get component's props if needed."),
            content("**ALWAYS CALL validate_component_structure TOOL AFTER USING A COMPONENT.**")
        );
    });

    server.registerTool("get_component_props", {
        title: "Get component props as JSON",
        description:
        `Get properties, attributes, methods, events for a specific component.
        - This service returns a JSON API content.
        - Call this service after you have read the component usage.
        `,
        inputSchema: {
            component_name: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name }, e) : Promise<CallToolResult> => {
        trackEvent("get_component_props", { componentName: component_name }, e?.requestInfo);

        return toolContent(
            await getComponentDocumentation(component_name, "api"),
            content("**ALWAYS CALL validate_component_structure TOOL AFTER USING A COMPONENT.**")
        );
    });

    server.registerTool("get_design_tokens", {
        title: "Get tokens for different groups of semantic or core design tokens",
        description:
        `
        - MAKE SURE YOU READ THE STYLES GUIDE FIRST
        - ALWAYS USE **SEMANTIC** TOKENS WHERE POSSIBLE

        Available tokens categories:
        - semantic-color: Semantic colors for text, surfaces, borders, and icons with interactive states
        - semantic-elevation: Box shadows for creating depth and hierarchy in interfaces
        - semantic-shape: Border radius values for rounded corners and circular elements
        - semantic-space: Spacing tokens for padding, margin, and layout gaps
        - semantic-typography: Font styles, sizes, and weights for headings and body text
        - core-border-radius: Fundamental border radius values from 0 to full circles
        - core-color: Raw color palette values across all brand color scales
        - core-dimensions: Base spacing units from 0 to 8rem for layouts
        - core-font-family: Typography font stacks for primary, secondary, and monospace
        - core-font-size: Font size scale from 0.75rem to 3rem
        - core-font-weight: Font weight values from 400 to 690
        - core-line-height: Line height ratios for consistent vertical rhythm
        - core-motion: Animation durations and easing functions for transitions
        - core-shadow: Box shadow values for elevation effects
        - all-semantic: All semantic design tokens.
        - all-core: All core design tokens.
        - all: All design tokens. Note: This may result in a large payload; for better performance and readability, it is recommended to use specific categories when possible. (estimated tokens: ${files.tokens.index.estimatedTokens}).
        `,
        inputSchema: {
            category: z.enum(TokenCategories)

        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ category }, e) : Promise<CallToolResult> => {
        trackEvent("get_design_tokens", { category }, e?.requestInfo);

        return toolContent(await getGuideDocumentation(category));
    });

    server.registerTool("get_guide", {
        title: "Get guide or best practices",
        description:
        `Available guides:
        - installation: How to install and set up the Hopper Design System.
        - styles: How to use CSS properties and design tokens in Hopper Design System. Read this guide to understand how.
        - color-schemes: Applying light mode, dark mode, or adapt to operating system's dark mode.
        - react-icons: All available react icons with each icon description and usage examples.
        - svg-icons: All available SVG icons with each icon description and usage examples.
        - layout: Building application layouts using Flex or Grid.
        - controlled-mode: Using controlled and uncontrolled modes to customize components.
        - forms: Best practices for building forms in Hopper Design System.
        - slots: How Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them.
        - internationalization: Adapting components to respect languages and cultures.
        `,
        inputSchema: {
            guide: z.enum(GuideSections)
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ guide }, e) : Promise<CallToolResult> => {
        trackEvent("get_guide", { guide }, e?.requestInfo);

        return toolContent(await getGuideDocumentation(guide));
    });

    server.registerTool("validate_component_structure", {
        title: "Validate Component Structure",
        description:
        "Validates if the component implementation follows the structure and best practices.",
        inputSchema: {
            code: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ code }, e) : Promise<CallToolResult> => {
        try {
            const validationResult = validateComponentStructure(code);
            trackEvent("validate_component_structure", { code, validationResult }, e?.requestInfo);

            if (validationResult.isValid) {
                return toolContent(content("Component structure validation passed!"));
            } else {
                let message = "Component structure validation failed!\nErrors:";
                validationResult.errors.forEach((error, index) => {
                    message += `\n${index + 1}. ${error.message}`;
                    if (error.line) {
                        message += ` (line ${error.line})`;
                    }
                });

                return toolContent(content(message));
            }
        } catch (error) {
            trackError(error, e?.requestInfo);

            return toolContent(errorContent(error, "Failed to validate component structure. Please ensure the code is valid JSX/TSX."));
        }
    });

    server.registerTool("migrate_from_orbiter_to_hopper", {
        title: "Migrate a file or all files in the folder from Orbiter to Hopper",
        description:
        "It migrates a file or all files in the folder from Orbiter to Hopper.",
        inputSchema: { file_or_folder_path: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ file_or_folder_path }, e): Promise<CallToolResult> => {
        trackEvent("migrate_from_orbiter_to_hopper", { filePath: file_or_folder_path }, e?.requestInfo);

        return toolContent(content(`
                1. Run \`pnpx "@workleap/migrations"@latest -t ${file_or_folder_path}\` in terminal to migrate the file/folder from Orbiter to Hopper.
                2. Review the files for errors:
                    - Update the Hopper packages if they are not up-to-date and if it is required (e.g. the component is missing).
                    - There are some added \`Migration TODO\`s comments in the code. Try to address them.
                    - There might also be \`migration-notes.md\` file generated. Review them for additional guidance.
                    - For each component you can check the Component documentation's Migration notes to manually adjust the code.
                3. If some components are not migrated, you can use the \`get_component_documentation\` tool to get the component documentation and follow the migration notes.
                4. Make sure the migrated code adheres to Hopper's design system standards.
                `));
    });
}
