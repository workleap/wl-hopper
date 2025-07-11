import { IconContext, type IconSize } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    slot as slotFn,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import {
    composeRenderProps,
    DEFAULT_SLOT,
    Link as RACLink,
    type LinkProps as RACLinkProps,
    useContextProps
} from "react-aria-components";

import { IconListContext } from "../../icon-list/index.ts";
import { TextContext } from "../../typography/index.ts";
import {
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper,
    type SizeAdapter,
    SlotProvider,
    useSlot
} from "../../utils/index.ts";
import { type ButtonSize, type ButtonVariant, useButtonProps } from "../utils/index.ts";

import { LinkButtonContext } from "./LinkButtonContext.ts";

import styles from "./LinkButton.module.css";

export const GlobalLinkButtonCssSelector = "hop-LinkButton";

export const LinkButtonToIconSizeAdapter: SizeAdapter<ButtonSize, IconSize> = {
    xs: "sm",
    sm: "md",
    md: "md"
};

export interface LinkButtonProps extends StyledComponentProps<RACLinkProps> {
    /**
     * The visual style of the button.
     * @default "primary"
     */
    variant?: ButtonVariant;

    /**
     * A button can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<ButtonSize>;

    /**
     * Whether or not the button takes up the width of its container.
     */
    isFluid?: ResponsiveProp<boolean>;

    /**
     * Whether the button should open in a new tab.
     */
    isExternal?: boolean;
}

function LinkButton(props: LinkButtonProps, ref: ForwardedRef<HTMLAnchorElement>) {
    [props, ref] = useContextProps(props, ref, LinkButtonContext);
    props = useButtonProps(props);

    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        className,
        children: childrenProp,
        isExternal,
        rel,
        target,
        isFluid: isFluidProp,
        variant = "primary",
        size: sizeProp,
        style: styleProp,
        ...otherProps
    } = ownProps;

    const [textRef, hasText] = useSlot();
    const size = useResponsiveValue(sizeProp) ?? "md";
    const isFluid = useResponsiveValue(isFluidProp) ?? false;

    const classNames = composeClassnameRenderProps(
        className,
        GlobalLinkButtonCssSelector,
        cssModule(
            styles,
            "hop-LinkButton",
            variant,
            size,
            isFluid && "fluid",
            !hasText && "icon-only"
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    const iconSize = LinkButtonToIconSizeAdapter[size];

    return (
        <SlotProvider
            values={[
                [IconListContext, {
                    slots: {
                        [DEFAULT_SLOT]: {
                            size: iconSize,
                            className: styles["hop-LinkButton__icon-list"]
                        },
                        "end-icon": {
                            size: iconSize,
                            className: styles["hop-LinkButton__end-icon-list"]
                        }
                    }
                }],
                [IconContext, {
                    slots: {
                        [DEFAULT_SLOT]: {
                            size: iconSize,
                            className: styles["hop-LinkButton__icon"]
                        },
                        "end-icon": {
                            size: iconSize,
                            className: styles["hop-LinkButton__end-icon"]
                        }
                    }
                }],
                [TextContext, {
                    className: styles["hop-LinkButton__text"],
                    size: size,
                    ref: textRef
                }]
            ]}
        >
            <RACLink
                ref={ref}
                rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
                target={target ?? (isExternal ? "_blank" : undefined)}
                className={classNames}
                style={style}
                slot={props.slot || undefined}
                {...otherProps}
            >
                {children}
            </RACLink>
        </SlotProvider>
    );
}

/**
 * A LinkButton merges the functionality of a link with the appearance of a button, providing a user-friendly way to direct users to other pages.
 *
 * [View Documentation](https://hopper.workleap.design/components/LinkButton)
 *
 */
const _LinkButton = slotFn("button", forwardRef(LinkButton));

_LinkButton.displayName = "LinkButton";

export { _LinkButton as LinkButton };
