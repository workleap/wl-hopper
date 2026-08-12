import { useEffect, useLayoutEffect } from "react";

/** Inspired by https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 *
 * If you're using NextJS and you use useLayoutEffect, you'll have this warning message:
 *
 * Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format.
 * This will lead to a mismatch between the initial, non-hydrated UI and the intended UI.
 * To avoid this, useLayoutEffect should only be used in components that render exclusively on the client.
 * See https://reactjs.org/link/uselayouteffect-ssr for common fixes.
 *
 * This hook fixes this problem by switching between useEffect and useLayoutEffect following the execution environment.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
