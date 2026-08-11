/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Checkbox } from "../../src/Checkbox.tsx";
import { CheckboxField } from "../../src/CheckboxField.tsx";
import { CheckboxGroup } from "../../src/CheckboxGroup.tsx";

describe("Checkbox", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <CheckboxGroup aria-label="options">
                    <Checkbox>option 1</Checkbox>
                    <CheckboxField description="description">
                        <Checkbox>option 1</Checkbox>
                    </CheckboxField>
                </CheckboxGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});
