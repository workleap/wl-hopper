import Tabs from "@/app/ui/components/tabs/Tabs";
import { HighlightCode, highlightCode } from "@/components/highlightCode";
import Callout from "../callout/Callout";
import { assistantIcons, assistants, assistantTitles } from "./assistants";

const assistantTabs = assistants.map(assistant => ({
    id: assistant,
    title: assistantTitles[assistant],
    titleIcon: assistantIcons[assistant]
}));

const claudeCodeConfig = `\`\`\`json title=".mcp.json"
{
  "mcpServers": {
    "hopper": {
      "url": "https://hopper.workleap.design/mcp",
      "type": "http"
    },
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
\`\`\``;

const vscodeConfig = `\`\`\`json title=".vscode/mcp.json"
{
  "servers": {
    "hopper": {
      "url": "https://hopper.workleap.design/mcp",
      "type": "http"
    },
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    },
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
\`\`\``;

const otherAssistantsContent = "For other MCP-compatible AI assistants (Cursor, Codex, etc.), use a configuration similar to the VS Code setup. Refer to your assistant's documentation for the specific configuration format.";

const formatConfig = async (assistant: typeof assistants[number]) => {
    if (assistant === "claude-code") {
        return await highlightCode(claudeCodeConfig);
    } else if (assistant === "vscode") {
        return await highlightCode(vscodeConfig);
    } else {
        return otherAssistantsContent;
    }
};

const McpConfiguration = async () => {
    const tabsContent = await Promise.all(assistants.map(async assistant => {
        const content = await formatConfig(assistant);

        return (
            <div key={assistant}>
                {assistant === "claude-code" && (
                    <p className="hd-mcp-config__note">
                        Create or update <code className="hd-code">.mcp.json</code> in the root of your project:
                    </p>
                )}
                {assistant === "vscode" && (
                    <p className="hd-mcp-config__note">
                        Create or update <code className="hd-code">.vscode/mcp.json</code> in the root of your project:
                    </p>
                )}
                <HighlightCode code={content} />
            </div>
        );
    }));

    return (
        <>
            <Tabs tabs={assistantTabs} ariaLabel="MCP Configuration">
                {tabsContent}
            </Tabs>
            <Callout variant="information">
                <span><strong>Chrome DevTools MCP</strong> (optional but recommended): Enables visual comparison between your generated code and the original Figma design for better results.</span>
            </Callout>
        </>
    );
};

export default McpConfiguration;
