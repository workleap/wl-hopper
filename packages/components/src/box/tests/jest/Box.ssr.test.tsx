/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Box } from "../../src/Box.tsx";

describe("Box", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Box>Text</Box>
            );

        expect(renderOnServer).not.toThrow();
    });
});
