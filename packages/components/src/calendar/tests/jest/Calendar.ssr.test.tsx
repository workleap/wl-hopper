/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Calendar } from "../../src/Calendar.tsx";

describe("Calendar", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Calendar>Text</Calendar>
            );

        expect(renderOnServer).not.toThrow();
    });
});
