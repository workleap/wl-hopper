/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Menu } from "../../src/Menu.tsx";

describe("Menu", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Menu>Text</Menu>
            );

        expect(renderOnServer).not.toThrow();
    });
});
