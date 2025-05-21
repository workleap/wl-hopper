/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ListBoxSection } from "../../src/ListBoxSection.tsx";

describe("Section", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ListBoxSection>Text</ListBoxSection>
            );

        expect(renderOnServer).not.toThrow();
    });
});
