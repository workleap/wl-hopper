import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" isInvalid label="Address" errorMessage="This field is required" />
    );
}
