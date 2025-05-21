import { Button, Callout, Card, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="core_240">
            <Callout onClose={() => alert("Closed")} fillStyle="subtleFill">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button >Undo</Button>
            </Callout>
        </Card>
    );
}
