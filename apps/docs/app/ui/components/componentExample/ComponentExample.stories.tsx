import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { mockGetComponentCode } from "@/app/lib/getComponentCode.mock.ts";
import ComponentExample from "./ComponentExample.tsx";
import HighlightCode from "../../../../components/highlightCode/HighlightCode.tsx";
import ComponentPreview from "@/app/ui/components/componentExample/ComponentPreview.tsx";

const meta = {
    title: "components/ComponentExample",
    component: ComponentExample,
    args: {
        src: "buttons/docs/button"
    }
} satisfies Meta<typeof ComponentExample>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCode = await mockGetComponentCode("import { Button } from \"@headless/button\"");
const preview = <ComponentPreview src="buttons/docs/button/preview" />;
const MockComponentCodeWrapper = ({ code }: { code: string }) => <HighlightCode code={code} />;

export const Default: Story = {
    args: {
        type: "both",
        preview,
        code: <MockComponentCodeWrapper code={mockCode} />
    }
};

export const Code: Story = {
    args: {
        type: "code",
        code: <MockComponentCodeWrapper code={mockCode} />
    }
};

export const Preview: Story = {
    args: {
        type: "preview",
        preview
    }
};

export const Open: Story = {
    args: {
        type: "code",
        code: <MockComponentCodeWrapper code={mockCode} />,
        isOpen: true
    }
};
