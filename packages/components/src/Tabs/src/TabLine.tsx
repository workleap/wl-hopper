import clsx from "clsx";
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { TabListStateContext } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./TabLine.module.css";

export const GlobalTabLineCssSelector = "hop-TabLine";

export interface TabLineProps {
    selectedTab?: HTMLElement;
}

export function TabLine(props: TabLineProps) {
    const { selectedTab } = props;
    const state = useContext(TabListStateContext);

    const [style, setStyle] = useState<{ transform: string | undefined; width: string | undefined; height: string | undefined }>({
        transform: undefined,
        width: undefined,
        height: undefined
    });

    const onResize = useCallback(() => {
        if (selectedTab) {
            const styleObj: { transform: string | undefined; width: string | undefined; height: string | undefined } = {
                transform: undefined,
                width: undefined,
                height: undefined
            };

            const offset = selectedTab.offsetLeft;
            styleObj.transform = `translateX(calc(${offset}px + var(--hop-space-inset-sm)))`;
            styleObj.width = `calc(${selectedTab.offsetWidth}px - 2 * var(--hop-space-inset-sm))`;

            setStyle(styleObj);
        }
    }, [setStyle, selectedTab]);

    useEffect(() => {
        window.addEventListener("resize", onResize, false);

        return () => {
            window.removeEventListener("resize", onResize, false);
        };
    }, [onResize]);

    useLayoutEffect(() => {
        onResize();
    }, [onResize, state?.selectedItem?.key]);

    const classNames = clsx(
        GlobalTabLineCssSelector,
        cssModule(
            styles,
            "hop-TabLine"
        )
    );

    return (
        <div style={{ ...style }} className={classNames} />
    );
}
