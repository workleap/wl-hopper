import { Button, Tooltip, TooltipTrigger, TooltipTriggerContext } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import { forwardRef, useContext } from "react";

const CustomTrigger = forwardRef<HTMLButtonElement>((props, ref) => {
    const { isOpen } = useContext(TooltipTriggerContext);

    return (
        <Button
            {...props}
            aria-label="Frog"
            ref={ref}
            variant={isOpen ? "primary" : "secondary"}
        >
            <SparklesIcon />
        </Button>
    );
});

export default function Example() {
    return (
        <TooltipTrigger>
            <CustomTrigger />
            <Tooltip>Frogs can breathe through their skin</Tooltip>
        </TooltipTrigger>
    );
}
