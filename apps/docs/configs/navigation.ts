export interface NavItem {
    label: string;
    path: string;
    status: "ready" | "not-ready";
}

export const navigation: NavItem[] = [
    {
        "label": "Getting Started",
        "path": "/getting-started/overview/installation",
        "status": "ready"
    },
    {
        "label": "Tokens",
        "path": "/tokens/overview/introduction",
        "status": "ready"
    },
    {
        "label": "Icons",
        "path": "/icons/overview/introduction",
        "status": "ready"
    },
    {
        "label": "Components",
        "path": "/components/component-list",
        "status": "ready"
    }
];
