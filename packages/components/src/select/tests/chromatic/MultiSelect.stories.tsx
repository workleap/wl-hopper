import { MultiSelect, MultiSelectItem, type MultiSelectProps, MultiSelectSection } from "@hopper-ui/components";
import { AddIcon, SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-webpack5";
import { userEvent, within } from "storybook/test";

import { Button } from "../../../buttons/index.ts";
import { Header } from "../../../header/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";

const meta = {
    title: "Components/MultiSelect",
    component: MultiSelect,
    args: {
        children: [],
        "aria-label": "Animals"
    }
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const marginBottomDecoratorSM = [
    (Story: StoryFn) => (
        <Div UNSAFE_marginBottom="12rem">
            <Story />
        </Div>
    )
];

const marginBottomDecoratorMD = [
    (Story: StoryFn) => (
        <Div UNSAFE_marginBottom="20rem">
            <Story />
        </Div>
    )
];

const marginBottomDecoratorLG = [
    (Story: StoryFn) => (
        <Div UNSAFE_marginBottom="24rem">
            <Story />
        </Div>
    )
];

const playFn: Story["play"] = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectTrigger = canvas.getAllByRole("button")[0];
    await userEvent.click(selectTrigger);
};

export const OnlyItems = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Sections = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectSection>
                <Header>Cats</Header>
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
                <MultiSelectItem id="4">Rengar</MultiSelectItem>
            </MultiSelectSection>
            <MultiSelectSection>
                <Header>Dogs</Header>
                <MultiSelectItem id="5">Teemo</MultiSelectItem>
                <MultiSelectItem id="6">Scooter</MultiSelectItem>
                <MultiSelectItem id="7">Prince</MultiSelectItem>
            </MultiSelectSection>
        </MultiSelect>
    ),
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const Footer = {
    render: args => (
        <MultiSelect {...args} footer={<Button variant="ghost-secondary" isFluid><AddIcon /><Text>Add</Text></Button>}>
            <MultiSelectSection>
                <Header>Cats</Header>
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
                <MultiSelectItem id="4">Rengar</MultiSelectItem>
            </MultiSelectSection>
            <MultiSelectSection>
                <Header>Dogs</Header>
                <MultiSelectItem id="5">Teemo</MultiSelectItem>
                <MultiSelectItem id="6">Scooter</MultiSelectItem>
                <MultiSelectItem id="7">Prince</MultiSelectItem>
            </MultiSelectSection>
        </MultiSelect>
    ),
    play: playFn,
    decorators: marginBottomDecoratorLG
} satisfies Story;

export const TextFooter = {
    render: args => (
        <MultiSelect {...args} footer={<Text>This is a list of animals</Text>}>
            <MultiSelectSection>
                <Header>Cats</Header>
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
                <MultiSelectItem id="4">Rengar</MultiSelectItem>
            </MultiSelectSection>
            <MultiSelectSection>
                <Header>Dogs</Header>
                <MultiSelectItem id="5">Teemo</MultiSelectItem>
                <MultiSelectItem id="6">Scooter</MultiSelectItem>
                <MultiSelectItem id="7">Prince</MultiSelectItem>
            </MultiSelectSection>
        </MultiSelect>
    ),
    play: playFn,
    decorators: marginBottomDecoratorLG
} satisfies Story;

export const Small = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectSection>
                <Header>Cats</Header>
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
                <MultiSelectItem id="4">Rengar</MultiSelectItem>
            </MultiSelectSection>
            <MultiSelectSection>
                <Header>Dogs</Header>
                <MultiSelectItem id="5">Teemo</MultiSelectItem>
                <MultiSelectItem id="6">Scooter</MultiSelectItem>
                <MultiSelectItem id="7">Prince</MultiSelectItem>
            </MultiSelectSection>
        </MultiSelect>
    ),
    args: {
        defaultSelectedKey: "2",
        size: "sm"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const Medium = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectSection>
                <Header>Cats</Header>
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
                <MultiSelectItem id="4">Rengar</MultiSelectItem>
            </MultiSelectSection>
            <MultiSelectSection>
                <Header>Dogs</Header>
                <MultiSelectItem id="5">Teemo</MultiSelectItem>
                <MultiSelectItem id="6">Scooter</MultiSelectItem>
                <MultiSelectItem id="7">Prince</MultiSelectItem>
            </MultiSelectSection>
        </MultiSelect>
    ),
    args: {
        defaultSelectedKey: "2",
        size: "md"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const OpenWithSelectedItem = {
    ...OnlyItems,
    args: {
        defaultSelectedKey: "cat"
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const SelectedItem = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default Selected Key</h1>
                    <MultiSelect {...args} defaultValue={["cat", "dog"]}>
                        <MultiSelectItem id="dog">Dog</MultiSelectItem>
                        <MultiSelectItem id="cat">Cat</MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <MultiSelect {...args} value={["cat", "dog"]}>
                        <MultiSelectItem id="dog">Dog</MultiSelectItem>
                        <MultiSelectItem id="cat">Cat</MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <MultiSelect {...args} defaultValue={["raccoon", "dog"]} isDisabled>
                <MultiSelectItem id="dog">Dog</MultiSelectItem>
                <MultiSelectItem id="raccoon">Raccoon</MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Fluid</h1>
            <MultiSelect {...args} defaultValue={["raccoon", "dog"]} isFluid>
                <MultiSelectItem id="dog">Dog</MultiSelectItem>
                <MultiSelectItem id="raccoon">Raccoon</MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Limited Width</h1>
            <Div width="11%">
                <MultiSelect {...args} defaultValue={["raccoon", "dog"]} isFluid>
                    <MultiSelectItem id="dog">Dog</MultiSelectItem>
                    <MultiSelectItem id="raccoon">Raccoon</MultiSelectItem>
                    <MultiSelectItem id="frog">Frog</MultiSelectItem>
                </MultiSelect>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectedItemWithIcon = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default Selected Key</h1>
                    <MultiSelect {...args} defaultSelectedKey="raccoon">
                        <MultiSelectItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <MultiSelect {...args} selectedKey="raccoon">
                        <MultiSelectItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <MultiSelect {...args} defaultSelectedKey="raccoon" isDisabled>
                <MultiSelectItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </MultiSelectItem>
                <MultiSelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Fluid</h1>
            <MultiSelect {...args} defaultSelectedKey="raccoon" isFluid>
                <MultiSelectItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </MultiSelectItem>
                <MultiSelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Limited Width</h1>
            <Div width="11%">
                <MultiSelect {...args} defaultSelectedKey="raccoon" isFluid>
                    <MultiSelectItem id="dog" textValue="Dog">
                        <SparklesIcon />
                        <Text>Dog</Text>
                    </MultiSelectItem>
                    <MultiSelectItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon />
                        <Text>Raccoon</Text>
                    </MultiSelectItem>
                    <MultiSelectItem id="frog">Frog</MultiSelectItem>
                </MultiSelect>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectedItemWithEndIcon = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default Selected Key</h1>
                    <MultiSelect {...args} defaultSelectedKey="raccoon">
                        <MultiSelectItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <MultiSelect {...args} selectedKey="raccoon">
                        <MultiSelectItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </MultiSelectItem>
                        <MultiSelectItem id="frog">Frog</MultiSelectItem>
                    </MultiSelect>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <MultiSelect {...args} defaultSelectedKey="raccoon" isDisabled>
                <MultiSelectItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </MultiSelectItem>
                <MultiSelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Fluid</h1>
            <MultiSelect {...args} defaultSelectedKey="raccoon" isFluid>
                <MultiSelectItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </MultiSelectItem>
                <MultiSelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <h1>Limited Width</h1>
            <Div width="11%">
                <MultiSelect {...args} defaultSelectedKey="raccoon" isFluid>
                    <MultiSelectItem id="dog" textValue="Dog">
                        <SparklesIcon slot="end-icon" />
                        <Text>Dog</Text>
                    </MultiSelectItem>
                    <MultiSelectItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon slot="end-icon" />
                        <Text>Raccoon</Text>
                    </MultiSelectItem>
                    <MultiSelectItem id="frog">Frog</MultiSelectItem>
                </MultiSelect>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectItemWithDescription = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog" textValue="Dog">
                <Text>Dog</Text>
                <Text slot="description">I come in many different breeds</Text>
            </MultiSelectItem>
            <MultiSelectItem id="raccoon" textValue="Raccoon">
                <Text>Raccoon</Text>
                <Text slot="description">I am nocturnal</Text>
            </MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        defaultSelectedKey: "raccoon"
    }
} satisfies Story;

export const TriggerIcon = {
    ...OnlyItems,
    args: {
        prefix: <SparklesIcon />
    }
} satisfies Story;

export const ScrollingWithSelectedItemOutsideVisibleScope = {
    ...Sections,
    args: {
        defaultSelectedKey: "7"
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const selectTrigger = canvas.getAllByRole("button")[0];
        await userEvent.click(selectTrigger);
    },
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const CustomTriggerWidth = {
    ...OnlyItems,
    args: {
        UNSAFE_width: "30rem"
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const CustomMenuWidth = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        popoverProps: { UNSAFE_width: "30rem" }
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const MenuAutoWidth = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        isAutoMenuWidth: true
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Direction = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        align: "end",
        direction: { base: "top", md: "bottom", lg: "top" }
    },
    play: playFn,
    decorators: [
        Story => (
            <Div UNSAFE_marginTop="12rem" UNSAFE_marginBottom="4rem">
                <Story />
            </Div>
        )
    ]
} satisfies Story;

export const DirectionTop = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        direction: "top"
    },
    play: playFn,
    decorators: [
        Story => (
            <Div UNSAFE_marginTop="12rem">
                <Story />
            </Div>
        )
    ]
} satisfies Story;

export const Invalid = {
    ...SelectItemWithDescription,
    args: {
        isInvalid: true,
        defaultSelectedKey: "raccoon"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

const StateTemplate = (args: Partial<MultiSelectProps<object>>) => (
    <Stack>
        <Inline alignY="center">
            <MultiSelect {...args} label="Small">
                <MultiSelectItem id="dog">Dog</MultiSelectItem>
                <MultiSelectItem id="cat">Cat</MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
            <MultiSelect
                {...args}
                size="md"
                label="Medium"
            >
                <MultiSelectItem id="dog">Dog</MultiSelectItem>
                <MultiSelectItem id="cat">Cat</MultiSelectItem>
                <MultiSelectItem id="frog">Frog</MultiSelectItem>
            </MultiSelect>
        </Inline>
        <MultiSelect
            {...args}
            isDisabled
            label="Disabled"
        >
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
        <MultiSelect
            {...args}
            isInvalid
            label="Invalid"
        >
            <MultiSelectItem id="dog">Dog</MultiSelectItem>
            <MultiSelectItem id="cat">Cat</MultiSelectItem>
            <MultiSelectItem id="frog">Frog</MultiSelectItem>
        </MultiSelect>
    </Stack>
);

export const TriggerStates = {
    play: ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const triggers = canvas.getAllByRole("button");

        triggers.forEach(trigger => {
            if (trigger.getAttribute("disabled") !== "") {
                const select = trigger.parentElement;

                if (select?.getAttribute("data-chromatic-force-focus")) {
                    trigger?.setAttribute("data-focus-visible", "true");
                    select?.removeAttribute("data-chromatic-force-focus");
                }

                if (select?.getAttribute("data-chromatic-force-press")) {
                    trigger?.setAttribute("data-pressed", "true");
                    select?.removeAttribute("data-chromatic-force-press");
                }

                if (select?.getAttribute("data-chromatic-force-hover")) {
                    trigger.setAttribute("data-hovered", "true");
                    select?.removeAttribute("data-chromatic-force-hover");
                }
            }
        });
    },
    render: args => (
        <Stack>
            <h1>Default</h1>
            <StateTemplate {...args} />
            <h1>Disabled</h1>
            <StateTemplate {...args} isDisabled />
            <h1>Focus Visible</h1>
            <StateTemplate {...args} data-chromatic-force-focus />
            <h1>Hovered</h1>
            <StateTemplate {...args} data-chromatic-force-hover />
            <h1>Active</h1>
            <StateTemplate {...args} data-chromatic-force-press />
            <h1>Focus Visible & Hovered</h1>
            <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
            <h1>Focus Visible, Hovered & Active</h1>
            <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover data-chromatic-force-press />
        </Stack>
    ),
    args: {
        defaultSelectedKey: "cat"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Zoom = {
    render: args => (
        <Inline>
            <Div className="zoom-in">
                <MultiSelect {...args}>
                    <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                    <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                    <MultiSelectItem id="3">Dusty</MultiSelectItem>
                </MultiSelect>
            </Div>
            <Div className="zoom-out">
                <MultiSelect {...args}>
                    <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                    <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                    <MultiSelectItem id="3">Dusty</MultiSelectItem>
                </MultiSelect>
            </Div>
        </Inline>
    ),
    args: {
        defaultSelectedKey: "2"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Styling = {
    render: args => (
        <Inline>
            <MultiSelect
                {...args}
                triggerProps={
                    { border: "warning" }
                }
            >
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
            </MultiSelect>
            <MultiSelect
                {...args}
                triggerProps={
                    { className: "border-red" }
                }
            >
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
            </MultiSelect>
            <MultiSelect
                {...args}
                triggerProps={
                    { style: { border: "1px solid red" } }
                }
            >
                <MultiSelectItem id="1">Zoomy</MultiSelectItem>
                <MultiSelectItem id="2">Voodoo</MultiSelectItem>
                <MultiSelectItem id="3">Dusty</MultiSelectItem>
            </MultiSelect>
        </Inline>
    ),
    args: {
        defaultSelectedKey: "2"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const OverflowingItems = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="element1">Super Long Element</MultiSelectItem>
            <MultiSelectItem id="element2">Super Long Element 2</MultiSelectItem>
            <MultiSelectItem id="element3">Super Long Element 3</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        value: ["element1", "element2"]
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const CustomValue = {
    render: args => (
        <MultiSelect {...args}>
            <MultiSelectItem id="element1">Super Long Element</MultiSelectItem>
            <MultiSelectItem id="element2">Super Long Element 2</MultiSelectItem>
            <MultiSelectItem id="element3">Super Long Element 3</MultiSelectItem>
        </MultiSelect>
    ),
    args: {
        renderValue: ({ selectedItems }) => `Selected (${selectedItems.length})`
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;
