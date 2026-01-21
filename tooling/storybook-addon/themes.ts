export const allThemes = [
    { value: "workleap", title: "Workleap" } as const,
    { value: "sharegate", title: "Sharegate" } as const
];

export type ThemeKeys = typeof allThemes[number]["value"]; // "workleap" | "sharegate"
export const ThemeGlobalKey = "theme";
