import type { Context, PropsWithChildren, ReactNode } from "react";
import type { ContextValue } from "react-aria-components";


export interface ClearProvidersProps {
    /**
     * The list of providers to clear.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: Context<ContextValue<any, any>>[];

    children: ReactNode;
}

/**
 * Writing slots in a component can be a bit tricky. This component is a utility that allows you to clear the slots of a component.
 *
 * For instance: In a dialog, slots could apply specific styles to a Divider divider between the heading and the content.
 * If someone wanted to make a two column layout in their content and use a Divider, they'd need to do some work to get rid of the class name the dialog applies.
 *
 * There are a few reasons why you might want to clear slots:
 * - You're trying to make a component that is a container for other components, and you don't want anything set above to affect your content.
 * - You're trying to specify a different slot provider inside
 */
export function ClearProviders({
    values,
    children
}: ClearProvidersProps) {
    // Similar implementation to SlotProvider
    for (const Context of values) {
        children = <Context.Provider value={null}>{children}</Context.Provider>;
    }

    return children;
}

/**
 *  Most of the time, you won't need to use this component. It's mostly useful for when you're trying to make a component that is a container for other components, and you don't want anything set above to affect your content.
 * TODO: Check if this can be removed and replaced by :
 * if (slot && racContext && 'slots' in racContext && !racContext.slots?.[slot]) {
 *   return <RACTextContext.Provider value={null}>{text}</RACTextContext.Provider>;
 * }
 * inside the text component, like S2.
 */
export function ClearContainerSlots({ children }: PropsWithChildren) {
    return children;

    // return (
    //     // <ClearProviders
    //     //     values={[
    //     //         RACTextContext,
    //     //         TextContext
    //     //     ]}
    //     // >
    //     { children }
    //     // </ClearProviders>
    // );
}
