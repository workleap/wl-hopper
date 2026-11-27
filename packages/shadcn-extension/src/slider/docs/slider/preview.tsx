import { Slider } from "@hopper-ui/shadcn-extension";
import { Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" UNSAFE_width="20rem">
            <Text id="volume-label">Volume</Text>
            <Slider aria-labelledby="volume-label" defaultValue={50} />
        </Stack>
    );
}
