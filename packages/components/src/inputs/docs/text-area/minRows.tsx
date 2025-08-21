import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            minRows={1}
            label="Prompt"
            placeholder="Ask anything..."
        />
    );
}
