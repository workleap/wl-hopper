/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { BrokenAvatar } from "../../src/BrokenAvatar.tsx";

describe("BrokenAvatar", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <BrokenAvatar aria-label="John Doe" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
