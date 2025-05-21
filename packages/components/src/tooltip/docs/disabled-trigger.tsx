import { Button, Tooltip, TooltipTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <TooltipTrigger>
            <Button isDisabled>Trigger</Button>
            <Tooltip>Frogs can breathe through their skin</Tooltip>
        </TooltipTrigger>
    );
}
