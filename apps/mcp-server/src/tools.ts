import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
    CallToolResult
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { content, errorContent, toolContent } from "./utils/content.js";
import { getComponentBriefApi, getComponentFullApi, getComponentUsage, getGuide, GuideSections, TokenCategories } from "./utils/docs.js";
import { trackError, trackEvent } from "./utils/logging.js";
import { paginationParamsInfo, toolsInfo } from "./utils/toolsInfo.js";
import { validateComponentStructure } from "./utils/validateComponentStructure.js";

const paginationParams = {
    page_size: z
        .number()
        .min(15000)
        .optional()
        .describe(paginationParamsInfo.page_size),
    cursor: z
        .string()
        .optional()
        .describe(paginationParamsInfo.cursor)
};

export function tools(server: McpServer) {
    server.registerTool(toolsInfo.get_started.name, {
        title: toolsInfo.get_started.title,
        description: toolsInfo.get_started.description,
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_started.name, {}, e?.requestInfo);

        return toolContent(content(`
            ALWAYS follow these steps:
            1. Read "styles", "tokens", "layout", and "icons" guides to understand the design system concepts well.
                - CRITICAL: Always check component props/API before using any component.
                - Never assume standard CSS/HTML props work - each design system has its own API.
                - Read each component's documentation CAREFULLY to follow its usage guidelines. Use "${toolsInfo.get_component_usage.name}" tool.
                - NEVER EVER USE emojis. The "icons" guide lists all available icons.
            2. Read "installation" guide CAREFULLY and setup CSS correctly if Hopper is not already installed.
                - DO NOT GO TO NEXT STEP UNTIL YOU ARE SURE THAT PACKAGES ARE INSTALLED AND CONFIGURED CORRECTLY.
            3. Setup light/dark mode by following "color-schemes" guide if it is not already done.
            4. AVOID trial-and-error and guessing approach. Use provided tools AS MUCH AS POSSIBLE.
            5. ALWAYS Use "${toolsInfo.validate_component_structure.name}" tool when you used a component to ensure its structure is correct.
            `));
    });

    server.registerTool(toolsInfo.get_components_list.name, {
        title: toolsInfo.get_components_list.title,
        description: toolsInfo.get_components_list.description,
        inputSchema: {},
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_components_list.name, {}, e?.requestInfo);

        return toolContent(await getGuide("components-list"));
    });

    server.registerTool(toolsInfo.get_component_usage.name, {
        title: toolsInfo.get_component_usage.title,
        description: toolsInfo.get_component_usage.description,
        inputSchema: {
            component_name: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name }, e): Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_component_usage.name, { componentName: component_name }, e?.requestInfo);

        return toolContent(
            await getComponentUsage(component_name),
            content(`Call "#${toolsInfo.get_component_props.name}" tool to get component's props if needed.`),
            content(`**ALWAYS CALL "#${toolsInfo.validate_component_structure.name}" TOOL AFTER USING A COMPONENT.**`)
        );
    });

    server.registerTool(toolsInfo.get_component_props.name, {
        title: toolsInfo.get_component_props.title,
        description: toolsInfo.get_component_props.description,
        inputSchema: {
            component_name: z.string(),
            include_full_props: z.boolean().optional().describe(toolsInfo.get_component_props.parameters.include_full_props)
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name, include_full_props }, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_component_props.name, { componentName: component_name, includeFullProps: include_full_props }, e?.requestInfo);

        return toolContent(
            include_full_props ? await getComponentFullApi(component_name) : await getComponentBriefApi(component_name),
            content("**ALWAYS CALL validate_component_structure TOOL AFTER USING A COMPONENT.**")
        );
    });

    server.registerTool(toolsInfo.get_design_tokens.name, {
        title: toolsInfo.get_design_tokens.title,
        description: toolsInfo.get_design_tokens.description,
        inputSchema: {
            category: z.enum(TokenCategories),
            ...paginationParams
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ category, page_size, cursor }, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_design_tokens.name, { category, page_size, cursor }, e?.requestInfo);

        return toolContent(await getGuide(category, page_size, cursor));
    });

    server.registerTool(toolsInfo.get_guide.name, {
        title: toolsInfo.get_guide.title,
        description: toolsInfo.get_guide.description,
        inputSchema: {
            guide: z.enum(GuideSections),
            ...paginationParams
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ guide, page_size, cursor }, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_guide.name, { guide, page_size, cursor }, e?.requestInfo);

        return toolContent(await getGuide(guide, page_size, cursor));
    });

    server.registerTool(toolsInfo.validate_component_structure.name, {
        title: toolsInfo.validate_component_structure.title,
        description: toolsInfo.validate_component_structure.description,
        inputSchema: {
            code: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ code }, e) : Promise<CallToolResult> => {
        try {
            const validationResult = validateComponentStructure(code);
            trackEvent(toolsInfo.validate_component_structure.name, { code, validationResult }, e?.requestInfo);

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

    server.registerTool(toolsInfo.migrate_from_orbiter_to_hopper.name, {
        title: toolsInfo.migrate_from_orbiter_to_hopper.title,
        description: toolsInfo.migrate_from_orbiter_to_hopper.description,
        inputSchema: { file_or_folder_path: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ file_or_folder_path }, e): Promise<CallToolResult> => {
        trackEvent(toolsInfo.migrate_from_orbiter_to_hopper.name, { filePath: file_or_folder_path }, e?.requestInfo);

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
