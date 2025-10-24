/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SyntheticEvent } from "react";

/**
 * This function is meant to convert a native event into a synthetic event.
 * Copied from @react-aria\interactions\src\utils.ts
 */
export function createSyntheticEvent<E extends SyntheticEvent>(nativeEvent: Event): E {
    const event = nativeEvent as any as E;
    event.nativeEvent = nativeEvent;
    event.isDefaultPrevented = () => event.defaultPrevented;
    // cancelBubble is technically deprecated in the spec, but still supported in all browsers.
    event.isPropagationStopped = () => (event as any).cancelBubble;
    event.persist = () => {};

    return event;
}
