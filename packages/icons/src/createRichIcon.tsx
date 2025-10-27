import { forwardRef, type ComponentProps, type ElementType, type RefAttributes, type SVGProps } from "react";

import { RichIcon, type RichIconProps } from "./RichIcon.tsx";

export function createRichIcon(
    src24: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    src32: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    src40: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    displayName: string
) {
    const richIconComponent = forwardRef<SVGSVGElement, Omit<RichIconProps, "src24" | "src32" | "src40">>((props, ref) => (
        <RichIcon
            {...props}
            ref={ref}
            src24={src24}
            src32={src32}
            src40={src40}
        />
    )
    );

    richIconComponent.displayName = displayName;

    return richIconComponent;
}

export type CreatedRichIconProps = ComponentProps<ReturnType<typeof createRichIcon>>;
