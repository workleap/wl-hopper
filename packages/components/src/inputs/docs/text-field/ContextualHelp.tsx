import { ContextualHelp, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField
            contextualHelp={<ContextualHelp>Write your name</ContextualHelp>}
            placeholder="Full name (e.g., Jane Smith)"
            label="Name"
        />
    );
}
