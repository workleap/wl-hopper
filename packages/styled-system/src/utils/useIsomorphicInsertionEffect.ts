import { useEffect, useInsertionEffect } from "react";

/** Inspired by https://www.npmjs.com/package/@emotion/use-insertion-effect-with-fallbacks
 *
 * This version of useInsertionEffect is used so that no warnings are thrown when using SSR
 * If you're using NextJS and you use useInsertionEffect in a server component, you'll have this warning message:
 *
 * error useInsertionEffect only works in Client Components.
 * Add the "use client" directive at the top of the file to use it.
 * Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component
 *
 * This hook fixes this problem by switching between useEffect and useInsertionEffect following the execution environment.
 */
export const useIsomorphicInsertionEffect = typeof window !== "undefined" ? useInsertionEffect : useEffect;
