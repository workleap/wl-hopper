import { HopperProvider } from "@hopper-ui/components";
import isChromatic from "chromatic/isChromatic";
import { Fragment, type JSX } from "react";
import { makeDecorator } from "storybook/preview-api";

import { DisableAnimations } from "./DisableAnimations.tsx";
import { ColorSchemeGlobalKey, type ColorSchemeKeys } from "./color-scheme.ts";
import "./disableAnimations.css";
import { LocaleGlobalKey, type LocaleKeys } from "./locale.ts";
import { ThemeGlobalKey, type ThemeKeys } from "./themes.ts";

const AddonName = "hopper";

export interface HopperStorybookAddonOptions {
    /** Whether to disable the hopperProvider. Defaults to true. */
    disabled?: boolean;
    /** The height of the preview. Defaults to 1000px. */
    height?: number;
    /** The color schemes to render. Defaults to all color schemes. */
    colorSchemes?: ColorSchemeKeys[];
    /** The themes to render. Defaults to all themes. */
    themes?: ThemeKeys[];
    /** Whether to disable animations. Defaults to false. */
    disableAnimations?: boolean;
}

export interface WithHopperStorybookAddonParameter {
    [AddonName]?: HopperStorybookAddonOptions;
}
export const ColorSchemes = ["light", "dark"] satisfies ColorSchemeKeys[];
export const Themes = ["workleap", "sharegate"] satisfies ThemeKeys[];

export const withHopperProvider = makeDecorator({
    name: "withHopperProvider",
    parameterName: AddonName,
    wrapper: (getStory, context, settings) => {
        const options = { ...settings.options, ...settings.parameters } as HopperStorybookAddonOptions;
        let colorSchemes: ColorSchemeKeys[];
        let themes: ThemeKeys[];
        const hasModes = context.parameters.chromatic?.modes;

        if (isChromatic()) {
            // In chromatic, we always use the options if they are provided. Otherwise, if modes are provided, we use the current global.
            // Finally, if no modes are provided, we use all color schemes and themes.
            colorSchemes = options.colorSchemes ? options.colorSchemes : (hasModes ? [context.globals[ColorSchemeGlobalKey]] : ColorSchemes);
            themes = options.themes ? options.themes : (hasModes ? [context.globals[ThemeGlobalKey]] : Themes);
        } else {
            // in storybook, we always use the themes from the globals
            colorSchemes = context.globals[ColorSchemeGlobalKey];
            themes = context.globals[ThemeGlobalKey];
        }

        const locale: LocaleKeys = context.globals[LocaleGlobalKey] ? context.globals[LocaleGlobalKey] : "en-US";
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
                    <Fragment key={theme}>
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
                    </Fragment>
                ))}
            </DisableAnimations>
        );
    }
});
