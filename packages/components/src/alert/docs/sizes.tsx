import { Alert, type AlertProps, AlertTrigger, Button, Content, Heading, Stack } from "@hopper-ui/components";

export default function Example() {
    const alert = (size: AlertProps["size"]) => (
        <AlertTrigger>
            <Button variant="secondary">Open {`${size}`}</Button>
            <Alert primaryButtonLabel="Leap ahead!" cancelButtonLabel="Cancel" size={size}>
                <Heading>Ribbit Reminder!</Heading>
                <Content>
                    Your changes have been saved—no need to leap again. Hop along, hero!
                </Content>
            </Alert>
        </AlertTrigger>
    );

    return (
        <Stack gap="stack-md">
            {alert("sm")}
            {alert("md")}
        </Stack>
    );
}
