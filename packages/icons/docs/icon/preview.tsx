import { createIcon } from "@hopper-ui/icons";

import { Sparkles16, Sparkles24, Sparkles32 } from "../src/index.ts";

const CustomIcon = createIcon(Sparkles16, Sparkles24, Sparkles32, "CustomIcon");

export default function Example() {
    return <CustomIcon />;
}
