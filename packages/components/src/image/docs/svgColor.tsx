import { SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <SvgImage
            aria-label="No results"
            fill="core_sunken-treasure-100"
            src={NoResults}
            stroke="core_sapphire-600"
        />
    );
}
