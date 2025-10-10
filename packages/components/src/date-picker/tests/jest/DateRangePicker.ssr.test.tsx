/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { DateRangePicker } from "../../src/DateRangePicker.tsx";

describe("DateRangePicker", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <DateRangePicker />
            );

        expect(renderOnServer).not.toThrow();
    });
});
