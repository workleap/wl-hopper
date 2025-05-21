import { PasswordField, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <PasswordField label="Password" size="sm" />
            <PasswordField label="Password" />
        </Stack>
    );
}
