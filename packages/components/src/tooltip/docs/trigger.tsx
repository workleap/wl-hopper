import { Button, Div, Stack, Tooltip, TooltipTrigger } from "@hopper-ui/components";
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
                <Div>Just a normal div</Div>
                <Tooltip>Frogs can breathe through their skin</Tooltip>
            </TooltipTrigger>
        </Stack>
    );
}
