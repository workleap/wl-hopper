import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { HighlightCode, highlightCode } from "./";

const meta = {
    title: "components/HighlightCode",
    component: HighlightCode
} satisfies Meta<typeof HighlightCode>;

export default meta;
type Story = StoryObj<typeof meta>;

const code = await highlightCode(`
\`\`\`shell showLineNumbers
pnpm install @hopper-ui/icons
\`\`\`
`);

export const Default: Story = {
    args: {
        code: code
    }
};
