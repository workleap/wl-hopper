/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { LinkButton } from "../../src/LinkButton.tsx";

describe("LinkButton", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <LinkButton href="https://www.google.com">Cutoff</LinkButton>
            );

        expect(renderOnServer).not.toThrow();
    });
});

