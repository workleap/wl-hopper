import type { Meta, StoryObj } from "@storybook/react-webpack5";

import Sidebar from "./Sidebar";
import getPageLinks from "@/app/lib/getPageLinks";

const meta = {
    title: "app/layout/Sidebar",
    component: Sidebar,
    parameters: {
        viewport: {
            defaultViewport: "mobile1"
        }
    }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        links: getPageLinks([
            {
                _id: "1",
                title: "Getting Started",
                _raw: {
                    flattenedPath: "/getting-started",
                    sourceFileDir: "/pages"
                }
            },
            {
                _id: "2",
                title: "Components",
                _raw: {
                    flattenedPath: "/components",
                    sourceFileDir: "/pages"
                }
            },
            {
                _id: "3",
                title: "Icons",
                _raw: {
                    flattenedPath: "/icons",
                    sourceFileDir: "/pages"
                }
            }
        ])
    }
};
