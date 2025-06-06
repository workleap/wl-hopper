/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ToggleButton } from "../../src/ToggleButton.tsx";

describe("ToggleButton", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ToggleButton>Text</ToggleButton>
            );

        expect(renderOnServer).not.toThrow();
    });
});
