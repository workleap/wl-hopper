import { ColorSchemeGlobalKey, colorSchemesGlobalTypes, LocaleGlobalKey, localesGlobalTypes, viewport, withHopperProvider, type ColorSchemeKeys, type LocaleKeys } from "@hopper-ui/storybook-addon";
import "@hopper-ui/tokens/fonts.css";
import {
    Description,
    Stories,
    Subtitle,
    Title
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-webpack5";
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
                items: localesGlobalTypes,
                dynamicTitle: true
            }
        },
        [ColorSchemeGlobalKey]: {
            description: "Global color scheme for components",
            defaultValue: "light" satisfies ColorSchemeKeys,
            toolbar: {
                title: "Color Scheme",
                icon: "circlehollow",
                items: colorSchemesGlobalTypes,
                dynamicTitle: true
            }
        }
    },
    decorators: [withHopperProvider]
};

export default preview;
