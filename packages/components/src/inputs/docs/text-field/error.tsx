import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField
            placeholder="Full name (e.g., Jane Smith)"
            isInvalid
            label="Name"
            errorMessage="This field is required"
        />
    );
}
