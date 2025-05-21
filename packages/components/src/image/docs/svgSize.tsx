import { SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" UNSAFE_width="200px" UNSAFE_height="200px" />
    );
}
