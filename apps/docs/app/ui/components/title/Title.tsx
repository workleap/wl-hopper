import formattingTitleId from "@/app/lib/formattingTitleId";
import clsx from "clsx";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import "./title.css";

export interface TitleProps {
    level?: 1 | 2 | 3 | 4 | 5;
    interactive?: boolean;
    parentHeading?: string;
    className?: string;
}

const Title = ({
    level = 1,
    interactive = false,
    className,
    children,
    parentHeading,
    ...rest
}: PropsWithChildren<TitleProps>) => {
    const Component = `h${level}` as const;

    if (children == null) {
        return null;
    }

    const uniqueId = formattingTitleId(children.toString());
    const uniqueParentId = parentHeading ? formattingTitleId(parentHeading.toString()) : "";
    const uniqueConcatId = uniqueParentId ? `${uniqueParentId}-${uniqueId}` : uniqueId ;

    return (
        <Component
            className={clsx("hd-title", className, {
                [`hd-title--level${level}`]: level
            })}
            id={uniqueConcatId}
            data-section-title={level === 2 ? uniqueId : undefined}
            data-subsection-title={level === 3 ? uniqueId : undefined}
            {...rest}
        >
            {interactive ? (
                <Link href={`#${uniqueConcatId}`} className="hd-title-link">
                    {children}
                </Link>
            ) : (
                children
            )}
        </Component>
    );
};

export default Title;
