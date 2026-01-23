import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { List, type Style, type TokenType } from "./components/List.tsx";
import sharegateDarkTokens from "./datas/sharegate/tokens-dark.json" with { type: "json" };
import sharegateTokens from "./datas/sharegate/tokens.json" with { type: "json" };
import workleapDarkTokens from "./datas/workleap/tokens-dark.json" with { type: "json" };
import workleapTokens from "./datas/workleap/tokens.json" with { type: "json" };

const meta = {
    title: "Tokens/Colors",
    component: List,
    parameters: {
        hopper: {
            disabled: true // the story handle their own color scheme
        }
    }
} satisfies Meta<typeof List>;

export default meta;

function filterByTokenType(styles: Style[], tokenType: TokenType) {
    switch (tokenType) {
        case "core":
            return styles.filter(style =>
                !style.name.includes("core") &&
                !style.name.includes("surface") &&
                !style.name.includes("border") &&
                !style.name.includes("text") &&
                !style.name.includes("icon") &&
                !style.name.includes("dataviz")
            );
        case "background":
            return styles.filter(style => style.name.includes("surface"));
        case "border":
            return styles.filter(style => style.name.includes("border"));
        case "text":
            return styles.filter(style => style.name.includes("text"));
        case "icon":
            return styles.filter(style => style.name.includes("icon"));
        case "dataViz":
            return styles.filter(style => style.name.includes("dataviz"));
    }
}

type Story = StoryObj<typeof meta>;

export const WorkleapCore: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "core"),
        tokenType: "core"
    }
};

export const WorkleapSemanticBackgroundLight: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "background"),
        tokenType: "background"
    }
};

export const WorkleapSemanticBackgroundDark = {
    args: {
        styles: filterByTokenType(workleapDarkTokens, "background"),
        tokenType: "background"
    }
};

export const WorkleapSemanticBorderLight: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "border"),
        tokenType: "border"
    }
};

export const WorkleapSemanticBorderDark = {
    args: {
        styles: filterByTokenType(workleapDarkTokens, "border"),
        tokenType: "border"
    }
};

export const WorkleapSemanticIconLight: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "icon"),
        tokenType: "icon"
    }
};

export const WorkleapSemanticIconDark = {
    args: {
        styles: filterByTokenType(workleapDarkTokens, "icon"),
        tokenType: "icon"
    }
};

export const WorkleapSemanticTextLight: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "text"),
        tokenType: "text"
    }
};

export const WorkleapSemanticTextDark = {
    args: {
        styles: filterByTokenType(workleapDarkTokens, "text"),
        tokenType: "text"
    }
};

export const WorkleapDataVizLight: Story = {
    args: {
        styles: filterByTokenType(workleapTokens, "dataViz"),
        tokenType: "dataViz"
    }
};

export const WorkleapDataVizDark = {
    args: {
        styles: filterByTokenType(workleapDarkTokens, "dataViz"),
        tokenType: "dataViz"
    }
};

export const SharegateCore: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "core"),
        tokenType: "core"
    }
};

export const ShareGateSemanticBackgroundLight: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "background"),
        tokenType: "background"
    }
};

export const SharegateSemanticBackgroundDark = {
    args: {
        styles: filterByTokenType(sharegateDarkTokens, "background"),
        tokenType: "background"
    }
};

export const SharegateSemanticBorderLight: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "border"),
        tokenType: "border"
    }
};

export const SharegateSemanticBorderDark = {
    args: {
        styles: filterByTokenType(sharegateDarkTokens, "border"),
        tokenType: "border"
    }
};

export const SharegateSemanticIconLight: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "icon"),
        tokenType: "icon"
    }
};

export const SharegateSemanticIconDark = {
    args: {
        styles: filterByTokenType(sharegateDarkTokens, "icon"),
        tokenType: "icon"
    }
};

export const SharegateSemanticTextLight: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "text"),
        tokenType: "text"
    }
};

export const SharegateSemanticTextDark = {
    args: {
        styles: filterByTokenType(sharegateDarkTokens, "text"),
        tokenType: "text"
    }
};

export const SharegateDataVizLight: Story = {
    args: {
        styles: filterByTokenType(sharegateTokens, "dataViz"),
        tokenType: "dataViz"
    }
};

export const SharegateDataVizDark = {
    args: {
        styles: filterByTokenType(sharegateDarkTokens, "dataViz"),
        tokenType: "dataViz"
    }
};

