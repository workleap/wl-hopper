/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Spinner } from "../../src/Spinner.tsx";

describe("Spinner", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Spinner aria-label="Loading…" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
