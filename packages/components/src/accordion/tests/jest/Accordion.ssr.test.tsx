/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server";

import { Disclosure, DisclosureHeader, DisclosurePanel } from "../../../Disclosure/index.ts";
import { Accordion } from "../../src/Accordion.tsx";

describe("Accordion", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Accordion>
                    <Disclosure id="officevibe">
                        <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                        <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                    </Disclosure>
                    <Disclosure id="pingboard">
                        <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                        <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                    </Disclosure>
                    <Disclosure id="performance">
                        <DisclosureHeader>Workleap Performance</DisclosureHeader>
                        <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                    </Disclosure>
                </Accordion>
            );

        expect(renderOnServer).not.toThrow();
    });
});
