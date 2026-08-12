import {
    type ResponsiveProp,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { type ForwardedRef, type PointerEvent, forwardRef, useContext } from "react";
import {
    FieldErrorContext as RACFieldErrorContext,
    Group as RACGroup,
    type GroupProps as RACGroupProps,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { composeClassnameRenderProps, cssModule } from "../../utils/index.ts";

import { InputGroupContext } from "./InputGroupContext.ts";

import styles from "./InputGroup.module.css";

export const GlobalInputGroupCssSelector = "hop-InputGroup";

export interface InputGroupProps extends StyledComponentProps<RACGroupProps> {
    /**
     * Whether the button takes up the width of its container.
     * @default false
     */
    isFluid?: ResponsiveProp<boolean>;
}

function InputGroup(props: InputGroupProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, InputGroupContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, style: styleProp, children, isFluid: isFluidProp, isInvalid, ...otherProps } = ownProps;

    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalInputGroupCssSelector,
        cssModule(styles, "hop-InputGroup", isFluid && "fluid"),
        stylingProps.className
    );

    const validation = useContext(RACFieldErrorContext);

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const handlePointerUp = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && !(e.target as Element).closest("button,input,textarea")) {
            e.preventDefault();
            e.currentTarget.querySelector("input")?.focus();
        }
    };
    const handlePointerDown = (e: PointerEvent) => {
        // Forward focus to input element when clicking on a non-interactive child (e.g. icon or padding)
        if (e.pointerType === "mouse" && !(e.target as Element).closest("button,input,textarea")) {
            e.preventDefault();
            e.currentTarget.querySelector("input")?.focus();
        }
    };

    return (
        <RACGroup
            isInvalid={validation?.isInvalid || isInvalid}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            ref={ref}
            className={classNames}
            style={style}
            {...otherProps}
        >
            {children}
        </RACGroup>
    );
}

/**
 * An input group combines an input component with addons.
 *
 * [View Documentation](https://hopper.workleap.design/components/InputGroup)
 */
const _InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(InputGroup);
_InputGroup.displayName = "InputGroup";

export { _InputGroup as InputGroup };
