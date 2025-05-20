/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { DeletedAvatar } from "../../src/DeletedAvatar.tsx";

describe("DeletedAvatar", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <DeletedAvatar aria-label="John Doe" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
