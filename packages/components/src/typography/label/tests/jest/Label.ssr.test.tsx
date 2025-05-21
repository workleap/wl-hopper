/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Label } from "../../src/Label.tsx";

describe("Label", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Label>Text</Label>
            );

        expect(renderOnServer).not.toThrow();
    });
});
