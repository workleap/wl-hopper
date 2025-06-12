import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Popover, PopoverTrigger } from "./Popover";
import { Button } from "@hopper-ui/components";
import { InfoIcon } from "@hopper-ui/icons";

const meta = {
    title: "components/Popover",
    component: Popover,
    render: props =>
        <PopoverTrigger>
            <Button aria-label="information" variant="secondary"><InfoIcon /></Button>
            <Popover {...props} />
        </PopoverTrigger>
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Popover content"
    }
};
