/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Button } from "../../../buttons/index.ts";
import { Tooltip } from "../../src/Tooltip.tsx";
import { TooltipTrigger } from "../../src/TooltipTrigger.tsx";

describe("Tooltip", () => {
    const BUTTON_TEXT = "Trigger";
    const TOOLTIP_TEXT = "Tooltip text";

    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <TooltipTrigger defaultOpen>
                    <Button>{BUTTON_TEXT}</Button>
                    <Tooltip>{TOOLTIP_TEXT}</Tooltip>
                </TooltipTrigger>
            );

        expect(renderOnServer).not.toThrow();
    });
});
