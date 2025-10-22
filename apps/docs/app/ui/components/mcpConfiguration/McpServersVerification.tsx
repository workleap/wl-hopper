import Tabs from "@/app/ui/components/tabs/Tabs";
import { assistantIcons, assistants, assistantTitles } from "./assistants";

const assistantTabs = assistants.map(assistant => ({
    id: assistant,
    title: assistantTitles[assistant],
    titleIcon: assistantIcons[assistant]

}));

const McpServersVerification = () => {
    const claudeCodeContent = (
        <ul>
            <li>Open Claude Code console</li>
            <li>Type in <code className="hd-code">/mcp</code> and look for the status indicators</li>
            <li>All three servers (Hopper, Figma, Chrome DevTools) should show as active/connected (green)</li>
            <li>If a server fails to start, check the console logs for error messages</li>
        </ul>
    );

    const vscodeContent = (
        <ul>
            <li>Open the Command Palette (<code className="hd-code">⌘ + Shift + P</code> on Mac, <code className="hd-code">Ctrl + Shift + P</code> on Windows/Linux)</li>
            <li>Search for &quot;MCP: List Servers&quot;</li>
            <li>Verify all servers show a green &quot;Running&quot; status</li>
            <li>Click &quot;Start&quot; on any server that isn&apos;t running</li>
        </ul>
    );

    const tabsContent = [claudeCodeContent, vscodeContent].map((content, index) => (
        <div key={assistants[index]}>
            {content}
        </div>
    ));

    return (
        <Tabs tabs={assistantTabs} ariaLabel="Verify MCP Servers">
            {tabsContent}
        </Tabs>
    );
};

export default McpServersVerification;
