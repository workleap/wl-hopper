/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Heading } from "../../src/Heading.tsx";

describe("Heading", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Heading>Text</Heading>
            );

        expect(renderOnServer).not.toThrow();
    });
});
