export const themesGlobalTypes = [
    { value: "workleap", title: "Workleap" } as const,
    { value: "sharegate", title: "Sharegate" } as const
];

export type ThemeKeys = typeof themesGlobalTypes[number]["value"]; // "workleap" | "sharegate"
export const ThemeGlobalKey = "theme";
