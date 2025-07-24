/* eslint-disable max-len */

import { ResourceTemplate, type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { trackEvent } from "./utils.js";

const SectionSchema = z.enum(["api", "usage"]);
const ALLOWED_SECTIONS = ["api", "usage"] as const;

//TODO: VSCode Copilot is not using this. Claude desktop expects user to select resources manually. Probably we remove it soon.
export function resources(server: McpServer) {
    server.registerResource(
        "get_component_description",
        new ResourceTemplate("hopper-ui://components/{component}/{section}", { list: undefined }),
        {
            title: "Component docs",
            description: `JSON API and Markdown usage chunks for each component. Allowed section values: ${ALLOWED_SECTIONS.join(", ")}`
        },
        async (uri, { component, section }, { requestInfo }) => {
            trackEvent("get_component_description [resource]", { component: component.toString(), section: section.toString() }, requestInfo);

            // Validate section parameter
            const validatedSection = SectionSchema.parse(section);

            return {
                contents: [{
                    uri: uri.href,
                    text: `Component: ${component}, Section: ${validatedSection}`
                }]
            };
        }
    );
}
