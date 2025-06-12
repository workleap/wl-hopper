import type { Meta, StoryObj } from "@storybook/react-webpack5";

import IconButton from "./IconButton";

const meta = {
    title: "components/IconButton",
    component: IconButton
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* eslint-disable max-len */
const copyIcon = <svg stroke="currentColor"
    width="16"
    height="16"
    className="hd-codeblock-copy-button__icon"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M3.33337 9.99992H2.66671C2.31309 9.99992 1.97395 9.85944 1.7239 9.60939C1.47385 9.35935 1.33337 9.02021 1.33337 8.66659V2.66659C1.33337 2.31296 1.47385 1.97382 1.7239 1.72378C1.97395 1.47373 2.31309 1.33325 2.66671 1.33325H8.66671C9.02033 1.33325 9.35947 1.47373 9.60952 1.72378C9.85956 1.97382 10 2.31296 10 2.66659V3.33325"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
</svg>;

export const Default: Story = {
    args: {
        children: copyIcon
    }
};
