import { act, render } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";

import type { Breakpoint } from "../../src/responsive/Breakpoints.ts";

let viewportWidth = 0;

function matchMedia(query: string) {
    const minWidth = Number(/min-width: (\d+)px/.exec(query)?.[1] ?? 0);

    return { matches: viewportWidth >= minWidth } as MediaQueryList;
}

interface Modules {
    BreakpointProvider: ComponentType<{ children: ReactNode }>;
    useBreakpointContext: () => { matchedBreakpoints: Breakpoint[] };
}

// supportsMatchMedia is read once at module load, so matchMedia must be stubbed before importing the provider.
async function loadModules(): Promise<Modules> {
    vi.resetModules();
    const { BreakpointProvider } = await import("../../src/responsive/BreakpointProvider.tsx");
    const { useBreakpointContext } = await import("../../src/responsive/BreakpointContext.tsx");

    return { BreakpointProvider, useBreakpointContext };
}

function renderProvider({ BreakpointProvider, useBreakpointContext }: Modules, children?: ReactNode) {
    const renders: Breakpoint[][] = [];

    function Consumer() {
        const { matchedBreakpoints } = useBreakpointContext();
        renders.push(matchedBreakpoints);

        return null;
    }

    const result = render(
        <BreakpointProvider>
            {children}
            <Consumer />
        </BreakpointProvider>
    );

    return { ...result, renders };
}

describe("BreakpointProvider", () => {
    beforeEach(() => {
        viewportWidth = 0;
        vi.stubGlobal("matchMedia", matchMedia);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should match the breakpoints of the viewport at render", async () => {
        viewportWidth = 800;
        const { renders } = renderProvider(await loadModules());

        expect(renders.at(-1)).toEqual(["sm", "xs", "base"]);
    });

    it("should not render again when the viewport did not change before the subscription", async () => {
        viewportWidth = 800;
        const { renders } = renderProvider(await loadModules());

        expect(renders).toHaveLength(1);
    });

    it("should pick up a viewport change between the render and the resize subscription", async () => {
        viewportWidth = 500;

        // Renders after the provider read matchMedia, before its effect runs.
        function GrowViewport() {
            viewportWidth = 1024;

            return null;
        }

        const { renders } = renderProvider(await loadModules(), <GrowViewport />);

        expect(renders[0]).toEqual(["base"]);
        expect(renders.at(-1)).toEqual(["md", "sm", "xs", "base"]);
    });

    it("should update the breakpoints on resize", async () => {
        viewportWidth = 500;
        const { renders } = renderProvider(await loadModules());

        act(() => {
            viewportWidth = 1300;
            window.dispatchEvent(new Event("resize"));
        });

        expect(renders.at(-1)).toEqual(["lg", "md", "sm", "xs", "base"]);
    });

    it("should render the unsupported matchMedia breakpoint on the server", async () => {
        viewportWidth = 800;
        const { BreakpointProvider, useBreakpointContext } = await loadModules();
        const { renderToString } = await import("react-dom/server");

        function Consumer() {
            return <>{useBreakpointContext().matchedBreakpoints.join(",")}</>;
        }

        const html = renderToString(
            <BreakpointProvider>
                <Consumer />
            </BreakpointProvider>
        );

        expect(html).toBe("lg");
    });

    it("should fall back to the unsupported matchMedia breakpoint when matchMedia is not available", async () => {
        vi.stubGlobal("matchMedia", undefined);
        const { renders } = renderProvider(await loadModules());

        expect(renders).toEqual([["lg"]]);
    });

    it("should stop listening to resize once unmounted", async () => {
        const removeEventListener = vi.spyOn(window, "removeEventListener");
        const { unmount } = renderProvider(await loadModules());

        unmount();

        expect(removeEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
        removeEventListener.mockRestore();
    });
});
