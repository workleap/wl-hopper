import { Divider, Inline, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack width="100%">
            <Stack>
                <Text>Content above</Text>
                <Divider orientation="horizontal" />
                <Text>Content below</Text>
            </Stack>
            <Inline alignY="stretch">
                <Text>Content left</Text>
                <Divider orientation="vertical" />
                <Text>Content right</Text>
            </Inline>
        </Stack>
    );
}
