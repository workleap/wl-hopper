/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Avatar } from "../../src/Avatar.tsx";
import { AvatarGroup } from "../../src/AvatarGroup.tsx";

describe("AvatarGroup", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <AvatarGroup>
                    <Avatar name="Croakster" />
                </AvatarGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});
