/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { ListBoxItem } from "../../src/index.ts";
import { ListBox } from "../../src/ListBox.tsx";

describe("ListBox", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <ListBox aria-label="list-box"><ListBoxItem>Text</ListBoxItem></ListBox>
            );

        expect(renderOnServer).not.toThrow();
    });
});
