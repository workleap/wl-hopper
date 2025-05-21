import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form isFluid width="80%">
            <TextField name="email" placeholder="Enter your email" label="Email" />
            <Button type="submit">Sign In</Button>
        </Form>
    );
}
