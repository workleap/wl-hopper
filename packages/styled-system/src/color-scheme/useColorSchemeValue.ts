import { useColorSchemeContext } from "./ColorSchemeContext.ts";

export function useColorSchemeValue<L extends string, D extends string>(lightColor: L, darkColor: D): L | D {
    const { colorScheme } = useColorSchemeContext();

    return colorScheme === "dark" ? darkColor : lightColor;
}
