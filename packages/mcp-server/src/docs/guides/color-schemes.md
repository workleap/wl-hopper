---
title: Color Schemes
description: Learn how color schemes work in Hopper, including how applications can adapt to operating system's dark mode.
order: 6
---

## Introduction

Hopper supports a light and a dark mode. These correspond to color schemes found in popular operating systems. Hopper defaults to the light color scheme, but the `colorScheme` property on the `HopperProvider` can be used to set the color scheme to `dark` or `system` (which will follow the user's operating system setting).

We recommend that all Hopper applications support both light and dark mode. It can be very jarring to use a light themed application when the rest of your applications are in dark mode, and visa versa. This can be accomplished by using Hopper color variables rather than hard coded color values. All Hopper components adapt to color scheme out of the box. See the [Styled System documentation](/styled-system/overview/introduction) for details on how to use Hopper color variables in your own custom components.

## Applying a color scheme

A color scheme can either be enforced by providing a specific light or dark value to a [HopperProvider](./HopperProvider).

\*\*Example:\*\* hopper-provider/docs/color-scheme/apply

```tsx
import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="dark">
            <Button variant="secondary">Button</Button>
        </HopperProvider>
    );
}

```

A color scheme can also be set to `system`, which will follow the [user's operating system setting](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

When the `system` value is provided, an additional fallback color scheme must be specified to defaultColorScheme in case the theme provider is not able to access the user setting.

\*\*Example:\*\* hopper-provider/docs/color-scheme/apply-system

```tsx
import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="system" defaultColorScheme="light">
            <Button variant="secondary">Button</Button>
        </HopperProvider>
    );
}

```

Color schemes can also be nested. You could have a dark themed dialog inside a light themed application. This might be useful for certain experiences, such as color scheme previews, where you want to showcase a specific color scheme regardless of the operating system's setting.

\*\*Example:\*\* hopper-provider/docs/color-scheme/apply-nested

```tsx
import { Button, HopperProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <HopperProvider colorScheme="light">
            <Button variant="secondary" margin="inline-md">
                I'm a light button
            </Button>
            <HopperProvider colorScheme="dark">
                <Button variant="secondary" margin="inline-md">
                    I'm a dark button
                </Button>
            </HopperProvider>
        </HopperProvider>
    );
}

```

## Context Hooks

To manage the color scheme in your application, Hopper exposes a `ColorSchemeContext` and a `useColorSchemeContext` hook.

\*\*Example:\*\* hopper-provider/docs/color-scheme/changing

```tsx
import {
    Button,
    Div,
    HopperProvider,
    useColorSchemeContext
} from "@hopper-ui/components";
import { useCallback } from "react";

function ColorSchemeToggle() {
    const { colorScheme, setColorScheme } = useColorSchemeContext();

    const handleClick = useCallback(() => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
    }, [colorScheme, setColorScheme]);

    return (
        <Button variant="secondary" onPress={handleClick}>
            Toggle Color Scheme
        </Button>
    );
}

export default function Example() {
    const { colorScheme: parentColorScheme } = useColorSchemeContext();

    return (
        <HopperProvider colorScheme={parentColorScheme}>
            <Div backgroundColor="neutral" padding="inset-lg" borderRadius="core_2">
                <ColorSchemeToggle />
            </Div>
        </HopperProvider>
    );
}

```

## Utility Methods

### useColorSchemeValue

Some features require the usage of custom colors. Those colors aren't like Hopper tokens and will not support color schemes out of the box.

To help with that, Hopper offers the `useColorSchemeValue` hook which will return the value matching the current color scheme of the closest `HopperProvider`.

You can test this hook by clicking the moon icon in the example below.

\*\*Example:\*\* hopper-provider/docs/color-scheme/useColorSchemeValue

```tsx
import { Div, useColorSchemeValue } from "@hopper-ui/components";

export default function Example() {
    const color = useColorSchemeValue("#fff", "#000");
    const backgroundColor = useColorSchemeValue("#ff9048", "#fee2bb");

    return (
        <Div UNSAFE_color={color} UNSAFE_backgroundColor={backgroundColor}>
            Content
        </Div>
    );
}

```
