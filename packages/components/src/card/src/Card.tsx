import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { cssModule, type BaseComponentDOMProps } from "../../utils/index.ts";

import { CardContext } from "./CardContext.ts";

import styles from "./Card.module.css";

export const GlobalCardCssSelector = "hop-Card";

export interface CardProps extends StyledComponentProps<BaseComponentDOMProps> {
    /**
     * The visual style of the card.
     * @default "main"
     */
    variant?: "main" | "second-level";
}

const Card = (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CardContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        slot,
        variant = "main",
        ...otherProps
    } = ownProps;

    const classNames = clsx(
        GlobalCardCssSelector,
        cssModule(
            styles,
            "hop-Card",
            variant
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    return (
        <div
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
            {...otherProps}
        >
            {children}
        </div>
    );
};

/**
 * Cards are used to group similar concepts and tasks to make it easier for users to scan, read and get things done.
 *
 * [View Documentation](https://hopper.workleap.design/components/Card)
 */
const _Card = forwardRef<HTMLDivElement, CardProps>(Card);
_Card.displayName = "Card";

export { _Card as Card };
