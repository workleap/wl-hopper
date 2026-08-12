import { type ForwardedRef, type NamedExoticComponent, forwardRef } from "react";

import { ListBoxItem, type ListBoxItemProps, ListBoxSection, type ListBoxSectionProps } from "../../list-box/index.ts";

import { type InternalSelectProps, SelectInternal } from "./SelectInternal.tsx";

export type MultiSelectProps<T extends object> = Omit<InternalSelectProps<T, "multiple">, "selectionMode">;

/**
 * MultiSelect components enable users to choose multiple option from a collapsible list, optimizing space efficiency.
 *
 * [View Documentation](https://hopper.workleap.design/components/Select)
 */
const _MultiSelect = forwardRef((props: MultiSelectProps<object>, ref: ForwardedRef<HTMLDivElement>) => {
    return <SelectInternal {...props} selectionMode="multiple" ref={ref} />;
}) as <T extends object>(
    props: MultiSelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SelectInternal>;

(_MultiSelect as NamedExoticComponent).displayName = "MultiSelect";
export { _MultiSelect as MultiSelect };

export const MultiSelectItem = ListBoxItem;
export type MultiSelectItemProps<T> = ListBoxItemProps<T>;
export const MultiSelectSection = ListBoxSection;
export type MultiSelectSectionProps<T> = ListBoxSectionProps<T>;
