import { CompactCallout, Content, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <CompactCallout>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Link size="sm">Learn more</Link>
        </CompactCallout>
    );
}
