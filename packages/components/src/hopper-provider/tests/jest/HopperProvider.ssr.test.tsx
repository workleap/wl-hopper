/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { HopperProvider } from "../../../hopper-provider/index.ts";

describe("HopperProvider", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <HopperProvider colorScheme="light">
                    Test
                </HopperProvider>
            );

        expect(renderOnServer).not.toThrow();
    });
});
