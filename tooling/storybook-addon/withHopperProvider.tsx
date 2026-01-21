import { type ColorScheme, HopperProvider, type Theme } from "@hopper-ui/components";
import type { JSX } from "react";
import { makeDecorator } from "storybook/preview-api";

import { DisableAnimations } from "./DisableAnimations.tsx";
import { ColorSchemeGlobalKey } from "./color-schemes.ts";
import "./disableAnimations.css";
import { ThemeGlobalKey } from "./themes.ts";

const AddonName = "hopper";

export interface HopperStorybookAddonOptions {
    /** Whether to disable the hopperProvider. Defaults to true. */
    disabled?: boolean;
    /** The locale. Defaults to en-US. */
    locale?: string;
    /** The color schemes to render. Defaults to all color schemes. */
    colorSchemes?: ColorScheme[];
    /** The themes to render. Defaults to all themes. */
    themes?: Theme[];
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
export const Themes = ["workleap", "sharegate"] satisfies HopperStorybookAddonOptions["themes"];

export const withHopperProvider = makeDecorator({
    name: "withHopperProvider",
    parameterName: AddonName,
    wrapper: (getStory, context, settings) => {
        const options = settings as HopperStorybookAddonOptions;
        const colorSchemes: ColorScheme[] = options.colorSchemes || (context.globals[ColorSchemeGlobalKey] ? [context.globals[ColorSchemeGlobalKey]] : ColorSchemes);
        const themes: Theme[] = options.themes || (context.globals[ThemeGlobalKey] ? [context.globals[ThemeGlobalKey]] : Themes);
        const locale: string = options.locale || (context.globals.locale ? context.globals.locale : "en-US");
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
                {themes.map(theme => (
                    <>
                        {themes.length > 1 && (
                            <>
                                <h1>{theme}</h1>
                                <hr />
                            </>
                        )}
                        {colorSchemes.map(colorScheme => (
                            <HopperProvider
                                key={`${colorScheme}-${theme}`}
                                colorScheme={colorScheme}
                                locale={locale}
                                theme={theme}
                                color="neutral"
                                backgroundColor="neutral"
                                lineHeight="body-md"
                                fontFamily="body-md"
                                fontSize="body-md"
                                fontWeight="body-md"
                                display="flex"
                                flexDirection="column"
                                UNSAFE_height={height ? `${height}px` : undefined}
                                UNSAFE_minHeight={minHeight ? `${minHeight}px` : undefined}
                                padding="inset-md"
                            >
                                {getStory(context) as JSX.Element}
                            </HopperProvider>
                        ))}
                    </>
                ))}
            </DisableAnimations>
        );
    }
});
