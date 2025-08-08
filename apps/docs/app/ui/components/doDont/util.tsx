import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

export const Do = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const Dont = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export interface WithChildrenProps {
    children: ReactNode;
}

export const Item = ({ children }: WithChildrenProps) => {
    return <>{children}</>;
};

export const Title = ({ children }: WithChildrenProps) => {
    return <>{children}</>;
};

export interface Item {
    do?: ReactNode;
    dont?: ReactNode;
}

export interface DoDontProps {
    children: ReactNode;
}

export function fetchDoDontItems(children: ReactNode): Item[] {
    return Children.toArray(children)
        .filter(child => isValidElement(child) && child.type === Item)
        .map(item => {
            if (!isValidElement(item)) {return null;}

            const parts = Children.toArray((item.props as WithChildrenProps).children);
            const doPart = parts.find(c => isValidElement(c) && c.type === Do);
            const dontPart = parts.find(c => isValidElement(c) && c.type === Dont);

            return {
                do: (isValidElement(doPart) ? (doPart.props as WithChildrenProps).children : "") ?? "",
                dont: (isValidElement(dontPart) ? (dontPart.props as WithChildrenProps).children : "") ?? ""
            };
        }).filter(item => item !== null);
}

export function fetchDoDontTitle(children: ReactNode): ReactNode {
    const title = Children.toArray(children).find(child => isValidElement(child) && child.type === Title);

    return title ?? null;
}
