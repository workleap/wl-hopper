/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Illustration } from "../../src/Illustration.tsx";

describe("Illustration", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Illustration>Text</Illustration>
            );

        expect(renderOnServer).not.toThrow();
    });
});
