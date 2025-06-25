import { PressResponder } from "@react-aria/interactions";
import { useGlobalListeners } from "@react-aria/utils";
import { useState } from "react";
import { type PressEvent, MenuTrigger as RACMenuTrigger, type MenuTriggerProps as RACMenuTriggerProps } from "react-aria-components";

import { InternalMenuTriggerContext } from "./MenuTriggerContext.ts";

export const GlobalMenuTriggerCssSelector = "hop-MenuTrigger";

export interface MenuTriggerProps extends RACMenuTriggerProps {
    /**
     * The horizontal alignment of the popup relative to the trigger.
     * @default 'start'
     */
    align?: "start" | "end";
    /**
     * The direction the open will open relative to the trigger.
     */
    direction?: "bottom" | "top";
    /**
     * Whether or not the popup can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
   * Whether the menu should close when the menu item is selected.
   */
    shouldCloseOnSelect?: boolean;
}

export function MenuTrigger(props: MenuTriggerProps) {
    const { align, direction, allowFlip, children, shouldCloseOnSelect } = props;
    const [isPressed, setPressed] = useState(false);

    const { addGlobalListener } = useGlobalListeners();

    const onPressStart = (e: PressEvent) => {
        if (e.pointerType !== "mouse") {
            return;
        }

        setPressed(true);

        addGlobalListener(document, "pointerup", () => {
            setPressed(false);
        }, { once: true, capture: true });
    };

    return (
        <InternalMenuTriggerContext.Provider
            value={{
                align,
                direction,
                allowFlip,
                shouldCloseOnSelect
            }}
        >
            <RACMenuTrigger {...props}>
                <PressResponder onPressStart={onPressStart} isPressed={isPressed}>
                    {children}
                </PressResponder>
            </RACMenuTrigger>
        </InternalMenuTriggerContext.Provider>
    );
}
