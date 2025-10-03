import { Box } from "@hopper-ui/components";
import { Button as RACButton } from "react-aria-components";

export function Example() {
    return (
        <Box as={RACButton} padding="inset-sm" border="neutral">
            Click me
        </Box>
    );
}
