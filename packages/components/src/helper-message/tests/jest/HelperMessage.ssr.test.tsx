/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { HelperMessage } from "../../src/HelperMessage.tsx";

describe("HelperMessage", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <HelperMessage>Text</HelperMessage>
            );

        expect(renderOnServer).not.toThrow();
    });
});
