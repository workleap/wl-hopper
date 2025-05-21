import { hopperParameters, a11yParameters } from "@hopper-ui/storybook-addon";
import { Div, useColorSchemeContext } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";

import { HopperProvider } from "../../src/HopperProvider.tsx";

const ColoredDiv = () => {
    return (
        <Div
            padding="inset-lg"
            backgroundColor="primary"
        >Hello</Div>
    );
};

const meta = {
    title: "Components/HopperProvider",
    component: HopperProvider,
    args: {
        children: <ColoredDiv />
    },
    parameters: {
        ...hopperParameters({ disabled: true }),
        ...a11yParameters({ disableContrastCheck: true })
    }
} satisfies Meta<typeof HopperProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {
        colorScheme: "light"
    }
};

export const Dark: Story = {
    args: {
        colorScheme: "dark"
    }
};

export const WithBodyStyles: Story = {
    args: {
        colorScheme: "light",
        withBodyStyle: true
    }
};

export const DarkWithBodyStyles: Story = {
    args: {
        colorScheme: "dark",
        withBodyStyle: true
    }
};

const SwitchColorScheme = () => {
    const { setColorScheme } = useColorSchemeContext();

    useEffect(() => {
        setColorScheme("dark");
    }, [setColorScheme]);

    return null;
};

export const SetColorSchemeWithApi: Story = {
    args: {
        colorScheme: "light",
        withBodyStyle: true,
        children: (
            <>
                <SwitchColorScheme />
                <ColoredDiv />
            </>
        )
    }
};
