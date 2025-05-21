import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <AlertTrigger>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Leap ahead!" secondaryButtonLabel="Leap back">
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
