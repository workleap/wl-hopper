import { Children, isValidElement, type PropsWithChildren, type ReactNode } from "react";
import DoDont from "./DoDont";

export function fetchDoDontItems(children: ReactNode) {
    return Children.toArray(children)
        .filter(child => isValidElement(child) && child.type === DoDont.Item)
        .map(item => {
            if (!isValidElement(item)) {return null;}

            const parts = Children.toArray((item.props as PropsWithChildren).children);
            const doPart = parts.find(c => isValidElement(c) && c.type === DoDont.Do);
            const dontPart = parts.find(c => isValidElement(c) && c.type === DoDont.Dont);

            return {
                do: (isValidElement(doPart) ? (doPart.props as PropsWithChildren).children : "") ?? "",
                dont: (isValidElement(dontPart) ? (dontPart.props as PropsWithChildren).children : "") ?? ""
            };
        }).filter(item => item !== null);
}

export function fetchDoDontTitle(children: ReactNode) {
    return Children.toArray(children).find(child => isValidElement(child) && child.type === DoDont.Title) ?? null;
}
