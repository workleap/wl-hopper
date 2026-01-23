import { Select, SelectItem, type SelectProps, SelectSection, useAsyncList } from "@hopper-ui/components";
import { AddIcon, SparklesIcon } from "@hopper-ui/icons";
import { allColorModesAndThemes } from "@hopper-ui/storybook-addon";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-webpack5";
import { userEvent, within } from "storybook/test";

import { Button } from "../../../buttons/index.ts";
import { Header } from "../../../header/index.ts";
import { Inline, Stack } from "../../../layout/index.ts";
import { Text } from "../../../typography/index.ts";

const meta = {
    title: "Components/Select",
    component: Select,
    args: {
        children: [],
        "aria-label": "Animals"
    },
    parameters: {
        chromatic: {
            modes: allColorModesAndThemes
        }
    }
} satisfies Meta<typeof Select>;

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
        <Select {...args}>
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
    ),
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Sections = {
    render: args => (
        <Select {...args}>
            <SelectSection>
                <Header>Cats</Header>
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
                <SelectItem id="4">Rengar</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Dogs</Header>
                <SelectItem id="5">Teemo</SelectItem>
                <SelectItem id="6">Scooter</SelectItem>
                <SelectItem id="7">Prince</SelectItem>
            </SelectSection>
        </Select>
    ),
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const Footer = {
    render: args => (
        <Select {...args} footer={<Button variant="ghost-secondary" isFluid><AddIcon /><Text>Add</Text></Button>}>
            <SelectSection>
                <Header>Cats</Header>
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
                <SelectItem id="4">Rengar</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Dogs</Header>
                <SelectItem id="5">Teemo</SelectItem>
                <SelectItem id="6">Scooter</SelectItem>
                <SelectItem id="7">Prince</SelectItem>
            </SelectSection>
        </Select>
    ),
    play: playFn,
    decorators: marginBottomDecoratorLG
} satisfies Story;

export const TextFooter = {
    render: args => (
        <Select {...args} footer={<Text>This is a list of animals</Text>}>
            <SelectSection>
                <Header>Cats</Header>
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
                <SelectItem id="4">Rengar</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Dogs</Header>
                <SelectItem id="5">Teemo</SelectItem>
                <SelectItem id="6">Scooter</SelectItem>
                <SelectItem id="7">Prince</SelectItem>
            </SelectSection>
        </Select>
    ),
    play: playFn,
    decorators: marginBottomDecoratorLG
} satisfies Story;

export const Small = {
    render: args => (
        <Select {...args}>
            <SelectSection>
                <Header>Cats</Header>
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
                <SelectItem id="4">Rengar</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Dogs</Header>
                <SelectItem id="5">Teemo</SelectItem>
                <SelectItem id="6">Scooter</SelectItem>
                <SelectItem id="7">Prince</SelectItem>
            </SelectSection>
        </Select>
    ),
    args: {
        defaultValue: "2",
        size: "sm"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const Medium = {
    render: args => (
        <Select {...args}>
            <SelectSection>
                <Header>Cats</Header>
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
                <SelectItem id="4">Rengar</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Dogs</Header>
                <SelectItem id="5">Teemo</SelectItem>
                <SelectItem id="6">Scooter</SelectItem>
                <SelectItem id="7">Prince</SelectItem>
            </SelectSection>
        </Select>
    ),
    args: {
        defaultValue: "2",
        size: "md"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

export const OpenWithSelectedItem = {
    ...OnlyItems,
    args: {
        defaultValue: "cat"
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
                    <Select {...args} defaultValue="cat">
                        <SelectItem id="dog">Dog</SelectItem>
                        <SelectItem id="cat">Cat</SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <Select {...args} value="cat">
                        <SelectItem id="dog">Dog</SelectItem>
                        <SelectItem id="cat">Cat</SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <Select {...args} defaultValue="raccoon" isDisabled>
                <SelectItem id="dog">Dog</SelectItem>
                <SelectItem id="raccoon">Raccoon</SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Fluid</h1>
            <Select {...args} defaultValue="raccoon" isFluid>
                <SelectItem id="dog">Dog</SelectItem>
                <SelectItem id="raccoon">Raccoon</SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Limited Width</h1>
            <Div width="11%">
                <Select {...args} defaultValue="raccoon" isFluid>
                    <SelectItem id="dog">Dog</SelectItem>
                    <SelectItem id="raccoon">Raccoon</SelectItem>
                    <SelectItem id="frog">Frog</SelectItem>
                </Select>
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
                    <Select {...args} defaultValue="raccoon">
                        <SelectItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </SelectItem>
                        <SelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <Select {...args} value="raccoon">
                        <SelectItem id="dog" textValue="Dog">
                            <SparklesIcon />
                            <Text>Dog</Text>
                        </SelectItem>
                        <SelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon />
                            <Text>Raccoon</Text>
                        </SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <Select {...args} defaultValue="raccoon" isDisabled>
                <SelectItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </SelectItem>
                <SelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Fluid</h1>
            <Select {...args} defaultValue="raccoon" isFluid>
                <SelectItem id="dog" textValue="Dog">
                    <SparklesIcon />
                    <Text>Dog</Text>
                </SelectItem>
                <SelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon />
                    <Text>Raccoon</Text>
                </SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Limited Width</h1>
            <Div width="11%">
                <Select {...args} defaultValue="raccoon" isFluid>
                    <SelectItem id="dog" textValue="Dog">
                        <SparklesIcon />
                        <Text>Dog</Text>
                    </SelectItem>
                    <SelectItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon />
                        <Text>Raccoon</Text>
                    </SelectItem>
                    <SelectItem id="frog">Frog</SelectItem>
                </Select>
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
                    <Select {...args} defaultValue="raccoon">
                        <SelectItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </SelectItem>
                        <SelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
                <Div>
                    <h1>Selected Key</h1>
                    <Select {...args} value="raccoon">
                        <SelectItem id="dog" textValue="Dog">
                            <SparklesIcon slot="end-icon" />
                            <Text>Dog</Text>
                        </SelectItem>
                        <SelectItem id="raccoon" textValue="Raccoon">
                            <SparklesIcon slot="end-icon" />
                            <Text>Raccoon</Text>
                        </SelectItem>
                        <SelectItem id="frog">Frog</SelectItem>
                    </Select>
                </Div>
            </Inline>
            <h1>Disabled</h1>
            <Select {...args} defaultValue="raccoon" isDisabled>
                <SelectItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </SelectItem>
                <SelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Fluid</h1>
            <Select {...args} defaultValue="raccoon" isFluid>
                <SelectItem id="dog" textValue="Dog">
                    <SparklesIcon slot="end-icon" />
                    <Text>Dog</Text>
                </SelectItem>
                <SelectItem id="raccoon" textValue="Raccoon">
                    <SparklesIcon slot="end-icon" />
                    <Text>Raccoon</Text>
                </SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <h1>Limited Width</h1>
            <Div width="11%">
                <Select {...args} defaultValue="raccoon" isFluid>
                    <SelectItem id="dog" textValue="Dog">
                        <SparklesIcon slot="end-icon" />
                        <Text>Dog</Text>
                    </SelectItem>
                    <SelectItem id="raccoon" textValue="Raccoon">
                        <SparklesIcon slot="end-icon" />
                        <Text>Raccoon</Text>
                    </SelectItem>
                    <SelectItem id="frog">Frog</SelectItem>
                </Select>
            </Div>
        </Stack>
    )
} satisfies Story;

export const SelectItemWithDescription = {
    render: args => (
        <Select {...args}>
            <SelectItem id="dog" textValue="Dog">
                <Text>Dog</Text>
                <Text slot="description">I come in many different breeds</Text>
            </SelectItem>
            <SelectItem id="raccoon" textValue="Raccoon">
                <Text>Raccoon</Text>
                <Text slot="description">I am nocturnal</Text>
            </SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
    ),
    args: {
        defaultValue: "raccoon"
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
        defaultValue: "7"
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
        <Select {...args}>
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
    ),
    args: {
        popoverProps: { UNSAFE_width: "30rem" }
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const MenuAutoWidth = {
    render: args => (
        <Select {...args}>
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
    ),
    args: {
        isAutoMenuWidth: true
    },
    play: playFn,
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Direction = {
    render: args => (
        <Select {...args}>
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
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
        <Select {...args}>
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
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
        defaultValue: "raccoon"
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

const StateTemplate = (args: Partial<SelectProps<object>>) => (
    <Stack>
        <Inline alignY="center">
            <Select {...args} label="Small">
                <SelectItem id="dog">Dog</SelectItem>
                <SelectItem id="cat">Cat</SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
            <Select
                {...args}
                size="md"
                label="Medium"
            >
                <SelectItem id="dog">Dog</SelectItem>
                <SelectItem id="cat">Cat</SelectItem>
                <SelectItem id="frog">Frog</SelectItem>
            </Select>
        </Inline>
        <Select
            {...args}
            isDisabled
            label="Disabled"
        >
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
        <Select
            {...args}
            isInvalid
            label="Invalid"
        >
            <SelectItem id="dog">Dog</SelectItem>
            <SelectItem id="cat">Cat</SelectItem>
            <SelectItem id="frog">Frog</SelectItem>
        </Select>
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
        defaultValue: "cat"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Zoom = {
    render: args => (
        <Inline>
            <Div className="zoom-in">
                <Select {...args}>
                    <SelectItem id="1">Zoomy</SelectItem>
                    <SelectItem id="2">Voodoo</SelectItem>
                    <SelectItem id="3">Dusty</SelectItem>
                </Select>
            </Div>
            <Div className="zoom-out">
                <Select {...args}>
                    <SelectItem id="1">Zoomy</SelectItem>
                    <SelectItem id="2">Voodoo</SelectItem>
                    <SelectItem id="3">Dusty</SelectItem>
                </Select>
            </Div>
        </Inline>
    ),
    args: {
        defaultValue: "2"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

export const Styling = {
    render: args => (
        <Inline>
            <Select
                {...args}
                triggerProps={
                    { border: "warning" }
                }
            >
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
            </Select>
            <Select
                {...args}
                triggerProps={
                    { className: "border-red" }
                }
            >
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
            </Select>
            <Select
                {...args}
                triggerProps={
                    { style: { border: "1px solid red" } }
                }
            >
                <SelectItem id="1">Zoomy</SelectItem>
                <SelectItem id="2">Voodoo</SelectItem>
                <SelectItem id="3">Dusty</SelectItem>
            </Select>
        </Inline>
    ),
    args: {
        defaultValue: "2"
    },
    decorators: marginBottomDecoratorSM
} satisfies Story;

const ANIMALS = [
    { id: "aardvark", name: "Aardvark" },
    { id: "albatross", name: "Albatross" },
    { id: "alligator", name: "Alligator" },
    { id: "bear", name: "Bear" },
    { id: "cat", name: "Cat" },
    { id: "dog", name: "Dog" },
    { id: "elephant", name: "Elephant" },
    { id: "fox", name: "Fox" },
    { id: "giraffe", name: "Giraffe" },
    { id: "horse", name: "Horse" },
    { id: "iguana", name: "Iguana" },
    { id: "jaguar", name: "Jaguar" },
    { id: "kangaroo", name: "Kangaroo" },
    { id: "lion", name: "Lion" },
    { id: "monkey", name: "Monkey" }
];

export const SearchableSelect = {
    render: args => {
        return (
            <Select
                {...args}
                aria-label="Animals"
                items={ANIMALS}
                isFilterable
            >
                {item => <SelectItem id={(item as typeof ANIMALS[0]).id}>{(item as typeof ANIMALS[0]).name}</SelectItem>}
            </Select>
        );
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;

const MOCK_POKEMON_DATA = [
    [
        { name: "bulbasaur" }, { name: "ivysaur" }, { name: "venusaur" }, { name: "charmander" },
        { name: "charmeleon" }, { name: "charizard" }, { name: "squirtle" }, { name: "wartortle" },
        { name: "blastoise" }, { name: "caterpie" }
    ],
    [
        { name: "metapod" }, { name: "butterfree" }, { name: "weedle" }, { name: "kakuna" },
        { name: "beedrill" }, { name: "pidgey" }, { name: "pidgeotto" }, { name: "pidgeot" },
        { name: "rattata" }, { name: "raticate" }
    ],
    [
        { name: "spearow" }, { name: "fearow" }, { name: "ekans" }, { name: "arbok" },
        { name: "pikachu" }, { name: "raichu" }, { name: "sandshrew" }, { name: "sandslash" },
        { name: "nidoran" }, { name: "nidorina" }
    ]
];

export const SearchableSelectWithLoadMore = {
    render: args => {
        interface Character {
            name: string;
        }
        const list = useAsyncList<Character>({
            async load({ cursor }) {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 300));

                const pageIndex = cursor ? parseInt(cursor, 10) : 0;
                const hasMore = pageIndex < MOCK_POKEMON_DATA.length - 1;

                return {
                    items: MOCK_POKEMON_DATA[pageIndex],
                    cursor: hasMore ? String(pageIndex + 1) : undefined
                };
            }
        });
        return (
            <Select
                {...args}
                isFilterable
                items={list.items}
                isLoading={list.isLoading}
                onLoadMore={() => list.loadMore()}
            >
                {item => {
                    const { name } = item as Character;

                    return <SelectItem id={name}>{name}</SelectItem>;
                }}
            </Select>
        );
    },
    play: playFn,
    decorators: marginBottomDecoratorMD
} satisfies Story;
