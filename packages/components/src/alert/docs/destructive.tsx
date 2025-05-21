import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <AlertTrigger>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Escape the swamp" secondaryButtonLabel="Stay in the mud" variant="destructive">
                <Heading>Frog-tastrophe!</Heading>
                <Content>
                    Something went wrong in the pond. Better leap out before it gets warty!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
