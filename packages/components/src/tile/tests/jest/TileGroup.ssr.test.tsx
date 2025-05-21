/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Tile, TileGroup } from "../../src/index.ts";

describe("TileGroup", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <TileGroup>
                    <Tile id="option1">option 1</Tile>
                    <Tile id="option2">option 2</Tile>
                </TileGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});
