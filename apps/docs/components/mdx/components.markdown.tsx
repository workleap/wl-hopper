import dynamic from "next/dynamic.js";
// eslint-disable-next-line no-restricted-imports
import React from "react";
import Tag from "../tag/Tag.md";

import ComponentExample from "@/app/ui/components/componentExample/ComponentExample.md";
//const ComponentExample = dynamic(() => import("@/app/ui/components/componentExample/ComponentExample.md.tsx"));


export const components = {
    Tag: Tag,
    Callout: () => <></>,
    CodeOnlyExample: ComponentExample
};
