import { Alert, AlertTrigger, Button, Content, Heading } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((open: boolean) => {
        if (isLoading && !open) {
            return;
        }

        setIsOpen(open);
    }, [setIsOpen, isLoading]);

    const handlePrimaryButtonClick = useCallback(async () => {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 3000));

        setIsLoading(false);
        setIsOpen(false);
    }, []);

    return (
        <AlertTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Button variant="secondary">Open</Button>
            <Alert
                isLoading={isLoading}
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
