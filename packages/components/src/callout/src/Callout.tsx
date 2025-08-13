import { CautionRichIcon, InfoRichIcon, RichIconContext, SuccessRichIcon, UpsellRichIcon } from "@hopper-ui/icons";
import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef, useMemo, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { ButtonContext, CloseButton, LinkButtonContext } from "../../buttons/index.ts";
import { ContentContext } from "../../layout/index.ts";
import { HeadingContext } from "../../typography/index.ts";
import { cssModule, SlotProvider, useSlot, type BaseComponentDOMProps } from "../../utils/index.ts";

import { CalloutContext } from "./CalloutContext.ts";

import styles from "./Callout.module.css";

export const GlobalCalloutCssSelector = "hop-Callout";

type CalloutVariant = "information" | "warning" | "success" | "upsell";

export interface CalloutProps extends StyledComponentProps<BaseComponentDOMProps> {
    /**
     * The overall hue of the callout.
     * @default "information"
     */
    variant?: CalloutVariant;
    /**
     * The appearance of the callout.
     * @default "border"
     */
    fillStyle?: "border" | "subtleFill";
    /**
     * If true, the callout won't have an icon
     */
    hideIcon?: ResponsiveProp<boolean>;
    /**
     * Callback function that happens when the callout is dismissed.
     */
    onClose?: () => void;
}

const Callout = (props: CalloutProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, CalloutContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        slot,
        hideIcon: hideIconProp,
        onClose,
        fillStyle = "border",
        variant = "information",
        ...otherProps
    } = ownProps;

    const hideIcon = useResponsiveValue(hideIconProp);

    const [iconRef, hasIcon] = useSlot();

    const classNames = clsx(
        GlobalCalloutCssSelector,
        cssModule(
            styles,
            "hop-Callout",
            variant,
            fillStyle === "subtleFill" && "subtle-fill"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const icon = useMemo(() => {
        if (hideIcon) {
            return null;
        }

        switch (variant) {
            case "warning": return <CautionRichIcon />;
            case "success": return <SuccessRichIcon />;
            case "upsell": return <UpsellRichIcon />;
            default: return <InfoRichIcon />;
        }
    }, [hideIcon, variant]);

    return (
        <div
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
            {...otherProps}
        >
            <SlotProvider
                values={[
                    [HeadingContext, {
                        className: styles["hop-Callout__heading"],
                        size: "unset"
                    }],
                    [ContentContext, {
                        className: styles["hop-Callout__content"]
                    }],
                    [LinkButtonContext, {
                        className: styles["hop-Callout__button"],
                        variant: "secondary"
                    }],
                    [ButtonContext, {
                        className: styles["hop-Callout__button"],
                        variant: "secondary"
                    }],
                    [RichIconContext, {
                        className: styles["hop-Callout__icon"],
                        variant,
                        size: "xl"
                    }]
                ]}
            >
                {!hasIcon && icon}
                <SlotProvider
                    values={[
                        [RichIconContext, {
                            className: styles["hop-Callout__icon"],
                            variant,
                            size: "xl",
                            ref: iconRef
                        }]
                    ]}
                >
                    {children}
                </SlotProvider>
                {onClose && <CloseButton size="xs" className={styles["hop-Callout__dismiss"]} onPress={onClose} />}
            </SlotProvider>
        </div>
    );
};

/**
 * Informs users about important changes or persistent conditions.
 * Use this component to communicate to users in a prominent way.
 * Callouts are placed at the top of the page or section they apply to, and below the page or section header.
 *
 * [View Documentation](https://hopper.workleap.design/components/Callout)
 */
const _Callout = forwardRef<HTMLDivElement, CalloutProps>(Callout);
_Callout.displayName = "Callout";

export { _Callout as Callout };
