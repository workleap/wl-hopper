import { QuestionIcon } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { forwardRef, useCallback, useState, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { useContextProps } from "react-aria-components";

import { Button, type ButtonProps, type ButtonSize } from "../../buttons/index.ts";
import { Popover, PopoverTrigger, type PopoverProps, type PopoverTriggerProps } from "../../overlays/index.ts";
import { cssModule } from "../../utils/index.ts";

import { ContextualHelpContext } from "./ContextualHelpContext.ts";

import styles from "./ContextualHelp.module.css";

export const GlobalContextualHelpCssSelector = "hop-ContextualHelp";

export interface ContextualHelpProps extends
    StyledComponentProps<ButtonProps>,
    Pick<PopoverTriggerProps, "isOpen" | "defaultOpen" | "onOpenChange">,
    Pick<PopoverProps, "shouldFlip" | "offset" | "crossOffset" | "placement"> {
    /**
     * The contents of the ContextualHelp.
     */
    children: ReactNode;
    /**
     * The size of the ContextualHelp button.
     * @default "sm"
     */
    size?: ButtonSize;
}

function ContextualHelp(props: ContextualHelpProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ContextualHelpContext);
    const [isHovered, setIsHovered] = useState(false);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        defaultOpen,
        isOpen: isOpenProp,
        offset,
        crossOffset,
        onOpenChange,
        placement = "bottom start",
        shouldFlip,
        size = "sm",
        style,
        slot,
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalContextualHelpCssSelector,
        cssModule(
            styles,
            GlobalContextualHelpCssSelector
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const handleOpenChanged = useCallback((open: boolean) => {
        onOpenChange?.(open);
    }, [onOpenChange]);

    const [isOpen, onChange] = useControlledState(isOpenProp, defaultOpen || false, handleOpenChanged);

    console.log(isHovered);

    return (
        <PopoverTrigger isOpen={isOpen} onOpenChange={onChange}>
            <Button
                variant="ghost-secondary"
                size={size}
                slot={slot ?? undefined}
                className={classNames}
                style={mergedStyles}
                ref={ref}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                {...otherProps}
            >
                <QuestionIcon />
            </Button>
            <Popover
                crossOffset={crossOffset}
                offset={offset}
                placement={placement}
                shouldFlip={shouldFlip}
            >
                {children}
            </Popover>
        </PopoverTrigger>
    );
}

/**
 * Contextual help shows a user extra information about the state of an adjacent component.
 *
 * [View Documentation](https://hopper.workleap.design/components/ContextualHelp)
 */
const _ContextualHelp = forwardRef<HTMLButtonElement, ContextualHelpProps>(ContextualHelp);
_ContextualHelp.displayName = "ContextualHelp";

export { _ContextualHelp as ContextualHelp };
