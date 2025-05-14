import { useIsomorphicLayoutEffect } from "@hopper-ui/styled-system";
import { useCallback, useRef, useState, type RefCallback } from "react";

/**
* Taken from https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
*/

export function useSlot<T extends Element = Element>(): [RefCallback<T>, boolean] {
    // Assume we do have the slot in the initial render.
    const [hasSlot, setHasSlot] = useState(true);
    const hasRun = useRef(false);

    // A callback ref which will run when the slotted element mounts.
    // This should happen before the useLayoutEffect below.
    const ref = useCallback((el: T) => {
        hasRun.current = true;
        setHasSlot(!!el);
    }, []);

    // If the callback hasn't been called, then reset to false.
    useIsomorphicLayoutEffect(() => {
        if (!hasRun.current) {
            setHasSlot(false);
        }
    }, []);

    return [ref, hasSlot];
}
