import { DialogTrigger, type DialogTriggerProps } from "react-aria-components";

export interface PopoverTriggerProps extends DialogTriggerProps {
}

export const PopoverTrigger = (props: PopoverTriggerProps) =>
    <DialogTrigger {...props}>{props.children}</DialogTrigger>;
