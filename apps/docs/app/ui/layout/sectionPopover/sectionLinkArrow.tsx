import { Icon } from "@/components/icon";
import clsx from "clsx";
import type { ElementType, FC, RefAttributes, SVGProps } from "react";
import { UseArrowContext } from "./sectionLinkArrowContext";

import "./sectionLinkArrow.css";

interface SectionLinkArrowProps {
    slot?: string;
    className?: string;
    src: ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>;
}

const SectionLinkArrow: FC<SectionLinkArrowProps> = ({ slot, className, src }) => {
    const { isOpen } = UseArrowContext();

    return (
        <Icon
            slot={slot}
            className={clsx("hd-section-link-arrow", isOpen && "hd-section-link-arrow--open", className)}
            src={src}
        />
    );
};

export default SectionLinkArrow;
