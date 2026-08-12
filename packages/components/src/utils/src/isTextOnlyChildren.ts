import { Children, Fragment, type PropsWithChildren, type ReactNode, isValidElement } from "react";

/**
 * Determines whether the provided React children consist only of text content.
 * This function unwraps children wrapped in React Fragments.
 */
export function isTextOnlyChildren(children: ReactNode) {
    const resolvedChildren = resolveChildren(children);

    return typeof resolvedChildren === "string" || Children.toArray(resolvedChildren).every(c => !isValidElement(c));
}

function resolveChildren(children: ReactNode) {
    if (isValidElement<PropsWithChildren>(children) && children.type === Fragment) {
        return resolveChildren(children.props.children);
    }

    return children;
}
