import type { Parameters as SBParameters } from "@storybook/react-webpack5";
import type { configureAxe } from "axe-playwright";

export type Rules = NonNullable<Parameters<typeof configureAxe>[1]>["rules"];

export interface A11yAddonParameters {
    a11y: {
        disable?: boolean;
        config?: {
            rules?: Rules;
        };
        disableContrastCheck?: boolean;
    };
}

export function a11yParameters(params: A11yAddonParameters["a11y"]): A11yAddonParameters {
    const { disableContrastCheck, ...rest } = params;

    const a11yOptions = {
        a11y: rest
    };

    if (disableContrastCheck) {
        a11yOptions.a11y.config = {
            ...a11yOptions.a11y.config,
            rules: [
                ...a11yOptions.a11y.config?.rules ?? [],
                {
                    id: "color-contrast",
                    enabled: false
                }
            ]
        };
    }

    return a11yOptions;
}

export function getA11yAddonParameters(parameters: SBParameters): A11yAddonParameters["a11y"] | undefined {
    const a11yParams = (parameters as A11yAddonParameters | undefined)?.a11y ;

    return a11yParams;
}
