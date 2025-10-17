import { Button, ButtonGroup, Div, Form, TextField } from "@hopper-ui/components";
import { useState, type FormEvent } from "react";

export default function Example() {
    const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Prevent default browser page refresh.
        e.preventDefault();

        // Get form data as an object.
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Submit to your backend API...
        setSubmitted(data);
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextField name="name" label="Name" />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
            {submitted && (
                <Div>
                    You submitted: <code>{JSON.stringify(submitted)}</code>
                </Div>
            )}
        </Form>
    );
}
