import clsx, { type ClassValue } from "clsx";
import { composeRenderProps } from "react-aria-components";

/**
 * Composes classnames for render props in React components using cslx.
 * Allows combining a base classname, render prop function, and additional classes.
 */
export function composeClassnameRenderProps<T>(className: string | undefined | ((renderProps: T) => string), ...classes: ClassValue[]) {
    return composeRenderProps(className, prev => {
        return clsx(
            prev,
            ...classes
        );
    });
}
