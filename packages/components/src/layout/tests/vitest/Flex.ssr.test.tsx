/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Flex } from "../../src/Flex.tsx";

describe("Flex", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Flex>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Flex>
            );

        expect(renderOnServer).not.toThrow();
    });
});
