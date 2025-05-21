import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            maxRows={8}
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns."
            label="Comment"
        />
    );
}
