/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { RemainingCharacterCount } from "../../src/RemainingCharacterCount.tsx";

describe("RemainingCharacterCount", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <RemainingCharacterCount count={3} />
            );

        expect(renderOnServer).not.toThrow();
    });
});
