import Tabs from "@/app/ui/components/tabs/Tabs";
import { assistantIcons, assistants, assistantTitles } from "./assistants";

const assistantTabs = assistants.map(assistant => ({
    id: assistant,
    title: assistantTitles[assistant],
    titleIcon: assistantIcons[assistant]
}));

const FigmaAuthentication = () => {
    const claudeCodeContent = (
        <>
            <ul>
                <li>Type <code className="hd-code">/mcp</code> in Claude terminal to manage your MCP Servers and select figma</li>
                <li>Select Authenticate</li>
                <li>Click Allow Access when prompted in your browser</li>
                <li>You should see: &quot;Authentication successful. Connected to figma&quot;</li>
            </ul>
        </>
    );

    const vscodeContent = (
        <>
            <ul>
                <li>Open the Command Palette (<code className="hd-code">⌘ + Shift + P</code> on Mac, <code className="hd-code">Ctrl + Shift + P</code> on Windows/Linux)</li>
                <li>Search for &quot;MCP: List Servers&quot;</li>
                <li>Select the Figma server from the list</li>
                <li>Click Start on the Figma server</li>
                <li>Select Authenticate when prompted</li>
            </ul>
        </>
    );

    const tabsContent = [claudeCodeContent, vscodeContent].map((content, index) => (
        <div key={assistants[index]}>
            {content}
        </div>
    ));

    return (
        <>
            <Tabs tabs={assistantTabs} ariaLabel="Figma MCP Authentication">
                {tabsContent}
            </Tabs>
            <p className="hd-figma-auth__link">
                For detailed step-by-step instructions with screenshots, see the{" "}
                <a href="https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/" target="_blank" rel="noopener noreferrer">
                    Figma MCP Server documentation
                </a>.
            </p>
        </>
    );
};

export default FigmaAuthentication;
