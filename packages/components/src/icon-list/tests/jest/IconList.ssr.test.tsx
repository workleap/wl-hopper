/**
 * @jest-environment node
 */
import { SparklesIcon } from "@hopper-ui/icons";
import { renderToString } from "react-dom/server";

import { IconList } from "../../src/IconList.tsx";

describe("IconList", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            );

        expect(renderOnServer).not.toThrow();
    });
});
