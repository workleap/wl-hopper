export const allLocales = [
    { value: "en-US", right: "US", title: "English" },
    { value: "fr-CA", right: "FR", title: "Français" }
] as const;

export type LocaleKeys = typeof allLocales[number]["value"]; // "en-US" | "fr-CA"
export const LocaleGlobalKey = "locale";
