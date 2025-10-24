import { hopperParameters } from "@hopper-ui/storybook-addon";
import { isWeekend, parseDate, type DateValue } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
        // The rebrand from GSoft to Workleap took place on June 26, 2023
        defaultValue: parseDate("2023-06-26")
    }
} satisfies Story;

export const MultiMonth = {
    args: {
        ...Default.args,
        visibleMonths: 3
    }
} satisfies Story;

export const MultiMonthFixed = {
    args: {
        ...MultiMonth.args,
        isFixedWeeks: true
    }
} satisfies Story;

export const CustomFirstDayOfWeek = {
    args: {
        ...Default.args,
        firstDayOfWeek: "mon"
    }
} satisfies Story;

export const MinMax = {
    args: {
        ...Default.args,
        minValue: parseDate("2023-06-10"),
        maxValue: parseDate("2023-06-28")
    }
} satisfies Story;

export const Disabled = {
    args: {
        ...Default.args,
        isDisabled: true
    }
} satisfies Story;

export const Readonly = {
    args: {
        ...Default.args,
        isReadOnly: true
    }
} satisfies Story;

export const DisabledInvalid = {
    args: {
        ...Default.args,
        isDisabled: true,
        isInvalid: true
    }
} satisfies Story;

export const Invalid = {
    args: {
        ...Default.args,
        isInvalid: true
    }
} satisfies Story;

export const CustomErrorMessage = {
    args: {
        ...Default.args,
        isInvalid: true,
        errorMessage: "Please select a valid date."
    }
} satisfies Story;

export const UnavailableDates = {
    args: {
        ...Default.args,
        isDateUnavailable: (date: DateValue) => {
            return isWeekend(date, "en-US");
        }
    }
} satisfies Story;

export const HoverDate = {
    ...Default,
    parameters: {
        ...hopperParameters({ colorSchemes: ["light"] })
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const gridCell = canvas.getByRole("gridcell", { name: "3" });

        await userEvent.hover(gridCell.firstElementChild!);
    }
} satisfies Story;
