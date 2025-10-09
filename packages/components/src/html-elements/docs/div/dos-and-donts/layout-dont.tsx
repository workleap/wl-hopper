import { Button, Div, Text } from "@hopper-ui/components";

export function Example() {
    return (
        <Div display="flex" flexDirection="column" gap="stack-md">
            <Text>Reviewed Items: 10</Text>
            <Button variant="primary">Submit</Button>
        </Div>
    );
}
