/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ContextualHelp } from "../../src/ContextualHelp.tsx";

describe("ContextualHelp", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ContextualHelp>Text</ContextualHelp>
            );

        expect(renderOnServer).not.toThrow();
    });
});
