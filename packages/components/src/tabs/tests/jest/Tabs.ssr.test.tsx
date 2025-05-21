/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Tabs } from "../../src/Tabs.tsx";

describe("Tabs", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Tabs aria-label="tabs">Text</Tabs>
            );

        expect(renderOnServer).not.toThrow();
    });
});
