/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { TextArea } from "../../src/TextArea.tsx";

describe("TextArea", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <TextArea label="Label" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
