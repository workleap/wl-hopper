import type { Preview } from "@storybook/react-webpack5";
import type { ReactNode } from "react";

import "../app/globals.css";

// Storybook styles
import "./global.css";

const Container = ({ children, theme }: { children: ReactNode; theme: "light" | "dark" }) => (
    <div className="shd-container" data-theme={theme}>{children}</div>
);

const preview: Preview = {
    parameters: {
        layout: "fullscreen",
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    },
    globalTypes: {
        scheme: {
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
    decorators: [
        (Story, context) => {
            const { scheme } = context.globals;
            const theme = scheme === "light" ? "light" : "dark";

            return (
                <Container theme={theme}>
                    <Story />
                </Container>
            );
        }
    ]
};

export default preview;
