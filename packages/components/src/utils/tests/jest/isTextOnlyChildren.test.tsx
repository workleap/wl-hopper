import { isTextOnlyChildren } from "../../src/isTextOnlyChildren.ts";

describe("is-text-only-children", () => {
    it("should return true when children is string", () => {
        const result = isTextOnlyChildren("test string");

        expect(result).toBe(true);
    });

    it("should return true when children is string array", () => {
        const result = isTextOnlyChildren(<>test string + {" "} + test2</>);

        expect(result).toBe(true);
    });

    it("should return true when children is fragment", () => {
        const result = isTextOnlyChildren(<>test string</>);

        expect(result).toBe(true);
    });

    it("should return true when children is nested fragments", () => {
        const result = isTextOnlyChildren(<><><>test string</></></>);

        expect(result).toBe(true);
    });

    it("should return false when children is string", () => {
        const result = isTextOnlyChildren(<button type="button">test</button>);

        expect(result).toBe(false);
    });

    it("should return false when children is fragment", () => {
        const result = isTextOnlyChildren(<><button type="button">test</button></>);

        expect(result).toBe(false);
    });

    it("should return false when children is nested fragments", () => {
        const result = isTextOnlyChildren(<><><><button type="button">test</button></></></>);

        expect(result).toBe(false);
    });
});
