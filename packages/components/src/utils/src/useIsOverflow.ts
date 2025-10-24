import { useIsomorphicLayoutEffect } from "@hopper-ui/styled-system";
import { type RefObject, useState } from "react";

export const useIsOverflow = (ref: RefObject<HTMLElement | null>, callback?: (isOverflow: boolean) => void) => {
    const [isOverflow, setIsOverflow] = useState(false);

    useIsomorphicLayoutEffect(() => {
        if (!ref?.current) {
            return;
        }
        const { current } = ref;
        const trigger = () => {
            const hasOverflow = current.scrollHeight > current.clientHeight ||
                current.scrollWidth > current.clientWidth;
            setIsOverflow(hasOverflow);

            if (callback) {
                callback(hasOverflow);
            }
        };

        if (current) {
            if ("ResizeObserver" in window) {
                new ResizeObserver(trigger).observe(current);
            }

            trigger();
        }
    }, [callback, ref, ref?.current]);

    return isOverflow;
};
