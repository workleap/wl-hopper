/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Grid } from "../../src/Grid.tsx";

describe("Grid", () => {
    it("should render on the server", () => {
        const renderOnServer = () =>
            renderToString(
                <Grid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Grid>
            );

        expect(renderOnServer).not.toThrow();
    });
});
