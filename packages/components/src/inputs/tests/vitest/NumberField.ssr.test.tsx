/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { NumberField } from "../../src/NumberField.tsx";

describe("NumberField", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <NumberField label="Label" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
