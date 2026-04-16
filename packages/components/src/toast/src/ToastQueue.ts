import { useToastQueue as useReactAriaToastQueue } from "@react-stately/toast";
import { RefObject, useEffect } from "react";
import { UNSTABLE_ToastQueue } from "react-aria-components";
import { flushSync } from "react-dom";

export interface ToastContent {
    variant: "success" | "error";
    title: string;
    timeout?: number;
}

export interface ToastOptions {
    timeout?: number;
    onClose?: () => void;
}

export interface ToastQueue {
    success(message: string, options?: ToastOptions): string;
    error(message: string, options?: ToastOptions): string;
}

const QueueMap = new WeakMap<ToastQueue, UNSTABLE_ToastQueue<ToastContent>>();
const ToastRegionMap = new WeakMap<ToastQueue, RefObject<HTMLElement | null>>();

export function createToastQueue(): ToastQueue {
    const reactAriaQueue = new UNSTABLE_ToastQueue<ToastContent>({
        maxVisibleToasts: 5,
        wrapUpdate(fn) {
            const ref = ToastRegionMap.get(hopperQueue);
            if (ref?.current && "startViewTransition" in ref.current) {
                (ref.current.startViewTransition as Document["startViewTransition"])(() => {
                    flushSync(fn);
                });
            } else {
                fn();
            }
        }
    });

    const hopperQueue: ToastQueue = {
        success(message: string, { timeout = 5000, onClose }: ToastOptions = {}) {
            const key = reactAriaQueue.add({ variant: "success", title: message, timeout }, { onClose });
            return key;
        },
        error(message: string, { timeout = 5000, onClose }: ToastOptions = {}) {
            const key = reactAriaQueue.add({ variant: "error", title: message, timeout }, { onClose });
            return key;
        }
    };

    QueueMap.set(hopperQueue, reactAriaQueue);

    return hopperQueue;
}

export function useToastQueue(queue: ToastQueue, ref: RefObject<HTMLElement | null>) {
    const reactAriaQueue = QueueMap.get(queue)!;
    useEffect(() => {
        ToastRegionMap.set(queue, ref);
        return () => {
            ToastRegionMap.delete(queue);
        };
    });
    return useReactAriaToastQueue(reactAriaQueue);
}
