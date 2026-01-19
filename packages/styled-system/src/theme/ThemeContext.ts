import { createContext, useContext } from "react";

import type { Theme } from "../tokens/generated/styledSystemConstants.ts";

export interface ThemeContextType {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "workleap",
    setTheme: () => {}
});

export function useThemeContext(): ThemeContextType {
    return useContext(ThemeContext);
}
