import { useResponsiveValue, useStyledSystem, type ResponsiveProp, type StyledComponentProps } from "@hopper-ui/styled-system";
import { forwardRef, type ForwardedRef } from "react";
import { composeRenderProps, Provider, ToggleButtonGroup, useContextProps, type ToggleButtonGroupProps } from "react-aria-components";

import { composeClassnameRenderProps, cssModule } from "../../utils/index.ts";

import { InternalTileContext } from "./TileContext.ts";
import { TileGroupContext } from "./TileGroupContext.ts";

import styles from "./TileGroup.module.css";

export const GlobalTileGroupCssSelector = "hop-TileGroup";

export interface TileGroupProps extends
    StyledComponentProps<ToggleButtonGroupProps> {
    /**
     * The number of columns to display the tiles in.
     * @default 3
     */
    numberOfColumns?: ResponsiveProp<number>;
    /**
     * Whether single or multiple selection is enabled.
     * @default "single"
     */
    selectionMode?: "single" | "multiple";
    /**
     * Whether the collection allows empty selection.
     * @default true
     */
    disallowEmptySelection?: boolean;
}

const TileGroup = (props: TileGroupProps, ref: ForwardedRef<HTMLDivElement>) => {
    [props, ref] = useContextProps(props, ref, TileGroupContext);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        style,
        slot,
        isDisabled,
        selectionMode = "single",
        disallowEmptySelection = true,
        numberOfColumns = 3,
        ...otherProps
    } = ownProps;

    const columns = useResponsiveValue(numberOfColumns);

    const classNames = composeClassnameRenderProps(
        GlobalTileGroupCssSelector,
        cssModule(
            styles,
            "hop-TileGroup"
        ),
        stylingProps.className,
        className
    );

    const mergedStyles = composeRenderProps(style, prev => {
        return {
            ...stylingProps.style,
            ...{
                gridTemplateColumns: `repeat(${columns}, 1fr)`
            },
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return prev;
    });

    return (
        <ToggleButtonGroup
            ref={ref}
            className={classNames}
            style={mergedStyles}
            slot={slot ?? undefined}
            isDisabled={isDisabled}
            selectionMode={selectionMode}
            disallowEmptySelection={disallowEmptySelection}
            {...otherProps}
        >
            {renderProps => (
                <Provider
                    values={[
                        [InternalTileContext, { isDisabled: isDisabled }]
                    ]}
                >
                    {children(renderProps)}
                </Provider>
            )}
        </ToggleButtonGroup>
    );
};

/**
 * TileGroup groups Tiles to let users browse and take action on a group of related items.
 *
 * [View Documentation](https://hopper.workleap.design/components/TileGroup)
 */
const _TileGroup = forwardRef<HTMLDivElement, TileGroupProps>(TileGroup);
_TileGroup.displayName = "TileGroup";

export { _TileGroup as TileGroup };
