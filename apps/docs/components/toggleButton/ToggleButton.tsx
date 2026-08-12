import { type ForwardedRef, createContext, forwardRef } from "react";
import {
    type ContextValue,
    ToggleButton as RACToggleButton,
    type ToggleButtonProps as RACToggleButtonProps,
    useContextProps
} from "react-aria-components";
import clsx from "clsx";

import "./toggleButton.css";

interface ToggleButtonProps extends RACToggleButtonProps {}

function ToggleButton(props: ToggleButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ToggleButtonContext);
    const { children, className, ...other } = props;

    return (
        <RACToggleButton {...other} className={clsx("hd-toggleButton", className)} ref={ref}>
            {children}
        </RACToggleButton>
    );
}

/**
 * Context for the ToggleButton component.
 */
export const ToggleButtonContext = createContext<ContextValue<Partial<ToggleButtonProps>, HTMLButtonElement>>({});

/**
 * A button that toggles between two states.
 */
const _ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(ToggleButton);
_ToggleButton.displayName = "ToggleButton";

export { _ToggleButton as ToggleButton };
