import { Alert, Button, Content, Heading } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, [setIsOpen]);

    const handlePrimaryButtonClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
        }, 3000);
    };

    return (
        <>
            <Button variant="secondary" onPress={() => setIsOpen(true)}>Open</Button>
            <Alert
                isLoading={isLoading}
                onPrimaryButtonClick={handlePrimaryButtonClick}
                onCancelButtonClick={() => setIsOpen(false)}
                primaryButtonLabel="Leap ahead!"
                cancelButtonLabel="Cancel"
                overlayProps={{
                    isOpen,
                    onOpenChange: handleOpenChange
                }}
            >
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </>
    );
}
