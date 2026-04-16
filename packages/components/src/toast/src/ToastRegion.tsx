
import { Div, DivProps, getRootCSSClasses, StyledComponentProps, useColorSchemeContext, useThemeContext } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { forwardRef } from "react";
import { useObjectRef, useToastRegion } from "react-aria";
import { createPortal } from "react-dom";

import { Toast } from "./Toast.tsx";
import { ToastQueue, useToastQueue } from "./ToastQueue.ts";

import style from "./ToastRegion.module.css";

export interface ToastRegionProps extends StyledComponentProps<DivProps> {
    queue: ToastQueue;
}

export const ToastRegion = forwardRef<HTMLDivElement, ToastRegionProps>(function ToastRegion({ queue, ...props }: ToastRegionProps, ref) {
    const toastRegionRef = useObjectRef(ref);
    const { colorScheme } = useColorSchemeContext();
    const { theme } = useThemeContext();
    const state = useToastQueue(queue, toastRegionRef);
    const { regionProps } = useToastRegion(props, state, toastRegionRef);

    const classNames = clsx(
        "hop-ToastRegion",
        getRootCSSClasses(colorScheme, theme),
        style["hop-ToastRegion"],
        regionProps.className,
        props.className
    );

    return (
        createPortal(
            <Div ref={toastRegionRef} {...regionProps} className={classNames}>
                {state.visibleToasts.map(toast => (
                    <Toast key={toast.key} toast={toast} state={state} style={{ viewTransitionName: toast.key }} />
                ))}
            </Div>,
            document.body
        )
    );
});
