import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button } from "../../../buttons/index.ts";
import { createToastQueue, ToastRegion } from "../../index.ts";

const toast = createToastQueue();

const meta = {
    title: "Components/ToastRegion",
    component: ToastRegion,
    args: {
        queue: toast
    }
} satisfies Meta<typeof ToastRegion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: props => (
        <>
            <ToastRegion {...props} />
            <Button onPress={() => toast.success("Files uploaded")}>Show Toast</Button>
        </>
    )
} satisfies Story;
