/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { EmbeddedButton } from "../../src/EmbeddedButton.tsx";

describe("EmbeddedButton", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<EmbeddedButton />);

        expect(renderOnServer).not.toThrow();
    });
});
