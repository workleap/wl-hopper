/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { SearchField } from "../../src/SearchField.tsx";

describe("SearchField", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <SearchField label="Label" />
            );

        expect(renderOnServer).not.toThrow();
    });
});
