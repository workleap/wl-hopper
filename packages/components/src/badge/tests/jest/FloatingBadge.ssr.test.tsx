/**
 * @jest-environment node
 */
import { Div } from "@hopper-ui/styled-system";
import { renderToString } from "react-dom/server";

import { Badge } from "../../src/Badge.tsx";
import { FloatingBadge } from "../../src/FloatingBadge.tsx";

describe("Badge", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <FloatingBadge>
                    <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                    <Badge>Text</Badge>
                </FloatingBadge>
            );

        expect(renderOnServer).not.toThrow();
    });
});
