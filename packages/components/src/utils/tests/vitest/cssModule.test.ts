import { cssModule } from "../../src/cssModule.ts";

const styles = {
    "hop-test": "hop-test_withHash",
    "hop-test--size-xs": "hop-test--size-xs_withHash",
    "hop-test--size-sm": "hop-test--size-sm_withHash",
    "hop-test--size-md": "hop-test--size-md_withHash",
    "hop-test--size-lg": "hop-test--size-lg_withHash",
    "hop-test--size-xl": "hop-test--size-xl_withHash",
    "hop-test--size-2xl": "hop-test--size-2xl_withHash"
} as const;

describe("css-module", () => {
    it("should not warn when the component class is not found", () => {
        const result = cssModule(styles, "hop-unknown");

        expect(result).toBe("");
    });

    it("should support empty modifiers", () => {
        const result = cssModule(styles, "hop-test");

        expect(result).toBe(styles["hop-test"]);
    });

    it("should support single string modifiers", () => {
        const result = cssModule(styles, "hop-test", "size-xs");

        expect(result).toBe(`${styles["hop-test"]} ${styles["hop-test--size-xs"]}`);
    });

    it("should support single conditional modifiers", () => {
        const result1 = cssModule(styles, "hop-test", {
            "size-xs": false
        });

        expect(result1).toBe(styles["hop-test"]);

        const result2 = cssModule(styles, "hop-test", {
            "size-xs": true
        });

        expect(result2).toBe(`${styles["hop-test"]} ${styles["hop-test--size-xs"]}`);
    });
});
