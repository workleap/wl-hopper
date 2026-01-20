import { slot as slotFn, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, type CSSProperties, type ElementType, type RefAttributes, type SVGProps } from "react";
import { useContextProps, type SlotProps } from "react-aria-components";

import { cssModule } from "../../components/src/utils/src/cssModule.ts";

import { IconContext } from "./IconContext.ts";

import styles from "./Icon.module.css";

export const GlobalIconCssSelector = "hop-Icon";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends SlotProps, Omit<StyledComponentProps<"svg">, "slot"> {
    /**
    * The size of the icon.
    * @default "md"
    */
    size?: ResponsiveProp<IconSize>;
    /**
     * The source of the icon with a size of 16px.
     */
    src16: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
    /**
     * The source of the icon with a size of 24px.
     */
    src24: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
    /**
     * The source of the icon with a size of 32px.
     */
    src32: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    [props, ref] = useContextProps(props, ref, IconContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);

    const {
        size: sizeProp,
        src16,
        src24,
        src32,
        style,
        className,
        "aria-label": ariaLabel,
        "aria-hidden": ariaHidden,
        slot,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";
    const sizeMappings = {
        sm: src16,
        md: src24,
        lg: src32
    };

    const As = sizeMappings[size];

    const classNames = clsx(
        className,
        GlobalIconCssSelector,
        cssModule(
            styles,
            "hop-Icon"
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
            data-slot={slot || undefined}
            {...otherProps}
            focusable="false"
            role="img"
            aria-label={ariaLabel}
            aria-hidden={(ariaLabel ? (ariaHidden || undefined) : true)}
            className={classNames}
        />
    );
});

const _Icon = slotFn("icon", Icon);
_Icon.displayName = "Icon";

export { _Icon as Icon };
