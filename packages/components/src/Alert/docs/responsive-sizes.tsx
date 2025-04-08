import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <AlertTrigger>
            <Button variant="secondary">Open responsive alert</Button>
            <Alert
                primaryButtonLabel="Leap ahead!"
                cancelButtonLabel="Cancel"
                size={{
                    base: "mobile",
                    sm: "sm",
                    md: "md"
                }}
            >
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
