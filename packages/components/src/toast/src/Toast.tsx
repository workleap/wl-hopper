import { RemoveIcon, SuccessIcon } from "@hopper-ui/icons";
import { Div, DivProps, StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import { useEffectEvent, useObjectRef } from "@react-aria/utils";
import clsx from "clsx";
import { CSSProperties, forwardRef, useEffect } from "react";
import { useToast } from "react-aria";
import { QueuedToast, ToastState } from "react-aria-components";

import { CloseButton } from "../../buttons/index.ts";
import { cssModule } from "../../utils/index.ts";

import type { ToastContent } from "./ToastQueue.ts";

import "./debug.css";

import styles from "./Toast.module.css";

export interface ToastProps extends StyledComponentProps<DivProps> {
    toast: QueuedToast<ToastContent>;
    state: ToastState<ToastContent>;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast({ state, ...props }, ref) {
    const toastRef = useObjectRef(ref);
    const { toastProps, titleProps, closeButtonProps, contentProps } = useToast(props, state, toastRef);
    const { stylingProps, className, toast, style, ...rest } = useStyledSystem(props);
    const { content: { variant, title, timeout } } = toast;

    const classNames = clsx(
        "hop-Toast",
        cssModule(
            styles,
            "hop-Toast",
            variant
        ),
        toastProps.className,
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    const handleTimeout = useEffectEvent(() => state.close(toast.key));
    useEffect(() => {
        if (timeout) {
            const timeoutId = setTimeout(handleTimeout, timeout ?? 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [timeout]);

    return (
        <Div ref={toastRef} {...toastProps} className={classNames} style={mergedStyles} {...rest}>
            {variant === "success" ? (
                <SuccessIcon className={styles["hop-Toast__icon"]} />
            ) : (
                <RemoveIcon className={styles["hop-Toast__icon"]} />
            )}
            <div {...contentProps}>
                <span {...titleProps} className={styles["hop-Toast__title"]}>
                    {title}
                </span>
            </div>
            {timeout && (
                <div className={styles["hop-Toast__progress"]} style={{ "--timeout": `${timeout}ms` } as CSSProperties} />
            )}
            <CloseButton {...closeButtonProps} className={styles["hop-Toast__close"]} size="sm" variant="ghost-secondary" />
        </Div>
    );
});
