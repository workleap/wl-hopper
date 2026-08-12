import { getSizingValue } from "@hopper-ui/styled-system";
import type { CssGrid, UNSAFE_SizingValue } from "@hopper-ui/styled-system";

/**
 * Can be used to make a repeating fragment of the columns or rows list.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat).
 * @param count - The number of times to repeat the fragment.
 * @param repeat - The fragment to repeat.
 */
export function repeat(
    count: number | "auto-fill" | "auto-fit",
    repetition: UNSAFE_SizingValue | UNSAFE_SizingValue[]
) {
    return `repeat(${count}, ${Array.isArray(repetition) ? interpolateGridTemplateArray(repetition) : getSizingValue(repetition)})` as CssGrid;
}

/**
 * Defines a size range greater than or equal to min and less than or equal to max.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).
 * @param min - The minimum size.
 * @param max - The maximum size.
 */
export function minmax(min: UNSAFE_SizingValue, max: UNSAFE_SizingValue) {
    return `minmax(${getSizingValue(min)}, ${getSizingValue(max)})` as CssGrid;
}

/**
 * Clamps a given size to an available size.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content).
 * @param dimension - The size to clamp.
 */
export function fitContent(dimension: UNSAFE_SizingValue) {
    return `fit-content(${getSizingValue(dimension)})` as CssGrid;
}

function interpolateGridTemplateArray(values: UNSAFE_SizingValue[]) {
    return values.map(x => getSizingValue(x)).join(" ");
}
