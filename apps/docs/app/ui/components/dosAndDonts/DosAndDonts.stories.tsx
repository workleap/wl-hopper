import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DosAndDonts from "./DosAndDonts";

const meta = {
    title: "components/DosAndDonts",
    component: DosAndDonts
} satisfies Meta<typeof DosAndDonts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        children: "When a Button contains anything other than a single text node (e.g., an icon, a spinner, or another element), the accompanying text must be wrapped in a `<Text>` component.",
        dos: {
            code: "<Button><SparklesIcon /><Text>Terms and conditions</Text></Button>"
        },
        donts: {
            code: "<Button><SparklesIcon />Terms and conditions</Button>"
        }
    }
} satisfies Story;

export const OnlyCards = {
    args: {
        dos: {
            explanation: "When a Button contains anything other than a single text node, the accompanying text must be wrapped in a `<Text>` component.",
            code: "<Button><SparklesIcon /><Text>Terms and conditions</Text></Button>"
        },
        donts: {
            explanation: "Use text without `<Text>` if you have anything other than a single text node inside the Button.",
            code: "<Button><SparklesIcon />Terms and conditions</Button>"
        }
    }
} satisfies Story;

export const OnlyCode = {
    args: {
        dos: {
            code: "<Button><SparklesIcon /><Text>Terms and conditions</Text></Button>"
        },
        donts: {
            code: "<Button><SparklesIcon />Terms and conditions</Button>"
        }
    }
} satisfies Story;

export const OnlyText = {
    args: {
        dos: {
            explanation: "When a Button contains anything other than a single text node, the accompanying text must be wrapped in a `<Text>` component."
        },
        donts: {
            explanation: "Use text without `<Text>` if you have anything other than a single text node inside the Button."
        }
    }
} satisfies Story;
