import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
    CallToolResult
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { content, errorContent, toolContent } from "./utils/content";
import { getComponentBriefApi, getComponentFullApi, getComponentUsage, getDesignTokenGuide, getDesignTokensMap, getGuide, GuideSections, TokenCategories } from "./utils/docs";
import { DESIGN_TOKEN_PREFIXES_AND_SUFFIXES } from "./utils/formatStyledSystemName";
import { formatValidationMessages } from "./utils/formatValidationMessages";
import { getIcons, IconTypes } from "./utils/iconSearch";
import { trackError, trackEvent } from "./utils/logging";
import { paginationParamsInfo, toolsInfo } from "./utils/toolsInfo";
import { validateComponentStructure } from "./utils/validateComponentStructure";

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
    server.registerTool(toolsInfo.get_component_doc.name, {
        title: toolsInfo.get_component_doc.title,
        description: toolsInfo.get_component_doc.description,
        inputSchema: {
            component_name: z.string(),
            doc_type: z.enum(["usage", "props", "props-full"]).describe(toolsInfo.get_component_doc.parameters.doc_type)
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name, doc_type }, e): Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_component_doc.name, { componentName: component_name, docType: doc_type }, e?.requestInfo);

        let docContent;
        let additionalMessages = [];

        if (doc_type === "usage") {
            docContent = await getComponentUsage(component_name);
        } else if (doc_type === "props") {
            docContent = await getComponentBriefApi(component_name);
        } else { // props-full
            docContent = await getComponentFullApi(component_name);
        }

        additionalMessages.push(content(`**ALWAYS CALL "#${toolsInfo.validate_hopper_code.name}" TOOL AFTER USING A COMPONENT.**`));

        return toolContent(docContent, ...additionalMessages);
    });


    server.registerTool(toolsInfo.get_design_tokens_map.name, {
        title: toolsInfo.get_design_tokens_map.title,
        description: toolsInfo.get_design_tokens_map.description,
        inputSchema: {
            category: z.enum(TokenCategories).describe(toolsInfo.get_design_tokens_map.parameters.category),
            filter_by_names: z.array(z.string()).optional().describe(toolsInfo.get_design_tokens_map.parameters.filter_by_names),
            include_css_values: z.boolean().optional().default(false).describe(toolsInfo.get_design_tokens_map.parameters.include_css_values)
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ category, include_css_values, filter_by_names }, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_design_tokens_map.name, { category, include_css_values, filter_by_names }, e?.requestInfo);

        return toolContent(
            ...(await getDesignTokensMap(category, filter_by_names, include_css_values ? "full" : "brief")),
            include_css_values ? content("**Use 'propValue' in your code, not 'cssValue'. Design tokens ensure consistency.**") : undefined,
            content("**Golden Rule**, Remove these substrings from token names to get the correct prop value: " + DESIGN_TOKEN_PREFIXES_AND_SUFFIXES.join(", "))
        );
    });

    server.registerTool(toolsInfo.get_guide.name, {
        title: toolsInfo.get_guide.title,
        description: toolsInfo.get_guide.description,
        inputSchema: {
            guide: z.enum(GuideSections),
            category: z.enum(TokenCategories).optional().describe(toolsInfo.get_guide.parameters.category),
            ...paginationParams
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ guide, category, page_size, cursor }, e) : Promise<CallToolResult> => {
        trackEvent(toolsInfo.get_guide.name, { guide, category, page_size, cursor }, e?.requestInfo);

        if (guide === "tokens") {
            if (!category) {
                return toolContent(errorContent(new Error("Category is required when guide is 'tokens'.")));
            }
            return toolContent(await getDesignTokenGuide(category, page_size, cursor));
        } else {
            return toolContent(await getGuide(guide,  page_size, cursor));
        }

    });

    server.registerTool(toolsInfo.get_icons.name, {
        title: toolsInfo.get_icons.title,
        description: toolsInfo.get_icons.description,
        inputSchema: {
            queries: z.array(z.string()).optional().describe(toolsInfo.get_icons.parameters.queries),
            type: z.enum(IconTypes).optional().default("all").describe(toolsInfo.get_icons.parameters.type),
            limit: z.number().optional().describe(toolsInfo.get_icons.parameters.limit)
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ queries, type, limit }, e) : Promise<CallToolResult> => {
        try {
            trackEvent(toolsInfo.get_icons.name, { queries, type, limit }, e?.requestInfo);

            const results = await getIcons(queries, type, limit);

            if (Object.keys(results).length === 0) {
                return toolContent(content("No queries provided."));
            }

            return toolContent(
                content(JSON.stringify(results, null, 2))
            );
        } catch (error) {
            trackError(error, e?.requestInfo);

            return toolContent(errorContent(error, "Failed to search icons. Please try again with different keywords."));
        }
    });


    server.registerTool(toolsInfo.validate_hopper_code.name, {
        title: toolsInfo.validate_hopper_code.title,
        description: toolsInfo.validate_hopper_code.description,
        inputSchema: {
            code: z.string()
        },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ code }, e) : Promise<CallToolResult> => {
        try {
            const validationResult = await validateComponentStructure(code);
            trackEvent(toolsInfo.validate_hopper_code.name, { code, validationResult }, e?.requestInfo);

            if (validationResult.isValid && validationResult.warnings.length === 0) {
                return toolContent(content("Component structure validation passed!"));
            }

            let message = validationResult.isValid
                ? "Component structure validation passed with warnings!"
                : "Component structure validation failed!";

            message += formatValidationMessages(validationResult.errors, "Errors");
            message += formatValidationMessages(validationResult.warnings, "Warnings");

            return toolContent(content(message));
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
                3. If some components are not migrated, you can use the #${toolsInfo.get_component_doc.name} tool to get the component usage information and follow the migration notes.
                4. Make sure the migrated code adheres to Hopper's design system standards.
                `));
    });
}
