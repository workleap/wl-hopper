import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, [setIsOpen]);

    return (
        <AlertTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Leap ahead!" cancelButtonLabel="Cancel">
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );
}
