import type { ColorSchemeGlobalKey, ColorSchemeKeys } from "./color-scheme.ts";
import type { LocaleGlobalKey, LocaleKeys } from "./locale.ts";
import { type ViewportKeys } from "./viewports.ts";

export interface Mode {
    viewport?: ViewportKeys;
    [ColorSchemeGlobalKey]?: ColorSchemeKeys;
    [LocaleGlobalKey]?: LocaleKeys;
}

export const allColorModes = {
    "light": { colorScheme: "light" },
    "dark": { colorScheme: "dark" }
} satisfies Record<string, Mode>;
type ColorSchemeModes = keyof typeof allColorModes;

export const allLocales = {
    "en": { locale: "en-US" },
    "fr": { locale: "fr-CA" }
} satisfies Record<string, Mode>;
type LocaleModes = keyof typeof allLocales;

export const allViewportModes = {
    xs: { viewport: "xs" },
    sm: { viewport: "sm" },
    md: { viewport: "md" },
    lg: { viewport: "lg" },
    xl: { viewport: "xl" }
} satisfies Record<ViewportKeys, Mode>;
type ViewPortModes = keyof typeof allViewportModes;

type ModeCombinations = ColorSchemeModes | LocaleModes | ViewPortModes | `${ColorSchemeModes} ${LocaleModes}` | `${ColorSchemeModes} ${LocaleModes} ${ViewPortModes}`;
type Modes = Record<ModeCombinations, Mode>;

function getAllModes() {
    let modes = {
        ...allColorModes,
        ...allLocales,
        ...allViewportModes
    } as Modes;

    for (const colorScheme in allColorModes) {
        for (const locale in allLocales) {
            modes = {
                ...modes,
                [`${colorScheme} ${locale}`]: {
                    colorScheme: colorScheme as ColorSchemeKeys,
                    locale: locale as LocaleKeys
                } satisfies Mode
            };
            for (const viewport in allViewportModes) {
                const name = `${colorScheme} ${locale} ${viewport}` as ModeCombinations;

                modes = {
                    ...modes,
                    [name]: {
                        viewport: viewport as ViewportKeys,
                        colorScheme: colorScheme as ColorSchemeKeys,
                        locale: locale as LocaleKeys
                    } satisfies Mode
                };
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
