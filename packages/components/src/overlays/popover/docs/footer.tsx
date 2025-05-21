import { Button, Content, Footer, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Footer>
                    1 of 5
                </Footer>
                <Button>Next</Button>
            </Popover>
        </PopoverTrigger>
    );
}
