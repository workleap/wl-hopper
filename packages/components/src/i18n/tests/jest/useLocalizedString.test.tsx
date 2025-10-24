import { renderHook } from "@hopper-ui/test-utils";

import { useLocalizedString } from "../../src/useLocalizedString.tsx";

describe("useLocalizedString", () => {
    it("should return same string when there is no formatting", () => {
        const { result } = renderHook(() => useLocalizedString());

        expect(result.current.format("Button.spinnerAriaLabel")).toBe("Loading");
    });

    it("should return string in french when is fr-CA used", () => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale: "fr-CA" });

        expect(result.current.format("Button.spinnerAriaLabel")).toBe("Chargement en cours");
    });

    it("should return string in fr-CA when is fr-FR used", () => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale: "fr-FR" });

        expect(result.current.format("Button.spinnerAriaLabel")).toBe("Chargement en cours");
    });

    it("should format string when variables are passed", () => {
        const { result } = renderHook(() => useLocalizedString());

        expect(result.current.format("Input.charactersLeft", { charLeft: 0 })).toBe("No characters left.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 1 })).toBe("1 character left.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 3 })).toBe("3 characters left.");
    });

    it("should format and translate string when variables and fr-CA are passed", () => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale: "fr-CA" });

        expect(result.current.format("Input.charactersLeft", { charLeft: 0 })).toBe("Aucun caractère restant.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 1 })).toBe("1 caractère restant.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 3 })).toBe("3 caractères restants.");
    });
});
