import { ContextualHelp, NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField
            label="Training hours completed"
            contextualHelp={<ContextualHelp>This input only takes in numbers</ContextualHelp>}
        />
    );
}
