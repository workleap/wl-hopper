/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { SegmentedControl } from "../../src/SegmentedControl.tsx";

describe("SegmentedControl", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <SegmentedControl>
                    test
                </SegmentedControl>
            );

        expect(renderOnServer).not.toThrow();
    });
});
