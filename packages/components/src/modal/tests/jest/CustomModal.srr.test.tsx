/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { CustomModal } from "../../src/CustomModal.tsx";

describe("CustomModal", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <CustomModal>Text</CustomModal>
            );

        expect(renderOnServer).not.toThrow();
    });
});
