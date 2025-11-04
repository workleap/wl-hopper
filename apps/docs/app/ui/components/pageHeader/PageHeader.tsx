"use client";

import Title from "@/app/ui/components/title/Title";
import { Button, Divider, Inline, Menu, MenuItem, MenuTrigger, Text, Tooltip, TooltipTrigger } from "@hopper-ui/components";
import { AngleDownIcon } from "@hopper-ui/icons";

interface PageHeaderProps {
    title: string;
    aiDocAbsolutePath?: string | null;
    sectionTitle: string;
    sectionPath: string;
}

function MarkdownIcon() {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, marginRight: "0.5rem" }}>
            <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <path fillRule="evenodd" d="M9.146 8.146a.5.5 0 0 1 .708 0L11.5 9.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708"></path>
            <path fillRule="evenodd" d="M11.5 5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5"></path>
            <path d="M3.56 11V7.01h.056l1.428 3.239h.774l1.42-3.24h.056V11h1.073V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H2.5V11z"></path>
        </svg>
    );
}

function ChatGPTIcon() {
    return (
        <svg width="16" height="16" role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, marginRight: "0.5rem" }}>
            <title>OpenAI</title>
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
        </svg>
    );
}

function ClaudeIcon() {
    return (
        <svg width="16" height="16" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, marginRight: "0.5rem" }}>
            <title>Anthropic</title>
            <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"></path>
        </svg>
    );
}

function getBaseUrl(): string {
    return typeof window !== "undefined" ? window.location.origin : "";
}

export function PageHeader({ title, aiDocAbsolutePath, sectionTitle, sectionPath }: PageHeaderProps) {
    const baseUrl = getBaseUrl();
    const fullMarkdownUrl = aiDocAbsolutePath && baseUrl
        ? `${baseUrl}${aiDocAbsolutePath}`
        : aiDocAbsolutePath;

    // Extract section URL for index.md
    const sectionIndexUrl = sectionPath && baseUrl
        ? `${baseUrl}/${sectionPath}/index.md`
        : null;

    const chatGptUrl = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Use web browsing to access links and information: ${fullMarkdownUrl}.\n\nI want to ask some questions`)}`;
    const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(`Use web browsing to access links and information: ${fullMarkdownUrl}.\n\nI want to ask some questions`)}`;

    return (
        !aiDocAbsolutePath ? <Title level={1}>{title}</Title> :
        <Inline alignY="baseline" gap="inline-sm" wrap={false}>
            <Title level={1}>{title}</Title>
            <MenuTrigger>
                <TooltipTrigger>
                    <Button variant="secondary" size="xs" aria-label="Page options" minWidth="core_240">
                        <AngleDownIcon />
                    </Button>
                    <Tooltip>View in Markdown or AI tools</Tooltip>
                </TooltipTrigger>
                <Menu>
                    <MenuItem href={fullMarkdownUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                        <MarkdownIcon />
                        <Text>View as Markdown</Text>
                    </MenuItem>
                    <MenuItem href={chatGptUrl} target="_blank" rel="noopener noreferrer">
                        <ChatGPTIcon />
                        <Text>Open in ChatGPT</Text>
                    </MenuItem>
                    <MenuItem href={claudeUrl} target="_blank" rel="noopener noreferrer">
                        <ClaudeIcon />
                        <Text>Open in Claude</Text>
                    </MenuItem>
                    {sectionIndexUrl && (
                        <>
                            <Divider />
                            <MenuItem href={sectionIndexUrl} target="_blank" rel="noopener noreferrer">
                                <MarkdownIcon />
                                <Text>{sectionTitle} Complete Reference</Text>
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </MenuTrigger>
        </Inline>
    );
}
