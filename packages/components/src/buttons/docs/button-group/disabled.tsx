import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup isDisabled>
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}
