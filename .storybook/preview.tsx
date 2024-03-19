import type { Preview } from "@storybook/react";
import { withHopperProvider, viewport } from "@hopper-ui/storybook-addon";
import {
    Description,
    Stories,
    Subtitle,
    Title
} from "@storybook/blocks";

import "./stories.css";
import "@hopper-ui/tokens/fonts.css";

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
                    "Components",
                    "Styled System",
                    "Icons",
                    "Tokens"
                ]
            }
        }
    },
    globalTypes: {
        locale: {
            description: "Internationalization locale",
            defaultValue: "en-US",
            toolbar: {
                title: "Locale",
                icon: "globe",
                items: [
                    { value: "en-US", right: "US", title: "English" },
                    { value: "fr-CA", right: "FR", title: "Français" }
                ],
                dynamicTitle: true
            }
        },
        theme: {
            description: "Global theme for components",
            defaultValue: "light",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" }
                ],
                dynamicTitle: true
            }
        }
    },
    decorators: [withHopperProvider]
};

export default preview;
