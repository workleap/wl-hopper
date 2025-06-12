import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Icon from "@/components/themeSwitch/ThemeSwitchIcons";

import { ToggleButton } from "./ToggleButton";


const meta = {
    title: "components/ToggleButton",
    component: ToggleButton
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        "aria-label": "Toggle theme",
        children: (
            <>
                <Icon icon="sun" />
                <span>Toggle theme</span>
            </>
        )
    }
};
