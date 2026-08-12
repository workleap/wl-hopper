import { DismissIcon } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef } from "react";
import { useContextProps } from "react-aria-components";

import { useLocalizedString } from "../../i18n/index.ts";
import { cssModule } from "../../utils/index.ts";

import { Button, type ButtonProps } from "./Button.tsx";
import { CloseButtonContext } from "./CloseButtonContext.ts";

export const GlobalCloseButtonCssSelector = "hop-CloseButton";

import styles from "./CloseButton.module.css";

export interface CloseButtonProps extends StyledComponentProps<ButtonProps> {}

function CloseButton(props: CloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, CloseButtonContext);
    const stringFormatter = useLocalizedString();

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        "aria-label": ariaLabel = stringFormatter.format("CloseButton.ariaLabel"),
        className,
        style,
        variant = "ghost-secondary",
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalCloseButtonCssSelector,
        cssModule(styles, "hop-CloseButton"),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <Button
            className={classNames}
            style={mergedStyles}
            ref={ref}
            aria-label={ariaLabel}
            variant={variant}
            slot="close"
            {...otherProps}
        >
            <DismissIcon />
        </Button>
    );
}

/**
 * A CloseButton allows a user to dismiss a component.
 */
const _CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(CloseButton);

_CloseButton.displayName = "CloseButton";

export { _CloseButton as CloseButton };
