import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField
                name="email"
                type="email"
                isRequired
                label="Email"
            />
            <ButtonGroup>
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}
