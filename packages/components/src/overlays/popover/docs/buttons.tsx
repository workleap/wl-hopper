import { Button, ButtonGroup, Content, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button>Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <ButtonGroup>
                    <Button variant="secondary">Follow</Button>
                    <Button>Apply</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    );
}
