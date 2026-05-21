import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta = {
    title: "Components/Typography/Accent"
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleText = "Great work!";

export const Default: Story = {
    render: () => (
        <>
            <Div fontFamily="accent-lg" fontSize="accent-lg" fontWeight="accent-lg" lineHeight="accent-lg">{sampleText}</Div>
            <Div fontFamily="accent-md" fontSize="accent-md" fontWeight="accent-md" lineHeight="accent-md">{sampleText}</Div>
            <Div fontFamily="accent-sm" fontSize="accent-sm" fontWeight="accent-sm" lineHeight="accent-sm">{sampleText}</Div>
            <Div fontFamily="accent-xs" fontSize="accent-xs" fontWeight="accent-xs" lineHeight="accent-xs">{sampleText}</Div>
        </>
    )
};
