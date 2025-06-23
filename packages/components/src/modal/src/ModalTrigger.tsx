import { DialogTrigger, type DialogTriggerProps } from "react-aria-components";

import { InternalModalTriggerContext } from "./ModalContext.ts";

export type ModalTriggerProps = DialogTriggerProps;

export function ModalTrigger(props: ModalTriggerProps) {
    return (
        <InternalModalTriggerContext.Provider value={props}>
            <DialogTrigger {...props}>{props.children}</DialogTrigger>
        </InternalModalTriggerContext.Provider>
    );
}
