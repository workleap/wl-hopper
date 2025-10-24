import { slot as slotFn } from "@hopper-ui/styled-system";
import { forwardRef, type ComponentProps, type ElementType, type RefAttributes, type SVGProps } from "react";

import { Icon, type IconProps } from "./Icon.tsx";

export function createIcon(
    src16: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    src24: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    src32: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>,
    displayName: string
) {
    const iconComponent = forwardRef<SVGSVGElement, Omit<IconProps, "src16" | "src24" | "src32">>((props, ref) => (
        <Icon
            {...props}
            ref={ref}
            src16={src16}
            src24={src24}
            src32={src32}
        />
    )
    );

    iconComponent.displayName = displayName;

    return slotFn("icon", iconComponent);
}

export type CreatedIconProps = ComponentProps<ReturnType<typeof createIcon>>;
