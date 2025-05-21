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
import { type FormStyleProps, useFormProps } from "../../Form/index.ts";
import { HelperMessage } from "../../HelperMessage/index.ts";
import { Label } from "../../typography/Label/index.ts";
import { composeClassnameRenderProps, cssModule, type FieldProps, SlotProvider } from "../../utils/index.ts";

import type { TagSize, TagVariant } from "./Tag.tsx";
import { TagContext } from "./TagContext.ts";
import { InternalTagGroupContext, TagGroupContext } from "./TagGroupContext.ts";

import styles from "./TagGroup.module.css";

export const GlobalTagGroupCssSelector = "hop-TagGroup";

type ListProps = "items" | "children" | "renderEmptyState";
export type TagListProps<T> = StyledComponentProps<Omit<RACTagListProps<T>, ListProps>>;

export interface TagGroupProps<T> extends StyledComponentProps<Omit<RACTagGroupProps, "children">>, Pick<RACTagListProps<T>, ListProps>, Omit<FieldProps, "size"> {
    /**
     * Whether the tags are invalid or not.
     */
    isInvalid?: boolean;
    /**
     * A tag can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<TagSize>;
    /**
     * The tag list props
     */
    tagListProps?: TagListProps<T>;
    /**
     * The visual style of the TagGroup.
     * @default "neutral"
     */
    variant?: TagVariant;
}

function TagGroup<T extends object>(props: TagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, TagGroupContext);
    props = useFormProps(props as FormStyleProps); /* Needed because TagGroup has an extra size. */
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children,
        description,
        errorMessage,
        isInvalid = false,
        items,
        label,
        necessityIndicator,
        renderEmptyState,
        style: styleProp,
        size: sizeProp,
        tagListProps,
        variant,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const { stylingProps: tagListStylingProps, ...tagListOwnProps } = useStyledSystem(tagListProps ?? {});
    const {
        className: tagListClassName,
        style: tagListStyleProp,
        ...otherTagListProps
    } = tagListOwnProps;

    const classNames = clsx(
        className,
        GlobalTagGroupCssSelector,
        stylingProps.className,
        cssModule(
            styles,
            "hop-TagGroup",
            size
        )
    );

    const tagListClassNames = composeClassnameRenderProps(
        tagListClassName,
        cssModule(
            styles,
            "hop-TagGroup__list",
            size
        ),
        tagListStylingProps.className
    );

    const style: CSSProperties = {
        ...stylingProps.style,
        ...styleProp
    };

    const tagListStyle = composeRenderProps(tagListStyleProp, prev => {
        return {
            ...tagListStylingProps.style,
            ...prev
        };
    });


    return (
        <InternalTagGroupContext.Provider value={{
            isInGroup: true
        }}
        >
            <SlotProvider
                values={[
                    [TagContext, {
                        className: styles["hop-TagGroup__tag"],
                        isInvalid,
                        size: size,
                        variant: variant
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
                    {...otherProps}
                >
                    {label && <Label className={styles["hop-TagGroup__Label"]} necessityIndicator={necessityIndicator}>{label}</Label>}
                    <TagList
                        items={items}
                        renderEmptyState={renderEmptyState}
                        className={tagListClassNames}
                        style={tagListStyle}
                        {...otherTagListProps}
                    >
                        {children}
                    </TagList>
                    {description && <HelperMessage className={styles["hop-TagGroup__error-message"]} hideIcon>{description}</HelperMessage>}
                    <ErrorMessage className={styles["hop-TagGroup__helper-message"]} hideIcon>{errorMessage}</ErrorMessage>
                </RACTagGroup>
            </SlotProvider>
        </InternalTagGroupContext.Provider>
    );
}

/**
 * A versatile TagGroup component for categorizing items.
 *
 * [View Documentation](https://hopper.workleap.design/components/TagGroup)
 */
const _TagGroup = forwardRef(TagGroup) as <T>(
    props: TagGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof TagGroup>;
(_TagGroup as NamedExoticComponent).displayName = "TagGroup";

export { _TagGroup as TagGroup };
