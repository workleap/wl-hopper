import { Slider } from "@hopper-ui/shadcn-extension";
import { Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" UNSAFE_width="20rem">
            <Text id="price-range-label">Price range</Text>
            <Slider aria-labelledby="price-range-label" defaultValue={[25, 75]} />
        </Stack>
    );
}
