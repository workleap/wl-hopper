/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Card } from "../../src/Card.tsx";

describe("Card", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Card>Text</Card>
            );

        expect(renderOnServer).not.toThrow();
    });
});
