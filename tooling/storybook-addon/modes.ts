import { ColorSchemeGlobalKey, type ColorSchemeKeys } from "./color-scheme.ts";
import { LocaleGlobalKey, type LocaleKeys } from "./locale.ts";
import { ThemeGlobalKey, type ThemeKeys } from "./themes.ts";
import { ViewportGlobalKey, type ViewportKeys } from "./viewports.ts";

export interface Mode {
    [ViewportGlobalKey]?: ViewportKeys;
    [ColorSchemeGlobalKey]?: ColorSchemeKeys;
    [LocaleGlobalKey]?: LocaleKeys;
    [ThemeGlobalKey]?: ThemeKeys;
}

export const allThemes = {
    "workleap": { [ThemeGlobalKey]: "workleap" },
    "sharegate": { [ThemeGlobalKey]: "sharegate" }
} satisfies Record<string, Mode>;
type ThemeModes = keyof typeof allThemes;

export const allColorModes = {
    "light": { [ColorSchemeGlobalKey]: "light" },
    "dark": { [ColorSchemeGlobalKey]: "dark" }
} satisfies Record<string, Mode>;
type ColorSchemeModes = keyof typeof allColorModes;

export const allLocales = {
    "en": { [LocaleGlobalKey]: "en-US" },
    "fr": { [LocaleGlobalKey]: "fr-CA" }
} satisfies Record<string, Mode>;
type LocaleModes = keyof typeof allLocales;

export const allViewportModes = {
    xs: { [ViewportGlobalKey]: "xs" },
    sm: { [ViewportGlobalKey]: "sm" },
    md: { [ViewportGlobalKey]: "md" },
    lg: { [ViewportGlobalKey]: "lg" },
    xl: { [ViewportGlobalKey]: "xl" }
} satisfies Record<ViewportKeys, Mode>;
type ViewPortModes = keyof typeof allViewportModes;

type ModeCombinations = ColorSchemeModes
    | LocaleModes
    | ViewPortModes
    | ThemeKeys
    | `${ThemeModes} ${ColorSchemeModes}`
    | `${ThemeModes} ${ColorSchemeModes} ${LocaleModes}`
    | `${ThemeModes} ${ColorSchemeModes} ${LocaleModes} ${ViewPortModes}`;
type Modes = Record<ModeCombinations, Mode>;

function getAllModes() {
    let modes = {
        ...allColorModes,
        ...allLocales,
        ...allViewportModes,
        ...allThemes
    } as Modes;

    for (const colorScheme in allColorModes) {
        for (const theme in allThemes) {
            modes = {
                ...modes,
                [`${theme} ${colorScheme}`]: {
                    [ThemeGlobalKey]: theme as ThemeKeys,
                    [ColorSchemeGlobalKey]: colorScheme as ColorSchemeKeys
                } satisfies Mode
            };
            for (const locale in allLocales) {
                modes = {
                    ...modes,
                    [`${theme} ${colorScheme} ${locale}`]: {
                        [ThemeGlobalKey]: theme as ThemeKeys,
                        [ColorSchemeGlobalKey]: colorScheme as ColorSchemeKeys,
                        [LocaleGlobalKey]: locale as LocaleKeys
                    } satisfies Mode
                };
                for (const viewport in allViewportModes) {
                    const name = `${theme} ${colorScheme} ${locale} ${viewport}` as ModeCombinations;

                    modes = {
                        ...modes,
                        [name]: {
                            [ThemeGlobalKey]: theme as ThemeKeys,
                            [ViewportGlobalKey]: viewport as ViewportKeys,
                            [ColorSchemeGlobalKey]: colorScheme as ColorSchemeKeys,
                            [LocaleGlobalKey]: locale as LocaleKeys
                        } satisfies Mode
                    };
                }
            }
        }
    }

    return modes;
}

export const allModes = getAllModes();

export type ModesKeys = keyof typeof allModes;

export function getModes(...modes: ModesKeys[]) {
    return modes.reduce<Record<string, Mode>>((acc, modeKey) => {
        acc[modeKey] = allModes[modeKey];
        return acc;
    }, {});
}
