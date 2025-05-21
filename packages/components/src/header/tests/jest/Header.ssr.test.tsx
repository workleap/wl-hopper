/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Header } from "../../src/Header.tsx";

describe("Header", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Header>Text</Header>
            );

        expect(renderOnServer).not.toThrow();
    });
});
