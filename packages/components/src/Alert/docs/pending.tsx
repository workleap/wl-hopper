import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    const handlePrimaryButtonClick = async() => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsOpen(false);
    };

    return (
        <AlertTrigger isOpen={isOpen}>
            <Button variant="secondary" onPress={() => setIsOpen(true)}>Open</Button>
            <Alert
                onClose={onClose}
                onPrimaryButtonClick={handlePrimaryButtonClick}
                onCancelButtonClick={onClose}
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
