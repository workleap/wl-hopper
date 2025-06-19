import type { Collection, Node } from "@react-types/shared";
import clsx from "clsx";
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { type Key, TabListStateContext } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import { InternalTabsContext } from "./TabsContext.ts";

import styles from "./TabLine.module.css";

export const GlobalTabLineCssSelector = "hop-TabLine";

export interface TabLineProps {
    selectedTab?: HTMLElement;
    isDisabled?: boolean;
    disabledKeys?: Iterable<Key>;
}

export function TabLine(props: TabLineProps) {
    const { selectedTab, disabledKeys, isDisabled: isTabsDisabled } = props;
    const state = useContext(TabListStateContext);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const { size } = useContext(InternalTabsContext) ?? {};

    useEffect(() => {
        const disabled = isTabsDisabled || isAllTabsDisabled(state?.collection, disabledKeys ? new Set(disabledKeys) : new Set(null));

        setIsDisabled(disabled);
    }, [state?.collection, disabledKeys, isTabsDisabled, setIsDisabled]);

    const [style, setStyle] = useState<{ transform?: string ; width?: string }>({
        transform: undefined,
        width: undefined
    });

    const onResize = useCallback(() => {
        if (selectedTab) {
            const styleObj: { transform?: string; width?: string } = {
                transform: undefined,
                width: undefined
            };

            let tablistPadding = "var(--hop-space-inset-xs)";
            let tabPadding = "var(--hop-space-inset-sm)";

            if (size === "md") {
                tabPadding = "var(--hop-space-20)";
                tablistPadding = "var(--hop-space-inset-sm)";
            }

            const offset = selectedTab.offsetLeft;
            styleObj.transform = `translateX(calc(${offset}px + ${tabPadding} - ${tablistPadding}))`;
            styleObj.width = `calc(${selectedTab.offsetWidth}px - 2 * ${tabPadding})`;

            setStyle(styleObj);
        }
    }, [setStyle, selectedTab, size]);

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
            "hop-TabLine",
            isDisabled && "disabled"
        )
    );

    return (
        <div style={{ ...style }} className={classNames} />
    );
}

function isAllTabsDisabled<T>(collection: Collection<Node<T>> | undefined, disabledKeys: Set<Key>) {
    let testKey: Key | null = null;
    if (collection && collection.size > 0) {
        testKey = collection.getFirstKey();

        let index = 0;
        while (testKey && index < collection.size) {
        // We have to check if the item in the collection has a key in disabledKeys or has the isDisabled prop set directly on it
            if (!disabledKeys.has(testKey) && !collection.getItem(testKey)?.props?.isDisabled) {
                return false;
            }

            testKey = collection.getKeyAfter(testKey);
            index++;
        }

        return true;
    }

    return false;
}
