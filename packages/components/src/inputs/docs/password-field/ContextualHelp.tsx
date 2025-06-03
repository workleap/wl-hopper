import { ContextualHelp, PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField
            label="Password"
            contextualHelp={<ContextualHelp>Choose a strong password with at least 8 characters, including a mix of letters, numbers, and symbols.</ContextualHelp>}
        />
    );
}
