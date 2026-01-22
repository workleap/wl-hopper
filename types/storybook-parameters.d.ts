
import type { HopperStorybookAddonOptions } from "@hopper-ui/storybook-addon";
import type { A11yParameters } from "@storybook/addon-a11y";
import type { ViewportMap } from "@storybook/addon-viewport";

// Module Augmentation of the Parameters object
declare module "@storybook/react-webpack5" {
    interface Parameters {
        a11y?: A11yParameters;
        hopper?: HopperStorybookAddonOptions;
        // There is no typings for this one. So i copied the specs from https://storybook.js.org/docs/essentials/viewport
        viewport?: {
            defaultOrientation?: "portrait" | "landscape";
            defaultViewport?: keyof typeof viewports | (string & {});
            disable?: boolean;
            viewports?: ViewportMap;
        };
        chromatic?: {
            diffThreshold?: number;
            delay?: number;
            forcedColors?: "none" | "active";
            pauseAnimationAtEnd?: boolean;
            disableSnapshot?: boolean;
            ignoreSelectors?: string[];
            prefersReducedMotion?: "no-preference" | "reduce";
            media?: "print";
            modes?: Record<string, {
                /** Disable a mode set in a meta tag or in the storybook's preview */
                disable?: boolean;
            } & {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [key: string]: any;
            }>;
        };
    }
}
