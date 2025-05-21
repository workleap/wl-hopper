/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Select, SelectItem } from "../../index.ts";

describe("Select", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Select aria-label="Pets">
                    <SelectItem id="1">Zoomy</SelectItem>
                    <SelectItem id="2">Voodoo</SelectItem>
                </Select>
            );

        expect(renderOnServer).not.toThrow();
    });
});
