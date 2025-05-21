import { Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationErrors={{ username: "Sorry, this username is taken." }}>
            <TextField name="username" defaultValue="john_doe" label="Username" />
        </Form>
    );
}
