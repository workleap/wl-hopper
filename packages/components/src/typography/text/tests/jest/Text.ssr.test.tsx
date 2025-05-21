/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Text } from "../../src/Text.tsx";

describe("Text", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Text>Text</Text>
            );

        expect(renderOnServer).not.toThrow();
    });
});
