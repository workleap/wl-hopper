import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Divider } from "../../src/Divider.tsx";

const meta = {
    title: "Components/Divider",
    component: Divider
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal = {
    render: args => {
        return (
            <Stack>
                <h1>Default</h1>
                <Divider {...args} />
                <h1>Multiple</h1>
                <Text>Apollo 8 - 1968</Text>
                <Divider {...args} />
                <Text>Apollo 11 - 1969</Text>
                <Divider {...args} />
                <Text>Luna 16 - 1970</Text>
                <Divider {...args} />
                <Text>Salyut 1 - 1971</Text>
                <h1>Zoom</h1>
                <Div className="zoom-in">
                    <Divider {...args} />
                </Div>
                <Div className="zoom-out">
                    <Divider {...args} />
                </Div>
                <h1>Styling</h1>
                <Divider {...args} width="core_320" />
                <Divider {...args} className="border-red" />
                <Divider {...args} style={{ borderColor: "red" }} />
            </Stack>
        );
    }
} satisfies Story;

export const Vertical = {
    render: args => {
        return (
            <Stack>
                <h1>Default</h1>
                <Inline height="core_160">
                    <Divider {...args} />
                </Inline>
                <h1>Multiple</h1>
                <Inline>
                    <Text>Apollo 8 - 1968</Text>
                    <Divider {...args} />
                    <Text>Apollo 11 - 1969</Text>
                    <Divider {...args} />
                    <Text>Luna 16 - 1970</Text>
                    <Divider {...args} />
                    <Text>Salyut 1 - 1971</Text>
                </Inline>
                <h1>Zoom</h1>
                <Inline height="core_160">
                    <Divider {...args} className="zoom-in" />
                    <Divider {...args} className="zoom-out" />
                </Inline>
                <h1>Styling</h1>
                <Inline>
                    <Divider {...args} height="core_1280" />
                    <Divider {...args} height="core_160" />
                    <Divider {...args} height="core_240" style={{ borderColor: "red" }} />
                </Inline>
            </Stack>
        );
    },
    args: {
        orientation: "vertical"
    }
} satisfies Story;
