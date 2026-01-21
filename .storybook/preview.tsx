import { viewport, withHopperProvider } from "@hopper-ui/storybook-addon";
import {
    Description,
    Stories,
    Subtitle,
    Title
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-webpack5";

import "@hopper-ui/styled-system/theme/sharegate.css";
import "@hopper-ui/styled-system/theme/workleap.css";
import "@hopper-ui/tokens/fonts.css";
import { allColorSchemes, ColorSchemeGlobalKey, type ColorSchemeKeys } from "tooling/storybook-addon/color-schemes.ts";
import { allLocales, LocaleGlobalKey, type LocaleKeys } from "tooling/storybook-addon/locale.ts";
import { allThemes, ThemeGlobalKey, type ThemeKeys } from "tooling/storybook-addon/themes.ts";
import "./stories.css";

const preview: Preview = {
    parameters: {
        backgrounds: {
            disable: true
        },
        layout: "fullscreen", // removes the padding around the preview
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        },
        viewport,
        docs: { // only needed while the documentation is not available
            page: () => {
                return (
                    <>
                        <Title />
                        <Subtitle />
                        <Description />
                        <Stories title="Usage" />
                    </>
                );
            }
        },
        options: {
            storySort: {
                order: [
                    "Docs",
                    "Docs-parts",
                    "Components",
                    "Styled System",
                    "Icons",
                    "Tokens"
                ]
            }
        }
    },
    globalTypes: {
        [LocaleGlobalKey]: {
            description: "Internationalization locale",
            defaultValue: "en-US" satisfies LocaleKeys,
            toolbar: {
                title: "Locale",
                icon: "globe",
                items: allLocales,
                dynamicTitle: true
            }
        },
        [ColorSchemeGlobalKey]: {
            description: "Global color schemes for components",
            defaultValue: "light" satisfies ColorSchemeKeys,
            toolbar: {
                title: "Color Scheme",
                icon: "circlehollow",
                items: allColorSchemes,
                dynamicTitle: true
            }
        },
        [ThemeGlobalKey]: {
            description: "Global theme for components",
            defaultValue: "sharegate" satisfies ThemeKeys,
            toolbar: {
                title: "Theme",
                icon: "paintbrush",
                items: allThemes,
                dynamicTitle: true
            }
        }
    },
    decorators: [withHopperProvider]
};

export default preview;
