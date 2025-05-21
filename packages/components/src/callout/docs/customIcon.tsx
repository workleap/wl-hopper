import { Button, Callout, Content, Heading } from "@hopper-ui/components";
import { IdeaRichIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Callout onClose={() => alert("Closed")}>
            <IdeaRichIcon />
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button >Undo</Button>
        </Callout>
    );
}
