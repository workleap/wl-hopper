import { ContextualHelp, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ContextualHelp>
                Hop along, hero!
            </ContextualHelp>
            <ContextualHelp variant="info">
                Hop along, hero!
            </ContextualHelp>
        </Stack>
    );
}
