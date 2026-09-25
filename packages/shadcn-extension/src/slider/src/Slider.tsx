import { clsx } from "clsx";
import {
    Slider as RACSlider,
    type SliderProps as RACSliderProps,
    SliderFill,
    SliderThumb,
    SliderTrack
} from "react-aria-components";

import styles from "./Slider.module.css";

export const GlobalSliderCssSelector = "hop-Slider";
export const GlobalSliderTrackCssSelector = "hop-Slider__track";
export const GlobalSliderRangeCssSelector = "hop-Slider__range";
export const GlobalSliderThumbCssSelector = "hop-Slider__thumb";

export type SliderValue = number | number[];

/**
 * `children` is omitted from React Aria's props: the component supplies its own render function to
 * derive one thumb per value, so anything passed here would be silently discarded.
 */
export type SliderProps<T extends SliderValue = SliderValue> = Omit<RACSliderProps<T>, "children" | "className"> & {
    className?: string;
};

/**
 * A slider allows a user to select one or more values within a range.
 *
 * [View Documentation](https://hopper.workleap.design/shadcn-extension/components/Slider)
 */
function Slider<T extends SliderValue = SliderValue>({ className, ...props }: SliderProps<T>) {
    return (
        <RACSlider
            className={clsx(GlobalSliderCssSelector, styles["hop-Slider"], className)}
            data-slot="slider"
            {...props}
        >
            {({ state }) => {
                return (
                    <>
                        <SliderTrack
                            className={clsx(GlobalSliderTrackCssSelector, styles["hop-Slider__track"])}
                            data-slot="slider-track"
                        >
                            <SliderFill
                                className={clsx(GlobalSliderRangeCssSelector, styles["hop-Slider__range"])}
                                data-slot="slider-range"
                            />
                        </SliderTrack>
                        {state.values.map((_, index) => (
                            <SliderThumb
                                key={index}
                                className={clsx(GlobalSliderThumbCssSelector, styles["hop-Slider__thumb"])}
                                data-slot="slider-thumb"
                                index={index}
                            />
                        ))}
                    </>
                );
            }}
        </RACSlider>
    );
}

export { Slider };
