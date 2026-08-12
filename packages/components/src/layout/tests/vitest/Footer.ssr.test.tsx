/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Footer } from "../../src/Footer.tsx";

describe("Footer", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<Footer>Text</Footer>);

        expect(renderOnServer).not.toThrow();
    });
});
