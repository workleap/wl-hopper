import { Button, Callout, Content, Heading, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Callout onClose={() => alert("Closed")}>
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button >Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="success">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button >Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="warning">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button >Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="upsell">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button >Undo</Button>
            </Callout>
        </Stack>

    );
}
