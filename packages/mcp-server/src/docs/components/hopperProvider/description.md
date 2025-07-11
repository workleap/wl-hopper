# HopperProvider

HopperProvider is the container for all applications using Hopper. It defines the color scheme, locale, and other application level settings. It is also used to dynamically inject CSS variables and body styles to your application.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/HopperProvider/src/HopperProvider.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[HopperProvider]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

```

import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withBodyStyle>
            <Button variant="primary">
                Hello!
            </Button>
        </HopperProvider>
    );
}


```

## [Application provider](https://hopper.workleap.design/components/HopperProvider\#application-provider)

A HopperProvider must be the root component of your application. All other Hopper components rely on the Provider to define the color scheme, locale, and other settings that they need in order to render.
You can nest multiple HopperProviders to create different themes or locales for different parts of your application if needed.

### [Color scheme](https://hopper.workleap.design/components/HopperProvider\#application-provider-color-scheme)

We recommend supporting both light and dark color schemes in your application. If you need to override this with an application specific setting, you can use the colorScheme prop.

```

import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light">
            <Button>I'm a light button</Button>
        </HopperProvider>
    );
}


```

See the [Styled System documentation](https://hopper.workleap.design/styled-system/overview/introduction) for more information about using Hopper color variables in your application to ensure it adapts to light and dark mode properly.

See the [color schemes documentation](https://hopper.workleap.design/components/color-schemes) for more information on how to apply a color scheme to your application.

### [Locales](https://hopper.workleap.design/components/HopperProvider\#application-provider-locales)

Another important setting for your application is the locale. By default, Hopper chooses the locale matching the user's browser/operating system language. This can be overridden with the locale prop if you have an application specific setting. This prop accepts a [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code.
Hopper currently supports the following locales: `en-US`, `en-UK`, `fr-CA`, `fr-FR`.

```

import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" locale="en-US">
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}


```

To access the current locale anywhere in your application, see the `useLocale` hook.

### [Client side routing](https://hopper.workleap.design/components/HopperProvider\#application-provider-client-side-routing)

The HopperProvider component accepts an optional router prop. This enables Hopper components that render links to perform client side navigation using your application or framework's client side router. See the [client side routing](https://hopper.workleap.design/components/client-side-routing) guide for details on how to set this up.

```

import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    // @ts-expect-error - This is a fake implementation
    const navigate = useNavigateFromYourRouter();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}


```

### [Inject body styles](https://hopper.workleap.design/components/HopperProvider\#application-provider-inject-body-styles)

`withBodyStyle` determines whether you want Hopper to style the body of your application. By default, it is set to false. You should enable it on the Hopper provider at the root of your application.

```

import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withBodyStyle>
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}


```

`withBodyStyle` includes the following body elements styles:

```hd-code

body {
    -webkit-font-smoothing: antialiased;
    font-family: var(--hop-body-md-font-family);
    line-height: var(--hop-body-md-line-height);
    font-size: var(--hop-body-md-font-size);
    color: var(--hop-neutral-text);
    background-color: var(--hop-neutral-surface);
    margin: 0;
    padding: 0;
}

@media not (prefers-reduced-motion) {
    body {
        scroll-behavior: smooth;
    }
}

```

### [Inject CSS Variables](https://hopper.workleap.design/components/HopperProvider\#application-provider-inject-css-variables)

`withCssVariables` determines whether Hopper's CSS variables should be added to your application. By default, it is set to true and should not be changed unless you want to manage CSS variables via a CSS file. Note that in this case, you will need to add the tokens manually, ideally using the `@hopper-ui/tokens` package.

```

import { HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light" withCssVariables={false}>
            <div>{/* Your app here */}</div>
        </HopperProvider>
    );
}


```

### [useHopperContext](https://hopper.workleap.design/components/HopperProvider\#application-provider-usehoppercontext)

If you need to access the HopperProvider properties in a component, you can use the `useHopperContext` hook. This hook returns the Hopper context object, which includes the color scheme, locale, and other settings.
