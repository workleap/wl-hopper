import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CustomRichIcon variant="option1" />
                <CustomRichIcon variant="option2" />
                <CustomRichIcon variant="option3" />
                <CustomRichIcon variant="option4" />
                <CustomRichIcon variant="option5" />
                <CustomRichIcon variant="option6" />
                <CustomRichIcon variant="option7" />
                <CustomRichIcon variant="option8" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CustomRichIcon variant="success" />
                <CustomRichIcon variant="warning" />
                <CustomRichIcon variant="danger" />
                <CustomRichIcon variant="information" />
                <CustomRichIcon variant="upsell" />
            </div>
        </div>
    );
}
