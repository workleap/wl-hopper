import { hopperParameters } from "@hopper-ui/storybook-addon";
import { CalendarDate, type DateValue } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "storybook/test";

import { Calendar } from "../../src/Calendar.tsx";

const meta = {
    title: "Components/Calendar",
    component: Calendar
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        defaultValue: new CalendarDate(2024, 6, 15)
    }
} satisfies Story;

export const DisabledDates = {
    args: {
        ...Default.args,
        minValue: new CalendarDate(2024, 6, 10),
        maxValue: new CalendarDate(2024, 6, 20)
    }
} satisfies Story;

export const UnavailableDates = {
    args: {
        ...Default.args,
        isDateUnavailable: (date: DateValue) => date.day % 2 === 0
    }
} satisfies Story;

export const HoverDate = {
    ...Default,
    parameters: {
        ...hopperParameters({ colorSchemes: ["light"] })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const gridCell = await canvas.getByRole("gridcell", { name: "3" });

        await userEvent.hover(gridCell.firstElementChild!);
    }
} satisfies Story;
