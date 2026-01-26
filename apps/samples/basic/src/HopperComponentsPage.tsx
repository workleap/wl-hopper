import { Button, Card, Grid, H3, repeat, Stack } from "@hopper-ui/components";

export function HopperComponentsPage() {
    return (
        <Stack>
            <Card gap="stack-md" padding="inset-squish-lg" variant="second-level">
                <H3>Button</H3>
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
                    Loading:
                    <Button variant="primary" isLoading>Primary Button</Button>
                    <Button variant="secondary" isLoading>Secondary Button</Button>
                    <Button variant="danger" isLoading>Danger Button</Button>
                    <Button variant="upsell" isLoading>Upsell Button</Button>
                    <Button variant="ghost-primary" isLoading>Ghost Primary Button</Button>
                    <Button variant="ghost-secondary" isLoading>Ghost Secondary Button</Button>
                    <Button variant="ghost-danger" isLoading>Ghost Danger Button</Button>
                </Grid>
            </Card>

        </Stack>
    );
}
