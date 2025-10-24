import type { DivProps } from "@hopper-ui/styled-system";
import { Div } from "@hopper-ui/styled-system";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fitContent, minmax, repeat } from "../../src/grid-helpers.ts";
import { Grid } from "../../src/Grid.tsx";
import { Inline } from "../../src/Inline.tsx";
import { Stack } from "../../src/Stack.tsx";

const viewports = [640, 768, 1024, 1280, 1440];

function Square(props: DivProps) {
    return (
        <Div
            backgroundColor="decorative-option1"
            minHeight="core_640"
            height="100%"
            width="100%"
            minWidth="core_640"
            padding="inset-sm"
            {...props}
        />
    );
}

const meta = {
    title: "Components/Layout/Grid",
    component: Grid,
    parameters: {
        chromatic: {
            viewports: viewports
        }
    }
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Grid>
            <Square backgroundColor="decorative-option1" />
            <Square backgroundColor="decorative-option2" />
            <Square backgroundColor="decorative-option3" />
            <Square backgroundColor="decorative-option4" />
            <Square backgroundColor="decorative-option5" />
            <Square backgroundColor="decorative-option6" />
        </Grid>
    )
};

export const GridInline: Story = {
    args: {
        inline: true,
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option2" />,
            <Square key="3" backgroundColor="decorative-option3" />
        ]
    },
    name: "Inline",
    render: args => (
        <Div>
            <Grid {...args} />
            <Grid {...args} />
        </Div>
    )
};

export const Nesting: Story = {
    render: () => (
        <Grid templateColumns={["1fr", "1fr"]} gap="stack-md">
            <Grid UNSAFE_templateColumns={["8rem", "auto"]}>
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
            </Grid>
            <Grid UNSAFE_templateColumns={["auto", "4rem"]}>
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
            </Grid>
        </Grid>
    )
};

export const Gap: Story = {
    args: {
        gap: "stack-md",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option2" />,
            <Square key="3" backgroundColor="decorative-option3" />,
            <Square key="4" backgroundColor="decorative-option4" />,
            <Square key="5" backgroundColor="decorative-option5" />,
            <Square key="6" backgroundColor="decorative-option6" />
        ]
    }
};

export const ColumnGap: Story = {
    args: {
        columnGap: "stack-md",
        autoFlow: "column",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option2" />,
            <Square key="3" backgroundColor="decorative-option3" />,
            <Square key="4" backgroundColor="decorative-option4" />,
            <Square key="5" backgroundColor="decorative-option5" />,
            <Square key="6" backgroundColor="decorative-option6" />
        ]
    }
};

export const RowGap: Story = {
    args: {
        rowGap: "stack-md",
        children: [
            <Square key="1" backgroundColor="decorative-option1" />,
            <Square key="2" backgroundColor="decorative-option2" />,
            <Square key="3" backgroundColor="decorative-option3" />,
            <Square key="4" backgroundColor="decorative-option4" />,
            <Square key="5" backgroundColor="decorative-option5" />,
            <Square key="6" backgroundColor="decorative-option6" />
        ]
    }
};

export const TemplateColumns: Story = {
    render: () => (
        <Stack>
            <Grid UNSAFE_templateColumns="80px 64px 80px" gap="stack-md">
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
                <Square backgroundColor="decorative-option6-weak" />
            </Grid>
            <Grid UNSAFE_templateColumns={["8rem", "4.5rem", "8rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid UNSAFE_templateColumns={{ md: ["8rem", "4.5rem"], lg: "150px 100px 150px" }} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};

export const TemplateRows: Story = {
    render: () => (
        <Inline>
            <Grid UNSAFE_templateRows="200px 100px 200px" gap="stack-md">
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
            </Grid>
            <Grid UNSAFE_templateRows={["8rem", "3.5rem", "8rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
            </Grid>
            <Grid UNSAFE_templateRows={{ md: ["8rem", "3.5rem", "8rem"], lg: "200px 100px 200px" }} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
            </Grid>
        </Inline>
    )
};

export const Areas: Story = {
    render: () => (
        <Stack>
            <Grid areas={["a a", "b c", "d e"]} gap="stack-md">
                <Square gridArea="a" backgroundColor="decorative-option1">a</Square>
                <Square gridArea="b" backgroundColor="decorative-option2">b</Square>
                <Square gridArea="c" backgroundColor="decorative-option3">c</Square>
                <Square gridArea="d" backgroundColor="decorative-option4">d</Square>
                <Square gridArea="e" backgroundColor="decorative-option5">e</Square>
            </Grid>
            <Grid areas={{ md: ["a", "b", "c", "d", "e"], lg: ["a a", "b c", "d e"] }} gap="stack-md">
                <Square gridArea="a" backgroundColor="decorative-option1-strong">a</Square>
                <Square gridArea="b" backgroundColor="decorative-option2-strong">b</Square>
                <Square gridArea="c" backgroundColor="decorative-option3-strong">c</Square>
                <Square gridArea="d" backgroundColor="decorative-option4-strong">d</Square>
                <Square gridArea="e" backgroundColor="decorative-option5-strong">e</Square>
            </Grid>
        </Stack>
    )
};

export const AutoFlow: Story = {
    render: () => (
        <Stack>
            <Grid autoFlow="column" gap="stack-md">
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
            </Grid>
            <Grid autoFlow="row" gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
            </Grid>
            <Grid autoFlow={{ md: "row", lg: "column" }} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
            </Grid>
        </Stack>
    )
};

export const AutoColumns: Story = {
    render: () => (
        <Stack>
            <Grid UNSAFE_autoColumns="8rem" gap="stack-md">
                <Square backgroundColor="decorative-option1-weak" />
                <Square gridColumn={2} backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
            </Grid>
            <Grid UNSAFE_autoColumns="200px" gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square gridColumn={2} backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
            </Grid>
            <Grid UNSAFE_autoColumns={{ md: "8rem", lg: "200px" }} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square gridColumn={2} backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
            </Grid>
        </Stack>
    )
};

export const AutoRows: Story = {
    render: () => (
        <Stack>
            <Grid autoRows="core_640" gap="stack-md">
                <Square backgroundColor="decorative-option1-weak" />
                <Square gridColumn={3} backgroundColor="decorative-option2-weak" />
                <Square gridColumnSpan={3} backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
            </Grid>
            <Grid autoRows="core_640" gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square gridColumn={3} backgroundColor="decorative-option2" />
                <Square gridColumnSpan={3} backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
            </Grid>
            <Grid UNSAFE_autoRows={{ md: "core_640", lg: "5.5rem" }} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square gridColumn={3} backgroundColor="decorative-option2-strong" />
                <Square gridColumnSpan={3} backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
            </Grid>
        </Stack>
    )
};

export const ColumnSpan: Story = {
    render: () => (
        <Stack>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square gridColumnSpan={2} backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square gridColumnSpan={{ md: undefined, lg: 2 }} backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};

export const RowSpan: Story = {
    render: () => (
        <Stack>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square gridRowSpan={2} backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square gridRowSpan={{ lg: 2 }} backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};

export const Repeat: Story = {
    render: () => (
        <Stack>
            <Grid templateColumns={repeat("auto-fit", "4.5rem")} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid templateColumns={repeat("auto-fit", "4.5rem")} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};

export const Minmax: Story = {
    render: () => (
        <Stack>
            <Grid UNSAFE_templateColumns={[minmax("8rem", "auto"), "4.5rem", "4.5rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid UNSAFE_templateColumns={[minmax("600px", "auto"), "4.5rem", "4.5rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};

export const FitContent: Story = {
    render: () => (
        <Stack>
            <Grid UNSAFE_templateColumns={[fitContent("8rem"), "4.5rem", "4.5rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
            </Grid>
            <Grid UNSAFE_templateColumns={[fitContent("8rem"), "4.5rem", "4.5rem"]} gap="stack-md">
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
            </Grid>
        </Stack>
    )
};
