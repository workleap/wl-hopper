import { Button, ComboBox, ComboBoxItem, type ComboBoxProps, ComboBoxSection, Header, Inline, Stack, Text } from "@hopper-ui/components";
import { AddIcon, SparklesIcon } from "@hopper-ui/icons";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

const meta = {
    title: "Components/ComboBox",
    component: ComboBox,
    args: {
        children: [],
        "aria-label": "Animals"
    }
} satisfies Meta<typeof ComboBox>;

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
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Sections = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxSection>
                <Header>Cats</Header>
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
                <ComboBoxItem id="4">Rengar</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Dogs</Header>
                <ComboBoxItem id="5">Teemo</ComboBoxItem>
                <ComboBoxItem id="6">Scooter</ComboBoxItem>
                <ComboBoxItem id="7">Prince</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    ),
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const FieldLabel = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    decorators: marginBottomDecoratorSM,
    args: {
        label: "Animals"
    }
} satisfies Story;

export const FieldHelperMessage = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    decorators: marginBottomDecoratorSM,
    args: {
        description: "These animals can become pets"
    }
} satisfies Story;

export const Footer = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxSection>
                <Header>Cats</Header>
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
                <ComboBoxItem id="4">Rengar</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Dogs</Header>
                <ComboBoxItem id="5">Teemo</ComboBoxItem>
                <ComboBoxItem id="6">Scooter</ComboBoxItem>
                <ComboBoxItem id="7">Prince</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    ),
    play: playFn,
    decorators: marginBottomDecoratorLG,
    args: {
        footer: <Button variant="ghost-secondary" isFluid><AddIcon /><Text>Add</Text></Button>
    }
} satisfies Story;

export const Small = {
    play: playFn,
    render: args => (
        <ComboBox {...args}>
            <ComboBoxSection>
                <Header>Cats</Header>
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
                <ComboBoxItem id="4">Rengar</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Dogs</Header>
                <ComboBoxItem id="5">Teemo</ComboBoxItem>
                <ComboBoxItem id="6">Scooter</ComboBoxItem>
                <ComboBoxItem id="7">Prince</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    ),
    args: {
        defaultSelectedKey: "2",
        size: "sm"
    },
    decorators: marginBottomDecoratorMD
} satisfies Story;


export const Medium = {
    play: playFn,
    render: args => (
        <ComboBox {...args}>
            <ComboBoxSection>
                <Header>Cats</Header>
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
                <ComboBoxItem id="4">Rengar</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Dogs</Header>
                <ComboBoxItem id="5">Teemo</ComboBoxItem>
                <ComboBoxItem id="6">Scooter</ComboBoxItem>
                <ComboBoxItem id="7">Prince</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    ),
    args: {
        defaultSelectedKey: "2",
        size: "md"
    },
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const placeholder = {
    ...OnlyItems,
    args: {
        placeholder: "Name an animal"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const OpenWithInputValue = {
    ...OnlyItems,
    args: {
        defaultInputValue: "cat"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const OpenWithSelectedItem = {
    ...OnlyItems,
    args: {
        defaultSelectedKey: "cat"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const SelectedItem = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default ComboBoxed Key</h1>
                    <ComboBox {...args} defaultSelectedKey="cat">
                        <ComboBoxItem id="dog">Dog</ComboBoxItem>
                        <ComboBoxItem id="cat">Cat</ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
                <Div>
                    <h1>ComboBoxed Key</h1>
                    <ComboBox {...args} selectedKey="cat">
                        <ComboBoxItem id="dog">Dog</ComboBoxItem>
                        <ComboBoxItem id="cat">Cat</ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isDisabled>
                <ComboBoxItem id="dog">Dog</ComboBoxItem>
                <ComboBoxItem id="raccoon">Raccoon</ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Fluid</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                <ComboBoxItem id="dog">Dog</ComboBoxItem>
                <ComboBoxItem id="raccoon">Raccoon</ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Limited Width</h1>
            <Div width="12%">
                <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                    <ComboBoxItem id="dog">Dog</ComboBoxItem>
                    <ComboBoxItem id="raccoon">Raccoon</ComboBoxItem>
                    <ComboBoxItem id="frog">Frog</ComboBoxItem>
                </ComboBox>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectedItemWithIcon = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default ComboBoxed Key</h1>
                    <ComboBox {...args} defaultSelectedKey="raccoon">
                        <ComboBoxItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
                <Div>
                    <h1>ComboBoxed Key</h1>
                    <ComboBox {...args} selectedKey="raccoon">
                        <ComboBoxItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isDisabled>
                <ComboBoxItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </ComboBoxItem>
                <ComboBoxItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Fluid</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                <ComboBoxItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </ComboBoxItem>
                <ComboBoxItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Limited Width</h1>
            <Div width="12%">
                <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                    <ComboBoxItem id="dog" textValue="Dog">
                        <SparklesIcon />
                        <Text>Dog</Text>
                    </ComboBoxItem>
                    <ComboBoxItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon />
                        <Text>Raccoon</Text>
                    </ComboBoxItem>
                    <ComboBoxItem id="frog">Frog</ComboBoxItem>
                </ComboBox>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectedItemWithEndIcon = {
    render: args => (
        <Stack>
            <Inline>
                <Div>
                    <h1>Default ComboBoxed Key</h1>
                    <ComboBox {...args} defaultSelectedKey="raccoon">
                        <ComboBoxItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
                <Div>
                    <h1>ComboBoxed Key</h1>
                    <ComboBox {...args} selectedKey="raccoon">
                        <ComboBoxItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </ComboBoxItem>
                        <ComboBoxItem id="frog">Frog</ComboBoxItem>
                    </ComboBox>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isDisabled>
                <ComboBoxItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </ComboBoxItem>
                <ComboBoxItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Fluid</h1>
            <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                <ComboBoxItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </ComboBoxItem>
                <ComboBoxItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <h1>Limited Width</h1>
            <Div width="12%">
                <ComboBox {...args} defaultSelectedKey="raccoon" isFluid>
                    <ComboBoxItem id="dog" textValue="Dog">
                        <SparklesIcon slot="end-icon" />
                        <Text>Dog</Text>
                    </ComboBoxItem>
                    <ComboBoxItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon slot="end-icon" />
                        <Text>Raccoon</Text>
                    </ComboBoxItem>
                    <ComboBoxItem id="frog">Frog</ComboBoxItem>
                </ComboBox>
            </Div>
        </Stack>
    )
} satisfies Story;

export const ComboBoxItemWithDescription = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog" textValue="Dog">
                <Text>Dog</Text>
                <Text slot="description">I come in many different breeds</Text>
            </ComboBoxItem>
            <ComboBoxItem id="raccoon" textValue="Raccoon">
                <Text>Raccoon</Text>
                <Text slot="description">I am nocturnal</Text>
            </ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    args: {
        defaultSelectedKey: "raccoon"
    }
} satisfies Story;

export const TriggerIcon = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    args: {
        prefix: <SparklesIcon />
    }
} satisfies Story;

export const ScrollingWithSelectedItemOutsideVisibleScope = {
    ...Sections,
    args: {
        defaultSelectedKey: "7"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const CustomTriggerWidth = {
    ...OnlyItems,
    play: playFn,
    args: {
        UNSAFE_width: "30rem"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const CustomMenuWidth = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    play: playFn,
    decorators: marginBottomDecoratorSM,
    args: {
        popoverProps: {
            UNSAFE_width: "30rem"
        }
    }
} satisfies Story;

export const MenuAutoWidth = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    ),
    play: playFn,
    decorators: marginBottomDecoratorSM,
    args: {
        isAutoMenuWidth: true
    }
} satisfies Story;

export const Direction = {
    render: args => (
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
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
        <ComboBox {...args}>
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
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
    ...ComboBoxItemWithDescription,
    play: playFn,
    args: {
        isInvalid: true,
        defaultSelectedKey: "raccoon"
    },
    decorators: marginBottomDecoratorMD
} satisfies Story;

const StateTemplate = (args: Partial<ComboBoxProps<object>>) => (
    <Stack>
        <Inline alignY="center">
            <ComboBox {...args} label="Small">
                <ComboBoxItem id="dog">Dog</ComboBoxItem>
                <ComboBoxItem id="cat">Cat</ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
            <ComboBox {...args}
                size="md"
                label="Medium"
            >
                <ComboBoxItem id="dog">Dog</ComboBoxItem>
                <ComboBoxItem id="cat">Cat</ComboBoxItem>
                <ComboBoxItem id="frog">Frog</ComboBoxItem>
            </ComboBox>
        </Inline>
        <ComboBox {...args}
            isDisabled
            label="Disabled"
        >
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
        <ComboBox {...args}
            isInvalid
            label="Invalid"
        >
            <ComboBoxItem id="dog">Dog</ComboBoxItem>
            <ComboBoxItem id="cat">Cat</ComboBoxItem>
            <ComboBoxItem id="frog">Frog</ComboBoxItem>
        </ComboBox>
    </Stack>
);

export const TriggerStates = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const triggers = canvas.getAllByRole("group");

        triggers.forEach(trigger => {
            if (!trigger.getAttribute("data-disabled")) {
                const select = trigger.parentElement;

                if (select?.getAttribute("data-chromatic-force-focus")) {
                    trigger?.setAttribute("data-focus-visible", "true");
                    select?.removeAttribute("data-chromatic-force-focus");
                }

                if (select?.getAttribute("data-chromatic-force-selected")) {
                    trigger?.setAttribute("data-selected", "true");
                    select?.removeAttribute("data-chromatic-force-selected");
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
            <StateTemplate {...args} data-chromatic-force-selected />
            <h1>Focus Visible & Hovered</h1>
            <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover />
            <h1>Focus Visible, Hovered & Active</h1>
            <StateTemplate {...args} data-chromatic-force-focus data-chromatic-force-hover data-chromatic-force-selected />
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
                <ComboBox {...args}>
                    <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                    <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                    <ComboBoxItem id="3">Dusty</ComboBoxItem>
                </ComboBox>
            </Div>
            <Div className="zoom-out">
                <ComboBox {...args}>
                    <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                    <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                    <ComboBoxItem id="3">Dusty</ComboBoxItem>
                </ComboBox>
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
            <ComboBox {...args}
                triggerProps={
                    { border: "warning" }
                }
            >
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
            </ComboBox>
            <ComboBox {...args}
                triggerProps={
                    { className: "border-red" }
                }
            >
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
            </ComboBox>
            <ComboBox {...args}
                triggerProps={
                    { style: { border: "1px solid red" } }
                }
            >
                <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                <ComboBoxItem id="3">Dusty</ComboBoxItem>
            </ComboBox>
        </Inline>
    ),
    args: {
        defaultSelectedKey: "2"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;
