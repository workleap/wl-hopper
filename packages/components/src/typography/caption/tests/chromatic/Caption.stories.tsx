import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta = {
    title: "Components/Typography/Caption"
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleText = "Great work!";

export const Default: Story = {
    render: () => (
        <>
            <Div fontFamily="caption-xl" fontSize="caption-xl" fontWeight="caption-xl" lineHeight="caption-xl">{sampleText}</Div>
            <Div fontFamily="caption-lg" fontSize="caption-lg" fontWeight="caption-lg" lineHeight="caption-lg">{sampleText}</Div>
            <Div fontFamily="caption-md" fontSize="caption-md" fontWeight="caption-md" lineHeight="caption-md">{sampleText}</Div>
            <Div fontFamily="caption-sm" fontSize="caption-sm" fontWeight="caption-sm" lineHeight="caption-sm">{sampleText}</Div>
        </>
    )
};
