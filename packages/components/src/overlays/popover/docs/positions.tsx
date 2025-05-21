import { Button, PopoverTrigger, Popover, Heading, Content, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <PopoverTrigger>
                <Button aria-label="top popover" variant="secondary">Top</Button>
                <Popover placement="top">
                    <Heading>Popover top</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="right popover" variant="secondary">Right</Button>
                <Popover placement="right">
                    <Heading>Popover right</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="bottom popover" variant="secondary">Bottom</Button>
                <Popover placement="bottom">
                    <Heading>Popover bottom</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="left popover" variant="secondary">Left</Button>
                <Popover placement="left">
                    <Heading>Popover left</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
        </Inline>
    );
}
