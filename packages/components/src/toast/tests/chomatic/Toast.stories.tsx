import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ToastState } from "react-aria-components";

import { Toast, type ToastContent } from "../../src/index.ts";

const meta = {
    title: "Components/Toast",
    component: Toast
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const state: ToastState<ToastContent> = {
    add() {},
    close() {},
    visibleToasts: []
} as unknown as ToastState<ToastContent>;

export const DesktopSuccess = {
    args: {
        toast: {
            key: "id",
            content: {
                variant: "success",
                title: "Toast message title"
            }
        },
        state
    }
} satisfies Story;

export const DesktopError = {
    args: {
        toast: {
            key: "id",
            content: {
                variant: "error",
                title: "Toast message title"
            }
        },
        state
    }
} satisfies Story;

export const MobileSuccess = {
    globals: {
        viewport: {
            value: "mobile1"
        }
    },
    args: {
        toast: {
            key: "id",
            content: {
                variant: "success",
                title: "Toast message title"
            }
        },
        state
    }
} satisfies Story;
