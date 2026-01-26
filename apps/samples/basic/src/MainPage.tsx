import { Checkbox, CheckboxGroup, H1, Stack, Text } from "@hopper-ui/components";

export function MainPage() {
    return (
        <Stack>
            <H1>MainPage</H1>
            <Text>
                This is the main page.
                What is your role?
            </Text>
            <CheckboxGroup label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
        </Stack>
    );
}
