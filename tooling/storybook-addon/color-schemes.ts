export const allColorSchemes = [
    { value: "light", title: "Light" } as const,
    { value: "dark", title: "Dark" } as const
];

export type ColorSchemeKeys = typeof allColorSchemes[number]["value"]; // "light" | "dark"
export const ColorSchemeGlobalKey = "colorScheme";
