// eslint-disable-next-line no-restricted-imports
import React from "react";
import Tag from "../tag/Tag.ai";

import ComponentExample from "@/app/ui/components/componentExample/ComponentExample.ai";
import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.ai";




export const components = {
    Tag: Tag,
    CodeOnlyExample: ComponentExample,
    Example: ComponentExample,
    ComposedComponents: ComposedComponents
};

export function isValidComponentName(name: string): boolean {
    return Object.keys(components).includes(name);
}
