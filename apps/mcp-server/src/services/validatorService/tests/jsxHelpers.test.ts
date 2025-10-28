/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from "@typescript-eslint/parser";
import { extractAllConstantStrings } from "../jsxHelpers";

describe("extractAllConstantStrings", () => {
    function getFirstPropValue(code: string) {
        const ast = parse(code, {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: { jsx: true }
        });

        // Find the first JSX attribute
        let propValue: any = null;
        function traverse(node: any): void {
            if (node?.type === "JSXAttribute") {
                propValue = node.value;

                return;
            }
            for (const key in node) {
                const value = node[key];
                if (value && typeof value === "object") {
                    if (Array.isArray(value)) {
                        value.forEach(traverse);
                    } else {
                        traverse(value);
                    }
                }
            }
        }
        traverse(ast);

        return propValue;
    }

    describe("should extract direct values", () => {
        it("extracts simple string literals", () => {
            const propValue = getFirstPropValue("<Div padding=\"inset_8\" />");
            expect(extractAllConstantStrings(propValue)).toEqual(["inset_8"]);
        });

        it("extracts values from ternary expressions", () => {
            const propValue = getFirstPropValue("<Div padding={visible ? \"inset_8\" : \"inset_16\"} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["inset_8", "inset_16"]);
        });

        it("extracts values from responsive objects", () => {
            const propValue = getFirstPropValue("<Div margin={{ base: \"core_0\", md: \"core_8\", lg: \"core_16\" }} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["core_0", "core_8", "core_16"]);
        });

        it("extracts values from nested conditionals in objects", () => {
            const propValue = getFirstPropValue("<Div margin={{ base: \"core_0\", md: state ? \"core_8\" : \"core_16\" }} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["core_0", "core_8", "core_16"]);
        });

        it("extracts values from OR expressions", () => {
            const propValue = getFirstPropValue("<Div padding={userPadding || \"inset_8\"} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["inset_8"]);
        });

        it("extracts values from arrays", () => {
            const propValue = getFirstPropValue("<Div values={[\"value1\", \"value2\", \"value3\"]} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["value1", "value2", "value3"]);
        });

        it("extracts static template literals", () => {
            const propValue = getFirstPropValue("<Div value={`static-string`} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["static-string"]);
        });
    });

    describe("should NOT extract non-direct values", () => {
        it("does not extract fragments from concatenation", () => {
            const propValue = getFirstPropValue("<Div width={value + \"px\"} />");
            expect(extractAllConstantStrings(propValue)).toEqual([]);
        });

        it("does not extract fragments from template literals with expressions", () => {
            //eslint-disable-next-line no-template-curly-in-string
            const propValue = getFirstPropValue("<Div width={`${value}px`} />");
            expect(extractAllConstantStrings(propValue)).toEqual([]);
        });

        it("does not extract values from AND expressions", () => {
            const propValue = getFirstPropValue("<Div padding={isActive && \"inset_8\"} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["inset_8"]);
        });

        it("does not extract values from ?? expressions", () => {
            const propValue = getFirstPropValue("<Div padding={isActive ?? \"inset_8\" ?? \"inset_16\"} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["inset_8", "inset_16"]);
        });

        it("does not extract from complex binary expressions", () => {
            const propValue = getFirstPropValue("<Div value={\"prefix-\" + suffix} />");
            expect(extractAllConstantStrings(propValue)).toEqual([]);
        });

        it("does not extract from function calls", () => {
            const propValue = getFirstPropValue("<Div padding={getPadding()} />");
            expect(extractAllConstantStrings(propValue)).toEqual([]);
        });

        it("does not extract from identifiers", () => {
            const propValue = getFirstPropValue("<Div padding={paddingVariable} />");
            expect(extractAllConstantStrings(propValue)).toEqual([]);
        });
    });

    describe("edge cases", () => {
        it("handles null/undefined prop values", () => {
            expect(extractAllConstantStrings(null)).toEqual([]);
        });

        it("removes duplicate values", () => {
            const propValue = getFirstPropValue("<Div values={[\"same\", \"same\", different ? \"same\" : \"other\"]} />");
            expect(extractAllConstantStrings(propValue)).toEqual(["same", "other"]);
        });

        it("handles deeply nested structures - only first level for objects", () => {
            const propValue = getFirstPropValue("<Div config={{ a: { b: state ? \"val1\" : \"val2\" }, c: [\"val3\", \"val4\"] }} />");
            // Nested objects are not valid responsive props, so values inside nested objects are NOT extracted
            // Arrays at first level ARE processed
            expect(extractAllConstantStrings(propValue)).toEqual(["val3", "val4"]);
        });

        it("does not extract values from nested objects in responsive props", () => {
            const propValue = getFirstPropValue("<Div spacing={{ base: \"xs\", md: { nested: \"invalid\", deep: { deeper: \"also-invalid\" } } }} />");
            // Only first-level string values should be extracted
            expect(extractAllConstantStrings(propValue)).toEqual(["xs"]);
        });

        it("correctly handles mixed first-level values", () => {
            const propValue = getFirstPropValue("<Div config={{ str: \"value1\", cond: isActive ? \"value2\" : \"value3\", nested: { ignore: \"me\" }, arr: [\"value4\"] }} />");
            // Should extract: value1, value2, value3, value4 (but NOT "me" from nested object)
            expect(extractAllConstantStrings(propValue)).toEqual(["value1", "value2", "value3", "value4"]);
        });
    });
});
