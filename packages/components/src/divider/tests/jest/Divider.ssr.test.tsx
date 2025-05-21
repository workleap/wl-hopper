/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Divider } from "../../src/Divider.tsx";

describe("Divider", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Divider />
            );

        expect(renderOnServer).not.toThrow();
    });
});
