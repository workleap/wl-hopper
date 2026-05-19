import {
    type ResponsiveProp,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, forwardRef, type NamedExoticComponent } from "react";
import {
    composeRenderProps,
    FieldErrorContext as RACFieldErrorContext,
    TagGroup as RACTagGroup,
    type TagGroupProps as RACTagGroupProps,
    type TagListProps as RACTagListProps,
    TagList,
    useContextProps
} from "react-aria-components";

import { ErrorMessage } from "../../error-message/index.ts";
import { type FormStyleProps, useFormProps } from "../../form/index.ts";
import { HelperMessage } from "../../helper-message/index.ts";
import { FieldLabel } from "../../typography/index.ts";
import { composeClassnameRenderProps, cssModule, type FieldProps, SlotProvider } from "../../utils/index.ts";

import type { ChipSize } from "./Chip.tsx";
import { ChipContext } from "./ChipContext.ts";
import { ChipGroupContext, InternalChipGroupContext } from "./ChipGroupContext.ts";

import styles from "./ChipGroup.module.css";

export const GlobalChipGroupCssSelector = "hop-ChipGroup";

type ListProps = "items" | "children" | "renderEmptyState";
export type ChipListProps<T> = StyledComponentProps<Omit<RACTagListProps<T>, ListProps>>;

export interface ChipGroupProps<T> extends StyledComponentProps<Omit<RACTagGroupProps, "children">>, Pick<RACTagListProps<T>, ListProps>, Omit<FieldProps, "size"> {
    /**
     * Whether the chips are invalid or not.
     */
    isInvalid?: boolean;
    /**
     * The size of the chips.
     * @default "md"
     */
    size?: ResponsiveProp<ChipSize>;
    /**
     * The chip list props.
     */
    chipListProps?: ChipListProps<T>;
}

function ChipGroup<T extends object>(props: ChipGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ChipGroupContext);
    props = useFormProps(props as FormStyleProps); /* Needed because ChipGroup has an extra size. */
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        contextualHelp,
        description,
        errorMessage,
        isInvalid = false,
        items,
        label,
        onRemove,
        necessityIndicator,
        renderEmptyState,
        selectionMode = "multiple",
        style: styleProp,
        size: sizeProp,
        chipListProps,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const { stylingProps: chipListStylingProps, ...chipListOwnProps } = useStyledSystem(chipListProps ?? {});
    const {
        className: chipListClassName,
        style: chipListStyleProp,
        ...otherChipListProps
    } = chipListOwnProps;

    const classNames = clsx(
        className,
        GlobalChipGroupCssSelector,
        stylingProps.className,
        cssModule(
            styles,
            "hop-ChipGroup",
            size
        )
    );

    const chipListClassNames = composeClassnameRenderProps(
        chipListClassName,
        cssModule(
            styles,
            "hop-ChipGroup__list",
            size
        ),
        chipListStylingProps.className
    );

    const style: CSSProperties = {
        ...stylingProps.style,
        ...styleProp
    };

    const chipListStyle = composeRenderProps(chipListStyleProp, prev => {
        return {
            ...chipListStylingProps.style,
            ...prev
        };
    });

    return (
        <InternalChipGroupContext.Provider value={{
            isInGroup: true
        }}
        >
            <SlotProvider
                values={[
                    [ChipContext, {
                        className: styles["hop-ChipGroup__chip"],
                        isInvalid,
                        size: size
                    }],
                    [RACFieldErrorContext, {
                        isInvalid: isInvalid,
                        validationErrors: [] as never[],
                        validationDetails: {} as never
                    }]
                ]}
            >
                <RACTagGroup
                    ref={ref}
                    className={classNames}
                    style={style}
                    onRemove={onRemove}
                    selectionMode={selectionMode}
                    {...otherProps}
                >
                    <FieldLabel
                        className={styles["hop-ChipGroup__Label"]}
                        necessityIndicator={necessityIndicator}
                        contextualHelp={contextualHelp}
                    >
                        {label}
                    </FieldLabel>
                    <TagList
                        items={items}
                        renderEmptyState={renderEmptyState}
                        className={chipListClassNames}
                        style={chipListStyle}
                        {...otherChipListProps}
                    >
                        {children}
                    </TagList>
                    {description && <HelperMessage className={styles["hop-ChipGroup__error-message"]} hideIcon>{description}</HelperMessage>}
                    <ErrorMessage className={styles["hop-ChipGroup__helper-message"]} hideIcon>{errorMessage}</ErrorMessage>
                </RACTagGroup>
            </SlotProvider>
        </InternalChipGroupContext.Provider>
    );
}

/**
 * A ChipGroup is an interactive collection of chips for filtering and multi-selection. Defaults to multi-select.
 *
 * [View Documentation](https://hopper.workleap.design/components/ChipGroup)
 */
const _ChipGroup = forwardRef(ChipGroup) as <T>(
    props: ChipGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ChipGroup>;
(_ChipGroup as NamedExoticComponent).displayName = "ChipGroup";

export { _ChipGroup as ChipGroup };
