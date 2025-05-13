/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Alert } from "../../src/Alert.tsx";

describe("Alert", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Alert primaryButtonLabel="test">Text</Alert>
            );

        expect(renderOnServer).not.toThrow();
    });
});
