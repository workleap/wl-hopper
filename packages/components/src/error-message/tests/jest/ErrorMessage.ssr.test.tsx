/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ErrorMessage } from "../../src/ErrorMessage.tsx";

describe("ErrorMessage", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ErrorMessage>Text</ErrorMessage>
            );

        expect(renderOnServer).not.toThrow();
    });
});
