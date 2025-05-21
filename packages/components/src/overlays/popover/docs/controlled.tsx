import { Button, Content, Heading, Popover, Stack } from "@hopper-ui/components";
import { useRef, useState } from "react";

export default function Example() {
    const triggerRef = useRef(null);
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Stack alignX="center">
                <Button
                    onPress={() => setOpen(!isOpen)}
                    variant="secondary"
                >
                    Company Profile
                </Button>
                <span ref={triggerRef}>Popover will be positioned relative to me</span>
            </Stack>
            <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
            </Popover>
        </>
    );
}
