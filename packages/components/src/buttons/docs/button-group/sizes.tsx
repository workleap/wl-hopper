import { Button, ButtonGroup, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ButtonGroup>
                <Button variant="secondary">No, thanks</Button>
                <Button variant="secondary">Remind me later</Button>
                <Button variant="primary">Rate Now</Button>
            </ButtonGroup>
            <ButtonGroup size="sm">
                <Button variant="secondary">No, thanks</Button>
                <Button variant="secondary">Remind me later</Button>
                <Button variant="primary">Rate Now</Button>
            </ButtonGroup>
        </Stack>
    );
}
