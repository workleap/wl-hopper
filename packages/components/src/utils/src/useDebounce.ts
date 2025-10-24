import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

// The code in this file is adapted from https://github.com/xnimorz/use-debounce

const DebounceTimeouts = {
    sm: 100,
    md: 400,
    lg: 1000
} as const;

/**
 * This is accepting either one of the predefined debounce timeouts or a custom number of milliseconds.
 */
type SuggestedDebouncedWaitTimes = keyof typeof DebounceTimeouts | (number & {});

export const useDebounceCallback = <CallbackArgs extends unknown[]>(
    callback: (...args: CallbackArgs) => void,
    wait: SuggestedDebouncedWaitTimes = "sm",
    leading = false
): ((...args: CallbackArgs) => void) => {
    const storedCallback = useRef(callback);
    useEffect(() => {
        storedCallback.current = callback;
    });

    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = null;
        },
        [wait, leading, storedCallback]
    );

    return useCallback((...args: CallbackArgs) => {
        const { current } = timeout;
        const waitInMs = typeof wait === "number" ? wait : DebounceTimeouts[wait];
        if (current === null && leading) {
            timeout.current = setTimeout(() => {
                timeout.current = null;
            }, waitInMs);

            return storedCallback.current.apply(null, args);
        }

        if (current) {
            clearTimeout(current);
        }

        timeout.current = setTimeout(() => {
            timeout.current = null;
            storedCallback.current.apply(null, args);
        }, waitInMs);
    }, [wait, leading, storedCallback]);
};

export type UseDebounceResult<TState> = [
    TState,
    Dispatch<SetStateAction<TState>>,
    Dispatch<SetStateAction<TState>>
];

export function useDebounce<TState>(initialState: TState | (() => TState), wait?: SuggestedDebouncedWaitTimes, leading?: boolean): UseDebounceResult<TState> {
    const state = useState(initialState);

    return [state[0], useDebounceCallback(state[1], wait, leading), state[1]];
}
