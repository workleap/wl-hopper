"use client";

import SimpleTable from "../simpleTable/SimpleTable";
import { Breakpoints } from "@hopper-ui/components";

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
            data={[{ name: "base", value: "min-width: 0px" }, ...breakpoints]}
        />
    );
}
