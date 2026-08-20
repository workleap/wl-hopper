import { format } from "node:util";
import { afterEach, beforeEach } from "vitest";

/**
 * Console methods that can be guarded. `assert` is deliberately absent: its first argument
 * is a condition rather than part of the message, so it would need special-casing for a
 * case nothing in the repo has ever needed.
 */
export type ConsoleMethod = "debug" | "error" | "info" | "log" | "warn";

export interface FailOnConsoleOptions {
    /**
     * Console methods that fail the test when called.
     * @default ["error", "warn"]
     */
    methods?: ConsoleMethod[];
}

interface RecordedCall {
    method: ConsoleMethod;
    message: string;
    stack: string;
}

function buildError(calls: RecordedCall[]) {
    // Sorted so the header reads the same regardless of the order the calls arrived in.
    const methods = [...new Set(calls.map(call => call.method))].sort();

    const header = [
        `Expected test not to call ${methods.map(method => `console.${method}()`).join(" or ")}.`,
        "If the call is expected, assert on it explicitly by mocking the method out:",
        `    vi.spyOn(console, "${methods[0]}").mockImplementation(() => {});`
    ].join("\n");

    // The thrown error's own stack points at the `afterEach` below, which is useless, so the
    // stack recorded at console-call time is embedded in the message instead.
    const details = calls.map(call => `console.${call.method}: ${call.message}\n${call.stack}`);

    return new Error([header, ...details].join("\n\n"));
}

/**
 * Fails the current test if it writes to `console.error` or `console.warn`.
 *
 * Call once from a Vitest `setupFiles` module. When a call is expected, assert on it in the
 * test instead: `vi.spyOn(console, "warn").mockImplementation(() => {})`.
 */
export function failOnConsole({ methods = ["error", "warn"] }: FailOnConsoleOptions = {}) {
    // Captured once, here, rather than inside `beforeEach`. Reading them at `beforeEach` time
    // would pick up whatever is installed at that moment — this guard's own recorder, or a
    // `vi.spyOn` mock a previous test never restored, since `restoreMocks` is off — and
    // reinstall that as "the original", blinding the guard for the rest of the file.
    const originals = methods.map(method => ({ method, original: console[method] }));

    const calls: RecordedCall[] = [];

    // A single hook pair covers every method, rather than one pair each: Vitest runs
    // `afterEach` hooks in sequence and stops at the first throw, so per-method pairs would
    // let a test that called both `warn` and `error` report only one of them and leave the
    // other still patched.
    beforeEach(() => {
        calls.length = 0;

        for (const method of methods) {
            console[method] = (...args: unknown[]) => {
                // Constructed here so that dropping two lines — the "Error" header and this
                // recorder's own frame — leaves the caller on top.
                const { stack = "" } = new Error();

                calls.push({
                    method,
                    // `format` applies the same printf-style substitution the real console
                    // does, which React's dev warnings rely on (`"Warning: %s", ...`).
                    message: format(...args),
                    stack: stack.split("\n").slice(2).join("\n")
                });
            };
        }
    });

    afterEach(() => {
        // Restored before throwing, so a violating test cannot leave the recorder installed.
        for (const { method, original } of originals) {
            console[method] = original;
        }

        if (calls.length > 0) {
            throw buildError(calls);
        }
    });
}
