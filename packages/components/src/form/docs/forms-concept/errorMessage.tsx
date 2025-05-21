import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField
                label="Name"
                name="name"
                isRequired
                errorMessage={({ validationDetails }) => (
                    validationDetails.valueMissing ? "Please enter a name." : ""
                )}
            />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}
