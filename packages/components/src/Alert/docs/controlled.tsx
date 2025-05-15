import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="secondary">Open</Button>
            <Alert
                primaryButtonLabel="Leap ahead!"
                cancelButtonLabel="Cancel"
                onPrimaryButtonClick={() => setIsOpen(false)}
                onCancelButtonClick={() => setIsOpen(false)}
            >
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
