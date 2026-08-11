import { renderHook } from "@hopper-ui/test-utils";

import { useColorSchemeValue } from "../../src/color-scheme/useColorSchemeValue.ts";

describe("useColorSchemeValue", () => {
    it("should return the light color value when the color scheme is light", () => {
        const { result } = renderHook(() => useColorSchemeValue("light-color", "dark-color"), undefined, { colorScheme: "light" });

        expect(result.current).toBe("light-color");
    });

    it("should return the dark color value when the color scheme is dark", () => {
        const { result } = renderHook(() => useColorSchemeValue("light-color", "dark-color"), undefined, { colorScheme: "dark" });

        expect(result.current).toBe("dark-color");
    });
});
