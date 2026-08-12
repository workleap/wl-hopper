import { useEffect, useState } from "react";

export function useIsMobile(maxWidth: string) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const maxWidthInPixels = parseFloat(maxWidth) * 16;

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < maxWidthInPixels);
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [maxWidth]);

    return isMobile;
}
