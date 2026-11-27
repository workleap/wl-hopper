import { Slider } from "@hopper-ui/shadcn-extension";
import { Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" UNSAFE_width="20rem">
            <Text id="disabled-volume-label">Volume</Text>
            <Slider aria-labelledby="disabled-volume-label" defaultValue={50} isDisabled />
        </Stack>
    );
}
