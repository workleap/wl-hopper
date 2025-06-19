import type { Collection, Node } from "@react-types/shared";
import clsx from "clsx";
import { type CSSProperties, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { type Key, TabListStateContext } from "react-aria-components";

import { cssModule } from "../../utils/index.ts";

import styles from "./TabLine.module.css";

export const GlobalTabLineCssSelector = "hop-TabLine";

export interface TabLineProps {
    wrapperElement?: HTMLDivElement | null;
    selectedTab?: HTMLElement;
    isDisabled?: boolean;
    disabledKeys?: Iterable<Key>;
}

export function TabLine(props: TabLineProps) {
    const { wrapperElement, selectedTab, disabledKeys, isDisabled: isTabsDisabled } = props;
    const state = useContext(TabListStateContext);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(() => {
        const disabled = isTabsDisabled || isAllTabsDisabled(state?.collection, disabledKeys ? new Set(disabledKeys) : new Set(null));

        setIsDisabled(disabled);
    }, [state?.collection, disabledKeys, isTabsDisabled, setIsDisabled]);

    const [style, setStyle] = useState<CSSProperties>({
        transform: undefined,
        width: undefined
    });

    const onResize = useCallback(() => {
        if (selectedTab && wrapperElement) {
            const styleObj: CSSProperties = {
                transform: undefined,
                width: undefined
            };

            const computedTabStyle = window.getComputedStyle(selectedTab);
            const tabPadding = computedTabStyle.paddingLeft;

            const computedTabListStyle = window.getComputedStyle(wrapperElement);
            const tabListPadding = computedTabListStyle.paddingLeft;

            const offset = selectedTab.offsetLeft;
            styleObj.transform = `translateX(calc(${offset}px + ${tabPadding} - ${tabListPadding}))`;
            styleObj.width = `calc(${selectedTab.offsetWidth}px - 2 * ${tabPadding})`;

            setStyle(styleObj);
        }
    }, [setStyle, selectedTab, wrapperElement]);

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
