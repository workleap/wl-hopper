import { Button, CompactCallout, Content } from "@hopper-ui/components";

export default function Example() {
    return (
        <CompactCallout>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button size="sm">Undo</Button>
        </CompactCallout>
    );
}
