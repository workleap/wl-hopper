import { Button, PopoverBase, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button aria-label="trigger" variant="secondary">Trigger</Button>
            <PopoverBase>
                Frogs can breathe through their skin
            </PopoverBase>
        </PopoverTrigger>
    );
}
