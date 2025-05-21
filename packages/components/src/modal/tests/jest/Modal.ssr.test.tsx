/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Modal } from "../../src/Modal.tsx";

describe("Modal", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Modal>Text</Modal>
            );

        expect(renderOnServer).not.toThrow();
    });
});
