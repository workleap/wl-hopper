# Hopper React Installation - React Applications

Hopper is a Design System that provides a collection of [React components](https://hopper.workleap.design/components/component-list), [tokens](https://hopper.workleap.design/tokens/overview/introduction), and [icons](https://hopper.workleap.design/icons/overview/introduction) to help you build applications.

**Requirements:**

- [React 18](https://reactjs.org/) or higher.

## [Installation](https://hopper.workleap.design/getting-started/installation-path/react\#installation)

### [Install Packages](https://hopper.workleap.design/getting-started/installation-path/react\#installation-install-packages)

Run the following command to install Hopper packages and their peer dependencies.

pnpm

yarn

npm

```

pnpm add @hopper-ui/components @hopper-ui/icons @hopper-ui/styled-system react-aria react-aria-components

```

### [Setup provider](https://hopper.workleap.design/getting-started/installation-path/react\#installation-setup-provider)

Wrap your application with the [HopperProvider](https://hopper.workleap.design/components/HopperProvider) component. This sets up the global styles and context required for Hopper components. Typically, this is done in your `index.tsx` or `app.tsx`, but it may vary depending on your setup.

```hd-code

import { HopperProvider } from "@hopper-ui/components";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
    <HopperProvider withBodyStyle>
        <App />
    </HopperProvider>
);

```

### [Import Styles](https://hopper.workleap.design/getting-started/installation-path/react\#installation-import-styles)

Add Hopper styles to your project by importing the following CSS file. Place this in your global CSS file or main stylesheet.

```hd-code

@import url("@hopper-ui/components/index.css");

```

### [Enjoy!](https://hopper.workleap.design/getting-started/installation-path/react\#installation-enjoy)

Leverage Hopper's components and styled system to build user interfaces efficiently and with ease.

```hd-code

import { Button, Stack } from "@hopper-ui/components";

const Demo = () => {
    return (
        <Stack>
            <Button>Click me</Button>
            <Button>Click me</Button>
        </Stack>
    );
}

```

## [Take it Further](https://hopper.workleap.design/getting-started/installation-path/react\#take-it-further)

Explore advanced features of Hopper to unlock its full potential:

[**Icons** \\
\\
Use a rich library of icons in your applications.](https://hopper.workleap.design/icons/overview/introduction) [**Client Side Routing** \\
\\
Ensure seamless navigation with Hopper components.](https://hopper.workleap.design/components/client-side-routing) [**Color Schemes** \\
\\
Implement and customize dark mode for your application seamlessly.](https://hopper.workleap.design/components/color-schemes) [**Internationalization** \\
\\
Build applications for multiple languages and locales.](https://hopper.workleap.design/components/internationalization) [**Responsive Styles** \\
\\
Design interfaces that adapt to different screen sizes.](https://hopper.workleap.design/styled-system/concepts/responsive-styles) [**Slots** \\
\\
Extend and compose components flexibly.](https://hopper.workleap.design/components/slots) [**Styling** \\
\\
Style components with Hopper's styled system and override defaults.](https://hopper.workleap.design/styled-system/concepts/styling)
