import { Breakpoints } from "../../../../../../packages/styled-system/src/responsive/Breakpoints";
import SimpleTable from "../simpleTable/SimpleTable.ai";

export default function BreakpointTable() {
    const breakpoints = Object.entries(Breakpoints).map(([key, value]) => {
        return {
            name: key,
            value: `min-width: ${value}px`
        };
    });

    return (
        <SimpleTable
            aria-label="Breakpoints"
            headers={["Name", "Media query"]}
            data={[
                { name: "base", value: "min-width: 0px" },
                ...breakpoints
            ]}
        />
    );
}
