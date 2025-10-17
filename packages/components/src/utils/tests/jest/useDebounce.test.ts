import { act, renderHook } from "@hopper-ui/test-utils";

import { useDebounce, useDebounceCallback } from "../../src/useDebounce.ts";

describe("useDebounce()", () => {
    jest.useFakeTimers();

    it("should wait 100ms before invoking the callback", () => {
        const cb = jest.fn();
        const { result } = renderHook(() => useDebounceCallback(cb));

        act(result.current);
        act(result.current);
        act(result.current);

        act(() => jest.advanceTimersByTime(50));
        expect(cb).toHaveBeenCalledTimes(0);
        act(() => jest.advanceTimersByTime(100));
        expect(cb).toHaveBeenCalledTimes(1);

        act(result.current);
        act(result.current);
        act(result.current);

        act(() => jest.advanceTimersByTime(99));
        expect(cb).toHaveBeenCalledTimes(1);
        act(() => jest.advanceTimersByTime(1));
        expect(cb).toHaveBeenCalledTimes(2);
    });

    it("should invoke the callback on the leading edge", () => {
        const cb = jest.fn();
        const { result } = renderHook(() => useDebounceCallback(cb, 100, true));

        act(result.current);
        expect(cb).toHaveBeenCalledTimes(1);

        act(result.current);
        act(result.current);
        act(result.current);
        expect(cb).toHaveBeenCalledTimes(1);

        act(() => jest.advanceTimersByTime(100));
        expect(cb).toHaveBeenCalledTimes(2);

        act(result.current);
        expect(cb).toHaveBeenCalledTimes(3);

        act(result.current);
        act(result.current);
        act(result.current);

        expect(cb).toHaveBeenCalledTimes(3);
        act(() => jest.advanceTimersByTime(100));
        expect(cb).toHaveBeenCalledTimes(4);
    });

    it("should set the last value the callback was invoked with after 100ms", () => {
        const { result } = renderHook(() => useDebounce(1, 100));

        act(() => result.current[1](2));
        expect(result.current[0]).toBe(1);

        act(() => result.current[1](3));
        act(() => jest.advanceTimersByTime(50));

        act(() => result.current[1](4));
        act(() => jest.advanceTimersByTime(50));
        expect(result.current[0]).toBe(1);

        act(() => jest.advanceTimersByTime(50));
        expect(result.current[0]).toBe(4);
    });

    it("should set the value on the leading edge", () => {
        const { result } = renderHook(() => useDebounce(1, 100, true));

        act(() => result.current[1](2));
        expect(result.current[0]).toBe(2);

        act(() => result.current[1](3));
        act(() => result.current[1](4));

        act(() => jest.advanceTimersByTime(50));
        expect(result.current[0]).toBe(2);

        act(() => jest.advanceTimersByTime(50));
        expect(result.current[0]).toBe(4);
    });
});
