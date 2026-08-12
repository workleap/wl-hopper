/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Switch } from "../../src/Switch.tsx";

describe("Switch", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<Switch>Text</Switch>);

        expect(renderOnServer).not.toThrow();
    });
});
