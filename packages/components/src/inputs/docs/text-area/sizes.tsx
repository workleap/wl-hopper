import { Stack, TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TextArea label="Address" placeholder="123 Main St, City, State" size="sm" />
            <TextArea label="Address" placeholder="123 Main St, City, State" />
        </Stack>
    );
}
