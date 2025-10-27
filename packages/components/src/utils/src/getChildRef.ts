/* eslint-disable @typescript-eslint/no-explicit-any */
import { version, type ReactElement, type RefObject } from "react";

export function getChildRef(child: ReactElement<any>): RefObject<any> {
    // @ts-expect-error - Accessing refs is different for React 19
    return parseInt(version, 10) < 19 ? child.ref : child.props.ref;
}
