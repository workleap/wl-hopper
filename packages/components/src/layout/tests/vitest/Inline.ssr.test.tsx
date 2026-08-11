/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Inline } from "../../src/Inline.tsx";

describe("Inline", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Inline>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Inline>
            );

        expect(renderOnServer).not.toThrow();
    });
});
