import { Box } from "@hopper-ui/components";

export function Example() {
    return (
        <>
            <Box display="flex">
                This should just be a <code>&lt;Inline&gt;</code>
            </Box>
            <Box display="flex" flexDirection="column">
                This should just be a <code>&lt;Stack&gt;</code>
            </Box>
        </>

    );
}
