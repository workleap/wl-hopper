import type { ComponentProps, FunctionComponent } from "react";
import { Provider } from "react-aria-components";

/**
 * In complex components, you may need to provide many contexts. The SlotProvider component is a utility that makes it
 * easier to provide multiple React contexts without manually nesting them.
 *  This can be achieved by passing pairs of contexts and values as an array to the values prop.
 */
export const SlotProvider = Provider;
export type SlotProviderProps = ComponentProps<typeof SlotProvider>;

// we know SlotProvider is a FunctionComponent, and we want to overwrite it's name
(SlotProvider as FunctionComponent).displayName = "SlotProvider";
