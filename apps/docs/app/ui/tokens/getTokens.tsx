import type { ColorScheme } from "@hopper-ui/styled-system";
import sharegateDarkTokens from "../../../datas/sharegate/tokens-dark.json" with { type: "json" };
import sharegateTokens from "../../../datas/sharegate/tokens.json" with { type: "json" };
import workleapDarkTokens from "../../../datas/workleap/tokens-dark.json" with { type: "json" };
import workleapTokens from "../../../datas/workleap/tokens.json" with { type: "json" };

export function getDataTokens({ colorScheme }: { colorScheme?: ColorScheme } = {}) {
    // const theme = window.document.documentElement.dataset.theme as Theme;
    const theme = "workleap";
    switch (theme) {
        case "sharegate":
            return colorScheme === "dark" ? sharegateDarkTokens : sharegateTokens;
        case "workleap":
        default:
            return colorScheme === "dark" ? workleapDarkTokens : workleapTokens;
    }
}
