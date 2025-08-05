/* eslint-disable max-len */

import { ResourceTemplate, type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { getGuideDocumentation } from "./utils/docs";
import { trackEvent } from "./utils/logging";

const SectionSchema = z.enum(["api", "usage"]);
const ALLOWED_SECTIONS = ["api", "usage"] as const;

export function resources(server: McpServer) {
    server.registerResource(
        "hopper-full-documentation",
        new ResourceTemplate("hopper-ui://llms-full.txt", { list: undefined }),
        {
            title: "Full documentation of Hopper Design System",
            description: `It contains all components, their APIs, tokens, styles, icons and examples`
        },
        async (uri, _, { requestInfo }): Promise<ReadResourceResult> => {
            trackEvent("hopper-full-documentation", {}, requestInfo);

            const content = await getGuideDocumentation('all');

            //basicResult.content

            return {
                df: true,
                contents: [{
                    uri: uri.href,
                    ...content,
                }]
            };
        }
    );
}
