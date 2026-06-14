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
    close(key: string): void;
    clear(): void;
}

const QueueMap = new WeakMap<ToastQueue, UNSTABLE_ToastQueue<ToastContent>>();
const ToastRegionMap = new WeakMap<ToastQueue, RefObject<HTMLElement | null>>();

export function createToastQueue(): ToastQueue {
    const pendingUpdates: Array<() => void> = [];
    let scheduledMicrotask = false;
    const reactAriaQueue = new UNSTABLE_ToastQueue<ToastContent>({
        maxVisibleToasts: 5,
        wrapUpdate(fn) {
            pendingUpdates.push(fn);

            if (!scheduledMicrotask) {
                scheduledMicrotask = true;
                queueMicrotask(async () => {
                    const currentUpdates = pendingUpdates.splice(0, pendingUpdates.length);
                    scheduledMicrotask = false;

                    const ref = ToastRegionMap.get(hopperQueue);
                    if (ref?.current && "startViewTransition" in ref.current) {
                        const transition = (ref.current.startViewTransition as Document["startViewTransition"])(() => {
                            flushSync(() => currentUpdates.forEach(fn => fn()));
                        });

                        try {
                            // We have to await the transitions to prevent an unhandled rejection error
                            // See: https://jakearchibald.com/2023/unhandled-rejections/
                            await transition.ready;
                            await transition.finished;
                            await transition.updateCallbackDone;
                        } catch (e: unknown) {
                            console.error(e);
                        }
                    } else {
                        currentUpdates.forEach(fn => fn());
                    }
                });
            }
        }
    });

    const hopperQueue: ToastQueue = {
        success(message: string, { timeout = 5000, onClose }: ToastOptions = {}): string {
            const key = reactAriaQueue.add({ variant: "success", title: message, timeout }, { onClose });
            return key;
        },
        error(message: string, { timeout = 5000, onClose }: ToastOptions = {}): string {
            const key = reactAriaQueue.add({ variant: "error", title: message, timeout }, { onClose });
            return key;
        },
        close(key: string): void {
            reactAriaQueue.close(key);
        },
        clear(): void {
            reactAriaQueue.clear();
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
