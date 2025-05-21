import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            showCharacterCount
            maxLength={20}
            allowExceedingMaxLength
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns."
            label="Comment"
        />
    );
}
