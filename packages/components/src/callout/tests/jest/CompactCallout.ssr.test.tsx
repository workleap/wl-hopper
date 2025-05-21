/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { CompactCallout } from "../../src/CompactCallout.tsx";

describe("CompactCallout", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <CompactCallout>Text</CompactCallout>
            );

        expect(renderOnServer).not.toThrow();
    });
});
