import {
    Button,
    ButtonContext,
    Content,
    Heading,
    Popover,
    PopoverContext,
    PopoverTrigger,
    SlotProvider
} from "@hopper-ui/components";
import { type ReactNode, useRef, useState } from "react";

const HighlightedTrigger = ({ children }: { children: ReactNode }) => {
    const triggerRef = useRef(null);
    const [isOpen, setOpen] = useState(false);

    return (
        <SlotProvider values={[
            [PopoverContext, { isOpen, onOpenChange: setOpen }],
            [ButtonContext, {
                onPress: () => setOpen(!isOpen),
                ref: triggerRef,
                variant: isOpen ? "primary" : "secondary"
            }]
        ]}
        >
            {children}
        </SlotProvider>
    );
};

export default function Example() {
    return (
        <HighlightedTrigger>
            <PopoverTrigger>
                <Button>Company Profile</Button>
                <Popover>
                    <Heading>ACME</Heading>
                    <Content>
                    A tech company focusing on the development of software and hardware solutions.
                    </Content>
                </Popover>
            </PopoverTrigger>
        </HighlightedTrigger>
    );
}
