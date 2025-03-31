import { type ColorScheme, HopperProvider } from "@hopper-ui/components";
import { makeDecorator } from "@storybook/preview-api";
import type { JSX } from "react";

import { DisableAnimations } from "./DisableAnimations.tsx";
import "./disableAnimations.css";

const AddonName = "hopper";

export interface HopperStorybookAddonOptions {
    /** Whether to disable the hopperProvider. Defaults to true. */
    disabled?: boolean;
    /** The locale. Defaults to en-US. */
    locale?: string;
    /** The color schemes to render. Defaults to all color schemes. */
    colorSchemes?: ColorScheme[];
    /** The height of the preview. Defaults to 1000px. */
    height?: number;
    /** Whether to disable animations. Defaults to false. */
    disableAnimations?: boolean;
}

export interface WithHopperStorybookAddonParameter {
    [AddonName]?: HopperStorybookAddonOptions;
}

export function hopperParameters(parameters: HopperStorybookAddonOptions): WithHopperStorybookAddonParameter {
    return {
        [AddonName]: parameters
    };
}

export const ColorSchemes = ["light", "dark"] satisfies HopperStorybookAddonOptions["colorSchemes"];

export const withHopperProvider = makeDecorator({
    name: "withHopperProvider",
    parameterName: AddonName,
    wrapper: (getStory, context, { options: optionProp, parameters }) => {
        const options = { ...optionProp, ...parameters } as HopperStorybookAddonOptions;
        const isDocStory = context.viewMode === "docs";

        const colorSchemes: ColorScheme[] = options.colorSchemes || (isDocStory && context.globals.theme ? [context.globals.theme] : ColorSchemes);
        const locale: string = options.locale || (isDocStory && context.globals.locale ? context.globals.locale : "en-US");
        const disabled = options.disabled || false;

        if (disabled) {
            return getStory(context);
        }

        let height: number | undefined;
        let minHeight: number | undefined;
        if (options.height && isNaN(options.height)) {
            minHeight = 1000;
        } else {
            height = options.height;
        }

        // do not add a top level provider, each provider variant needs to be independent so that we don't have RTL/LTR styles that interfere with each other
        return (
            <DisableAnimations disableAnimations={options.disableAnimations}>
                {colorSchemes.map(colorScheme =>
                    <HopperProvider
                        key={`${colorScheme}`}
                        colorScheme={colorScheme}
                        locale={locale}
                        backgroundColor="neutral"
                        display="flex"
                        flexDirection="column"

                        UNSAFE_height={height ? `${height}px` : undefined}
                        UNSAFE_minHeight={minHeight ? `${minHeight}px` : undefined}
                        padding="inset-md"
                    >
                        {getStory(context) as JSX.Element}
                    </HopperProvider>
                )}
            </DisableAnimations>
        );
    }
});
