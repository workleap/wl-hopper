"use client";

import { Suspense, useMemo } from "react";

import ComponentSkeleton from "./ComponentSkeleton.tsx";
import { Previews } from "@/examples/Preview.ts";

import "./componentSkeleton.css";

interface ComponentPreviewProps {
    src: string;
}

const ComponentPreview = ({ src }: ComponentPreviewProps) => {
    const Component = useMemo(() => Previews[src]?.component, [src]);
    if (!Component) {
        return <div>No Preview</div>;
    }

    return (
        <Suspense fallback={<ComponentSkeleton overlay />}>
            <Component />
        </Suspense>
    );
};

export default ComponentPreview;
