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
        dos: `
    <Button>
      <SparklesIcon />
      <Text>Terms and conditions</Text>
    </Button>
        `,
        donts: `
    <Button>
      <SparklesIcon />
      Terms and conditions
    </Button>
        `
    }
} satisfies Story;
