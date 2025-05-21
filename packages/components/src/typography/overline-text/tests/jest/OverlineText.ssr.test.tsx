/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { OverlineText } from "../../src/OverlineText.tsx";

describe("OverlineText", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <OverlineText>Text</OverlineText>
            );

        expect(renderOnServer).not.toThrow();
    });
});
