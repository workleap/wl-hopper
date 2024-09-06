import { TextArea, Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            showCharacterCount
            maxLength={20} 
            restrictMaxLength={false}
            defaultValue="React simplifies the process of creating dynamic web applications."
        >
            <Label>Comment:</Label>
        </TextArea>
    );
}
