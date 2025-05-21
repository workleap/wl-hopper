/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Form } from "../../src/Form.tsx";

describe("Form", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Form>Text</Form>
            );

        expect(renderOnServer).not.toThrow();
    });
});
