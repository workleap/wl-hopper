import { Button, Content, Footer, Heading, Link, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button aria-label="information" variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Footer>
                    <Link href="#">Website</Link>
                </Footer>
            </Popover>
        </PopoverTrigger>
    );
}
