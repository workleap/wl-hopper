/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Tile } from "../../src/index.ts";

describe("Tile", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Tile id="test">
                    test
                </Tile>
            );

        expect(renderOnServer).not.toThrow();
    });
});
