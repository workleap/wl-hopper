/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Button } from "../../src/Button.tsx";
import { ButtonGroup } from "../../src/ButtonGroup.tsx";

describe("ButtonGroup", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ButtonGroup>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save</Button>
                </ButtonGroup>
            );

        expect(renderOnServer).not.toThrow();
    });
});

