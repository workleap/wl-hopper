import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ElementType, type RefAttributes, type SVGProps } from "react";
import { useContextProps, type SlotProps } from "react-aria-components";

import { cssModule } from "../../components/src/utils/src/cssModule.ts";

import { RichIconContext } from "./RichIconContext.ts";

import styles from "./RichIcon.module.css";

export const GlobalRichIconCssSelector = "hop-RichIcon";

export type RichIconDecorativeVariant = "option1" | "option2" | "option3" | "option4" | "option5" | "option6" | "option7" | "option8";
export type RichIconStatusVariant = "success" | "warning" | "danger" | "information" | "upsell";
export type RichIconVariant = RichIconDecorativeVariant | RichIconStatusVariant;

export interface RichIconProps extends SlotProps, StyledComponentProps<"svg"> {
    /**
     * The visual style of the icon.
     * @default "option7"
     */
    variant?: RichIconVariant;
    /**
    * The size of the icon.
    * @default "lg"
    */
    size?: ResponsiveProp<"md" | "lg" | "xl">;
    /**
     * The source of the icon with a size of 24px.
     */
    src24: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
    /**
     * The source of the icon with a size of 32px.
     */
    src32: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
    /**
     * The source of the icon with a size of 40px.
     */
    src40: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const RichIcon = forwardRef<SVGSVGElement, RichIconProps>((props, ref) => {
    [props, ref] = useContextProps(props, ref, RichIconContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        size: sizeProp,
        variant = "option7",
        src24,
        src32,
        src40,
        style,
        className,
        "aria-label": ariaLabel,
        "aria-hidden": ariaHidden,
        slot,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "lg";
    const sizeMappings = {
        md: src24,
        lg: src32,
        xl: src40
    };

    const As = sizeMappings[size];

    const classNames = clsx(
        className,
        GlobalRichIconCssSelector,
        cssModule(
            styles,
            "hop-RichIcon",
            variant
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <As
            ref={ref}
            style={mergedStyles}
            data-slot={slot}
            {...otherProps}
            focusable="false"
            role="img"
            aria-label={ariaLabel}
            aria-hidden={(ariaLabel ? (ariaHidden || undefined) : true)}
            className={classNames}
        />
    );
});

RichIcon.displayName = "RichIcon";
