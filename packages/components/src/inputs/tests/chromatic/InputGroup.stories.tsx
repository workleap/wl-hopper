import { AngleDownIcon, SearchIcon } from "@hopper-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { ClearButton } from "../../../buttons/index.ts";
import { Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";
import { Input, InputContext } from "../../src/Input.tsx";
import { InputGroup } from "../../src/InputGroup.tsx";

const meta = {
    title: "Components/Forms/InputGroup",
    component: InputGroup
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Stack>
            <InputContext.Provider value={{ size: "sm" }}>
                <InputGroup {...args} />
            </InputContext.Provider>
            <InputGroup {...args} />
        </Stack>
    ),
    args: {
        children: [
            <Input type="text" placeholder="Placeholder" key="1" />
        ]
    }
};

export const PrefixIcon: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: [
            <SearchIcon key="1" color="neutral-weak" />,
            <Input type="text" placeholder="Placeholder" key="2" />
        ]
    }
};

export const PrefixText: Story = {
    ...Default,
    args: {
        ...Default.args,
        children: [
            <Text key="1" color="neutral-weak">$</Text>,
            <Input type="text" placeholder="Placeholder" key="2" />
        ]
    }
};

export const SuffixIcon: Story = {
    name: "Suffix, Icon",
    ...Default,
    args: {
        ...Default.args,
        children: [
            <Input type="text" placeholder="Placeholder" key="1" />,
            <AngleDownIcon key="2" color="neutral-weak" />
        ]
    }
};

export const SuffixIconFixedSize: Story = {
    name: "Suffix, Icon with fixed size",
    ...Default,
    args: {
        ...Default.args,
        children: [
            <Input type="text" placeholder="Placeholder" key="1" />,
            <AngleDownIcon size="sm" key="2" />
        ]
    }
};

export const TextAddon: Story = {
    name: "Suffix, Char. limit",
    ...Default,
    args: {
        ...Default.args,
        children: [
            <Input type="text" placeholder="Placeholder" key="1" />,
            <Text color="neutral-weakest" key="2">XX</Text>
        ]
    }
};

export const ButtonStory: Story = {
    name: "Suffix, Clear CTA",
    ...Default,
    args: {
        ...Default.args,
        children: [
            <Input type="text" placeholder="Placeholder" key="1" />,
            <ClearButton key="2" size="lg" />
        ]
    }
};

export const Disabled: Story = {
    ...Default,
    args: {
        ...Default.args,
        isDisabled: true
    }
};

export const Invalid: Story = {
    ...Default,
    args: {
        ...Default.args,
        isInvalid: true
    }
};

