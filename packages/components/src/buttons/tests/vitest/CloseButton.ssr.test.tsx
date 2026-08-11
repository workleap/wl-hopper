/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { CloseButton } from "../../src/CloseButton.tsx";

describe("CloseButton", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <CloseButton />
            );

        expect(renderOnServer).not.toThrow();
    });
});

