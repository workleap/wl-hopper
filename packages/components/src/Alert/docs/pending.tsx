import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";
import { useCallback } from "react";

export default function Example() {
    const handlePrimaryButtonClick = useCallback(async() => {
        await new Promise(resolve => setTimeout(resolve, 3000));
    }, []);

    return (
        <AlertTrigger>
            <Button variant="secondary">Open</Button>
            <Alert
                onPrimaryButtonClick={handlePrimaryButtonClick}
                primaryButtonLabel="Leap ahead!"
                cancelButtonLabel="Cancel"
            >
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
