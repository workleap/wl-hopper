import { createContext } from "react";
import type { ContextValue } from "react-aria-components";

import type { ImageProps } from "./Image.tsx";

export const ImageContext = createContext<ContextValue<ImageProps, HTMLImageElement>>({});

ImageContext.displayName = "ImageContext";
