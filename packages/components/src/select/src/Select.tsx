import { forwardRef, type ForwardedRef, type NamedExoticComponent } from "react";

import { ListBoxItem, ListBoxSection, type ListBoxItemProps, type ListBoxSectionProps } from "../../list-box/index.ts";

import { InternalSelect, type InternalSelectProps } from "./SelectInternal.tsx";

/**
 * Select components enable users to choose a single option from a collapsible list, optimizing space efficiency.
 *
 * [View Documentation](https://hopper.workleap.design/components/Select)
 */
const _Select = forwardRef(InternalSelect) as <T extends object>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof InternalSelect>;
export type SelectProps<T extends object> = InternalSelectProps<T, "single">;
(_Select as NamedExoticComponent).displayName = "Select";

export const SelectItem = ListBoxItem;
export type SelectItemProps<T> = ListBoxItemProps<T>;
export const SelectSection = ListBoxSection;
export type SelectSectionProps<T> = ListBoxSectionProps<T>;

export { _Select as Select };
