import { IconContext } from "@hopper-ui/icons";
import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, useContext } from "react";
import { Button, type ButtonProps, composeRenderProps, DisclosureStateContext, useContextProps, useSlottedContext } from "react-aria-components";

import { ToggleArrow } from "../../ToggleArrow/index.ts";
import type { HeadingProps } from "../../typography/Heading/index.ts";
import { Heading, TextContext } from "../../typography/index.ts";
import { composeClassnameRenderProps, cssModule, SlotProvider } from "../../utils/index.ts";

import { DisclosureContext } from "./DisclosureContext.ts";
import { DisclosureHeaderContext } from "./DisclosureHeaderContext.ts";

import styles from "./DisclosureHeader.module.css";

export const GlobalDisclosureHeaderCssSelector = "hop-DisclosureHeader";

export type DisclosureHeaderButtonProps = Omit<StyledComponentProps<ButtonProps>, "children">;

export interface DisclosureHeaderProps extends HeadingProps {
    /**
     * The props for the button that triggers the disclosure.
     */
    buttonProps?: DisclosureHeaderButtonProps;
}

function DisclosureHeader(props: DisclosureHeaderProps, ref: ForwardedRef<HTMLHeadingElement>) {
    [props, ref] = useContextProps(props, ref, DisclosureHeaderContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        buttonProps,
        className,
        children,
        level = 3,
        size = "xs",
        style: styleProp,
        ...otherProps
    } = ownProps;

    const { isExpanded } = useContext(DisclosureStateContext)!;
    const { variant } = useSlottedContext(DisclosureContext)!;

    const classNames = clsx(
        GlobalDisclosureHeaderCssSelector,
        cssModule(
            styles,
            "hop-DisclosureHeader"
        ),
        stylingProps.className,
        className
    );

    const style: CSSProperties = {
        ...stylingProps.style,
        ...styleProp
    };

    const { stylingProps: buttonStylingProps, ...buttonOwnProps } = useStyledSystem(buttonProps ?? {});

    const {
        className: buttonClassName,
        style: buttonStyleProp,
        ...buttonOtherProps
    } = buttonOwnProps;

    const buttonClassNames = composeClassnameRenderProps(
        buttonClassName,
        cssModule(
            styles,
            "hop-DisclosureHeader__button",
            variant
        ),
        buttonStylingProps.className
    );

    const buttonStyle = composeRenderProps(buttonStyleProp, prev => {
        return {
            ...buttonStylingProps.style,
            ...prev
        };
    });

    return (
        <Heading
            ref={ref}
            className={classNames}
            style={style}
            level={level}
            size={size}
            {...otherProps}
        >
            <Button
                slot="trigger"
                className={buttonClassNames}
                style={buttonStyle}
                data-expanded={isExpanded || undefined}
                {...buttonOtherProps}
            >
                <SlotProvider values={[
                    [TextContext, {
                        className: styles["hop-DisclosureHeader__title"],
                        size: "inherit"
                    }],
                    [IconContext, {
                        className: styles["hop-DisclosureHeader__icon"],
                        size: "md"
                    }]
                ]}
                >
                    {children}
                </SlotProvider>
                <ToggleArrow
                    className={styles["hop-DisclosureHeader__toggle-arrow"]}
                />
            </Button>
        </Heading>
    );
}

/**
 * DisclosureHeader is the main header element that users interact with to expand or collapse the associated panel.
 *
 * [View Documentation](https://hopper.workleap.design/components/Disclosure)
 */
const _DisclosureHeader = forwardRef<HTMLHeadingElement, DisclosureHeaderProps>(DisclosureHeader);
_DisclosureHeader.displayName = "DisclosureHeader";

export { _DisclosureHeader as DisclosureHeader };
