/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ComboBox, ComboBoxItem } from "../../src/ComboBox.tsx";

describe("ComboBox", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ComboBox>
                    <ComboBoxItem id="1">Zoomy</ComboBoxItem>
                    <ComboBoxItem id="2">Voodoo</ComboBoxItem>
                </ComboBox>
            );

        expect(renderOnServer).not.toThrow();
    });
});
