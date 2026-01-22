import { getModes } from "@hopper-ui/storybook-addon";
import { isWeekend, parseDate, type DateValue } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { userEvent, within } from "storybook/test";

import { RangeCalendar } from "../../src/RangeCalendar.tsx";

const meta = {
    title: "Components/RangeCalendar",
    component: RangeCalendar
} satisfies Meta<typeof RangeCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        defaultValue: {
            start: parseDate("2023-06-12"),
            end: parseDate("2023-06-26")
        }
    }
} satisfies Story;

export const MultiMonth = {
    args: {
        defaultValue: {
            start: parseDate("2023-05-26"),
            end: parseDate("2023-07-06")
        },
        visibleMonths: 3
    }
};

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
        chromatic: {
            modes: getModes("workleap light")
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const gridCell = canvas.getByRole("gridcell", { name: "3" });

        await userEvent.hover(gridCell.firstElementChild!);
    }
} satisfies Story;
