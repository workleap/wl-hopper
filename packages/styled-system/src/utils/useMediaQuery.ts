import { useIsSSR } from "@react-aria/ssr";
import { useEffect, useState } from "react";

// Ensure that matchMedia function exists. In a jest environnement or in SSR, this function is not available.
export const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";

// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/useMediaQuery.ts
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => (supportsMatchMedia ? window.matchMedia(query).matches : false));

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);
        const onChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", onChange);

        return () => {
            mediaQueryList.removeEventListener("change", onChange);
        };
    }, [query]);

    // If in SSR, the media query should never match. Once the page hydrates,
    // this will update and the real value will be returned.
    const isSSR = useIsSSR();

    return isSSR ? false : matches;
}
