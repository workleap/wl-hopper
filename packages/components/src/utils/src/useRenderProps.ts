import { useMemo, type CSSProperties, type PropsWithChildren, type ReactNode } from "react";

import type { RenderPropsHookOptions, StyleProps } from "./types.ts";

/**
* Taken from https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
*/
export function useRenderProps<T>(props: RenderPropsHookOptions<T>): PropsWithChildren<StyleProps> {
    const {
        className,
        style,
        children,
        defaultClassName = undefined,
        defaultChildren = undefined,
        defaultStyle,
        values
    } = props;

    return useMemo(() => {
        let computedClassName: string | undefined;
        let computedStyle: CSSProperties | undefined;
        let computedChildren: ReactNode | undefined;

        if (typeof className === "function") {
            computedClassName = className({ ...values, defaultClassName });
        } else {
            computedClassName = className;
        }

        if (typeof style === "function") {
            computedStyle = style({ ...values, defaultStyle: defaultStyle ?? {} });
        } else {
            computedStyle = style;
        }

        if (typeof children === "function") {
            computedChildren = children({ ...values, defaultChildren });
        } else if (children == null) {
            computedChildren = defaultChildren;
        } else {
            computedChildren = children;
        }

        return {
            className: computedClassName ?? defaultClassName,
            style: (computedStyle || defaultStyle) ? { ...defaultStyle, ...computedStyle } : undefined,
            children: computedChildren ?? defaultChildren
        };
    }, [className, style, children, defaultClassName, defaultChildren, defaultStyle, values]);
}

