"use client";

import Link from "@/components/link/Link";
import "./AICallout.css";

const AICallout = () => {
    return (
        <div className="hd-ai">
            <span className="hd-ai__tag">AI Tip</span>
            <span> Want to skip the docs? Use the <Link underline href="/getting-started/ai-for-agents/mcp-server">MCP Server</Link></span>
        </div>
    );
};

export default AICallout;
