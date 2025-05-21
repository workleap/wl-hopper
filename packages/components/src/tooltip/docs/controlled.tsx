import { Button, Tooltip, TooltipTrigger } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = useCallback(
        (newValue: boolean) => {
            setIsOpen(newValue);
        },
        [setIsOpen]
    );

    return (
        <TooltipTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Button>Trigger</Button>
            <Tooltip>Frogs can breathe through their skin</Tooltip>
        </TooltipTrigger>
    );
}
