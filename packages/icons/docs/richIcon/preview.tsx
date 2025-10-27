import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <CustomRichIcon />
    );
}

