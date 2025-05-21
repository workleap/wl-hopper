import { Button, Stack, Tooltip, TooltipTrigger } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Stack>
            <TooltipTrigger>
                <Button variant="secondary">
                    <SparklesIcon />
                </Button>
                <Tooltip>Frogs can breathe through their skin</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
                <SparklesIcon />
                <Tooltip>Frogs can breathe through their skin</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
                <div>Just a normal div</div>
                <Tooltip>Frogs can breathe through their skin</Tooltip>
            </TooltipTrigger>
        </Stack>
    );
}
