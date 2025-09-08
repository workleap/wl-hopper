/* eslint-disable max-len */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
    CallToolResult
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { content, errorContent, toolContent } from "./utils/content.js";
import { getComponentApi, getComponentDocumentation, getGuideDocumentation, GuideSections, TokenCategories } from "./utils/docs.js";
import { trackError, trackEvent } from "./utils/logging.js";
import { generateGuidesDescription, generateTokenCategoriesDescription } from "./utils/tools-descriptions.js";
import { validateComponentStructure } from "./utils/validateComponentStructure.js";

const paginationParams = {
    page_size: z
        .number()
        .min(15000)
        .optional()
        .describe("Maximum number of tokens to return per page. **DEFAULT: Leave unset for full results.** Only specify this on the first call to start pagination. Once set, the page size is fixed for the entire pagination session. Use high values (e.g. 20000+) for better performance. Low limits (<500) may lead to suboptimal implementations."),
    cursor: z
        .string()
        .optional()
        .describe("Pagination cursor from the previous response. **DEFAULT: Leave unset for the first page.** Use the 'next_cursor' value from the previous response to get the next page. Do not modify this value manually - it encodes both position and page size information.")
};

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
            await getComponentDocumentation(component_name),
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
            await getComponentApi(component_name),
            content("**ALWAYS CALL validate_component_structure TOOL AFTER USING A COMPONENT.**")
        );
    });

    server.registerTool("get_design_tokens", {
        title: "Get tokens for different groups of semantic or core design tokens",
        description: generateTokenCategoriesDescription(),
        inputSchema: {
            category: z.enum(TokenCategories),
            ...paginationParams
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ category, page_size, cursor }, e) : Promise<CallToolResult> => {
        trackEvent("get_design_tokens", { category, page_size, cursor }, e?.requestInfo);

        return toolContent(await getGuideDocumentation(category, page_size, cursor));
    });

    server.registerTool("get_guide", {
        title: "Get guide or best practices",
        description: generateGuidesDescription(),
        inputSchema: {
            guide: z.enum(GuideSections),
            ...paginationParams
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ guide, page_size, cursor }, e) : Promise<CallToolResult> => {
        trackEvent("get_guide", { guide, page_size, cursor }, e?.requestInfo);

        return toolContent(await getGuideDocumentation(guide, page_size, cursor));
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
