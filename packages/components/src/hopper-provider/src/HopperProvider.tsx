import { StyledSystemProvider, type StyledSystemProviderProps } from "@hopper-ui/styled-system";
import type { Href, RouterOptions } from "@react-types/shared";
import clsx from "clsx";
import { createContext, forwardRef, useContext, type ForwardedRef } from "react";
import { I18nProvider, RouterProvider } from "react-aria-components";

export const GlobalHopperProviderCssSelector = "hop-HopperProvider";

export interface HopperProviderProps extends StyledSystemProviderProps {
    /**
     * The BCP47 language code for the locale.
     * @example "en-US"
     */
    locale?: string;

    /**
     * Set this up once in the root of your app, and any Hopper component with the href prop will automatically navigate using your router.
     * This prop should be set to a function received from your router for performing a client side navigation programmatically.
     * @example
     * import {RouterProvider} from 'react-aria-components';
     * import {useNavigate, useHref} from 'your-router';
     *
     * function App() {
     *   let navigate = useNavigate();
     *
     *   return (
     *     <RouterProvider navigate={navigate} useHref={useHref}>
     *         // ...
     *     </RouterProvider>
     *   );
     * }
     */
    navigate?: (path: Href, routerOptions: RouterOptions | undefined) => void;
    /**
     * useHref is an optional prop that converts a router-specific href to a native HTML href, e.g. prepending a base path.
     * @example
     * import {RouterProvider} from 'react-aria-components';
     * import {useNavigate, useHref} from 'your-router';
     *
     * function App() {
     *   let navigate = useNavigate();
     *
     *   return (
     *     <RouterProvider navigate={navigate} useHref={useHref}>
     *         // ...
     *     </RouterProvider>
     *   );
     * }
     */
    useHref?: (href: Href) => string;
}

export const HopperContext = createContext<HopperProviderProps | null>(null);

/**
 * This hook is used to get the HopperProviderProps from the nearest HopperProvider ancestor.
 */
export function useHopperContext() {
    const context = useContext(HopperContext);

    if (context === null) {
        throw new Error("useHopperContext must be used within a HopperProvider");
    }

    return context;
}


/**
 * This hook is used to get the HopperProviderProps from the nearest HopperProvider ancestor.
 * It will only return the props that would need to be forwarded to the next HopperProvider.
 */
export function useForwardedHopperContext() {
    const context = useContext(HopperContext);

    return {
        locale: context?.locale,
        colorScheme: context?.colorScheme,
        navigate: context?.navigate,
        useHref: context?.useHref,
        withCssVariables: false // we never need to re-add css variables in a nested provider
    } satisfies Partial<HopperProviderProps>;
}


const HopperProvider = (props: HopperProviderProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        children,
        locale,
        withBodyStyle = false,
        colorScheme = "light",
        withCssVariables = true,
        className,
        navigate,
        useHref,
        ...rest
    } = props;

    const classNames = clsx(
        GlobalHopperProviderCssSelector,
        className
    );

    let content = children;
    if (navigate) {
        content = <RouterProvider navigate={navigate} useHref={useHref}>{children}</RouterProvider>;
    }

    return (
        <HopperContext.Provider value={props}>
            <StyledSystemProvider ref={ref}
                withBodyStyle={withBodyStyle}
                colorScheme={colorScheme}
                withCssVariables={withCssVariables}
                className={classNames}
                {...rest}
            >
                <I18nProvider locale={locale}>
                    {content}
                </I18nProvider>
            </StyledSystemProvider>
        </HopperContext.Provider>
    );
};

/**
 * HopperProvider is required to be rendered at the root of your application. It is responsible for:
 * - Adding CSS variables to the document
 * - Managing color scheme (light, dark, auto)
 * - Optionally adding body styles to the document
 *
 * [View Documentation](https://hopper.workleap.design/components/HopperProvider)
 */
const _HopperProvider = forwardRef<HTMLDivElement, HopperProviderProps>(HopperProvider);
_HopperProvider.displayName = "HopperProvider";

export { _HopperProvider as HopperProvider };
