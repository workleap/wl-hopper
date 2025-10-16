/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { DatePicker } from "../../src/DatePicker.tsx";

describe("DatePicker", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <DatePicker />
            );

        expect(renderOnServer).not.toThrow();
    });
});
