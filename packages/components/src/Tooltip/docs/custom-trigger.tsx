import { Button, InternalTooltipTriggerContext, Tooltip, TooltipTrigger } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";
import { forwardRef, useContext } from "react";

export default function Example() {
    const CustomTrigger = forwardRef<HTMLButtonElement>((props, ref) => {
        const { isOpen } = useContext(InternalTooltipTriggerContext);

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

    return (
        <TooltipTrigger>
            <CustomTrigger />
            <Tooltip>Frogs can breathe through their skin</Tooltip>
        </TooltipTrigger>
    );
}
