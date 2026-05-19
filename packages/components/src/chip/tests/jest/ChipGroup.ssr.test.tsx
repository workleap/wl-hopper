/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Chip, ChipGroup } from "../../index.ts";

describe("ChipGroup", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ChipGroup aria-label="chip-group">
                    <Chip id="1">Chip 1</Chip>
                    <Chip id="2">Chip 2</Chip>
                    <Chip id="3">Chip 3</Chip>
                </ChipGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});
