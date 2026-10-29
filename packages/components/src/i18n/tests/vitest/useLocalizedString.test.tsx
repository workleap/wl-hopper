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

    it("should agree the participle with the count in fr-CA", () => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale: "fr-CA" });

        expect(result.current.format("ActionBar.selected", { count: 1 })).toBe("1 élément sélectionné");
        expect(result.current.format("ActionBar.selected", { count: 3 })).toBe("3 éléments sélectionnés");
    });

    it("should format and translate string when variables and fr-CA are passed", () => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale: "fr-CA" });

        expect(result.current.format("Input.charactersLeft", { charLeft: 0 })).toBe("Aucun caractère restant.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 1 })).toBe("1 caractère restant.");
        expect(result.current.format("Input.charactersLeft", { charLeft: 3 })).toBe("3 caractères restants.");
    });

    it.each([
        {
            locale: "de-DE",
            close: "Schließen",
            selected: ["0 Elemente ausgewählt", "1 Element ausgewählt", "3 Elemente ausgewählt"],
            charactersLeft: ["Keine Zeichen übrig.", "1 Zeichen übrig.", "3 Zeichen übrig."]
        },
        {
            locale: "es-ES",
            close: "Cerrar",
            selected: ["0 elementos seleccionados", "1 elemento seleccionado", "3 elementos seleccionados"],
            charactersLeft: ["No quedan caracteres.", "Queda 1 carácter.", "Quedan 3 caracteres."]
        },
        {
            locale: "nl-NL",
            close: "Sluiten",
            selected: ["0 items geselecteerd", "1 item geselecteerd", "3 items geselecteerd"],
            charactersLeft: ["Geen tekens over.", "1 teken over.", "3 tekens over."]
        }
    ])("should translate and pluralize strings in $locale", ({ locale, close, selected, charactersLeft }) => {
        const { result } = renderHook(() => useLocalizedString(), undefined, { locale });

        expect(result.current.format("CloseButton.ariaLabel")).toBe(close);
        [0, 1, 3].forEach((count, index) => {
            expect(result.current.format("ActionBar.selected", { count })).toBe(selected[index]);
            expect(result.current.format("Input.charactersLeft", { charLeft: count })).toBe(charactersLeft[index]);
        });
    });
});
