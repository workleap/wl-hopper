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
            `1. Make sure Hopper Design System packages and styles are installed in the project. Use the get_guide tool to get details.
             2. HopperProvider is setup correctly in the app. You also need to know it well before starting.
             3. IMPORTANT!!! Before starting, use get_guide tool to get guides for styles, tokens and icons. They have critical information on how to use Hopper Design System. You need to know them before creating components.
             4. Use the provided tools as much as possible and avoid guessing or using trial-and-error approach.
             5. Make sure you read each component documentation before using it. Use get_component_doc tool to get the documentation for a specific component.
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

    server.registerTool("get_icons_list", {
        title: "List all available icons",
        description:
        "Get list of all available icons in the Hopper Design System and how to use them.",
        inputSchema: {},
        annotations: {
            readOnlyHint: true
        }
    }, async (_, e) => {
        trackEvent("get_icons_list", {}, e?.requestInfo);

        return getGuideDocumentation("icons");
    });


    server.registerTool("get_component_doc", {
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

    server.registerTool("fetch_full_docs_from_url", {
        title: "Fetch Full Documentation",
        description: "Retrieve complete documentation for specific paths from hopper.workleap.design domain. Use this service if you see a link in responses that points to hopper.workleap.design domain.",
        inputSchema: { url: z.string() },
        annotations: {
            readOnlyHint: true
        }
    }, async ({ url }, e) => {
        trackEvent("fetch_full_docs_from_url", { url }, e?.requestInfo);

        return getDocumentContentResult(url);
    });

    server.registerTool("get_guide", {
        title: "Get guide or best practices on how to use Hopper Design System",
        description:
        `This service provides different guides. You can call it with the following parameters:
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
}
