import { Button, Checkbox, CheckboxGroup, Grid, H1, repeat, Stack, Text } from "@hopper-ui/components";

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

            <Grid gap="stack-sm" templateColumns={repeat(8, "auto")} padding="inset-sm">
                Main:
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="upsell">Upsell Button</Button>
                <Button variant="ghost-primary">Ghost Primary Button</Button>
                <Button variant="ghost-secondary">Ghost Secondary Button</Button>
                <Button variant="ghost-danger">Ghost Danger Button</Button>
                Disabled:
                <Button variant="primary" isDisabled>Primary Button</Button>
                <Button variant="secondary" isDisabled>Secondary Button</Button>
                <Button variant="danger" isDisabled>Danger Button</Button>
                <Button variant="upsell" isDisabled>Upsell Button</Button>
                <Button variant="ghost-primary" isDisabled>Ghost Primary Button</Button>
                <Button variant="ghost-secondary" isDisabled>Ghost Secondary Button</Button>
                <Button variant="ghost-danger" isDisabled>Ghost Danger Button</Button>
            </Grid>

        </Stack>
    );
}
