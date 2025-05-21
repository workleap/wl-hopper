/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Popover } from "../../src/Popover.tsx";

describe("Popover", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Popover>Text</Popover>
            );

        expect(renderOnServer).not.toThrow();
    });
});
