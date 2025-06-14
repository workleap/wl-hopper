import { ContextualHelp, TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            placeholder="123 Main St, City, State"
            label="Address"
            contextualHelp={<ContextualHelp>Write the full address</ContextualHelp>}
        />
    );
}
