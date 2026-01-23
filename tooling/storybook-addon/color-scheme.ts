export const colorSchemesGlobalTypes = [
    { value: "light", title: "Light" } as const,
    { value: "dark", title: "Dark" } as const
];

export type ColorSchemeKeys = typeof colorSchemesGlobalTypes[number]["value"]; // "light" | "dark"
export const ColorSchemeGlobalKey = "colorScheme";
export const ColorSchemeDefaultValue = "light" satisfies ColorSchemeKeys;
