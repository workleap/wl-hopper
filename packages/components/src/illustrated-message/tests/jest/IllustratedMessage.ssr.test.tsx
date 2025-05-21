/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { IllustratedMessage } from "../../src/IllustratedMessage.tsx";

describe("IllustratedMessage", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <IllustratedMessage>Text</IllustratedMessage>
            );

        expect(renderOnServer).not.toThrow();
    });
});
