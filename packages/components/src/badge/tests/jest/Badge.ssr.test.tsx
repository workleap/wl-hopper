/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Badge } from "../../src/Badge.tsx";

describe("Badge", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Badge>Text</Badge>
            );

        expect(renderOnServer).not.toThrow();
    });
});
