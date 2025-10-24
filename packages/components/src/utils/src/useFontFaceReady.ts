import { useIsomorphicLayoutEffect } from "@hopper-ui/styled-system";
import { useState } from "react";

export const useFontFaceReady = () => {
    const [ready, setReady] = useState(false);

    useIsomorphicLayoutEffect(() => {
        let isCancelled = false;
        document.fonts.ready.then(() => {
            if (!isCancelled) {
                setReady(true);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return ready;
};
