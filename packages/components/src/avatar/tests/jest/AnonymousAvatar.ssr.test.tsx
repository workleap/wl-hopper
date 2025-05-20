/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { AnonymousAvatar } from "../../src/AnonymousAvatar.tsx";

describe("AnonymousAvatar", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <AnonymousAvatar aria-label="John Doe" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
