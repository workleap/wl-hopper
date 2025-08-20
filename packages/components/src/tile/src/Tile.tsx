import { CheckmarkIcon } from "@hopper-ui/icons";
import { Div, useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef } from "react";
import type { Orientation } from "react-aria";
import { composeRenderProps, Provider, ToggleButton, useContextProps, type Key, type ToggleButtonProps } from "react-aria-components";

import { IllustrationContext } from "../../illustration/index.ts";
import { ImageContext } from "../../image/index.ts";
import { Content, ContentContext } from "../../layout/index.ts";
import { HeadingContext } from "../../typography/index.ts";
import { composeClassnameRenderProps, cssModule } from "../../utils/index.ts";

import { TileContext } from "./TileContext.ts";

import styles from "./Tile.module.css";

export const GlobalTileCssSelector = "hop-Tile";

export type TileSize = "sm" | "md";

export interface TileProps extends
    StyledComponentProps<ToggleButtonProps> {
    /**
     * The id of the Tile, matching the values used in TileGroup's `selectedKeys` prop.
     */
    id: Key;
    /**
     * Whether or not the Tile is read-only.
     */
    isReadonly?: boolean;
    /**
     * The axis the Tile should align with.
     * @default 'vertical'
     */
    orientation?: ResponsiveProp<Orientation>;
}

const Tile = (props: TileProps, ref: ForwardedRef<HTMLButtonElement>) => {
    [props, ref] = useContextProps(props, ref, TileContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        orientation: orientationProp,
        style,
        isDisabled,
        isReadonly,
        slot,
        ...otherProps
    } = ownProps;

    const orientation = useResponsiveValue(orientationProp) ?? "vertical";

    const classNames = composeClassnameRenderProps(
        GlobalTileCssSelector,
        cssModule(
            styles,
            "hop-Tile",
            orientation,
            isReadonly && "readonly"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const childrenFn = composeRenderProps(childrenProp, prev => {
        return prev;
    });

    return (
        <ToggleButton
            {...otherProps}
            isDisabled={isDisabled || isReadonly}
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
        >
            {renderProps => {
                const children = childrenFn(renderProps);

                return (
                    <>
                        <Provider
                            values={[
                                [HeadingContext, { isHidden: true }],
                                [ContentContext, { isHidden: true }],
                                [ImageContext, {
                                    className: styles["hop-Tile__image"]
                                }],
                                [IllustrationContext, {
                                    className: styles["hop-Tile__illustration"]
                                }]
                            ]}
                        >
                            {typeof children === "string" ? <Content>{children}</Content> : children}
                        </Provider>
                        <Div className={styles["hop-Tile__container"]}>
                            <Provider
                                values={[
                                    [HeadingContext, {
                                        className: styles["hop-Tile__heading"],
                                        size: "unset"
                                    }],
                                    [ContentContext, {
                                        className: styles["hop-Tile__content"]
                                    }],
                                    [ImageContext, { isHidden: true }],
                                    [IllustrationContext, { isHidden: true }]
                                ]}
                            >
                                {typeof children === "string" ? <Content>{children}</Content> : children}
                                {!isReadonly && (
                                    <Div className={styles["hop-Tile__icon-container"]}>
                                        <CheckmarkIcon className={styles["hop-Tile__icon"]} />
                                    </Div>
                                )}
                            </Provider>
                        </Div>
                    </>
                );
            }}
        </ToggleButton>
    );
};

/**
 * A tile groups information into an interactive element to let users browse and take action on a group of related items.
 *
 * [View Documentation](https://hopper.workleap.design/components/Tile)
 */
const _Tile = forwardRef<HTMLButtonElement, TileProps>(Tile);
_Tile.displayName = "Tile";

export { _Tile as Tile };

