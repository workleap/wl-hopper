/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { RangeCalendar } from "../../src/RangeCalendar.tsx";

describe("RangeCalendar", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <RangeCalendar />
            );

        expect(renderOnServer).not.toThrow();
    });
});
