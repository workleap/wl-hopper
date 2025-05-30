import { createContext, type Context } from "react";
import type { ContextValue } from "react-aria-components";

import type { ImageProps } from "./Image.tsx";

export interface ImageContextValue extends ImageProps {
    /**
     *  Contexts to clear.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearContexts?: Context<any>[];
    /**
     * Whether the image is hidden or not.
    */
    isHidden?: boolean;
}

export const ImageContext = createContext<ContextValue<ImageContextValue, HTMLImageElement>>({});

ImageContext.displayName = "ImageContext";
