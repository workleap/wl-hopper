import { CheckmarkIcon } from "@hopper-ui/icons";
import { useStyledSystem, type StyledComponentProps } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef } from "react";
import { composeRenderProps, Provider, ToggleButton, useContextProps, type Key, type ToggleButtonProps } from "react-aria-components";

import { Text, TextContext } from "../../typography/index.ts";
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
}

const Tile = (props: TileProps, ref: ForwardedRef<HTMLButtonElement>) => {
    [props, ref] = useContextProps(props, ref, TileContext);

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style,
        isDisabled,
        slot,
        ...otherProps
    } = ownProps;

    const classNames = composeClassnameRenderProps(
        GlobalTileCssSelector,
        cssModule(
            styles,
            "hop-Tile"
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
            isDisabled={isDisabled}
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
        >
            {renderProps => {
                const children = childrenFn(renderProps);

                return <Provider
                    values={[
                        [TextContext, {
                            size: "md",
                            className: styles["hop-Tile__text"]
                        }]
                    ]}
                >
                    {typeof children === "string" ? <Text>{children}</Text> : children}
                    <CheckmarkIcon className={styles["hop-Tile__icon"]} />
                </Provider>;
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

