import type { ReactNode } from "react";

import { Text } from "../../typography/index.ts";

import { isTextOnlyChildren } from "./isTextOnlyChildren.ts";

export function ensureTextWrapper(children: ReactNode, elementType?: string): ReactNode {
    // Can't do only "children && ..." because children could be 0
    if (children !== undefined && isTextOnlyChildren(children)) {
        return <Text elementType={elementType}>{children}</Text>;
    }

    return children;
}
