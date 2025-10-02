import { Button, Div, Text } from "@hopper-ui/components";

export function Example() {
    return (
        <Div display="flex" flexDirection="column" gap="stack-md">
            <Text>Choose an option:</Text>
            <Button variant="primary">Get Started</Button>
        </Div>
    );
}
