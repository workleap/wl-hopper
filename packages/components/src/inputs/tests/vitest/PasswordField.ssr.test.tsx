/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { PasswordField } from "../../src/PasswordField.tsx";

describe("PasswordField", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<PasswordField label="Label" />);

        expect(renderOnServer).not.toThrow();
    });
});
