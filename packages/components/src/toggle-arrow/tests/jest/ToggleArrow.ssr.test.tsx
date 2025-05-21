/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ToggleArrow } from "../../src/ToggleArrow.tsx";

describe("ToggleArrow", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ToggleArrow />
            );

        expect(renderOnServer).not.toThrow();
    });
});
