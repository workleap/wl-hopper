import { Button, CompactCallout, Content, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <CompactCallout>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button  size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout variant="success">
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button  size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout variant="warning">
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button  size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button  size="sm">Undo</Button>
            </CompactCallout>
        </Stack>
    );
}
