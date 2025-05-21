import { Button, Content, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Button>Apply</Button>
            </Popover>
        </PopoverTrigger>
    );
}

