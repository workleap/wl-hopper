"use client";

import type { ElementType, RefAttributes, SVGProps } from "react";
import { type SlotProps, useContextProps } from "react-aria-components";

import { IconContext } from "./IconContext.ts";

export interface IconProps extends SlotProps {
    src: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
    className?: string;
}

const Icon = (props: IconProps) => {
    [props] = useContextProps(props, null, IconContext);
    const { src, ...otherProps } = props;

    const Component = src;

    return <Component {...otherProps} />;
};

export default Icon;
