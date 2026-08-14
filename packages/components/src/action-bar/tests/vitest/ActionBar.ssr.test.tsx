/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { ActionBar } from "../../src/ActionBar.tsx";

describe("ActionBar", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<ActionBar selectedItemCount={1}>test</ActionBar>);

        expect(renderOnServer).not.toThrow();
    });
});
