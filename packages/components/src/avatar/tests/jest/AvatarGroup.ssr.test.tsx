/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { AvatarGroup } from "../../src/AvatarGroup.tsx";

describe("AvatarGroup", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <AvatarGroup>Text</AvatarGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});
