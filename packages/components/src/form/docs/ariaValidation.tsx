import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="aria">
            <TextField
                name="username"
                defaultValue="admin"
                isRequired
                validate={value => value === "admin" ? "Nice try." : null}
                label="Username"
            />
            <Button type="submit">Submit</Button>
        </Form>
    );
}
