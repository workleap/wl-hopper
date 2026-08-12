/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Button } from "../../src/Button.tsx";

describe("Button", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<Button>Cutoff</Button>);

        expect(renderOnServer).not.toThrow();
    });
});
