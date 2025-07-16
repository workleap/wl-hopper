/* eslint-disable max-len */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { getComponentDocumentation, getDocumentContentResult, getGuideDocumentation, trackUserInteraction, type GuideSection } from "./utils.js";


export function tools(server: McpServer) {
    server.registerTool("get_started", {
        title: "Get Start",
        annotations: {
            readOnlyHint: true
        },
        description:
        "Start with this tool. This service help you building app or part of it using Hopper Design System. Always start with calling this tool."
    }, async () => {
        trackUserInteraction("get_started");

        return {
            content: [{
                type: "text",
                text:
            `1. Make sure Hopper Design System packages and styles are installed in the project. Use the get_guide tool to get details.
             2. HopperProvider is setup correctly in the app. You also need to know it well before starting.
             3. IMPORTANT!!! Before starting, use get_guide tool to get guides for styles and tokens. They have critical information on how to use Hopper Design System. You need to know them before creating components.
            `
            }]
        };
    });

    server.registerTool("get_components_list", {
        title: "list of all available components",
        description:
        "Get a list of all components in the Hopper Design System."
    }, async () => {
        trackUserInteraction("get_components_list");

        return getGuideDocumentation("components-list");
    });


    server.registerTool("get_component_doc", {
        title: "Get Component Documentation",
        description:
        "How to use a specific component in Hopper Design System. This service returns a Markdown content with details on how a component should be used. Call this service before using a component.",
        inputSchema: { component_name: z.string() }
    }, async ({ component_name }) => {
        return getComponentDocumentation(component_name, "usage");
    });

    server.registerTool("get_component_api", {
        title: "Get Component API",
        description:
        "Get properties, attributes, methods, events for a specific component. This service returns a JSON API content. Call this service after you have read the component documentation.",
        inputSchema: { component_name: z.string() }
    }, async ({ component_name }) => {
        return getComponentDocumentation(component_name, "api");
    });

    server.registerTool("fetch_full_docs_from_url", {
        title: "Fetch Full Documentation",
        description: "Retrieve complete documentation for specific paths from hopper.workleap.design domain. Use this service if you see a link in responses that points to hopper.workleap.design domain.",
        inputSchema: { url: z.string() }
    }, async ({ url }) => {
        trackUserInteraction("fetch_full_docs_from_url", { url });

        return getDocumentContentResult(url);
    });

    server.registerTool("get_guide", {
        title: "Get guide or best practices on how to use Hopper Design System",
        description:
        `This service provides different guides. The guides are:
        - installation: How to install Hopper Design System packages and styles in your project.
        - styles: How to use CSS properties and design tokens in Hopper Design System. We don't use "style" prop. Instead the properties are available as props on the components. Read this guide to understand how.
        - tokens: How tokens are defined. You should read "styles" guide first and through "token" guide you will understand how to use them.
        - color-schemes: Learn how color schemes work in Hopper, including how applications can adapt to operating system's dark mode.
        - icons: How to use icons in Hopper Design System. Hopper offers a versatile and comprehensive icon system tailored to meet diverse project needs
        `,
        inputSchema: { guide: z.string() }
    }, async ({ guide }) => {
        trackUserInteraction("get_guide", { guide });

        return getGuideDocumentation(guide ? guide as GuideSection : "styles");
    });

    // server.registerTool("validate_component", {
    //     title: "Validate Component",
    //     description:
    //     "This service validates a component's props and structure. It ensures that the component adheres to the design system's guidelines and best practices. Use this to validate your generated/updated codes",
    //     inputSchema: { code: z.string() }
    // }, async ({ code }) => {
    //     trackUserInteraction("validate_component", { code });

    //     const valid = code !== "";
    //     if (!valid) {
    //         return {
    //             content: [{
    //                 type: "text",
    //                 text: "The code is invalid. Please fix the errors and try again."
    //             }]
    //         };
    //     }

    //     return {
    //         content: [{
    //             type: "text",
    //             text: "The code is valid to me but make sure to run tsc and eslint to ensure it meets the TypeScript and ESLint standards."
    //         }]
    //     };
    // });
}
