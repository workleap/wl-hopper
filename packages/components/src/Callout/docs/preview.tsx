import { Button, Callout, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Callout onClose={() => alert("Closed")}>
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button >Undo</Button>
        </Callout>
    );
}
