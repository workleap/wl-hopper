/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { DisclosureHeader, DisclosurePanel } from "../../index.ts";
import { Disclosure } from "../../src/Disclosure.tsx";

describe("Disclosure", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Disclosure>
                    <DisclosureHeader>
                        Disclosure Header
                    </DisclosureHeader>
                    <DisclosurePanel>
                        Disclosure Panel
                    </DisclosurePanel>
                </Disclosure>
            );

        expect(renderOnServer).not.toThrow();
    });
});
