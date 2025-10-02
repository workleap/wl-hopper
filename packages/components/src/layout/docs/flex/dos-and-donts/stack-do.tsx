import { Button, Stack, TextField } from "@hopper-ui/components";

export function Example() {
    return (
        <Stack gap="stack-md">
            <TextField label="Email" />
            <TextField label="Password" type="password" />
            <Button variant="primary">Sign In</Button>
        </Stack>
    );
}
