import { Stack, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TextField label="Name" placeholder="Full name (e.g., Jane Smith)" size="sm" />
            <TextField label="Name" placeholder="Full name (e.g., Jane Smith)" />
        </Stack>
    );
}
