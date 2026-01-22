import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { List, type Style, type TokenType } from "./components/List.tsx";
import darkTokens from "./datas/tokens-dark.json";
import tokens from "./datas/tokens.json";

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

export const Core: Story = {
    args: {
        styles: filterByTokenType(tokens, "core"),
        tokenType: "core"
    }
};

export const SemanticBackgroundLight: Story = {
    args: {
        styles: filterByTokenType(tokens, "background"),
        tokenType: "background"
    }
};

export const SemanticBackgroundDark = {
    args: {
        styles: filterByTokenType(darkTokens, "background"),
        tokenType: "background"
    }
};

export const SemanticBorderLight: Story = {
    args: {
        styles: filterByTokenType(tokens, "border"),
        tokenType: "border"
    }
};

export const SemanticBorderDark = {
    args: {
        styles: filterByTokenType(darkTokens, "border"),
        tokenType: "border"
    }
};

export const SemanticIconLight: Story = {
    args: {
        styles: filterByTokenType(tokens, "icon"),
        tokenType: "icon"
    }
};

export const SemanticIconDark = {
    args: {
        styles: filterByTokenType(darkTokens, "icon"),
        tokenType: "icon"
    }
};

export const SemanticTextLight: Story = {
    args: {
        styles: filterByTokenType(tokens, "text"),
        tokenType: "text"
    }
};

export const SemanticTextDark = {
    args: {
        styles: filterByTokenType(darkTokens, "text"),
        tokenType: "text"
    }
};

export const DataVizLight: Story = {
    args: {
        styles: filterByTokenType(tokens, "dataViz"),
        tokenType: "dataViz"
    }
};

export const DataVizDark = {
    args: {
        styles: filterByTokenType(darkTokens, "dataViz"),
        tokenType: "dataViz"
    }
};
