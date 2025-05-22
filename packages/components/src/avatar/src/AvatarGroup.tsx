import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { Children, forwardRef, isValidElement, type CSSProperties, type ForwardedRef } from "react";
import { useContextProps } from "react-aria-components";

import { Tooltip, TooltipTrigger } from "../../tooltip/index.ts";
import { Text } from "../../typography/index.ts";
import { cssModule, type AccessibleSlotProps, type Align, type BaseComponentDOMProps } from "../../utils/index.ts";

import { AnonymousAvatar } from "./AnonymousAvatar.tsx";
import { Avatar, type AvatarSize } from "./Avatar.tsx";
import { AvatarContext } from "./AvatarContext.ts";
import { AvatarGroupContext } from "./AvatarGroupContext.ts";
import { DeletedAvatar } from "./DeletedAvatar.tsx";

import styles from "./AvatarGroup.module.css";

export const GlobalAvatarGroupCssSelector = "hop-AvatarGroup";

const extractAvatars = (children: React.ReactNode): React.ReactElement[] => {
    return Children.toArray(children).flatMap(child => {
        if (isValidElement(child)) {
            if (child.type === Avatar || child.type === DeletedAvatar || child.type === AnonymousAvatar) {
                return child;
            } else if (child.props && child.props.children) {
                return extractAvatars(child.props.children);
            }
        }

        return [];
    });
};

export interface AvatarGroupProps extends StyledComponentProps<BaseComponentDOMProps>, AccessibleSlotProps {
    /**
     * The size of the avatar.
     * @default "md"
     */
    size?: ResponsiveProp<AvatarSize>;
    /**
     * The maximum number of avatars to show before showing the overflow indicator.
     * @default 3
     */
    maxNumberOfAvatar?: ResponsiveProp<number>;
    /**
     * Whether or not to wrap the avatars.
     * @default true
     */
    wrap?: ResponsiveProp<boolean>;
    /**
     * Whether or not to reverse the order of the avatars.
     */
    reverse?: boolean;
    /**
     * The alignment of the avatars within the AvatarGroup.
     * @default 'start'
     */
    align?: ResponsiveProp<Align>;
}

function AvatarGroup(props:AvatarGroupProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, AvatarGroupContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        style,
        slot,
        maxNumberOfAvatar: maxNumberOfAvatarProp,
        size: sizeProp,
        wrap: wrapProp,
        reverse,
        align: alignProp,
        ...otherProps
    } = ownProps;

    let avatars = extractAvatars(children);

    if (reverse) {
        avatars = avatars.reverse();
    }

    const align = useResponsiveValue(alignProp) ?? "start";
    const size = useResponsiveValue(sizeProp) ?? "md";
    const wrap = useResponsiveValue(wrapProp) ?? true;
    const maxNumberOfAvatar = useResponsiveValue(maxNumberOfAvatarProp) ?? 3;

    const classNames = clsx(
        GlobalAvatarGroupCssSelector,
        cssModule(
            styles,
            GlobalAvatarGroupCssSelector,
            size,
            wrap && "wrap",
            align
        ),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...style,
        ...stylingProps.style
    };

    const shownAvatars = avatars.slice(0, maxNumberOfAvatar);
    const hiddenAvatars = avatars.slice(maxNumberOfAvatar);
    const numberOfHiddenAvatars = hiddenAvatars.length;

    return (
        <AvatarContext.Provider
            value={{
                size,
                className: styles["hop-AvatarGroup__avatar"],
                showTooltip: true
            }}
        >
            <div
                role="group"
                ref={ref}
                slot={slot ?? undefined}
                className={classNames}
                style={mergedStyles}
                {...otherProps}
            >
                {shownAvatars}
                {numberOfHiddenAvatars > 0 && (
                    <TooltipTrigger>
                        <span className={styles["hop-AvatarGroup__label"]}>+{numberOfHiddenAvatars}</span>
                        <Tooltip>
                            <AvatarContext.Provider value={{ size: "xs" }}>
                                {hiddenAvatars.map((avatar, index) => {
                                    const name = avatar.props.name ?? avatar.props["aria-label"] ?? avatar.props["aria-labelledby"];

                                    return (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <div role="button" className={styles["hop-AvatarGroup__hiddenAvatar"]} key={`${name}-${index}`}>
                                            {avatar}
                                            <Text>
                                                {name}
                                            </Text>
                                        </div>
                                    );
                                })}
                            </AvatarContext.Provider>
                        </Tooltip>
                    </TooltipTrigger>
                )}
            </div>
        </AvatarContext.Provider>
    );
}

/**
 * Avatars are used to represent a user, a team or another entity in the Workleap ecosystem. They are often paired with text where room is available.
 *
 * [View Documentation](https://hopper.workleap.design/components/Avatar)
 */
const _AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(AvatarGroup);
_AvatarGroup.displayName = "AvatarGroup";

export { _AvatarGroup as AvatarGroup };
