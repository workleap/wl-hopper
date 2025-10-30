import { forwardRef, type ForwardedRef, type NamedExoticComponent } from "react";

import { ListBoxItem, ListBoxSection, type ListBoxItemProps, type ListBoxSectionProps } from "../../list-box/index.ts";

import { InternalSelect, type InternalSelectProps } from "./SelectInternal.tsx";

/**
 * Select components enable users to choose multiple option from a collapsible list, optimizing space efficiency.
 *
 * [View Documentation](https://hopper.workleap.design/components/Select)
 */
const _MultiSelect = forwardRef((props: MultiSelectProps<object>, ref: ForwardedRef<HTMLDivElement>) => {
    const SelectInternal = forwardRef(InternalSelect) as <T extends object>(
        props: InternalSelectProps<T, "multiple"> & { ref?: ForwardedRef<HTMLDivElement> }
    ) => ReturnType<typeof InternalSelect>;
    return (
        <SelectInternal
            {...props}
            selectionMode="multiple"
            ref={ref}
        />
    );
}) as <T extends object>(
    props: MultiSelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof InternalSelect>;
(_MultiSelect as NamedExoticComponent).displayName = "MultiSelect";
export type MultiSelectProps<T extends object> = Omit<InternalSelectProps<T, "multiple">, "selectionMode" | "selectionIndicator">;

export const MultiSelectItem = ListBoxItem;
export type MultiSelectItemProps<T> = ListBoxItemProps<T>;
export const MultiSelectSection = ListBoxSection;
export type MultiSelectSectionProps<T> = ListBoxSectionProps<T>;

export { _MultiSelect as MultiSelect };
