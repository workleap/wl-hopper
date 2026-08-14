import { createIcon } from "@hopper-ui/icons";

import { Sparkles16, Sparkles24, Sparkles32 } from "../src/index.ts";

const CustomIcon = createIcon(Sparkles16, Sparkles24, Sparkles32, "CustomIcon");

export default function Example() {
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <CustomIcon size="sm" />
            <CustomIcon size="md" />
            <CustomIcon size="lg" />
        </div>
    );
}
