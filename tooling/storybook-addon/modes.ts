import { ColorSchemeDefaultValue, ColorSchemeGlobalKey, type ColorSchemeKeys } from "./color-scheme.ts";
import { LocaleGlobalKey, type LocaleKeys } from "./locale.ts";
import { ThemeDefaultValue, ThemeGlobalKey, type ThemeKeys } from "./themes.ts";
import { ViewportGlobalKey, type ViewportKeys } from "./viewports.ts";

export interface Mode {
    [ViewportGlobalKey]?: ViewportKeys;
    [ColorSchemeGlobalKey]?: ColorSchemeKeys;
    [LocaleGlobalKey]?: LocaleKeys;
    [ThemeGlobalKey]?: ThemeKeys;
}

export const allThemes = {
    "workleap": {
        [ThemeGlobalKey]: "workleap",
        [ColorSchemeGlobalKey]: ColorSchemeDefaultValue
    },
    "sharegate": {
        [ThemeGlobalKey]: "sharegate",
        [ColorSchemeGlobalKey]: ColorSchemeDefaultValue
    }
} satisfies Record<string, Mode>;

export const allColorModes = {
    "light": {
        [ThemeGlobalKey]: ThemeDefaultValue,
        [ColorSchemeGlobalKey]: "light"
    },
    "dark": {
        [ThemeGlobalKey]: ThemeDefaultValue,
        [ColorSchemeGlobalKey]: "dark"
    }
} satisfies Record<string, Mode>;

export const allColorModesAndThemes = {
    "workleap light": {
        [ThemeGlobalKey]: "workleap",
        [ColorSchemeGlobalKey]: "light"
    },
    "workleap dark": {
        [ThemeGlobalKey]: "workleap",
        [ColorSchemeGlobalKey]: "dark"
    },
    "sharegate light": {
        [ThemeGlobalKey]: "sharegate",
        [ColorSchemeGlobalKey]: "light"
    },
    "sharegate dark": {
        [ThemeGlobalKey]: "sharegate",
        [ColorSchemeGlobalKey]: "dark"
    }
} satisfies Record<string, Mode>;

export const allLocales = {
    "en": {
        [LocaleGlobalKey]: "en-US"
    },
    "fr": {
        [LocaleGlobalKey]: "fr-CA"
    }
} satisfies Record<string, Mode>;

export const allViewportModes = {
    xs: {
        [ViewportGlobalKey]: "xs"
    },
    sm: {
        [ViewportGlobalKey]: "sm"
    },
    md: {
        [ViewportGlobalKey]: "md"
    },
    lg: {
        [ViewportGlobalKey]: "lg"
    },
    xl: {
        [ViewportGlobalKey]: "xl"
    }
} satisfies Record<ViewportKeys, Mode>;

export const allModes = {
    ...allThemes,
    ...allColorModes,
    ...allColorModesAndThemes,
    ...allLocales,
    ...allViewportModes
};

export type ModesKeys = keyof typeof allModes;

export function getModes(...modes: ModesKeys[]) {
    return modes.reduce<Record<string, Mode>>((acc, modeKey) => {
        acc[modeKey] = allModes[modeKey];
        return acc;
    }, {});
}
