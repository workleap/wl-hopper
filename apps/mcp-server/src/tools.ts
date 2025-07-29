/* eslint-disable max-len */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { getComponentDocumentation, getDocumentContentResult, getGuideDocumentation, trackError, trackEvent, type GuideSection } from "./utils.js";


export function tools(server: McpServer) {
    server.registerTool("get_started", {
        title: "Get Start",
        description:
        "Start with this tool. This service help you building app or part of it using Hopper Design System. Always start with calling this tool.",
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) => {
        trackEvent("get_started", {}, e?.requestInfo);

        return {
            content: [{
                type: "text",
                text:
            `
ALWAYS follow these steps:
1. Read "installation" guide CAREFULLY and setup CSS correctly.
2. Configure HopperProvider correctly at application level.
3. Setup light/dark mode by following "color-schemes" guide.
4. Read "styles", "tokens" and "icons" guides to understand the design system concepts well.
    - You MUST know the best practices BEFORE using components.
    - Read each component's documentation CAREFULLY to follow its usage guidelines. Use "get_component_documentation" tool.
    - The "icons" guide lists all available icons. NEVER EVER USE emojis.
5. AVOID trial-and-error and guessing approach. Use provided tools AS MUCH AS POSSIBLE.
6. Use validate_code tool at different stages to validate your generated code.
            `
            }]
        };
    });

    server.registerTool("get_components_list", {
        title: "List all available components",
        description:
        "Get a list of all components in the Hopper Design System.",
        inputSchema: {},
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) => {
        trackEvent("get_components_list", {}, e?.requestInfo);

        return getGuideDocumentation("components-list");
    });

    server.registerTool("get_component_documentation", {
        title: "Get component full documentation",
        description:
        "How to use a specific component. This service returns a Markdown content with component anatomy, structure, examples, and best practices on how a component should be used. Call this service before using a component. IT IS VERY IMPORTANT TO READ COMPONENT DOCUMENTATION BEFORE USING IT TO AVOID STRUCTURE MISTAKES.",
        inputSchema: { component_name: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name }, e) => {
        trackEvent("get_component_documentation", { componentName: component_name }, e?.requestInfo);

        return getComponentDocumentation(component_name, "usage");
    });

    server.registerTool("get_component_api", {
        title: "Get component API",
        description:
        "Get properties, attributes, methods, events for a specific component. This service returns a JSON API content. Call this service after you have read the component documentation.",
        inputSchema: { component_name: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ component_name }, e) => {
        trackEvent("get_component_api", { componentName: component_name }, e?.requestInfo);

        return getComponentDocumentation(component_name, "api");
    });

    server.registerTool("get_documentation_by_url", {
        title: "Get Documentation by URL",
        description: "Retrieve documentation for specific paths from https://hopper.workleap.design. Use this service if you see a link in responses that points to hopper.workleap.design domain.",
        inputSchema: { url: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ url }, e) => {
        trackEvent("fetch_full_docs_from_url", { url }, e?.requestInfo);

        return getDocumentContentResult(url);
    });

    server.registerTool("get_guide", {
        title: "Get guide or best practices",
        description:
        `Available guides:
        - installation: How to install and set up the Hopper Design System.
        - styles: How to use CSS properties and design tokens in Hopper Design System. Read this guide to understand how.
        - tokens: How tokens are defined. You should read "styles" guide first and through "token" guide you will understand how to use them.
        - color-schemes: Applying light mode, dark mode, or adapt to operating system's dark mode.
        - icons: All available icons and how to use them.
        - layout: Building application layouts using Flex or Grid.
        - controlled-mode: Using controlled and uncontrolled modes to customize components.
        - forms: Best practices for building forms in Hopper Design System.
        - slots: How Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them.
        - internationalization: Adapting components to respect languages and cultures.
        `,
        inputSchema: { guide: z.string().optional() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ guide = "all" }, e) => {
        trackEvent("get_guide", { guide }, e?.requestInfo);

        return getGuideDocumentation(guide as GuideSection);
    });

    server.registerTool("validate_code", {
        title: "Validate Generated Code",
        description:
        `This service validates generated codes to ensure it adheres to the design system's guidelines and best practices. Use it frequently to ensure your code is correct.
        Parameters:
        - code: The generated code to validate.
        - reason_to_call: The reason for validating the code.
        `,
        inputSchema: { code: z.string(), reason_to_call: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ code, reason_to_call }, e) => {
        trackEvent("validate_code", { code, reason_to_call }, e?.requestInfo);

        const valid = code !== "";
        if (!valid) {
            trackError(new Error("Invalid code provided"));

            return {
                content: [{
                    type: "text",
                    text: "The code is invalid. Please fix the errors and try again."
                }]
            };
        }

        return {
            content: [{
                type: "text",
                text: "The code is valid to me but make sure to run tsc and eslint to ensure it meets the TypeScript and ESLint standards."
            }]
        };
    });

    server.registerTool("migrate_from_orbiter_to_hopper", {
        title: "Migrate a file or all files in the folder from Orbiter to Hopper",
        description:
        "It migrates a file or all files in the folder from Orbiter to Hopper.",
        inputSchema: { file_or_folder_path: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ file_or_folder_path }, e) => {
        trackEvent("migrate_from_orbiter_to_hopper", { filePath: file_or_folder_path }, e?.requestInfo);

        return {
            content: [{
                type: "text",
                text:
                `1. Run \`pnpx @workleap/migrations -t ${file_or_folder_path}\` in terminal to migrate the file/folder from Orbiter to Hopper.
                 2. Review the files for errors:
                    - Update the Hopper packages if they are not up-to-date and if it is required (e.g. the component is missing).
                    - There are some added \`Migration TODO\`s comments in the code. Try to address them.
                    - There might also be \`migration-notes.md\` file generated. Review them for additional guidance.
                    - For each component you can check the Component documentation's Migration notes to manually adjust the code.
                 3. If some components are not migrated, you can use the \`get_component_documentation\` tool to get the component documentation and follow the migration notes.
                 4. Make sure the migrated code adheres to Hopper's design system standards.
                 `
            }]
        };
    });
}
