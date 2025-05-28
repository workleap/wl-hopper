/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Paragraph } from "../../src/Paragraph.tsx";

describe("Paragraph", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Paragraph>Text</Paragraph>
            );

        expect(renderOnServer).not.toThrow();
    });
});
