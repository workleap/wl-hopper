import { Button, ButtonGroup, Div, Form, TextField } from "@hopper-ui/components";
import { useState, type FormEvent } from "react";

export default function Example() {
    const [name, setName] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Submit data to your backend API...
        alert(name);
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextField label="Name" value={name} onChange={setName} />
            <Div>You entered: {name}</Div>
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}
