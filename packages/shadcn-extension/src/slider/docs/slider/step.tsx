import { Slider } from "@hopper-ui/shadcn-extension";
import { Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" UNSAFE_width="20rem">
            <Text id="rating-label">Rating</Text>
            <Slider aria-labelledby="rating-label" defaultValue={3} maxValue={5} minValue={1} step={1} />
        </Stack>
    );
}
