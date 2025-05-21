/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Callout } from "../../src/Callout.tsx";

describe("Callout", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Callout>Text</Callout>
            );

        expect(renderOnServer).not.toThrow();
    });
});
