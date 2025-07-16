# <https://hopper.workleap.design/> llms-full.txt

## Workleap Design System

# Leap into creativity

Explore Workleap's Design System, where icons, tokens, and components are handpicked for ultimate simplicity and accessibility.

[Getting Started](https://hopper.workleap.design/getting-started/overview/installation) [Github](https://github.com/workleap/wl-hopper)

## Accessible

Built with accessibility in mind Hopper is based on React Aria Components

## International

Experience is pushed further with internationalization.

## Typescript

Typescript based for reduced learning curve and error detection.

## Dark mode

Switching from light to dark mode couldn't be easier.

[**Colors**](https://hopper.workleap.design/tokens/semantic/color) [**Sizes** \\
\\
16\\
\\
24\\
\\
32\\
\\
40](https://hopper.workleap.design/tokens/semantic/space)

[**Text Styles** \\
\\
Aa\\
\\
Regular\\
\\
84\\
\\
96\\
\\
0](https://hopper.workleap.design/tokens/semantic/typography)

[**Icons** \\
A set of commonly used interface icons.](https://hopper.workleap.design/icons/overview/introduction)

[**Components Preview**\\
\\
An accessible suite of components powered by react-aria.\\
\\
![Avatar Group component preview](https://cdn.platform.workleap.com/hopper/webdoc/component-avatar-group-light.png)\\
\\
![Select Field component preview](https://cdn.platform.workleap.com/hopper/webdoc/component-select-field-light.png)\\
\\
ConfirmI need help\\
\\
![Radio Group Component preview](https://cdn.platform.workleap.com/hopper/webdoc/component-radio-group-light.png)](https://hopper.workleap.design/components/component-list)

## Hopper Component Customization

# Customizing Components

Hopper components are built with well-considered defaults that meet common product needs.
However, we understand that product teams often move quickly, iterating at a pace that can move faster than design system updates.
As this article on [pace layering](https://bigmedium.com/ideas/design-system-pace-layers-slow-fast.html) explains, it's natural for design systems to evolve more slowly than the products they support.
Rather than being a bottleneck, this approach keeps our design system stable and reliable.
To support fast-paced product development, Hopper provides a range of options for customization,
from simple styling adjustments to creating entirely new components.

![Diagram illustrating the four pace layers of the digital product process](https://hopper.workleap.design/product-cycle.png)_In the pace layers of digital products, product zips along at the outer layer while design systems and other supporting infrastructure move more slowly at the inner layer._

## [Customization Tiers](https://hopper.workleap.design/getting-started/guides/components\#customization-tiers)

The Hopper design systems are built on the principle that “components are designed to be overridden, not locked-in.” This allows developers to adjust styles and behaviors to meet specific product needs, while ensuring components remain usable and adaptable.

There are multiple customization methods available, and to highlight why some are better suited than others, I’ve organized them into four tiers:

| Customization Tier | Description |
| --- | --- |
| 🥇 **Gold Tier** | Maximize reuse of the Design System, applying only minimal overwrites to fit your needs. |
| 🥈 **Silver Tier** | Reuse most of the component’s behaviors, but make some modifications to fit your needs. |
| 🥉 **Bronze Tier** | Reassemble the component’s behavior using smaller utility methods. |
| 🛠️ **Do it yourself** | Build the behavior from scratch and use low-level styling tools as needed. |

## [Customization Methods Overview](https://hopper.workleap.design/getting-started/guides/components\#customization-methods-overview)

Here's an overview of the different customization methods:

- 🥇 [Direct styling adjustments](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--direct-styling-adjustments): You can use CSS Classes or the styling props on existing Design System Components to alter the style as needed.

- 🥇 [Behavior modifications](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--behavior-modifications): You can use ref, callbacks and controlled properties to modify its behavior.

- 🥈 [Copying component](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--copying-component): Copy the component code inside your codebase and modify it.

- 🥈 [Custom components using base components](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--custom-components-using-base-components): Create a new component on top of Design System base components or React Aria Components.

- 🥉 [Custom components using hooks](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--custom-components-using-hooks): Create a new component on top of Design System hooks or React Aria hooks.

- 🛠️ [Building components from scratch](https://hopper.workleap.design/getting-started/guides/components#customization-methods-details--building-components-from-scratch): Create a component from scratch and leverage Design Tokens if possible

## [Customization Method Details](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details)

These customization options provide product teams with the flexibility to adapt Hopper components to specific requirements, without sacrificing consistency. By using this range of customization methods, teams can meet product goals efficiently while maintaining the benefits of a unified design system. These customization methods are presented in the order you should consider when evaluating your options, with details provided in the sections below.

### [🥇 Direct Styling Adjustments](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--direct-styling-adjustments)

For straightforward customization needs, you can make adjustments directly by passing style-related props, adding CSS classes, or setting up refs for access to component elements. This approach allows you to override specific styles while keeping the component's behavior and overall styling intact.

### Details

#### [Styled System Props](https://hopper.workleap.design/getting-started/guides/components\#styled-system-props)

Adjust properties such as `backgroundColor`, `width`, or `padding` directly on the component.

```hd-code

<Button backgroundColor="primary" UNSAFE_width="148px" paddingTop="stack-xs">Click me</Button>

```

#### [CSS Classes](https://hopper.workleap.design/getting-started/guides/components\#css-classes)

Append custom CSS classes to modify styles.

```hd-code

<Button className="custom-class">Click me</Button>

```

### Example: Creating an AI Card

```hd-code

export function AICard({ children, className, ...rest }: CardProps) {
    const classNames = clsx(className, "ai-gradiant-border");
    return (
        <Card className={classNames} {...rest}>
            {children}
        </Card>
    );
}

```

* * *

### [🥇 Behavior Modifications](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--behavior-modifications)

To customize a component's behavior, use refs, callbacks and controlled properties. This approach is useful for interactive features and for modifying default component behavior. This approach is ideal when you need to adjust how a component responds to user interactions without altering its visual style or structure. [Read more about Controlled vs Uncontrolled components here](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

### Details

#### [Refs for Direct Access](https://hopper.workleap.design/getting-started/guides/components\#refs-for-direct-access)

Use refs to access and interact with elements within a component.

```hd-code

<Autocomplete wrapperProps={{ ref: myRef }}>
    <Item key="earth">Earth</Item>
</Autocomplete>

```

#### [Event Callbacks](https://hopper.workleap.design/getting-started/guides/components\#event-callbacks)

Add event handlers for more control, ensuring events continue propagating as expected.

```hd-code

<Button onFocus={handleFocus}>Click me</Button>

```

#### [Controlled Properties](https://hopper.workleap.design/getting-started/guides/components\#controlled-properties)

You can control the component's behavior by passing a controlled property.

```hd-code

<PopoverTrigger {...rest} open={isHovered}>

```

### Example: Creating a popover that opens on hover

```hd-code

function MyCustomButtonPopoverTrigger({ children, ...rest }: PopoverTriggerProps) {
    const ref = useRef();
    const isHovered = useHover(ref);
    return (
        <PopoverTrigger {...rest} open={isHovered}>
            <Button ref={ref}>Hoverable Button</Button>
            {children}
        </PopoverTrigger>
    );
}

```

* * *

### [🥈 Copying Component](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--copying-component)

When you need extensive customizations that go beyond simple styling or behavior adjustments, copying the component code can be an effective solution. This allows you to make specific changes while retaining the existing structure, making the customized component reusable across similar use cases.

Take a look to [Hopper's components source code](https://github.com/workleap/wl-hopper/tree/main/packages/components)

**Encountering Design System Limitations?**

If you need to copy a component due to a design system constraints, let us know! Frequent requests may lead to updates, allowing you to replace your custom component with an official version in the future.

Share your needs in **#ds-hopper!**

* * *

### [🥈 Custom Components Using Base Components](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--custom-components-using-base-components)

If the existing Design System component feels too complex for your needs, take a closer look at its underlying structure in the code. In Hopper, it's likely built on a [React Aria](https://react-spectrum.adobe.com/react-aria/hooks.html) component, which you can directly leverage to create a more tailored solution. React Aria offers a robust library of foundational components, making it a versatile starting point. [The Technology team recommends using React Aria](https://workleap.atlassian.net/wiki/spaces/TL/pages/3469508719) as the preferred foundation for building components.

💡 [Need Help Getting Started?](https://hopper.workleap.design/getting-started/guides/components#need-help-getting-started)

Using this approach may require you to restyle the entire component, which is fine. At this stage, you’re essentially creating something new! Just be sure to use [Hopper tokens](https://hopper.workleap.design/tokens/overview/introduction) to ensure that any future branding updates are automatically applied to your component without needing manual adjustments. If you want to allow customization on your component, you can also use the `useStyledSystem` hook to expose style props!

* * *

### [🥉 Custom Components Using Hooks](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--custom-components-using-hooks)

If there is no base components to use, or if the base component is again too strict for you needs, you can use underlying hooks for more granular control. [React Aria](https://react-spectrum.adobe.com/react-aria/hooks.html) also offer hooks that you can tailor components more precisely to your needs. [The Technology team recommends using React Aria](https://workleap.atlassian.net/wiki/spaces/TL/pages/3469508719) as the preferred foundation for building components.

💡 [Need Help Getting Started?](https://hopper.workleap.design/getting-started/guides/components#need-help-getting-started)

Using this approach may require you to restyle the entire component, which is fine. At this stage, you’re essentially creating something new! Just be sure to use [Hopper tokens](https://hopper.workleap.design/tokens/overview/introduction) to ensure that any future branding updates are automatically applied to your component without needing manual adjustments. If you want to allow customization on your component, you can also use the `useStyledSystem` hook to expose style props!

* * *

### [🛠️ Building Components From Scratch](https://hopper.workleap.design/getting-started/guides/components\#customization-method-details--building-components-from-scratch)

For unique needs that go beyond the capabilities of design system components, building a component from scratch may be necessary. At this point, the only recommendation we can give is to refer to the [WAI Aria Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) or [Spec](https://www.w3.org/WAI/ARIA/apg/) to determine the expected behavior of controls. Using this approach you will have to style the entire component, which is fine. Just be sure to use [Hopper tokens](https://hopper.workleap.design/tokens/overview/introduction) to ensure that any future branding updates are automatically applied to your component without needing manual adjustments. If you want to allow customization on your component, you can also use the `useStyledSystem` hook to expose style props!

💡 [Need Help Getting Started?](https://hopper.workleap.design/getting-started/guides/components#need-help-getting-started)

## [Need Help Getting Started?](https://hopper.workleap.design/getting-started/guides/components\#need-help-getting-started)

Even if you're not using Design System components, we're here to help! The Design System team has deep expertise in React Aria and is eager to collaborate with you.

💡Let's brainstorm together! Reach out to us in **#ds-hopper** for guidance, ideas, or support in finding the perfect starting point for your project.

## Text Crop Guide

# Text Crop

Every web font includes whitespace above and below the text, while useful in some instances, it can be a problem when vertically centering text or aligning text with other elements. This problem arises when a font has uneven whitespace. This is especially true when using a typeface with a large x-height, like _ABC Favorit_.

![Text Crop desired outcome](https://wlprodcdnst3e6bc61cec24.blob.core.windows.net/hopper/webdoc/text-crop-desired-outcome.png)

One way to compensate for this is to use a negative margin on the top and bottom of the text. This will crop the whitespace and make the text appear more centered, while preserving the line-height of the text.

![Text Crop desired outcome](https://wlprodcdnst3e6bc61cec24.blob.core.windows.net/hopper/webdoc/text-crop-css.png)

## [Implementation](https://hopper.workleap.design/getting-started/guides/text-crop\#implementation)

It is suggested to apply this technique on a text element, such as a `span`, rather than on it's container, such as a `button` element.

Using a negative margin on the top and bottom of the text will crop the whitespace while preserving line height between lines in a multi-line block of text.

If you need to implement this technique, you can use the following CSS. Keep in mind that each font weight and line-height combinations have their own set of values. You need to use the right token for the job, these are documented in the [tokens section](https://hopper.workleap.design/tokens/semantic/typography).

component.tsx

```hd-code

component.tsx
<div className="myBadge">
    <span className="off-centered-text">NEW</span>
</div>
```

component.css

```hd-code

component.css
.off-centered-text {
    font-family: 'ABC Favorit Mono', sans-serif;
}

.off-centenred-text::before,
.off-centered-text::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
}

.off-centered-text::before {
    /* -0.125rem */
    margin-bottom: var(--hop-overline-bottom-offset);
}

.off-centered-text::after {
    /* -0.25rem */
    margin-top: var(--hop-overline-top-offset);
}
```

Feel free to inspect the above examples to see how the solution is applied in different contexts.

New

Bring out the best in your team

## Hopper Installation Guide

# Other Frameworks

Hopper is a flexible Design System designed to help you create visually consistent and beautiful applications. While Hopper offers React components for building UI elements, its design tokens and icons are framework-agnostic, making them accessible for use in any project, whether you're using a different framework or plain HTML and CSS.

## [What Hopper Offers](https://hopper.workleap.design/getting-started/installation-path/javascript\#what-hopper-offers)

- **Design Tokens**: Predefined design decisions such as colors, spacing, and typography, provided as reusable CSS variables for styling your application.
- **Icons**: A comprehensive library of SVG icons, easily accessible through the @hopper-ui/svg-icons package.

This installation procedure provides the steps needed to set up Hopper tokens and icons in non-React projects, enabling you to incorporate these resources directly into your application

## [Tokens Installation](https://hopper.workleap.design/getting-started/installation-path/javascript\#tokens-installation)

### [Install Package](https://hopper.workleap.design/getting-started/installation-path/javascript\#tokens-installation-install-package)

Run the following command to install Hopper tokens.

pnpm

yarn

npm

```

pnpm add @hopper-ui/tokens

```

### [Import Styles](https://hopper.workleap.design/getting-started/installation-path/javascript\#tokens-installation-import-styles)

Add Hopper styles to your project by importing the following CSS files into your main stylesheet or global CSS file:

```hd-code

@import url("@hopper-ui/tokens/fonts.css"); /* To import Hopper fonts */
@import url("@hopper-ui/tokens/tokens.css"); /* To import the design tokens */
@import url("@hopper-ui/tokens/dark/tokens.css"); /* optional - if your application supports dark mode */

```

If your application supports dark mode, you can include the dark mode token styles for seamless theme switching.

### [Enjoy!](https://hopper.workleap.design/getting-started/installation-path/javascript\#tokens-installation-enjoy)

You can now use Hopper tokens in your project by referencing the design tokens as CSS variables. For example:

```hd-code

.my-class {
    background-color: var(--hop-primary-surface-weak);
}

```

## [Icons Installation](https://hopper.workleap.design/getting-started/installation-path/javascript\#icons-installation)

### [Install Package](https://hopper.workleap.design/getting-started/installation-path/javascript\#icons-installation-install-package)

Run the following command to install Hopper SVG icons.

pnpm

yarn

npm

```

pnpm add @hopper-ui/svg-icons

```

### [Usage](https://hopper.workleap.design/getting-started/installation-path/javascript\#icons-installation-usage)

You can use Hopper SVG icons in two ways:

#### [In JavaScript/TypeScript Files](https://hopper.workleap.design/getting-started/installation-path/javascript\#in-javascripttypescript-files)

Import an SVG icon directly into your code. Ensure your bundler (e.g., Webpack, Vite, Rollup) is configured to handle SVG imports correctly.

```hd-code

import alertIcon from "@hopper-ui/svg-icons/alert-24.svg";

```

#### [In CSS](https://hopper.workleap.design/getting-started/installation-path/javascript\#in-css)

Use SVG icons directly in your CSS for styles such as background images.

```hd-code

.my-component {
    background-image: url("@hopper-ui/svg-icons/alert-24.svg");
}

```

## Hopper React Installation

# React Applications

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

## Hopper Installation Guide

# Installation

Hopper is [Workleap](https://workleap.com/)'s official design system, offering a robust collection of [React components](https://hopper.workleap.design/components/component-list), [design tokens](https://hopper.workleap.design/tokens/overview/introduction) and [icons](https://hopper.workleap.design/icons/overview/introduction) to streamline application development and maintain brand consistency.
We've put together a guide to help you quickly get started with integrating Hopper into your project.

## [Choose Your Installation Path](https://hopper.workleap.design/getting-started/overview/installation\#choose-your-installation-path)

Hopper supports flexible installation options tailored to different project types.

Select the path that best suits your setup:

[**React Applications** \\
\\
The most common way to integrate Hopper.](https://hopper.workleap.design/getting-started/installation-path/react) [**Other Frameworks or Libraries** \\
\\
Use Hopper seamlessly with other JavaScript or TypeScript-based setups.](https://hopper.workleap.design/getting-started/installation-path/javascript)

## [Advanced Installation Options](https://hopper.workleap.design/getting-started/overview/installation\#advanced-installation-options)

Looking for a more tailored or specialized setup? Hopper offers advanced options to meet unique project requirements.

- Micro Frontend Architecture: Integrate Hopper into modular, micro-frontend-based projects. Coming Soon
- Granular CSS Imports: Optimize performance by importing only the CSS needed for specific components. Coming Soon

## [Guides](https://hopper.workleap.design/getting-started/overview/installation\#guides)

Explore our collection of guides designed to help you get the most out of Hopper. From styling tips to advanced customization techniques, these resources are here to support your journey with our design system. Check back often as we continue to expand with more tutorials and best practices.

- **Text Crop**: Discover how to achieve perfect vertical text alignment with our Text Crop guide. Learn how to compensate for uneven whitespace in web fonts and improve the appearance of your text using simple, effective CSS techniques. [Learn more about Text Crop](https://hopper.workleap.design/getting-started/guides/text-crop)
- **Customizing Components**: Explore the flexibility of Hopper and Orbiter with our Customizing Components guide. This article introduces various customization options, from minimal styling adjustments to building entirely new components, categorized into distinct tiers to help you make the best choice for your needs. [Learn more about Customizing Components](https://hopper.workleap.design/getting-started/guides/components)

## Icon Design Guidelines

# Designing an Icon

To maintain visual consistency across the Workleap platform, icon creators should follow these guidelines when contributing to the Workleap icon library.
**All designers are encouraged to create their own icons.** Use the design language and specifications outlined in this guide to ensure alignment across all Workleap products.

## [Before You Begin](https://hopper.workleap.design/icons/overview/designing-an-icon\#before-you-begin)

**1\. Review Existing Icons:**
Before proposing a new icon, explore the current icon set to determine if an existing design fits your needs. Avoid duplicating concepts and ensure your proposal adds unique value.

**2\. Understand the Design Language:**
The Workleap icon library follows a specific and consistent design language. Adhering to this language is crucial for maintaining a shared understanding across all verticals and ensuring new additions feel cohesive within Workleap's visual system.

## [Anatomy of an Icon](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon)

Icons in the Workleap library have several defined characteristics. Understanding these attributes is essential for creating high-quality contributions.

### [Definitions](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon-definitions)

- Frame Size - The dimensions of the artboard in which the icon is designed.
- Stroke Alignment - The stroke's position relative to the shape. Use **center** alignment unless the shape is closed; in that case, use **inside**.
- Corner Radius - Follow the standard radius values from the design specification table. Deviations are allowed only to improve legibility.
- Terminal - The end style of a stroke, which can be round, square, or flat.
- Inner spacing - The space between a shape and its stroke.
- Fill - The shape's color. Icons using a fill are also known as solid icons. Any shapes on a filled icon should follow the stroke guidelines.
- Keylines - Lines that define an icon's shape and stroke alignment. In Figma, toggle them using `⌘G`(Mac) or `Ctrl+G`(PC).

### [Values](https://hopper.workleap.design/icons/overview/designing-an-icon\#anatomy-of-an-icon-values)

Use the following specifications when designing your icon:

| Anatomy | Small | Medium | Large |
| --- | --- | --- | --- |
| Frame Size | 16X16 | 24X24 | 32X32 |
| Stroke Weight | 1.5px | 1.5px | 2px |
| Stroke Alignment | Center/Inside | Center/Inside | Center/Inside |
| Corner Radius | 1px | 1.5px | 2px |
| Terminal | Round | Round | Round |
| Inner Spacing | >= 1px | >= 2px | >= 2px |

## Hopper Icon Overview

# Introduction

Icons are an essential part of building intuitive and engaging user interfaces. Hopper offers a versatile and comprehensive icon system tailored to meet diverse project needs, whether you're building with React or using static assets in other frameworks.

## [Using Hopper Icons](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons)

Hopper provides two main packages, React components or pure SVG, giving you the flexibility to choose how to integrate icons into your project.

### [React Applications](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons-react-applications)

Designed specifically for React applications, this package offers all icons as React components.

[**Standard Icons** \\
\\
Monochromatic and simple. Best suited for functional UI elements like buttons, menus, or actions.](https://hopper.workleap.design/icons/react-icons/icon-library) [**Rich Icons** \\
\\
Vibrant and colorful. Perfect for decorative purposes or drawing attention to specific elements.](https://hopper.workleap.design/icons/react-icons/rich-icon-library)

### [Other Frameworks](https://hopper.workleap.design/icons/overview/introduction\#using-hopper-icons-other-frameworks)

Ideal for non-React setups, this package provides raw SVG files.

[**Standard Icons** \\
\\
Monochromatic and simple. Best suited for functional UI elements like buttons, menus, or actions.](https://hopper.workleap.design/icons/SVG-icons/icon-library) [**Rich Icons** \\
\\
Vibrant and colorful. Perfect for decorative purposes or drawing attention to specific elements.](https://hopper.workleap.design/icons/SVG-icons/rich-icon-library)

## [Start Designing Icons](https://hopper.workleap.design/icons/overview/introduction\#start-designing-icons)

No matter the platform or design requirements, Hopper icons empower developers and designers to create polished, visually aligned interfaces.

- [Designing an Icon](https://hopper.workleap.design/icons/overview/designing-an-icon)

## React Icons Library

# Icon Library

All icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate an icon into your project, simply import it from `@hopper-ui/icons`.

```hd-code

import { AddCalendarIcon } from "@hopper-ui/icons"

```

You can preview icons in your preferred size. Simply click on an icon to instantly copy its name!

Small16x16px

Medium24x24px

Large32x32px

Add

AddCalendar

AddUser

Alignment

Ambassadorship

AngleDown

AngleLeft

AngleRight

AngleUp

Applause

Archive

ArrowDown

ArrowLeft

ArrowRight

ArrowUp

ArrowsOutVertical

Assistant

AssistantTo

Attachment

Bars

Basketball

Bento

Birthday

Bold

Bolt

Book

Bookmark

Branches

Briefcase

Build

Bullet

Bullseye

Calendar

Camera

Car

CaretDown

CaretDownSolid

CaretUp

CaretUpSolid

Cat

ChartBar

ChartLine

ChartPie

Checkmark

Cherries

CircleAngleLeft

CircleAngleRight

Clock

CollapseLeft

CollapseRight

Comment

CommentCheck

Connections

Copy

Count

Csv

DecreaseIndent

Delete

Department

DirectReports

Dismiss

Dollar

DottedLines

Download

Duplicate

Edit

Enter

Event

EverythingReport

Exit

EyeHidden

EyeVisible

Feedback

FileCheck

Filter

Five

Flag

Focus

Folder

Football

Four

Gauge

Gift

GraduationHat

Graph

Grid

Grip

Groups

Growth

Happiness

Hierarchy

Home

Hourglass

Image

IncreaseIndent

Info

Invoice

Italic

Kebab

Key

KeyResult

Language

LearningPath

LearningPathStep

Lightbulb

Link

Location

Lock

LockedCalendar

LockedNote

Mail

Maximize

Media

Microphone

MicrophoneDisabled

Minus

Mobile

Move

NewComment

NewFilter

NewGift

NewNote

NewNotification

NewSticky

NewTab

NewTemplate

NewTip

NextCalendar

Note

Notebook

Notification

One

OneOnOne

OpenRole

OpenSmile

OrderedList

OrgChart

Organization

Pause

Pdf

Peace

Percent

Phone

Pin

PinSolid

Play

PlaySolid

Plus

Print

Profile

Progress

Pronunciation

Question

QuizLesson

Reaction

Recurring

Refresh

RelationWithManager

RelationshipWithPeers

Reminder

Remove

RemoveCalendar

RemoveUser

Reply

Report

ReportsTo

Requalification

Review

Rewind

Rocket

Satisfaction

ScreenShare

Search

Section

Segment

Send

Settings

SettingsNotification

SettingsWarning

Share

Shared

Shield

Slider

Sort

Sparkles

Sprout

Star

StarSolid

StartOver

Sticky

Strikethrough

Substract

Success

Sync

Tag

Team

Template

TextLesson

Three

ThumbsDown

ThumbsUp

Tip

Translation

Two

Unarchive

Underline

UnorderedList

Upload

Upsell

User

Video

VideoCamera

VideoCameraDisabled

Warning

WebinarLesson

Wellness

WhosWhoFace

WhosWhoGame

## Rich Icons Library

# Rich Icons Library

All rich icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate a rich icon into your project, simply import it from `@hopper-ui/icons`.

```hd-code

import { ActionListRichIcon } from "@hopper-ui/icons"

```

The color of the rich icons can be changed by using the `variant` prop. The following [decorative colors](https://hopper.workleap.design/tokens/semantic/color#decorative) are available as variants: `option1` to `option8`.
The following status colors are available as well: `success`, `warning`, `danger`, `information` and `upsell`.

```hd-code

<ActionListRichIcon variant="option3" />

```

You can preview rich icons in your preferred size. Simply click on an icon to instantly copy its name!

Medium24x24px

Large32x32px

Extra Large40x40px

ActionList

Anniversary

Anonymous

Applause

Birthday

BrokenImage

Caution

Conversation

Custom

DecreasingScore

DeletedUser

Department

Directory

Discount

Email

Feedback

GoalIndividual

GoalTeam

Group

Growth

Idea

Info

LikertScale

Location

MultipleChoice

OneOnOne

OpenRole

OpinionScale

Organization

People

Profile

Question

Reminder

Review

RisingScore

Rocket

Script

Settings

Sparkles

Star

Status

Success

Support

Template

TextAnswer

Upsell

WhosWho

## SVG Icon Library

# Icon Library

All icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate an icon into your project, simply import it from `@hopper-ui/svg-icons` in a JavaScript file:

```hd-code

import AlertIcon from "@hopper-ui/svg-icons/icons/alert-24.svg";

```

or in a CSS file:

```hd-code

.my-component {
    background-image: url("@hopper-ui/svg-icons/icons/alert-24.svg");
}

```

## [Inline SVG](https://hopper.workleap.design/icons/SVG-icons/icon-library\#inline-svg)

Hopper's SVG icons are designed to be used as inline SVGs. This allows you to easily customize the icon's color, size, and other properties using CSS.

```hd-code

// a specific size
import { AlertIcon32 } from "@hopper-ui/svg-icons/icons/inline";
// or an object containing all the sizes
import { AlertIcon }  from "@hopper-ui/svg-icons/icons/inline";

```

You can preview icons in your preferred size. Simply click on an icon to instantly copy it's `.svg` name!

Small16x16px

Medium24x24px

Large32x32px

Add

AddCalendar

AddUser

Alignment

Ambassadorship

AngleDown

AngleLeft

AngleRight

AngleUp

Applause

Archive

ArrowDown

ArrowLeft

ArrowRight

ArrowUp

ArrowsOutVertical

Assistant

AssistantTo

Attachment

Bars

Basketball

Bento

Birthday

Bold

Bolt

Book

Bookmark

Branches

Briefcase

Build

Bullet

Bullseye

Calendar

Camera

Car

CaretDown

CaretDownSolid

CaretUp

CaretUpSolid

Cat

ChartBar

ChartLine

ChartPie

Checkmark

Cherries

CircleAngleLeft

CircleAngleRight

Clock

CollapseLeft

CollapseRight

Comment

CommentCheck

Connections

Copy

Count

Csv

DecreaseIndent

Delete

Department

DirectReports

Dismiss

Dollar

DottedLines

Download

Duplicate

Edit

Enter

Event

EverythingReport

Exit

EyeHidden

EyeVisible

Feedback

FileCheck

Filter

Five

Flag

Focus

Folder

Football

Four

Gauge

Gift

GraduationHat

Graph

Grid

Grip

Groups

Growth

Happiness

Hierarchy

Home

Hourglass

Image

IncreaseIndent

Info

Invoice

Italic

Kebab

Key

KeyResult

Language

LearningPath

LearningPathStep

Lightbulb

Link

Location

Lock

LockedCalendar

LockedNote

Mail

Maximize

Media

Microphone

MicrophoneDisabled

Minus

Mobile

Move

NewComment

NewFilter

NewGift

NewNote

NewNotification

NewSticky

NewTab

NewTemplate

NewTip

NextCalendar

Note

Notebook

Notification

One

OneOnOne

OpenRole

OpenSmile

OrderedList

OrgChart

Organization

Pause

Pdf

Peace

Percent

Phone

Pin

PinSolid

Play

PlaySolid

Plus

Print

Profile

Progress

Pronunciation

Question

QuizLesson

Reaction

Recurring

Refresh

RelationWithManager

RelationshipWithPeers

Reminder

Remove

RemoveCalendar

RemoveUser

Reply

Report

ReportsTo

Requalification

Review

Rewind

Rocket

Satisfaction

ScreenShare

Search

Section

Segment

Send

Settings

SettingsNotification

SettingsWarning

Share

Shared

Shield

Slider

Sort

Sparkles

Sprout

Star

StarSolid

StartOver

Sticky

Strikethrough

Substract

Success

Sync

Tag

Team

Template

TextLesson

Three

ThumbsDown

ThumbsUp

Tip

Translation

Two

Unarchive

Underline

UnorderedList

Upload

Upsell

User

Video

VideoCamera

VideoCameraDisabled

Warning

WebinarLesson

Wellness

WhosWhoFace

WhosWhoGame

## Rich Icon Library

# Rich Icon Library

All rich icons in the Workleap icon library are available in three predefined sizes. To ensure consistency and clarity, always use the icons at one of these sizes. Avoid resizing icons to dimensions other than the provided options.

To integrate a rich icon into your project, simply import it from `@hopper-ui/svg-icons` in a JavaScript file:

```hd-code

import ActionListRichIcon from "@hopper-ui/svg-icons/rich-icons/action-list-32.svg";

```

or in a CSS file:

```hd-code

.my-component {
    background-image: url("@hopper-ui/svg-icons/rich-icons/action-list-32.svg");
}

```

The color of the rich icons can be changed by using the right CSS Variables.
The following variables are available for your styling needs: `--hop-RichIcon-placeholder-fill`, `--hop-RichIcon-placeholder-background` and `--hop-RichIcon-placeholder-shadow`. You should use the appropriate [decorative semantic tokens](https://hopper.workleap.design/tokens/semantic/color#decorative) or status semantic tokens. The available options for Rich Icons are `option1` to `option8`, `success`, `warning`, `danger`, `information` and `upsell`.

```hd-code

.actionListRichIcon {
    --hop-RichIcon-placeholder-background: var(--hop-color-decorative-option1);
}

```

You can preview rich icons in your preferred size. Simply click on an icon to instantly copy its name!

Medium24x24px

Large32x32px

Extra Large40x40px

ActionList

Anniversary

Anonymous

Applause

Birthday

BrokenImage

Caution

Conversation

Custom

DecreasingScore

DeletedUser

Department

Directory

Discount

Email

Feedback

GoalIndividual

GoalTeam

Group

Growth

Idea

Info

LikertScale

Location

MultipleChoice

OneOnOne

OpenRole

OpinionScale

Organization

People

Profile

Question

Reminder

Review

RisingScore

Rocket

Script

Settings

Sparkles

Star

Status

Success

Support

Template

TextAnswer

Upsell

WhosWho

## Border Radius Tokens

# Border Radius

## [Tokens](https://hopper.workleap.design/tokens/core/border-radius\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-border-radius-0` | core\_0 | 0 |  |
| `--hop-border-radius-1` | core\_1 | 0.25rem |  |
| `--hop-border-radius-2` | core\_2 | 0.5rem |  |
| `--hop-border-radius-3` | core\_3 | 1rem |  |
| `--hop-border-radius-4` | core\_4 | 1.5rem |  |
| `--hop-border-radius-9999` | core\_9999 | 624.9375rem |  |

## Color Tokens

# Color

## [Tokens](https://hopper.workleap.design/tokens/core/color\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-coastal-25` | core\_coastal-25 | #f0f8ff |  |
| `--hop-coastal-50` | core\_coastal-50 | #d9efff |  |
| `--hop-coastal-75` | core\_coastal-75 | #bae6ff |  |
| `--hop-coastal-100` | core\_coastal-100 | #9fd2f7 |  |
| `--hop-coastal-200` | core\_coastal-200 | #81b9e4 |  |
| `--hop-coastal-300` | core\_coastal-300 | #5d9acd |  |
| `--hop-coastal-400` | core\_coastal-400 | #3a7bb2 |  |
| `--hop-coastal-500` | core\_coastal-500 | #2e70a8 |  |
| `--hop-coastal-600` | core\_coastal-600 | #23669f |  |
| `--hop-coastal-700` | core\_coastal-700 | #0a538b |  |
| `--hop-coastal-800` | core\_coastal-800 | #003d70 |  |
| `--hop-coastal-900` | core\_coastal-900 | #00274b |  |
| `--hop-quetzal-25` | core\_quetzal-25 | #ddfdf9 |  |
| `--hop-quetzal-50` | core\_quetzal-50 | #cff4ef |  |
| `--hop-quetzal-75` | core\_quetzal-75 | #bde8e1 |  |
| `--hop-quetzal-100` | core\_quetzal-100 | #a3d6cb |  |
| `--hop-quetzal-200` | core\_quetzal-200 | #83beaf |  |
| `--hop-quetzal-300` | core\_quetzal-300 | #5da18c |  |
| `--hop-quetzal-400` | core\_quetzal-400 | #38836a |  |
| `--hop-quetzal-500` | core\_quetzal-500 | #2b795e |  |
| `--hop-quetzal-600` | core\_quetzal-600 | #206f54 |  |
| `--hop-quetzal-700` | core\_quetzal-700 | #055c41 |  |
| `--hop-quetzal-800` | core\_quetzal-800 | #00452d |  |
| `--hop-quetzal-900` | core\_quetzal-900 | #002d1c |  |
| `--hop-orchid-bloom-25` | core\_orchid-bloom-25 | #f6f5ff |  |
| `--hop-orchid-bloom-50` | core\_orchid-bloom-50 | #eae9fb |  |
| `--hop-orchid-bloom-75` | core\_orchid-bloom-75 | #ddddf7 |  |
| `--hop-orchid-bloom-100` | core\_orchid-bloom-100 | #c8caf0 |  |
| `--hop-orchid-bloom-200` | core\_orchid-bloom-200 | #aeb3e8 |  |
| `--hop-orchid-bloom-300` | core\_orchid-bloom-300 | #8d91dc |  |
| `--hop-orchid-bloom-400` | core\_orchid-bloom-400 | #6b6ecc |  |
| `--hop-orchid-bloom-500` | core\_orchid-bloom-500 | #5f61c5 |  |
| `--hop-orchid-bloom-600` | core\_orchid-bloom-600 | #5454be |  |
| `--hop-orchid-bloom-700` | core\_orchid-bloom-700 | #433fac |  |
| `--hop-orchid-bloom-800` | core\_orchid-bloom-800 | #322b8d |  |
| `--hop-orchid-bloom-900` | core\_orchid-bloom-900 | #1e1c5d |  |
| `--hop-sapphire-25` | core\_sapphire-25 | #f5f6ff |  |
| `--hop-sapphire-50` | core\_sapphire-50 | #e6ebff |  |
| `--hop-sapphire-75` | core\_sapphire-75 | #d6e0ff |  |
| `--hop-sapphire-100` | core\_sapphire-100 | #b9cbff |  |
| `--hop-sapphire-200` | core\_sapphire-200 | #95b1ff |  |
| `--hop-sapphire-300` | core\_sapphire-300 | #6c8ffd |  |
| `--hop-sapphire-400` | core\_sapphire-400 | #4767fe |  |
| `--hop-sapphire-500` | core\_sapphire-500 | #3b57ff |  |
| `--hop-sapphire-600` | core\_sapphire-600 | #2a43e8 |  |
| `--hop-sapphire-700` | core\_sapphire-700 | #2040c7 |  |
| `--hop-sapphire-800` | core\_sapphire-800 | #1b3587 |  |
| `--hop-sapphire-900` | core\_sapphire-900 | #152450 |  |
| `--hop-fog-25` | core\_fog-25 | #f2f8fa |  |
| `--hop-fog-50` | core\_fog-50 | #e1eef1 |  |
| `--hop-fog-75` | core\_fog-75 | #d2e3e7 |  |
| `--hop-fog-100` | core\_fog-100 | #bad0d5 |  |
| `--hop-fog-200` | core\_fog-200 | #9cb7be |  |
| `--hop-fog-300` | core\_fog-300 | #7c9aa3 |  |
| `--hop-fog-400` | core\_fog-400 | #5e7b84 |  |
| `--hop-fog-500` | core\_fog-500 | #557079 |  |
| `--hop-fog-600` | core\_fog-600 | #4e6770 |  |
| `--hop-fog-700` | core\_fog-700 | #40535a |  |
| `--hop-fog-800` | core\_fog-800 | #313e43 |  |
| `--hop-fog-900` | core\_fog-900 | #20282a |  |
| `--hop-toad-25` | core\_toad-25 | #fef6ef |  |
| `--hop-toad-50` | core\_toad-50 | #f0eae3 |  |
| `--hop-toad-75` | core\_toad-75 | #e5ded6 |  |
| `--hop-toad-100` | core\_toad-100 | #d4cbc0 |  |
| `--hop-toad-200` | core\_toad-200 | #bdb1a3 |  |
| `--hop-toad-300` | core\_toad-300 | #a19382 |  |
| `--hop-toad-400` | core\_toad-400 | #837463 |  |
| `--hop-toad-500` | core\_toad-500 | #776a59 |  |
| `--hop-toad-600` | core\_toad-600 | #6e6151 |  |
| `--hop-toad-700` | core\_toad-700 | #594f41 |  |
| `--hop-toad-800` | core\_toad-800 | #433b31 |  |
| `--hop-toad-900` | core\_toad-900 | #2a2620 |  |
| `--hop-sunken-treasure-25` | core\_sunken-treasure-25 | #fff8d6 |  |
| `--hop-sunken-treasure-50` | core\_sunken-treasure-50 | #fff2b8 |  |
| `--hop-sunken-treasure-75` | core\_sunken-treasure-75 | #f7e694 |  |
| `--hop-sunken-treasure-100` | core\_sunken-treasure-100 | #eac96d |  |
| `--hop-sunken-treasure-200` | core\_sunken-treasure-200 | #e2a934 |  |
| `--hop-sunken-treasure-300` | core\_sunken-treasure-300 | #c28b12 |  |
| `--hop-sunken-treasure-400` | core\_sunken-treasure-400 | #996f08 |  |
| `--hop-sunken-treasure-500` | core\_sunken-treasure-500 | #8b6609 |  |
| `--hop-sunken-treasure-600` | core\_sunken-treasure-600 | #7e5e0a |  |
| `--hop-sunken-treasure-700` | core\_sunken-treasure-700 | #654c0d |  |
| `--hop-sunken-treasure-800` | core\_sunken-treasure-800 | #4b390f |  |
| `--hop-sunken-treasure-900` | core\_sunken-treasure-900 | #2f250d |  |
| `--hop-koi-25` | core\_koi-25 | #fff5e9 |  |
| `--hop-koi-50` | core\_koi-50 | #ffe8d3 |  |
| `--hop-koi-75` | core\_koi-75 | #ffd8be |  |
| `--hop-koi-100` | core\_koi-100 | #ffbf92 |  |
| `--hop-koi-200` | core\_koi-200 | #ff9b3f |  |
| `--hop-koi-300` | core\_koi-300 | #e57723 |  |
| `--hop-koi-400` | core\_koi-400 | #c95109 |  |
| `--hop-koi-500` | core\_koi-500 | #ba4705 |  |
| `--hop-koi-600` | core\_koi-600 | #ab4104 |  |
| `--hop-koi-700` | core\_koi-700 | #8c3504 |  |
| `--hop-koi-800` | core\_koi-800 | #692803 |  |
| `--hop-koi-900` | core\_koi-900 | #451a02 |  |
| `--hop-amanita-25` | core\_amanita-25 | #fdf6f6 |  |
| `--hop-amanita-50` | core\_amanita-50 | #fde6e5 |  |
| `--hop-amanita-75` | core\_amanita-75 | #ffd6d3 |  |
| `--hop-amanita-100` | core\_amanita-100 | #ffbcb7 |  |
| `--hop-amanita-200` | core\_amanita-200 | #ff8e8e |  |
| `--hop-amanita-300` | core\_amanita-300 | #fa4d59 |  |
| `--hop-amanita-400` | core\_amanita-400 | #df3236 |  |
| `--hop-amanita-500` | core\_amanita-500 | #cb2e31 |  |
| `--hop-amanita-600` | core\_amanita-600 | #ba2d2d |  |
| `--hop-amanita-700` | core\_amanita-700 | #952927 |  |
| `--hop-amanita-800` | core\_amanita-800 | #6c2320 |  |
| `--hop-amanita-900` | core\_amanita-900 | #431a17 |  |
| `--hop-moss-25` | core\_moss-25 | #f4f9e9 |  |
| `--hop-moss-50` | core\_moss-50 | #e3f3b9 |  |
| `--hop-moss-75` | core\_moss-75 | #cde8ac |  |
| `--hop-moss-100` | core\_moss-100 | #aad89d |  |
| `--hop-moss-200` | core\_moss-200 | #7dc291 |  |
| `--hop-moss-300` | core\_moss-300 | #47a584 |  |
| `--hop-moss-400` | core\_moss-400 | #188a71 |  |
| `--hop-moss-500` | core\_moss-500 | #0c796b |  |
| `--hop-moss-600` | core\_moss-600 | #0a6f64 |  |
| `--hop-moss-700` | core\_moss-700 | #115a52 |  |
| `--hop-moss-800` | core\_moss-800 | #16433d |  |
| `--hop-moss-900` | core\_moss-900 | #132a27 |  |
| `--hop-abyss` | core\_abyss | #1d1d1c |  |
| `--hop-rock-20` | core\_rock-20 | #fcfbfb |  |
| `--hop-rock-25` | core\_rock-25 | #f8f6f3 |  |
| `--hop-rock-50` | core\_rock-50 | #ecebe8 |  |
| `--hop-rock-75` | core\_rock-75 | #e0dfdd |  |
| `--hop-rock-100` | core\_rock-100 | #ccccca |  |
| `--hop-rock-200` | core\_rock-200 | #b3b3b1 |  |
| `--hop-rock-300` | core\_rock-300 | #959593 |  |
| `--hop-rock-400` | core\_rock-400 | #777775 |  |
| `--hop-rock-500` | core\_rock-500 | #6c6c6b |  |
| `--hop-rock-600` | core\_rock-600 | #636362 |  |
| `--hop-rock-700` | core\_rock-700 | #505050 |  |
| `--hop-rock-800` | core\_rock-800 | #3c3c3c |  |
| `--hop-rock-900` | core\_rock-900 | #292929 |  |
| `--hop-samoyed` | core\_samoyed | #ffffff |  |

## Core Dimensions Tokens

# Dimensions

## [Tokens](https://hopper.workleap.design/tokens/core/dimensions\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-0` | core\_0 | 0 |  |
| `--hop-space-10` | core\_10 | 0.0625rem |  |
| `--hop-space-20` | core\_20 | 0.125rem |  |
| `--hop-space-40` | core\_40 | 0.25rem |  |
| `--hop-space-80` | core\_80 | 0.5rem |  |
| `--hop-space-160` | core\_160 | 1rem |  |
| `--hop-space-240` | core\_240 | 1.5rem |  |
| `--hop-space-320` | core\_320 | 2rem |  |
| `--hop-space-400` | core\_400 | 2.5rem |  |
| `--hop-space-480` | core\_480 | 3rem |  |
| `--hop-space-640` | core\_640 | 4rem |  |
| `--hop-space-800` | core\_800 | 5rem |  |
| `--hop-space-960` | core\_960 | 6rem |  |
| `--hop-space-1280` | core\_1280 | 8rem |  |

## Font Family Tokens

# Font Family

## [Tokens](https://hopper.workleap.design/tokens/core/font-family\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-family-primary` | core\_primary | 'ABC Favorit', Helvetica, Arial, sans-serif | Aa |
| `--hop-font-family-secondary` | core\_secondary | 'Inter', Helvetica, Arial, sans-serif | Aa |
| `--hop-font-family-tertiary` | core\_tertiary | 'ABC Favorit Mono', Consolas, 'SF Mono', monospace | Aa |

## Font Size Tokens

# Font Size

## [Tokens](https://hopper.workleap.design/tokens/core/font-size\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-size-120` | core\_120 | 0.75rem | Aa |
| `--hop-font-size-140` | core\_140 | 0.875rem | Aa |
| `--hop-font-size-160` | core\_160 | 1rem | Aa |
| `--hop-font-size-180` | core\_180 | 1.125rem | Aa |
| `--hop-font-size-200` | core\_200 | 1.25rem | Aa |
| `--hop-font-size-240` | core\_240 | 1.5rem | Aa |
| `--hop-font-size-280` | core\_280 | 1.75rem | Aa |
| `--hop-font-size-320` | core\_320 | 2rem | Aa |
| `--hop-font-size-360` | core\_360 | 2.25rem | Aa |
| `--hop-font-size-480` | core\_480 | 3rem | Aa |

## Font Weight Tokens

# Font Weight

## [Tokens](https://hopper.workleap.design/tokens/core/font-weight\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-weight-400` | core\_400 | 400 | Aa |
| `--hop-font-weight-410` | core\_410 | 410 | Aa |
| `--hop-font-weight-505` | core\_505 | 505 | Aa |
| `--hop-font-weight-580` | core\_580 | 580 | Aa |
| `--hop-font-weight-590` | core\_590 | 590 | Aa |
| `--hop-font-weight-680` | core\_680 | 680 | Aa |
| `--hop-font-weight-690` | core\_690 | 690 | Aa |

## Line Height Tokens

# Line Height

## [Tokens](https://hopper.workleap.design/tokens/core/line-height\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-line-height-1-125` | core\_1-125 | 1.125 | AaAa |
| `--hop-line-height-1-14` | core\_1-14 | 1.1428571 | AaAa |
| `--hop-line-height-1-20` | core\_1-20 | 1.2 | AaAa |
| `--hop-line-height-1-25` | core\_1-25 | 1.25 | AaAa |
| `--hop-line-height-1-33` | core\_1-33 | 1.3333333 | AaAa |
| `--hop-line-height-1-4285` | core\_1-4285 | 1.4285714 | AaAa |
| `--hop-line-height-1-50` | core\_1-50 | 1.5 | AaAa |

## Motion Utilities

# Motion

Motion brings meaning and a sense of life to the experience. It should be purposeful, intuitive, and seamless. Our motion utilities consists of two set of values, _durations_ and _easings_.

## [Usage](https://hopper.workleap.design/tokens/core/motion\#usage)

Both variables can be combined in [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) as well in [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) to set the tone of an animation/transition (animation is used interchangeably with transition from now on).

In a transition declaration:

```hd-code

.tease {
    transition: color var(--hop-easing-duration-1) var(--hop-easing-focus);
}

```

In an animation declaration:

```hd-code

@keyframes tease-animation  {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.tease {
    animation: tease-animation var(--hop-easing-duration-2) var(--hop-easing-productive);
}

```

## [Tokens](https://hopper.workleap.design/tokens/core/motion\#tokens)

### [Duration](https://hopper.workleap.design/tokens/core/motion\#tokens-duration)

Hopper exposes 5 durations, they help convey a message and makes animations smooth and responsive.

| Name | Value |
| --- | --- |
| `--hop-easing-duration-1` | 100ms |
| `--hop-easing-duration-2` | 200ms |
| `--hop-easing-duration-3` | 300ms |
| `--hop-easing-duration-4` | 500ms |
| `--hop-easing-duration-5` | 800ms |

### [Easings](https://hopper.workleap.design/tokens/core/motion\#tokens-easings)

[Easings](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) denotes a mathematical function that describes the rate at which a numerical value changes.They add life to motion by providing natural rests and setting the mood of an animation. Hopper provides 3 predefined easings, each having their use.

#### [Productive](https://hopper.workleap.design/tokens/core/motion\#productive)

Used in animations that are not in the way, they quickly change from one state to another.

#### [Focus](https://hopper.workleap.design/tokens/core/motion\#focus)

Used in animations that are designed to draw the user’s attention on what changed, in order to let them move on with their next task.

#### [Expressive](https://hopper.workleap.design/tokens/core/motion\#expressive)

Used in animations that are meant to give a sense of completeness or resolution to the user. Use them sparsely.

| Name | Value |
| --- | --- |
| `--hop-easing-productive` | cubic-bezier(0.22, 0.61, 0.36, 1) |
| `--hop-easing-focus` | cubic-bezier(0.46, 0.03, 0.52, 0.96) |
| `--hop-easing-expressive` | cubic-bezier(0.72, -0.66, 0.15, 1.5) |

### [Playground](https://hopper.workleap.design/tokens/core/motion\#tokens-playground)

EasingExpressive▼

ProductiveFocusExpressive

DurationDuration 1 (100ms)▼

Duration 1 (100ms)Duration 2 (200ms)Duration 3 (300ms)Duration 4 (500ms)Duration 5 (800ms)

Play this motion

## Shadow Tokens

# Shadow

## [Tokens](https://hopper.workleap.design/tokens/core/shadow\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-shadow-none` | core\_none | none |  |
| `--hop-shadow-sm` | core\_sm | 0 1px 6px 0 rgba(60, 60, 60, 0.10) |  |
| `--hop-shadow-md` | core\_md | 0 4px 10px 4px rgba(60, 60, 60, 0.08) |  |
| `--hop-shadow-lg` | core\_lg | 0 10px 18px 8px rgba(60, 60, 60, 0.08) |  |

## Workleap Design Tokens Overview

# Introduction

Design tokens are central to Workleap's design language, underpinning all UI elements. These tokens encapsulate the Workleap brand and are maintained within the Hopper Design System.

A design token can store any of the following elements:

- A single value such as a `color`, `font-size`, or `border-width`.
- A collection of indivisible values such as a `box-shadow`.

## [Definitions](https://hopper.workleap.design/tokens/overview/introduction\#definitions)

Hopper aims to provide a three-tier token system, with each tier serving a specific purpose.

![Token tiers diagram](https://cdn.platform.workleap.com/hopper/webdoc/token-details.png)_A three tier token system allows a separation of concerns regarding design decisions._

### [Core tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-core-tokens)

These tokens represent fundamental values like hexadecimal color codes, border widths, or font sizes. They serve as the building blocks of the design system.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-sapphire-200` | core\_sapphire-200 | #95b1ff |  |

### [Semantic tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-semantic-tokens)

Semantic tokens convey design intent and are context-aware. They should be used in most scenarios.

#### [Light](https://hopper.workleap.design/tokens/overview/introduction\#light)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-surface-disabled` | primary-disabled | #95b1ff |  |

#### [Dark](https://hopper.workleap.design/tokens/overview/introduction\#dark)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-surface-disabled` | primary-disabled | #2040c7 |  |

### [Component tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-component-tokens)

These tokens cover the essential details of component implementation and are provided by the components themselves. They are linked to their specific components and should only be used when building components with a technology other than React.

_Note: These tokens will be available in a future release._

#### [Light](https://hopper.workleap.design/tokens/overview/introduction\#light)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-button-primary-disabled` | #95b1ff |  |

#### [Dark](https://hopper.workleap.design/tokens/overview/introduction\#dark)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-button-primary-disabled` | #2040c7 |  |

## [When to use](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use)

### [For Developers](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use-for-developers)

Tokens should be used whenever Hopper components do not suit your current use case or if you can't use Hopper React components. They are also useful for situations such as setting a background color on an element.

It should be noted that if your current stack prevents you from directly using Hopper components, it is recommended to use component tokens, once released, in priority as they are mapped 1:1 with Hopper implementation.

### [For Designers](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use-for-designers)

When developing features for Workleap, you may need to create new components or enhance existing ones. In this case, you should use semantic tokens to create your components. This ensures consistency with the rest of the design system. Only semantic tokens are available in Figma.

## Color Guidelines

# Color

Colors are a clear way to convey meaning in design. Over time, we associate colors with specific meanings based on their context and frequency of use. In the Workleap ecosystem, each color complements the others and has a specific role.

## [Guidelines](https://hopper.workleap.design/tokens/semantic/color\#guidelines)

- **Communication is key** \- Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Color supports the purpose of the content, communicating things like hierarchy, interactive states and differences between visual elements.
- **Colors have meaning** \- Each color has assigned sentiment based on how they function within the interface. Defined color roles make things easy to modify and customize later. Their meaning is also expanded to all Workleap verticals so that users understand that they’re in the same ecosystem and can recognize its codes.

## [Deprecation notice](https://hopper.workleap.design/tokens/semantic/color\#deprecation-notice)

Tokens with the `-active` suffix are deprecated and should not be used in new code. They will be removed in a future release. Prefer using their `-press` counterparts. In some instances, `-active` tokens should be replaced with `-selected` tokens. This should be documented in your Figma files. If in doubt, validate with a designer.

## [Light Tokens](https://hopper.workleap.design/tokens/semantic/color\#light-tokens)

### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-neutral-border-active` | neutral-active | #777775 |  |
| `--hop-neutral-icon-active` | neutral-active | #292929 |  |
| `--hop-neutral-icon-weak-active` | neutral-weak-active | #505050 |  |
| `--hop-neutral-surface-active` | neutral-active | #ecebe8 |  |
| `--hop-neutral-surface-weak-active` | neutral-weak-active | #ccccca |  |
| `--hop-neutral-text-active` | neutral-active | #292929 |  |
| `--hop-neutral-text-weak-active` | neutral-weak-active | #505050 |  |
| `--hop-neutral-border` | neutral | #b3b3b1 |  |
| `--hop-neutral-border-selected` | neutral-selected | #3c3c3c |  |
| `--hop-neutral-border-disabled` | neutral-disabled | #ecebe8 |  |
| `--hop-neutral-border-hover` | neutral-hover | #959593 |  |
| `--hop-neutral-border-press` | neutral-press | #777775 |  |
| `--hop-neutral-border-strong` | neutral-strong | #3c3c3c |  |
| `--hop-neutral-border-strong-hover` | neutral-strong-hover | #505050 |  |
| `--hop-neutral-border-weak` | neutral-weak | #e0dfdd |  |
| `--hop-neutral-border-weakest` | neutral-weakest | #ecebe8 |  |
| `--hop-neutral-icon` | neutral | #3c3c3c |  |
| `--hop-neutral-icon-selected` | neutral-selected | #ffffff |  |
| `--hop-neutral-icon-disabled` | neutral-disabled | #959593 |  |
| `--hop-neutral-icon-hover` | neutral-hover | #505050 |  |
| `--hop-neutral-icon-press` | neutral-press | #292929 |  |
| `--hop-neutral-icon-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-icon-strong-hover` | neutral-strong-hover | #ffffff |  |
| `--hop-neutral-icon-weak` | neutral-weak | #777775 |  |
| `--hop-neutral-icon-weak-hover` | neutral-weak-hover | #636362 |  |
| `--hop-neutral-icon-weak-press` | neutral-weak-press | #505050 |  |
| `--hop-neutral-icon-weak-selected` | neutral-weak-selected | #636362 |  |
| `--hop-neutral-icon-weakest` | neutral-weakest | #b3b3b1 |  |
| `--hop-neutral-surface` | neutral | #ffffff |  |
| `--hop-neutral-surface-selected` | neutral-selected | #3c3c3c |  |
| `--hop-neutral-surface-disabled` | neutral-disabled | #ecebe8 |  |
| `--hop-neutral-surface-hover` | neutral-hover | #f8f6f3 |  |
| `--hop-neutral-surface-press` | neutral-press | #ecebe8 |  |
| `--hop-neutral-surface-strong` | neutral-strong | #3c3c3c |  |
| `--hop-neutral-surface-weak` | neutral-weak | #ecebe8 |  |
| `--hop-neutral-surface-weak-selected` | neutral-weak-selected | #ecebe8 |  |
| `--hop-neutral-surface-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-surface-weak-press` | neutral-weak-press | #ccccca |  |
| `--hop-neutral-surface-weakest` | neutral-weakest | #f8f6f3 |  |
| `--hop-neutral-surface-weakest-selected` | neutral-weakest-selected | #ecebe8 |  |
| `--hop-neutral-surface-weakest-hover` | neutral-weakest-hover | #ecebe8 |  |
| `--hop-neutral-text` | neutral | #3c3c3c |  |
| `--hop-neutral-text-selected` | neutral-selected | #ffffff |  |
| `--hop-neutral-text-disabled` | neutral-disabled | #959593 |  |
| `--hop-neutral-text-hover` | neutral-hover | #505050 |  |
| `--hop-neutral-text-press` | neutral-press | #292929 |  |
| `--hop-neutral-text-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-text-weak` | neutral-weak | #6c6c6b |  |
| `--hop-neutral-text-weak-hover` | neutral-weak-hover | #636362 |  |
| `--hop-neutral-text-weak-press` | neutral-weak-press | #505050 |  |
| `--hop-neutral-text-weak-selected` | neutral-weak-selected | #636362 |  |
| `--hop-neutral-text-weakest` | neutral-weakest | #959593 |  |

### [Primary](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-border-active` | primary-active | #6c8ffd |  |
| `--hop-primary-icon-active` | primary-active | #2040c7 |  |
| `--hop-primary-surface-active` | primary-active | #6c8ffd |  |
| `--hop-primary-surface-strong-active` | primary-strong-active | #2040c7 |  |
| `--hop-primary-surface-weak-active` | primary-weak-active | #d6e0ff |  |
| `--hop-primary-text-active` | primary-active | #2040c7 |  |
| `--hop-primary-border` | primary | #4767fe |  |
| `--hop-primary-border-selected` | primary-selected | #4767fe |  |
| `--hop-primary-border-focus` | primary-focus | #3b57ff |  |
| `--hop-primary-border-press` | primary-press | #6c8ffd |  |
| `--hop-primary-icon` | primary | #3b57ff |  |
| `--hop-primary-icon-selected` | primary-selected | #3b57ff |  |
| `--hop-primary-icon-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-icon-hover` | primary-hover | #2a43e8 |  |
| `--hop-primary-icon-press` | primary-press | #2040c7 |  |
| `--hop-primary-icon-strong` | primary-strong | #ffffff |  |
| `--hop-primary-icon-strong-hover` | primary-strong-hover | #ffffff |  |
| `--hop-primary-surface` | primary | #e6ebff |  |
| `--hop-primary-surface-selected` | primary-selected | #e6ebff |  |
| `--hop-primary-surface-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-surface-focus` | primary-focus | #f5f6ff |  |
| `--hop-primary-surface-hover` | primary-hover | #95b1ff |  |
| `--hop-primary-surface-press` | primary-press | #6c8ffd |  |
| `--hop-primary-surface-strong` | primary-strong | #4767fe |  |
| `--hop-primary-surface-strong-selected` | primary-strong-selected | #e6ebff |  |
| `--hop-primary-surface-strong-hover` | primary-strong-hover | #2a43e8 |  |
| `--hop-primary-surface-strong-press` | primary-strong-press | #2040c7 |  |
| `--hop-primary-surface-weak` | primary-weak | #f5f6ff |  |
| `--hop-primary-surface-weak-hover` | primary-weak-hover | #e6ebff |  |
| `--hop-primary-surface-weak-press` | primary-weak-press | #d6e0ff |  |
| `--hop-primary-text` | primary | #3b57ff |  |
| `--hop-primary-text-selected` | primary-selected | #3b57ff |  |
| `--hop-primary-text-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-text-hover` | primary-hover | #2a43e8 |  |
| `--hop-primary-text-press` | primary-press | #2040c7 |  |
| `--hop-primary-text-strong` | primary-strong | #ffffff |  |
| `--hop-primary-text-strong-hover` | primary-strong-hover | #ffffff |  |

### [Success](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-success)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-success-border` | success | #aad89d |  |
| `--hop-success-icon` | success | #115a52 |  |
| `--hop-success-icon-weakest` | success-weakest | #aad89d |  |
| `--hop-success-icon-weak` | success-weak | #47a584 |  |
| `--hop-success-surface` | success | #f4f9e9 |  |
| `--hop-success-surface-strong` | success-strong | #aad89d |  |
| `--hop-success-surface-weak` | success-weak | #e3f3b9 |  |
| `--hop-success-text` | success | #115a52 |  |
| `--hop-success-text-hover` | success-hover | #16433d |  |
| `--hop-success-text-weak` | success-weak | #47a584 |  |

### [Warning](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-warning)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-warning-border` | warning | #ffbf92 |  |
| `--hop-warning-icon` | warning | #8c3504 |  |
| `--hop-warning-icon-weakest` | warning-weakest | #ffbf92 |  |
| `--hop-warning-icon-weak` | warning-weak | #e57723 |  |
| `--hop-warning-surface` | warning | #fff5e9 |  |
| `--hop-warning-surface-strong` | warning-strong | #ffbf92 |  |
| `--hop-warning-surface-weak` | warning-weak | #ffe8d3 |  |
| `--hop-warning-text` | warning | #8c3504 |  |
| `--hop-warning-text-weak` | warning-weak | #e57723 |  |

### [Danger](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-danger)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-danger-border-active` | danger-active | #ba2d2d |  |
| `--hop-danger-icon-active` | danger-active | #6c2320 |  |
| `--hop-danger-icon-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-surface-active` | danger-active | #ba2d2d |  |
| `--hop-danger-surface-weak-active` | danger-weak-active | #ffbcb7 |  |
| `--hop-danger-text-active` | danger-active | #6c2320 |  |
| `--hop-danger-text-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-border` | danger | #ffbcb7 |  |
| `--hop-danger-border-selected` | danger-selected | #df3236 |  |
| `--hop-danger-border-strong` | danger-strong | #fa4d59 |  |
| `--hop-danger-border-press` | danger-press | #fa4d59 |  |
| `--hop-danger-icon` | danger | #952927 |  |
| `--hop-danger-icon-selected` | danger-selected | #df3236 |  |
| `--hop-danger-icon-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-icon-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-icon-press` | danger-press | #6c2320 |  |
| `--hop-danger-icon-strong` | danger-strong | #ffffff |  |
| `--hop-danger-icon-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-icon-weak` | danger-weak | #df3236 |  |
| `--hop-danger-icon-weak-hover` | danger-weak-hover | #cb2e31 |  |
| `--hop-danger-icon-weak-press` | danger-weak-press | #ba2d2d |  |
| `--hop-danger-icon-weakest` | danger-weakest | #ffd6d3 |  |
| `--hop-danger-surface` | danger | #fdf6f6 |  |
| `--hop-danger-surface-selected` | danger-selected | #fde6e5 |  |
| `--hop-danger-surface-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-surface-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-surface-press` | danger-press | #ba2d2d |  |
| `--hop-danger-surface-strong` | danger-strong | #df3236 |  |
| `--hop-danger-surface-strong-hover` | danger-strong-hover | #cb2e31 |  |
| `--hop-danger-surface-weak` | danger-weak | #fde6e5 |  |
| `--hop-danger-surface-weak-hover` | danger-weak-hover | #ffd6d3 |  |
| `--hop-danger-surface-weak-press` | danger-weak-press | #ffbcb7 |  |
| `--hop-danger-text` | danger | #952927 |  |
| `--hop-danger-text-selected` | danger-selected | #df3236 |  |
| `--hop-danger-text-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-text-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-text-press` | danger-press | #6c2320 |  |
| `--hop-danger-text-strong` | danger-strong | #ffffff |  |
| `--hop-danger-text-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-text-weak` | danger-weak | #df3236 |  |
| `--hop-danger-text-weak-hover` | danger-weak-hover | #cb2e31 |  |
| `--hop-danger-text-weak-press` | danger-weak-press | #ba2d2d |  |

### [Information](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-information)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-information-border` | information | #9fd2f7 |  |
| `--hop-information-icon` | information | #0a538b |  |
| `--hop-information-icon-weakest` | information-weakest | #bae6ff |  |
| `--hop-information-icon-weak` | information-weak | #5d9acd |  |
| `--hop-information-surface` | information | #f0f8ff |  |
| `--hop-information-surface-strong` | information-strong | #9fd2f7 |  |
| `--hop-information-surface-weak` | information-weak | #d9efff |  |
| `--hop-information-text` | information | #003d70 |  |
| `--hop-information-text-weak` | information-weak | #5d9acd |  |

### [Upsell](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-upsell)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-upsell-border-active` | upsell-active | #e2a934 |  |
| `--hop-upsell-icon-active` | upsell-active | #2f250d |  |
| `--hop-upsell-icon-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-surface-active` | upsell-active | #e2a934 |  |
| `--hop-upsell-surface-weak-active` | upsell-weak-active | #f7e694 |  |
| `--hop-upsell-text-active` | upsell-active | #2f250d |  |
| `--hop-upsell-text-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-border` | upsell | #eac96d |  |
| `--hop-upsell-border-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-border-disabled` | upsell-disabled | #f7e694 |  |
| `--hop-upsell-border-press` | upsell-press | #c28b12 |  |
| `--hop-upsell-icon` | upsell | #654c0d |  |
| `--hop-upsell-icon-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-icon-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-icon-press` | upsell-press | #2f250d |  |
| `--hop-upsell-icon-weakest` | upsell-weakest | #f7e694 |  |
| `--hop-upsell-icon-weak` | upsell-weak | #c28b12 |  |
| `--hop-upsell-icon-weak-hover` | upsell-weak-hover | #8b6609 |  |
| `--hop-upsell-icon-weak-press` | upsell-weak-press | #7e5e0a |  |
| `--hop-upsell-surface` | upsell | #fff8d6 |  |
| `--hop-upsell-surface-selected` | upsell-selected | #fff2b8 |  |
| `--hop-upsell-surface-disabled` | upsell-disabled | #fff8d6 |  |
| `--hop-upsell-surface-hover` | upsell-hover | #fff2b8 |  |
| `--hop-upsell-surface-press` | upsell-press | #f7e694 |  |
| `--hop-upsell-surface-weak` | upsell-weak | #f7e694 |  |
| `--hop-upsell-surface-weak-hover` | upsell-weak-hover | #eac96d |  |
| `--hop-upsell-surface-weak-press` | upsell-weak-press | #e2a934 |  |
| `--hop-upsell-text` | upsell | #654c0d |  |
| `--hop-upsell-text-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-text-disabled` | upsell-disabled | #996f08 |  |
| `--hop-upsell-text-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-text-press` | upsell-press | #2f250d |  |
| `--hop-upsell-text-weak` | upsell-weak | #c28b12 |  |
| `--hop-upsell-text-weak-hover` | upsell-weak-hover | #8b6609 |  |
| `--hop-upsell-text-weak-press` | upsell-weak-press | #7e5e0a |  |

### [Decorative](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-decorative)

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option1-border` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-icon` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-surface` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-surface-hover` | decorative-option1-hover | #95b1ff |  |
| `--hop-decorative-option1-surface-strong` | decorative-option1-strong | #95b1ff |  |
| `--hop-decorative-option1-surface-weak` | decorative-option1-weak | #e6ebff |  |
| `--hop-decorative-option1-surface-weak-hover` | decorative-option1-weak-hover | #d6e0ff |  |
| `--hop-decorative-option1-surface-weakest` | decorative-option1-weakest | #f5f6ff |  |
| `--hop-decorative-option1-text` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-text-weak` | decorative-option1-weak | #6c8ffd |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option2-border` | decorative-option2 | #a3d6cb |  |
| `--hop-decorative-option2-icon` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-surface` | decorative-option2 | #bde8e1 |  |
| `--hop-decorative-option2-surface-hover` | decorative-option2-hover | #a3d6cb |  |
| `--hop-decorative-option2-surface-strong` | decorative-option2-strong | #a3d6cb |  |
| `--hop-decorative-option2-surface-weak` | decorative-option2-weak | #cff4ef |  |
| `--hop-decorative-option2-surface-weak-hover` | decorative-option2-weak-hover | #bde8e1 |  |
| `--hop-decorative-option2-surface-weakest` | decorative-option2-weakest | #ddfdf9 |  |
| `--hop-decorative-option2-text` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-text-weak` | decorative-option2-weak | #5da18c |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option3-border` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-icon` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-surface` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-surface-hover` | decorative-option3-hover | #ff9b3f |  |
| `--hop-decorative-option3-surface-strong` | decorative-option3-strong | #ff9b3f |  |
| `--hop-decorative-option3-surface-weak` | decorative-option3-weak | #ffe8d3 |  |
| `--hop-decorative-option3-surface-weak-hover` | decorative-option3-weak-hover | #ffd8be |  |
| `--hop-decorative-option3-surface-weakest` | decorative-option3-weakest | #fff5e9 |  |
| `--hop-decorative-option3-text` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-text-weak` | decorative-option3-weak | #e57723 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option4-border` | decorative-option4 | #aad89d |  |
| `--hop-decorative-option4-icon` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-surface` | decorative-option4 | #cde8ac |  |
| `--hop-decorative-option4-surface-hover` | decorative-option4-hover | #aad89d |  |
| `--hop-decorative-option4-surface-strong` | decorative-option4-strong | #aad89d |  |
| `--hop-decorative-option4-surface-weak` | decorative-option4-weak | #e3f3b9 |  |
| `--hop-decorative-option4-surface-weak-hover` | decorative-option4-weak-hover | #cde8ac |  |
| `--hop-decorative-option4-surface-weakest` | decorative-option4-weakest | #f4f9e9 |  |
| `--hop-decorative-option4-text` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-text-weak` | decorative-option4-weak | #188a71 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option5-border` | decorative-option5 | #9fd2f7 |  |
| `--hop-decorative-option5-icon` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-surface` | decorative-option5 | #bae6ff |  |
| `--hop-decorative-option5-surface-hover` | decorative-option5-hover | #9fd2f7 |  |
| `--hop-decorative-option5-surface-strong` | decorative-option5-strong | #9fd2f7 |  |
| `--hop-decorative-option5-surface-weak` | decorative-option5-weak | #d9efff |  |
| `--hop-decorative-option5-surface-weak-hover` | decorative-option5-weak-hover | #bae6ff |  |
| `--hop-decorative-option5-surface-weakest` | decorative-option5-weakest | #f0f8ff |  |
| `--hop-decorative-option5-text` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-text-weak` | decorative-option5-weak | #5d9acd |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option6-border` | decorative-option6 | #eac96d |  |
| `--hop-decorative-option6-icon` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-surface` | decorative-option6 | #f7e694 |  |
| `--hop-decorative-option6-surface-hover` | decorative-option6-hover | #eac96d |  |
| `--hop-decorative-option6-surface-strong` | decorative-option6-strong | #eac96d |  |
| `--hop-decorative-option6-surface-weak` | decorative-option6-weak | #fff2b8 |  |
| `--hop-decorative-option6-surface-weak-hover` | decorative-option6-weak-hover | #f7e694 |  |
| `--hop-decorative-option6-surface-weakest` | decorative-option6-weakest | #fff8d6 |  |
| `--hop-decorative-option6-text` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-text-weak` | decorative-option6-weak | #e2a934 |  |

#### [Option 7](https://hopper.workleap.design/tokens/semantic/color\#option-7)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option7-border` | decorative-option7 | #d4cbc0 |  |
| `--hop-decorative-option7-icon` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-surface` | decorative-option7 | #e5ded6 |  |
| `--hop-decorative-option7-surface-hover` | decorative-option7-hover | #d4cbc0 |  |
| `--hop-decorative-option7-surface-strong` | decorative-option7-strong | #d4cbc0 |  |
| `--hop-decorative-option7-surface-weak` | decorative-option7-weak | #f0eae3 |  |
| `--hop-decorative-option7-surface-weak-hover` | decorative-option7-weak-hover | #e5ded6 |  |
| `--hop-decorative-option7-surface-weakest` | decorative-option7-weakest | #fef6ef |  |
| `--hop-decorative-option7-text` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-text-weak` | decorative-option7-weak | #776a59 |  |

#### [Option 8](https://hopper.workleap.design/tokens/semantic/color\#option-8)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option8-border` | decorative-option8 | #ffbcb7 |  |
| `--hop-decorative-option8-icon` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-surface` | decorative-option8 | #ffd6d3 |  |
| `--hop-decorative-option8-surface-hover` | decorative-option8-hover | #ff8e8e |  |
| `--hop-decorative-option8-surface-strong` | decorative-option8-strong | #ffbcb7 |  |
| `--hop-decorative-option8-surface-weak` | decorative-option8-weak | #fde6e5 |  |
| `--hop-decorative-option8-surface-weak-hover` | decorative-option8-weak-hover | #ffd6d3 |  |
| `--hop-decorative-option8-surface-weakest` | decorative-option8-weakest | #fdf6f6 |  |
| `--hop-decorative-option8-text` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-text-weak` | decorative-option8-weak | #fa4d59 |  |

#### [Option 9](https://hopper.workleap.design/tokens/semantic/color\#option-9)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option9-border` | decorative-option9 | #ccccca |  |
| `--hop-decorative-option9-icon` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-surface` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-surface-hover` | decorative-option9-hover | #6c6c6b |  |
| `--hop-decorative-option9-surface-strong` | decorative-option9-strong | #3c3c3c |  |
| `--hop-decorative-option9-surface-weak` | decorative-option9-weak | #959593 |  |
| `--hop-decorative-option9-surface-weak-hover` | decorative-option9-weak-hover | #777775 |  |
| `--hop-decorative-option9-surface-weakest` | decorative-option9-weakest | #b3b3b1 |  |
| `--hop-decorative-option9-text` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-text-weak` | decorative-option9-weak | #959593 |  |

### [Status](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-status)

#### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-neutral-border` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-border-disabled` | status-neutral-disabled | #ecebe8 |  |
| `--hop-status-neutral-border-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-border-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-border-selected` | status-neutral-selected | #3c3c3c |  |
| `--hop-status-neutral-icon` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-icon-disabled` | status-neutral-disabled | #959593 |  |
| `--hop-status-neutral-icon-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-icon-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-icon-selected` | status-neutral-selected | #ffffff |  |
| `--hop-status-neutral-surface` | status-neutral | #ffffff |  |
| `--hop-status-neutral-surface-disabled` | status-neutral-disabled | #ecebe8 |  |
| `--hop-status-neutral-surface-hover` | status-neutral-hover | #f8f6f3 |  |
| `--hop-status-neutral-surface-press` | status-neutral-press | #ecebe8 |  |
| `--hop-status-neutral-surface-selected` | status-neutral-selected | #3c3c3c |  |
| `--hop-status-neutral-surface-strong` | status-neutral-strong | #b3b3b1 |  |
| `--hop-status-neutral-text` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-text-disabled` | status-neutral-disabled | #959593 |  |
| `--hop-status-neutral-text-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-text-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-text-selected` | status-neutral-selected | #ffffff |  |

#### [Progress](https://hopper.workleap.design/tokens/semantic/color\#progress)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-progress-border` | status-progress | #6c8ffd |  |
| `--hop-status-progress-border-disabled` | status-progress-disabled | #e6ebff |  |
| `--hop-status-progress-border-hover` | status-progress-hover | #4767fe |  |
| `--hop-status-progress-border-press` | status-progress-press | #3b57ff |  |
| `--hop-status-progress-border-selected` | status-progress-selected | #4767fe |  |
| `--hop-status-progress-icon` | status-progress | #2a43e8 |  |
| `--hop-status-progress-icon-disabled` | status-progress-disabled | #95b1ff |  |
| `--hop-status-progress-icon-hover` | status-progress-hover | #2040c7 |  |
| `--hop-status-progress-icon-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-icon-selected` | status-progress-selected | #3b57ff |  |
| `--hop-status-progress-surface` | status-progress | #e6ebff |  |
| `--hop-status-progress-surface-disabled` | status-progress-disabled | #f5f6ff |  |
| `--hop-status-progress-surface-hover` | status-progress-hover | #d6e0ff |  |
| `--hop-status-progress-surface-press` | status-progress-press | #b9cbff |  |
| `--hop-status-progress-surface-selected` | status-progress-selected | #e6ebff |  |
| `--hop-status-progress-surface-strong` | status-progress-strong | #95b1ff |  |
| `--hop-status-progress-text` | status-progress | #2a43e8 |  |
| `--hop-status-progress-text-disabled` | status-progress-disabled | #95b1ff |  |
| `--hop-status-progress-text-hover` | status-progress-hover | #2040c7 |  |
| `--hop-status-progress-text-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-text-selected` | status-progress-selected | #3b57ff |  |

#### [Positive](https://hopper.workleap.design/tokens/semantic/color\#positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-positive-border` | status-positive | #47a584 |  |
| `--hop-status-positive-border-disabled` | status-positive-disabled | #e3f3b9 |  |
| `--hop-status-positive-border-hover` | status-positive-hover | #188a71 |  |
| `--hop-status-positive-border-press` | status-positive-press | #0c796b |  |
| `--hop-status-positive-border-selected` | status-positive-selected | #115a52 |  |
| `--hop-status-positive-icon` | status-positive | #0a6f64 |  |
| `--hop-status-positive-icon-disabled` | status-positive-disabled | #7dc291 |  |
| `--hop-status-positive-icon-hover` | status-positive-hover | #115a52 |  |
| `--hop-status-positive-icon-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-icon-selected` | status-positive-selected | #115a52 |  |
| `--hop-status-positive-surface` | status-positive | #e3f3b9 |  |
| `--hop-status-positive-surface-disabled` | status-positive-disabled | #f4f9e9 |  |
| `--hop-status-positive-surface-hover` | status-positive-hover | #cde8ac |  |
| `--hop-status-positive-surface-press` | status-positive-press | #aad89d |  |
| `--hop-status-positive-surface-selected` | status-positive-selected | #e3f3b9 |  |
| `--hop-status-positive-surface-strong` | status-positive-strong | #7dc291 |  |
| `--hop-status-positive-text` | status-positive | #0a6f64 |  |
| `--hop-status-positive-text-disabled` | status-positive-disabled | #7dc291 |  |
| `--hop-status-positive-text-hover` | status-positive-hover | #115a52 |  |
| `--hop-status-positive-text-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-text-selected` | status-positive-selected | #115a52 |  |

#### [Caution](https://hopper.workleap.design/tokens/semantic/color\#caution)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-caution-border` | status-caution | #e57723 |  |
| `--hop-status-caution-border-disabled` | status-caution-disabled | #ffe8d3 |  |
| `--hop-status-caution-border-hover` | status-caution-hover | #c95109 |  |
| `--hop-status-caution-border-press` | status-caution-press | #ba4705 |  |
| `--hop-status-caution-border-selected` | status-caution-selected | #8c3504 |  |
| `--hop-status-caution-icon` | status-caution | #ab4104 |  |
| `--hop-status-caution-icon-disabled` | status-caution-disabled | #ff9b3f |  |
| `--hop-status-caution-icon-hover` | status-caution-hover | #8c3504 |  |
| `--hop-status-caution-icon-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-icon-selected` | status-caution-selected | #8c3504 |  |
| `--hop-status-caution-surface` | status-caution | #ffe8d3 |  |
| `--hop-status-caution-surface-disabled` | status-caution-disabled | #fff5e9 |  |
| `--hop-status-caution-surface-hover` | status-caution-hover | #ffd8be |  |
| `--hop-status-caution-surface-press` | status-caution-press | #ffbf92 |  |
| `--hop-status-caution-surface-selected` | status-caution-selected | #ffe8d3 |  |
| `--hop-status-caution-surface-strong` | status-caution-strong | #ff9b3f |  |
| `--hop-status-caution-text` | status-caution | #ab4104 |  |
| `--hop-status-caution-text-disabled` | status-caution-disabled | #ff9b3f |  |
| `--hop-status-caution-text-hover` | status-caution-hover | #8c3504 |  |
| `--hop-status-caution-text-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-text-selected` | status-caution-selected | #8c3504 |  |

#### [Negative](https://hopper.workleap.design/tokens/semantic/color\#negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-negative-border` | status-negative | #fa4d59 |  |
| `--hop-status-negative-border-disabled` | status-negative-disabled | #fde6e5 |  |
| `--hop-status-negative-border-hover` | status-negative-hover | #df3236 |  |
| `--hop-status-negative-border-press` | status-negative-press | #cb2e31 |  |
| `--hop-status-negative-border-selected` | status-negative-selected | #952927 |  |
| `--hop-status-negative-icon` | status-negative | #ba2d2d |  |
| `--hop-status-negative-icon-disabled` | status-negative-disabled | #ff8e8e |  |
| `--hop-status-negative-icon-hover` | status-negative-hover | #952927 |  |
| `--hop-status-negative-icon-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-icon-selected` | status-negative-selected | #952927 |  |
| `--hop-status-negative-surface` | status-negative | #fde6e5 |  |
| `--hop-status-negative-surface-disabled` | status-negative-disabled | #fdf6f6 |  |
| `--hop-status-negative-surface-hover` | status-negative-hover | #ffd6d3 |  |
| `--hop-status-negative-surface-press` | status-negative-press | #ffbcb7 |  |
| `--hop-status-negative-surface-selected` | status-negative-selected | #fde6e5 |  |
| `--hop-status-negative-surface-strong` | status-negative-strong | #ff8e8e |  |
| `--hop-status-negative-text` | status-negative | #ba2d2d |  |
| `--hop-status-negative-text-disabled` | status-negative-disabled | #ff8e8e |  |
| `--hop-status-negative-text-hover` | status-negative-hover | #952927 |  |
| `--hop-status-negative-text-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-text-selected` | status-negative-selected | #952927 |  |

#### [Inactive](https://hopper.workleap.design/tokens/semantic/color\#inactive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-inactive-border` | status-inactive | #959593 |  |
| `--hop-status-inactive-border-disabled` | status-inactive-disabled | #ecebe8 |  |
| `--hop-status-inactive-border-hover` | status-inactive-hover | #777775 |  |
| `--hop-status-inactive-border-press` | status-inactive-press | #6c6c6b |  |
| `--hop-status-inactive-border-selected` | status-inactive-selected | #505050 |  |
| `--hop-status-inactive-icon` | status-inactive | #636362 |  |
| `--hop-status-inactive-icon-disabled` | status-inactive-disabled | #b3b3b1 |  |
| `--hop-status-inactive-icon-hover` | status-inactive-hover | #505050 |  |
| `--hop-status-inactive-icon-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-icon-selected` | status-inactive-selected | #505050 |  |
| `--hop-status-inactive-surface` | status-inactive | #ecebe8 |  |
| `--hop-status-inactive-surface-disabled` | status-inactive-disabled | #f8f6f3 |  |
| `--hop-status-inactive-surface-hover` | status-inactive-hover | #e0dfdd |  |
| `--hop-status-inactive-surface-press` | status-inactive-press | #ccccca |  |
| `--hop-status-inactive-surface-selected` | status-inactive-selected | #ecebe8 |  |
| `--hop-status-inactive-surface-strong` | status-inactive-strong | #ccccca |  |
| `--hop-status-inactive-text` | status-inactive | #636362 |  |
| `--hop-status-inactive-text-disabled` | status-inactive-disabled | #b3b3b1 |  |
| `--hop-status-inactive-text-hover` | status-inactive-hover | #505050 |  |
| `--hop-status-inactive-text-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-text-selected` | status-inactive-selected | #505050 |  |

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option1-border` | status-option1 | #5d9acd |  |
| `--hop-status-option1-border-disabled` | status-option1-disabled | #d9efff |  |
| `--hop-status-option1-border-hover` | status-option1-hover | #3a7bb2 |  |
| `--hop-status-option1-border-press` | status-option1-press | #2e70a8 |  |
| `--hop-status-option1-border-selected` | status-option1-selected | #0a538b |  |
| `--hop-status-option1-icon` | status-option1 | #23669f |  |
| `--hop-status-option1-icon-disabled` | status-option1-disabled | #81b9e4 |  |
| `--hop-status-option1-icon-hover` | status-option1-hover | #0a538b |  |
| `--hop-status-option1-icon-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-icon-selected` | status-option1-selected | #0a538b |  |
| `--hop-status-option1-surface` | status-option1 | #d9efff |  |
| `--hop-status-option1-surface-disabled` | status-option1-disabled | #f0f8ff |  |
| `--hop-status-option1-surface-hover` | status-option1-hover | #bae6ff |  |
| `--hop-status-option1-surface-press` | status-option1-press | #9fd2f7 |  |
| `--hop-status-option1-surface-selected` | status-option1-selected | #d9efff |  |
| `--hop-status-option1-surface-strong` | status-option1-strong | #81b9e4 |  |
| `--hop-status-option1-text` | status-option1 | #23669f |  |
| `--hop-status-option1-text-disabled` | status-option1-disabled | #81b9e4 |  |
| `--hop-status-option1-text-hover` | status-option1-hover | #0a538b |  |
| `--hop-status-option1-text-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-text-selected` | status-option1-selected | #0a538b |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option2-border` | status-option2 | #8d91dc |  |
| `--hop-status-option2-border-disabled` | status-option2-disabled | #eae9fb |  |
| `--hop-status-option2-border-hover` | status-option2-hover | #6b6ecc |  |
| `--hop-status-option2-border-press` | status-option2-press | #5f61c5 |  |
| `--hop-status-option2-border-selected` | status-option2-selected | #433fac |  |
| `--hop-status-option2-icon` | status-option2 | #5454be |  |
| `--hop-status-option2-icon-disabled` | status-option2-disabled | #aeb3e8 |  |
| `--hop-status-option2-icon-hover` | status-option2-hover | #433fac |  |
| `--hop-status-option2-icon-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-icon-selected` | status-option2-selected | #433fac |  |
| `--hop-status-option2-surface` | status-option2 | #eae9fb |  |
| `--hop-status-option2-surface-disabled` | status-option2-disabled | #f6f5ff |  |
| `--hop-status-option2-surface-hover` | status-option2-hover | #ddddf7 |  |
| `--hop-status-option2-surface-press` | status-option2-press | #c8caf0 |  |
| `--hop-status-option2-surface-selected` | status-option2-selected | #eae9fb |  |
| `--hop-status-option2-surface-strong` | status-option2-strong | #aeb3e8 |  |
| `--hop-status-option2-text` | status-option2 | #5454be |  |
| `--hop-status-option2-text-disabled` | status-option2-disabled | #aeb3e8 |  |
| `--hop-status-option2-text-hover` | status-option2-hover | #433fac |  |
| `--hop-status-option2-text-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-text-selected` | status-option2-selected | #433fac |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option3-border` | status-option3 | #5da18c |  |
| `--hop-status-option3-border-disabled` | status-option3-disabled | #cff4ef |  |
| `--hop-status-option3-border-hover` | status-option3-hover | #38836a |  |
| `--hop-status-option3-border-press` | status-option3-press | #2b795e |  |
| `--hop-status-option3-border-selected` | status-option3-selected | #cff4ef |  |
| `--hop-status-option3-icon` | status-option3 | #206f54 |  |
| `--hop-status-option3-icon-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-icon-hover` | status-option3-hover | #055c41 |  |
| `--hop-status-option3-icon-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-icon-selected` | status-option3-selected | #055c41 |  |
| `--hop-status-option3-surface` | status-option3 | #cff4ef |  |
| `--hop-status-option3-surface-disabled` | status-option3-disabled | #ddfdf9 |  |
| `--hop-status-option3-surface-hover` | status-option3-hover | #bde8e1 |  |
| `--hop-status-option3-surface-press` | status-option3-press | #a3d6cb |  |
| `--hop-status-option3-surface-selected` | status-option3-selected | #055c41 |  |
| `--hop-status-option3-surface-strong` | status-option3-strong | #83beaf |  |
| `--hop-status-option3-text` | status-option3 | #206f54 |  |
| `--hop-status-option3-text-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-text-hover` | status-option3-hover | #055c41 |  |
| `--hop-status-option3-text-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-text-selected` | status-option3-selected | #055c41 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option4-border` | status-option4 | #7c9aa3 |  |
| `--hop-status-option4-border-disabled` | status-option4-disabled | #e1eef1 |  |
| `--hop-status-option4-border-hover` | status-option4-hover | #5e7b84 |  |
| `--hop-status-option4-border-press` | status-option4-press | #557079 |  |
| `--hop-status-option4-border-selected` | status-option4-selected | #40535a |  |
| `--hop-status-option4-icon` | status-option4 | #4e6770 |  |
| `--hop-status-option4-icon-disabled` | status-option4-disabled | #9cb7be |  |
| `--hop-status-option4-icon-hover` | status-option4-hover | #40535a |  |
| `--hop-status-option4-icon-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-icon-selected` | status-option4-selected | #40535a |  |
| `--hop-status-option4-surface` | status-option4 | #e1eef1 |  |
| `--hop-status-option4-surface-disabled` | status-option4-disabled | #f2f8fa |  |
| `--hop-status-option4-surface-hover` | status-option4-hover | #d2e3e7 |  |
| `--hop-status-option4-surface-press` | status-option4-press | #bad0d5 |  |
| `--hop-status-option4-surface-selected` | status-option4-selected | #e1eef1 |  |
| `--hop-status-option4-surface-strong` | status-option4-strong | #9cb7be |  |
| `--hop-status-option4-text` | status-option4 | #4e6770 |  |
| `--hop-status-option4-text-disabled` | status-option4-disabled | #9cb7be |  |
| `--hop-status-option4-text-hover` | status-option4-hover | #40535a |  |
| `--hop-status-option4-text-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-text-selected` | status-option4-selected | #40535a |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option5-border` | status-option5 | #a19382 |  |
| `--hop-status-option5-border-disabled` | status-option5-disabled | #f0eae3 |  |
| `--hop-status-option5-border-hover` | status-option5-hover | #837463 |  |
| `--hop-status-option5-border-press` | status-option5-press | #776a59 |  |
| `--hop-status-option5-border-selected` | status-option5-selected | #594f41 |  |
| `--hop-status-option5-icon` | status-option5 | #6e6151 |  |
| `--hop-status-option5-icon-disabled` | status-option5-disabled | #bdb1a3 |  |
| `--hop-status-option5-icon-hover` | status-option5-hover | #594f41 |  |
| `--hop-status-option5-icon-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-icon-selected` | status-option5-selected | #594f41 |  |
| `--hop-status-option5-surface` | status-option5 | #f0eae3 |  |
| `--hop-status-option5-surface-disabled` | status-option5-disabled | #fef6ef |  |
| `--hop-status-option5-surface-hover` | status-option5-hover | #e5ded6 |  |
| `--hop-status-option5-surface-press` | status-option5-press | #d4cbc0 |  |
| `--hop-status-option5-surface-selected` | status-option5-selected | #f0eae3 |  |
| `--hop-status-option5-surface-strong` | status-option5-strong | #bdb1a3 |  |
| `--hop-status-option5-text` | status-option5 | #6e6151 |  |
| `--hop-status-option5-text-disabled` | status-option5-disabled | #bdb1a3 |  |
| `--hop-status-option5-text-hover` | status-option5-hover | #594f41 |  |
| `--hop-status-option5-text-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-text-selected` | status-option5-selected | #594f41 |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option6-border` | status-option6 | #c28b12 |  |
| `--hop-status-option6-border-disabled` | status-option6-disabled | #fff2b8 |  |
| `--hop-status-option6-border-hover` | status-option6-hover | #996f08 |  |
| `--hop-status-option6-border-press` | status-option6-press | #8b6609 |  |
| `--hop-status-option6-border-selected` | status-option6-selected | #654c0d |  |
| `--hop-status-option6-icon` | status-option6 | #7e5e0a |  |
| `--hop-status-option6-icon-disabled` | status-option6-disabled | #e2a934 |  |
| `--hop-status-option6-icon-hover` | status-option6-hover | #654c0d |  |
| `--hop-status-option6-icon-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-icon-selected` | status-option6-selected | #654c0d |  |
| `--hop-status-option6-surface` | status-option6 | #fff8d6 |  |
| `--hop-status-option6-surface-disabled` | status-option6-disabled | #fff8d6 |  |
| `--hop-status-option6-surface-hover` | status-option6-hover | #fff2b8 |  |
| `--hop-status-option6-surface-press` | status-option6-press | #eac96d |  |
| `--hop-status-option6-surface-selected` | status-option6-selected | #fff2b8 |  |
| `--hop-status-option6-surface-strong` | status-option6-strong | #e2a934 |  |
| `--hop-status-option6-text` | status-option6 | #7e5e0a |  |
| `--hop-status-option6-text-disabled` | status-option6-disabled | #e2a934 |  |
| `--hop-status-option6-text-hover` | status-option6-hover | #654c0d |  |
| `--hop-status-option6-text-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-text-selected` | status-option6-selected | #654c0d |  |

### [Data Visualization](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-data-visualization)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-unavailable` | dataviz\_unavailable | #e0dfdd |  |
| `--hop-dataviz-unavailable-weak` | dataviz\_unavailable-weak | #ecebe8 |  |
| `--hop-dataviz-unavailable-strong` | dataviz\_unavailable-strong | #ccccca |  |
| `--hop-dataviz-text-onlight` | dataviz\_onlight | #3c3c3c |  |
| `--hop-dataviz-text-ondark` | dataviz\_ondark | #ffffff |  |

#### [Monochromatic - Primary](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-primary-25` | dataviz\_monochromatic-primary-25 | #f5f6ff |  |
| `--hop-dataviz-monochromatic-primary-50` | dataviz\_monochromatic-primary-50 | #e6ebff |  |
| `--hop-dataviz-monochromatic-primary-75` | dataviz\_monochromatic-primary-75 | #d6e0ff |  |
| `--hop-dataviz-monochromatic-primary-100` | dataviz\_monochromatic-primary-100 | #b9cbff |  |
| `--hop-dataviz-monochromatic-primary-200` | dataviz\_monochromatic-primary-200 | #95b1ff |  |
| `--hop-dataviz-monochromatic-primary-300` | dataviz\_monochromatic-primary-300 | #6c8ffd |  |
| `--hop-dataviz-monochromatic-primary-400` | dataviz\_monochromatic-primary-400 | #4767fe |  |
| `--hop-dataviz-monochromatic-primary-500` | dataviz\_monochromatic-primary-500 | #3b57ff |  |
| `--hop-dataviz-monochromatic-primary-600` | dataviz\_monochromatic-primary-600 | #2a43e8 |  |
| `--hop-dataviz-monochromatic-primary-700` | dataviz\_monochromatic-primary-700 | #2040c7 |  |
| `--hop-dataviz-monochromatic-primary-800` | dataviz\_monochromatic-primary-800 | #1b3587 |  |
| `--hop-dataviz-monochromatic-primary-900` | dataviz\_monochromatic-primary-900 | #152450 |  |
| `--hop-dataviz-monochromatic-primary-25-hover` | dataviz\_monochromatic-primary-25-hover | #e6ebff |  |
| `--hop-dataviz-monochromatic-primary-50-hover` | dataviz\_monochromatic-primary-50-hover | #d6e0ff |  |
| `--hop-dataviz-monochromatic-primary-75-hover` | dataviz\_monochromatic-primary-75-hover | #b9cbff |  |
| `--hop-dataviz-monochromatic-primary-100-hover` | dataviz\_monochromatic-primary-100-hover | #95b1ff |  |
| `--hop-dataviz-monochromatic-primary-200-hover` | dataviz\_monochromatic-primary-200-hover | #6c8ffd |  |
| `--hop-dataviz-monochromatic-primary-300-hover` | dataviz\_monochromatic-primary-300-hover | #4767fe |  |
| `--hop-dataviz-monochromatic-primary-400-hover` | dataviz\_monochromatic-primary-400-hover | #3b57ff |  |
| `--hop-dataviz-monochromatic-primary-500-hover` | dataviz\_monochromatic-primary-500-hover | #2a43e8 |  |
| `--hop-dataviz-monochromatic-primary-600-hover` | dataviz\_monochromatic-primary-600-hover | #2040c7 |  |
| `--hop-dataviz-monochromatic-primary-700-hover` | dataviz\_monochromatic-primary-700-hover | #1b3587 |  |
| `--hop-dataviz-monochromatic-primary-800-hover` | dataviz\_monochromatic-primary-800-hover | #152450 |  |
| `--hop-dataviz-monochromatic-primary-900-hover` | dataviz\_monochromatic-primary-900-hover | #0b173a |  |

#### [Monochromatic - Positive](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-positive-25` | dataviz\_monochromatic-positive-25 | #f4f9e9 |  |
| `--hop-dataviz-monochromatic-positive-50` | dataviz\_monochromatic-positive-50 | #e3f3b9 |  |
| `--hop-dataviz-monochromatic-positive-75` | dataviz\_monochromatic-positive-75 | #cde8ac |  |
| `--hop-dataviz-monochromatic-positive-100` | dataviz\_monochromatic-positive-100 | #aad89d |  |
| `--hop-dataviz-monochromatic-positive-200` | dataviz\_monochromatic-positive-200 | #7dc291 |  |
| `--hop-dataviz-monochromatic-positive-300` | dataviz\_monochromatic-positive-300 | #47a584 |  |
| `--hop-dataviz-monochromatic-positive-400` | dataviz\_monochromatic-positive-400 | #188a71 |  |
| `--hop-dataviz-monochromatic-positive-500` | dataviz\_monochromatic-positive-500 | #0c796b |  |
| `--hop-dataviz-monochromatic-positive-600` | dataviz\_monochromatic-positive-600 | #0a6f64 |  |
| `--hop-dataviz-monochromatic-positive-700` | dataviz\_monochromatic-positive-700 | #115a52 |  |
| `--hop-dataviz-monochromatic-positive-800` | dataviz\_monochromatic-positive-800 | #16433d |  |
| `--hop-dataviz-monochromatic-positive-900` | dataviz\_monochromatic-positive-900 | #132a27 |  |
| `--hop-dataviz-monochromatic-positive-25-hover` | dataviz\_monochromatic-positive-25-hover | #e3f3b9 |  |
| `--hop-dataviz-monochromatic-positive-50-hover` | dataviz\_monochromatic-positive-50-hover | #cde8ac |  |
| `--hop-dataviz-monochromatic-positive-75-hover` | dataviz\_monochromatic-positive-75-hover | #aad89d |  |
| `--hop-dataviz-monochromatic-positive-100-hover` | dataviz\_monochromatic-positive-100-hover | #7dc291 |  |
| `--hop-dataviz-monochromatic-positive-200-hover` | dataviz\_monochromatic-positive-200-hover | #47a584 |  |
| `--hop-dataviz-monochromatic-positive-300-hover` | dataviz\_monochromatic-positive-300-hover | #188a71 |  |
| `--hop-dataviz-monochromatic-positive-400-hover` | dataviz\_monochromatic-positive-400-hover | #0c796b |  |
| `--hop-dataviz-monochromatic-positive-500-hover` | dataviz\_monochromatic-positive-500-hover | #0a6f64 |  |
| `--hop-dataviz-monochromatic-positive-600-hover` | dataviz\_monochromatic-positive-600-hover | #115a52 |  |
| `--hop-dataviz-monochromatic-positive-700-hover` | dataviz\_monochromatic-positive-700-hover | #16433d |  |
| `--hop-dataviz-monochromatic-positive-800-hover` | dataviz\_monochromatic-positive-800-hover | #132a27 |  |
| `--hop-dataviz-monochromatic-positive-900-hover` | dataviz\_monochromatic-positive-900-hover | #0a1716 |  |

#### [Monochromatic - Negative](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-negative-25` | dataviz\_monochromatic-negative-25 | #fdf6f6 |  |
| `--hop-dataviz-monochromatic-negative-50` | dataviz\_monochromatic-negative-50 | #fde6e5 |  |
| `--hop-dataviz-monochromatic-negative-75` | dataviz\_monochromatic-negative-75 | #ffd6d3 |  |
| `--hop-dataviz-monochromatic-negative-100` | dataviz\_monochromatic-negative-100 | #ffbcb7 |  |
| `--hop-dataviz-monochromatic-negative-200` | dataviz\_monochromatic-negative-200 | #ff8e8e |  |
| `--hop-dataviz-monochromatic-negative-300` | dataviz\_monochromatic-negative-300 | #f56263 |  |
| `--hop-dataviz-monochromatic-negative-400` | dataviz\_monochromatic-negative-400 | #df3236 |  |
| `--hop-dataviz-monochromatic-negative-500` | dataviz\_monochromatic-negative-500 | #cb2e31 |  |
| `--hop-dataviz-monochromatic-negative-600` | dataviz\_monochromatic-negative-600 | #ba2d2d |  |
| `--hop-dataviz-monochromatic-negative-700` | dataviz\_monochromatic-negative-700 | #952927 |  |
| `--hop-dataviz-monochromatic-negative-800` | dataviz\_monochromatic-negative-800 | #6c2320 |  |
| `--hop-dataviz-monochromatic-negative-900` | dataviz\_monochromatic-negative-900 | #431a17 |  |
| `--hop-dataviz-monochromatic-negative-25-hover` | dataviz\_monochromatic-negative-25-hover | #fde6e5 |  |
| `--hop-dataviz-monochromatic-negative-50-hover` | dataviz\_monochromatic-negative-50-hover | #ffd6d3 |  |
| `--hop-dataviz-monochromatic-negative-75-hover` | dataviz\_monochromatic-negative-75-hover | #ffbcb7 |  |
| `--hop-dataviz-monochromatic-negative-100-hover` | dataviz\_monochromatic-negative-100-hover | #ff8e8e |  |
| `--hop-dataviz-monochromatic-negative-200-hover` | dataviz\_monochromatic-negative-200-hover | #f56263 |  |
| `--hop-dataviz-monochromatic-negative-300-hover` | dataviz\_monochromatic-negative-300-hover | #df3236 |  |
| `--hop-dataviz-monochromatic-negative-400-hover` | dataviz\_monochromatic-negative-400-hover | #cb2e31 |  |
| `--hop-dataviz-monochromatic-negative-500-hover` | dataviz\_monochromatic-negative-500-hover | #ba2d2d |  |
| `--hop-dataviz-monochromatic-negative-600-hover` | dataviz\_monochromatic-negative-600-hover | #952927 |  |
| `--hop-dataviz-monochromatic-negative-700-hover` | dataviz\_monochromatic-negative-700-hover | #6c2320 |  |
| `--hop-dataviz-monochromatic-negative-800-hover` | dataviz\_monochromatic-negative-800-hover | #431a17 |  |
| `--hop-dataviz-monochromatic-negative-900-hover` | dataviz\_monochromatic-negative-900-hover | #2d100d |  |

#### [Diverging Sequence 1](https://hopper.workleap.design/tokens/semantic/color\#diverging-sequence-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-diverging-sequence-1-positive9` | dataviz\_diverging-sequence-1-positive9 | #16433d |  |
| `--hop-dataviz-diverging-sequence-1-positive9-hover` | dataviz\_diverging-sequence-1-positive9-hover | #132a27 |  |
| `--hop-dataviz-diverging-sequence-1-positive8` | dataviz\_diverging-sequence-1-positive8 | #115a52 |  |
| `--hop-dataviz-diverging-sequence-1-positive8-hover` | dataviz\_diverging-sequence-1-positive8-hover | #16433d |  |
| `--hop-dataviz-diverging-sequence-1-positive7` | dataviz\_diverging-sequence-1-positive7 | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-1-positive7-hover` | dataviz\_diverging-sequence-1-positive7-hover | #115a52 |  |
| `--hop-dataviz-diverging-sequence-1-positive6` | dataviz\_diverging-sequence-1-positive6 | #0c796b |  |
| `--hop-dataviz-diverging-sequence-1-positive6-hover` | dataviz\_diverging-sequence-1-positive6-hover | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-1-positive5` | dataviz\_diverging-sequence-1-positive5 | #188a71 |  |
| `--hop-dataviz-diverging-sequence-1-positive5-hover` | dataviz\_diverging-sequence-1-positive5-hover | #0c796b |  |
| `--hop-dataviz-diverging-sequence-1-positive4` | dataviz\_diverging-sequence-1-positive4 | #47a584 |  |
| `--hop-dataviz-diverging-sequence-1-positive-4-hover` | dataviz\_diverging-sequence-1-positive-4-hover | #188a71 |  |
| `--hop-dataviz-diverging-sequence-1-positive3` | dataviz\_diverging-sequence-1-positive3 | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-1-positive3-hover` | dataviz\_diverging-sequence-1-positive3-hover | #47a584 |  |
| `--hop-dataviz-diverging-sequence-1-positive2` | dataviz\_diverging-sequence-1-positive2 | #aad89d |  |
| `--hop-dataviz-diverging-sequence-1-positive2-hover` | dataviz\_diverging-sequence-1-positive2-hover | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-1-positive1` | dataviz\_diverging-sequence-1-positive1 | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-1-positive1-hover` | dataviz\_diverging-sequence-1-positive1-hover | #aad89d |  |
| `--hop-dataviz-diverging-sequence-1-neutral` | dataviz\_diverging-sequence-1-neutral | #f7e694 |  |
| `--hop-dataviz-diverging-sequence-1-neutral-hover` | dataviz\_diverging-sequence-1-neutral-hover | #eac96d |  |
| `--hop-dataviz-diverging-sequence-1-negative1` | dataviz\_diverging-sequence-1-negative1 | #ffd8be |  |
| `--hop-dataviz-diverging-sequence-1-negative1-hover` | dataviz\_diverging-sequence-1-negative1-hover | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-1-negative2` | dataviz\_diverging-sequence-1-negative2 | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-1-negative2-hover` | dataviz\_diverging-sequence-1-negative2-hover | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-1-negative3` | dataviz\_diverging-sequence-1-negative3 | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-1-negative3-hover` | dataviz\_diverging-sequence-1-negative3-hover | #f56263 |  |
| `--hop-dataviz-diverging-sequence-1-negative4` | dataviz\_diverging-sequence-1-negative4 | #f56263 |  |
| `--hop-dataviz-diverging-sequence-1-negative4-hover` | dataviz\_diverging-sequence-1-negative4-hover | #df3236 |  |
| `--hop-dataviz-diverging-sequence-1-negative5` | dataviz\_diverging-sequence-1-negative5 | #df3236 |  |
| `--hop-dataviz-diverging-sequence-1-negative5-hover` | dataviz\_diverging-sequence-1-negative5-hover | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-1-negative6` | dataviz\_diverging-sequence-1-negative6 | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-1-negative6-hover` | dataviz\_diverging-sequence-1-negative6-hover | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-1-negative7` | dataviz\_diverging-sequence-1-negative7 | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-1-negative7-hover` | dataviz\_diverging-sequence-1-negative7-hover | #952927 |  |
| `--hop-dataviz-diverging-sequence-1-negative8` | dataviz\_diverging-sequence-1-negative8 | #952927 |  |
| `--hop-dataviz-diverging-sequence-1-negative8-hover` | dataviz\_diverging-sequence-1-negative8-hover | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-1-negative9` | dataviz\_diverging-sequence-1-negative9 | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-1-negative9-hover` | dataviz\_diverging-sequence-1-negative9-hover | #431a17 |  |

#### [Diverging Sequence 2](https://hopper.workleap.design/tokens/semantic/color\#diverging-sequence-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-diverging-sequence-2-positive10` | dataviz\_diverging-sequence-2-positive10 | #16433d |  |
| `--hop-dataviz-diverging-sequence-2-positive10-hover` | dataviz\_diverging-sequence-2-positive10-hover | #132a27 |  |
| `--hop-dataviz-diverging-sequence-2-positive9` | dataviz\_diverging-sequence-2-positive9 | #115a52 |  |
| `--hop-dataviz-diverging-sequence-2-positive9-hover` | dataviz\_diverging-sequence-2-positive9-hover | #16433d |  |
| `--hop-dataviz-diverging-sequence-2-positive8` | dataviz\_diverging-sequence-2-positive8 | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-2-positive8-hover` | dataviz\_diverging-sequence-2-positive8-hover | #115a52 |  |
| `--hop-dataviz-diverging-sequence-2-positive7` | dataviz\_diverging-sequence-2-positive7 | #0c796b |  |
| `--hop-dataviz-diverging-sequence-2-positive7-hover` | dataviz\_diverging-sequence-2-positive7-hover | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-2-positive6` | dataviz\_diverging-sequence-2-positive6 | #188a71 |  |
| `--hop-dataviz-diverging-sequence-2-positive6-hover` | dataviz\_diverging-sequence-2-positive6-hover | #0c796b |  |
| `--hop-dataviz-diverging-sequence-2-positive5` | dataviz\_diverging-sequence-2-positive5 | #47a584 |  |
| `--hop-dataviz-diverging-sequence-2-positive5-hover` | dataviz\_diverging-sequence-2-positive5-hover | #188a71 |  |
| `--hop-dataviz-diverging-sequence-2-positive4` | dataviz\_diverging-sequence-2-positive4 | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-2-positive4-hover` | dataviz\_diverging-sequence-2-positive4-hover | #47a584 |  |
| `--hop-dataviz-diverging-sequence-2-positive3` | dataviz\_diverging-sequence-2-positive3 | #aad89d |  |
| `--hop-dataviz-diverging-sequence-2-positive3-hover` | dataviz\_diverging-sequence-2-positive3-hover | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-2-positive2` | dataviz\_diverging-sequence-2-positive2 | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-2-positive2-hover` | dataviz\_diverging-sequence-2-positive2-hover | #aad89d |  |
| `--hop-dataviz-diverging-sequence-2-positive1` | dataviz\_diverging-sequence-2-positive1 | #e3f3b9 |  |
| `--hop-dataviz-diverging-sequence-2-positive1-hover` | dataviz\_diverging-sequence-2-positive1-hover | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-2-negative1` | dataviz\_diverging-sequence-2-negative1 | #fde6e5 |  |
| `--hop-dataviz-diverging-sequence-2-negative1-hover` | dataviz\_diverging-sequence-2-negative1-hover | #ffd6d3 |  |
| `--hop-dataviz-diverging-sequence-2-negative2` | dataviz\_diverging-sequence-2-negative2 | #ffd6d3 |  |
| `--hop-dataviz-diverging-sequence-2-negative2-hover` | dataviz\_diverging-sequence-2-negative2-hover | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-2-negative3` | dataviz\_diverging-sequence-2-negative3 | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-2-negative3-hover` | dataviz\_diverging-sequence-2-negative3-hover | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-2-negative4` | dataviz\_diverging-sequence-2-negative4 | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-2-negative4-hover` | dataviz\_diverging-sequence-2-negative4-hover | #f56263 |  |
| `--hop-dataviz-diverging-sequence-2-negative5` | dataviz\_diverging-sequence-2-negative5 | #f56263 |  |
| `--hop-dataviz-diverging-sequence-2-negative5-hover` | dataviz\_diverging-sequence-2-negative5-hover | #df3236 |  |
| `--hop-dataviz-diverging-sequence-2-negative6` | dataviz\_diverging-sequence-2-negative6 | #df3236 |  |
| `--hop-dataviz-diverging-sequence-2-negative6-hover` | dataviz\_diverging-sequence-2-negative6-hover | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-2-negative7` | dataviz\_diverging-sequence-2-negative7 | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-2-negative7-hover` | dataviz\_diverging-sequence-2-negative7-hover | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-2-negative8` | dataviz\_diverging-sequence-2-negative8 | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-2-negative8-hover` | dataviz\_diverging-sequence-2-negative8-hover | #952927 |  |
| `--hop-dataviz-diverging-sequence-2-negative9` | dataviz\_diverging-sequence-2-negative9 | #952927 |  |
| `--hop-dataviz-diverging-sequence-2-negative9-hover` | dataviz\_diverging-sequence-2-negative9-hover | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-2-negative10` | dataviz\_diverging-sequence-2-negative10 | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-2-negative10-hover` | dataviz\_diverging-sequence-2-negative10-hover | #431a17 |  |

#### [Categorical - Sequences](https://hopper.workleap.design/tokens/semantic/color\#categorical-sequences)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-sequence-category1` | dataviz\_categorical-sequence-category1 | #c7ebff |  |
| `--hop-dataviz-categorical-sequence-category1-hover` | dataviz\_categorical-sequence-category1-hover | #ade2ff |  |
| `--hop-dataviz-categorical-sequence-category2` | dataviz\_categorical-sequence-category2 | #ecd599 |  |
| `--hop-dataviz-categorical-sequence-category2-hover` | dataviz\_categorical-sequence-category2-hover | #e6c675 |  |
| `--hop-dataviz-categorical-sequence-category3` | dataviz\_categorical-sequence-category3 | #d2cdf8 |  |
| `--hop-dataviz-categorical-sequence-category3-hover` | dataviz\_categorical-sequence-category3-hover | #bfb8f5 |  |
| `--hop-dataviz-categorical-sequence-category4` | dataviz\_categorical-sequence-category4 | #b6bead |  |
| `--hop-dataviz-categorical-sequence-category4-hover` | dataviz\_categorical-sequence-category4-hover | #a4ae98 |  |
| `--hop-dataviz-categorical-sequence-category5` | dataviz\_categorical-sequence-category5 | #fbbdcf |  |
| `--hop-dataviz-categorical-sequence-category5-hover` | dataviz\_categorical-sequence-category5-hover | #f99fb8 |  |
| `--hop-dataviz-categorical-sequence-category6` | dataviz\_categorical-sequence-category6 | #bfdca9 |  |
| `--hop-dataviz-categorical-sequence-category6-hover` | dataviz\_categorical-sequence-category6-hover | #a9d08b |  |
| `--hop-dataviz-categorical-sequence-category7` | dataviz\_categorical-sequence-category7 | #fbe997 |  |
| `--hop-dataviz-categorical-sequence-category7-hover` | dataviz\_categorical-sequence-category7-hover | #fae275 |  |
| `--hop-dataviz-categorical-sequence-category8` | dataviz\_categorical-sequence-category8 | #e8ddd0 |  |
| `--hop-dataviz-categorical-sequence-category8-hover` | dataviz\_categorical-sequence-category8-hover | #ddcebb |  |
| `--hop-dataviz-categorical-sequence-category9` | dataviz\_categorical-sequence-category9 | #a7e6dc |  |
| `--hop-dataviz-categorical-sequence-category9-hover` | dataviz\_categorical-sequence-category9-hover | #90e0d2 |  |
| `--hop-dataviz-categorical-sequence-category10` | dataviz\_categorical-sequence-category10 | #aecdd5 |  |
| `--hop-dataviz-categorical-sequence-category10-hover` | dataviz\_categorical-sequence-category10-hover | #93bdc8 |  |
| `--hop-dataviz-categorical-sequence-category11` | dataviz\_categorical-sequence-category11 | #ffbf92 |  |
| `--hop-dataviz-categorical-sequence-category11-hover` | dataviz\_categorical-sequence-category11-hover | #ffac70 |  |
| `--hop-dataviz-categorical-sequence-category12` | dataviz\_categorical-sequence-category12 | #a0b8fa |  |
| `--hop-dataviz-categorical-sequence-category12-hover` | dataviz\_categorical-sequence-category12-hover | #779af8 |  |
| `--hop-dataviz-categorical-sequence-category13` | dataviz\_categorical-sequence-category13 | #69bfa0 |  |
| `--hop-dataviz-categorical-sequence-category13-hover` | dataviz\_categorical-sequence-category13-hover | #54b692 |  |

#### [Categorical - 2 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-2-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-2colorgroup-option6-category2` | dataviz\_categorical-2colorgroup-option6-category2 | #69bfa0 |  |
| `--hop-dataviz-categorical-2colorgroup-option6-category1` | dataviz\_categorical-2colorgroup-option6-category1 | #ffbf92 |  |
| `--hop-dataviz-categorical-2colorgroup-option5-category2` | dataviz\_categorical-2colorgroup-option5-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-2colorgroup-option5-category1` | dataviz\_categorical-2colorgroup-option5-category1 | #a7e6dc |  |
| `--hop-dataviz-categorical-2colorgroup-option4-category2` | dataviz\_categorical-2colorgroup-option4-category2 | #6c8ffd |  |
| `--hop-dataviz-categorical-2colorgroup-option4-category1` | dataviz\_categorical-2colorgroup-option4-category1 | #bfdca9 |  |
| `--hop-dataviz-categorical-2colorgroup-option3-category2` | dataviz\_categorical-2colorgroup-option3-category2 | #ff9b3f |  |
| `--hop-dataviz-categorical-2colorgroup-option3-category1` | dataviz\_categorical-2colorgroup-option3-category1 | #2f48ff |  |
| `--hop-dataviz-categorical-2colorgroup-option2-category2` | dataviz\_categorical-2colorgroup-option2-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-2colorgroup-option2-category1` | dataviz\_categorical-2colorgroup-option2-category1 | #fbbdcf |  |
| `--hop-dataviz-categorical-2colorgroup-option1-category2` | dataviz\_categorical-2colorgroup-option1-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-2colorgroup-option1-category1` | dataviz\_categorical-2colorgroup-option1-category1 | #b6bead |  |

#### [Categorical - 3 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-3-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-3colorgroup-option1-category1` | dataviz\_categorical-3colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-3colorgroup-option1-category2` | dataviz\_categorical-3colorgroup-option1-category2 | #d2cdf8 |  |
| `--hop-dataviz-categorical-3colorgroup-option1-category3` | dataviz\_categorical-3colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category1` | dataviz\_categorical-3colorgroup-option2-category1 | #ecd599 |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category2` | dataviz\_categorical-3colorgroup-option2-category2 | #a7e6dc |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category3` | dataviz\_categorical-3colorgroup-option2-category3 | #69bfa0 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category1` | dataviz\_categorical-3colorgroup-option3-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category2` | dataviz\_categorical-3colorgroup-option3-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category3` | dataviz\_categorical-3colorgroup-option3-category3 | #aecdd5 |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category1` | dataviz\_categorical-3colorgroup-option4-category1 | #b6bead |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category2` | dataviz\_categorical-3colorgroup-option4-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category3` | dataviz\_categorical-3colorgroup-option4-category3 | #fbbdcf |  |

#### [Categorical - 4 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-4-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-4colorgroup-option1-category1` | dataviz\_categorical-4colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category2` | dataviz\_categorical-4colorgroup-option1-category2 | #d2cdf8 |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category3` | dataviz\_categorical-4colorgroup-option1-category3 | #cde8ac |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category4` | dataviz\_categorical-4colorgroup-option1-category4 | #fbbdcf |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category1` | dataviz\_categorical-4colorgroup-option2-category1 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category2` | dataviz\_categorical-4colorgroup-option2-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category3` | dataviz\_categorical-4colorgroup-option2-category3 | #84d0b4 |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category4` | dataviz\_categorical-4colorgroup-option2-category4 | #fbe997 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category1` | dataviz\_categorical-4colorgroup-option3-category1 | #ffbf92 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category2` | dataviz\_categorical-4colorgroup-option3-category2 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category3` | dataviz\_categorical-4colorgroup-option3-category3 | #2e70a8 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category4` | dataviz\_categorical-4colorgroup-option3-category4 | #ecd599 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category1` | dataviz\_categorical-4colorgroup-option4-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category2` | dataviz\_categorical-4colorgroup-option4-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category3` | dataviz\_categorical-4colorgroup-option4-category3 | #fa4d59 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category4` | dataviz\_categorical-4colorgroup-option4-category4 | #d2cdf8 |  |

#### [Categorical - 5 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-5-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-5colorgroup-option1-category1` | dataviz\_categorical-5colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category2` | dataviz\_categorical-5colorgroup-option1-category2 | #ff9b3f |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category3` | dataviz\_categorical-5colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category4` | dataviz\_categorical-5colorgroup-option1-category4 | #ecd599 |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category5` | dataviz\_categorical-5colorgroup-option1-category5 | #69bfa0 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category1` | dataviz\_categorical-5colorgroup-option2-category1 | #ff9b3f |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category2` | dataviz\_categorical-5colorgroup-option2-category2 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category3` | dataviz\_categorical-5colorgroup-option2-category3 | #2e70a8 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category4` | dataviz\_categorical-5colorgroup-option2-category4 | #fbe997 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category5` | dataviz\_categorical-5colorgroup-option2-category5 | #c5bef6 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category1` | dataviz\_categorical-5colorgroup-option3-category1 | #d2cdf8 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category2` | dataviz\_categorical-5colorgroup-option3-category2 | #ecd599 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category3` | dataviz\_categorical-5colorgroup-option3-category3 | #aecdd5 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category4` | dataviz\_categorical-5colorgroup-option3-category4 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category5` | dataviz\_categorical-5colorgroup-option3-category5 | #ffbf92 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category1` | dataviz\_categorical-5colorgroup-option4-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category2` | dataviz\_categorical-5colorgroup-option4-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category3` | dataviz\_categorical-5colorgroup-option4-category3 | #fa4d59 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category4` | dataviz\_categorical-5colorgroup-option4-category4 | #d2cdf8 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category5` | dataviz\_categorical-5colorgroup-option4-category5 | #b6bead |  |

#### [Categorical - 6 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-6-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-6colorgroup-option1-category1` | dataviz\_categorical-6colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category2` | dataviz\_categorical-6colorgroup-option1-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category3` | dataviz\_categorical-6colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category4` | dataviz\_categorical-6colorgroup-option1-category4 | #fa4d59 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category5` | dataviz\_categorical-6colorgroup-option1-category5 | #ecd599 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category6` | dataviz\_categorical-6colorgroup-option1-category6 | #69bfa0 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category1` | dataviz\_categorical-6colorgroup-option2-category1 | #2e70a8 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category2` | dataviz\_categorical-6colorgroup-option2-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category3` | dataviz\_categorical-6colorgroup-option2-category3 | #69bfa0 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category4` | dataviz\_categorical-6colorgroup-option2-category4 | #ff9b3f |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category5` | dataviz\_categorical-6colorgroup-option2-category5 | #a7e6dc |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category6` | dataviz\_categorical-6colorgroup-option2-category6 | #d2cdf8 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category1` | dataviz\_categorical-6colorgroup-option3-category1 | #b6bead |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category2` | dataviz\_categorical-6colorgroup-option3-category2 | #aecdd5 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category3` | dataviz\_categorical-6colorgroup-option3-category3 | #e8ddd0 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category4` | dataviz\_categorical-6colorgroup-option3-category4 | #a7e6dc |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category5` | dataviz\_categorical-6colorgroup-option3-category5 | #2e70a8 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category6` | dataviz\_categorical-6colorgroup-option3-category6 | #fbbdcf |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category1` | dataviz\_categorical-6colorgroup-option4-category1 | #fbbdcf |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category2` | dataviz\_categorical-6colorgroup-option4-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category3` | dataviz\_categorical-6colorgroup-option4-category3 | #ffbf92 |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category4` | dataviz\_categorical-6colorgroup-option4-category4 | #c7ebff |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category5` | dataviz\_categorical-6colorgroup-option4-category5 | #bfdca9 |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category6` | dataviz\_categorical-6colorgroup-option4-category6 | #fbe997 |  |

## [Dark Tokens](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens)

### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-neutral-border-active` | neutral-active | #505050 |  |
| `--hop-neutral-icon-active` | neutral-active | #fef6ef |  |
| `--hop-neutral-icon-weak-active` | neutral-weak-active | #ecebe8 |  |
| `--hop-neutral-surface-active` | neutral-active | #505050 |  |
| `--hop-neutral-surface-weak-active` | neutral-weak-active | #636362 |  |
| `--hop-neutral-text-active` | neutral-active | #fef6ef |  |
| `--hop-neutral-text-weak-active` | neutral-weak-active | #ecebe8 |  |
| `--hop-neutral-border` | neutral | #6c6c6b |  |
| `--hop-neutral-border-selected` | neutral-selected | #fef6ef |  |
| `--hop-neutral-border-disabled` | neutral-disabled | #3c3c3c |  |
| `--hop-neutral-border-hover` | neutral-hover | #959593 |  |
| `--hop-neutral-border-press` | neutral-press | #b3b3b1 |  |
| `--hop-neutral-border-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-border-strong-hover` | neutral-strong-hover | #ffffff |  |
| `--hop-neutral-border-weakest` | neutral-weakest | #3c3c3c |  |
| `--hop-neutral-border-weak` | neutral-weak | #3c3c3c |  |
| `--hop-neutral-icon` | neutral | #f8f6f3 |  |
| `--hop-neutral-icon-selected` | neutral-selected | #292929 |  |
| `--hop-neutral-icon-disabled` | neutral-disabled | #6c6c6b |  |
| `--hop-neutral-icon-hover` | neutral-hover | #ecebe8 |  |
| `--hop-neutral-icon-press` | neutral-press | #fef6ef |  |
| `--hop-neutral-icon-strong` | neutral-strong | #292929 |  |
| `--hop-neutral-icon-strong-hover` | neutral-strong-hover | #292929 |  |
| `--hop-neutral-icon-weak` | neutral-weak | #b3b3b1 |  |
| `--hop-neutral-icon-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-icon-weak-press` | neutral-weak-press | #ecebe8 |  |
| `--hop-neutral-icon-weak-selected` | neutral-weak-selected | #e0dfdd |  |
| `--hop-neutral-icon-weakest` | neutral-weakest | #777775 |  |
| `--hop-neutral-surface` | neutral | #1d1d1c |  |
| `--hop-neutral-surface-selected` | neutral-selected | #fef6ef |  |
| `--hop-neutral-surface-disabled` | neutral-disabled | #505050 |  |
| `--hop-neutral-surface-hover` | neutral-hover | #3c3c3c |  |
| `--hop-neutral-surface-press` | neutral-press | #505050 |  |
| `--hop-neutral-surface-strong` | neutral-strong | #fef6ef |  |
| `--hop-neutral-surface-weakest` | neutral-weakest | #292929 |  |
| `--hop-neutral-surface-weak` | neutral-weak | #3c3c3c |  |
| `--hop-neutral-surface-weak-selected` | neutral-weak-selected | #3c3c3c |  |
| `--hop-neutral-surface-weak-hover` | neutral-weak-hover | #505050 |  |
| `--hop-neutral-surface-weak-press` | neutral-weak-press | #636362 |  |
| `--hop-neutral-surface-weakest-selected` | neutral-weakest-selected | #3c3c3c |  |
| `--hop-neutral-surface-weakest-hover` | neutral-weakest-hover | #3c3c3c |  |
| `--hop-neutral-text` | neutral | #f8f6f3 |  |
| `--hop-neutral-text-selected` | neutral-selected | #292929 |  |
| `--hop-neutral-text-disabled` | neutral-disabled | #6c6c6b |  |
| `--hop-neutral-text-hover` | neutral-hover | #ecebe8 |  |
| `--hop-neutral-text-press` | neutral-press | #fef6ef |  |
| `--hop-neutral-text-strong` | neutral-strong | #292929 |  |
| `--hop-neutral-text-weak` | neutral-weak | #b3b3b1 |  |
| `--hop-neutral-text-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-text-weak-press` | neutral-weak-press | #ecebe8 |  |
| `--hop-neutral-text-weak-selected` | neutral-weak-selected | #e0dfdd |  |
| `--hop-neutral-text-weakest` | neutral-weakest | #959593 |  |

### [Primary](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-border-active` | primary-active | #3b57ff |  |
| `--hop-primary-icon-active` | primary-active | #d6e0ff |  |
| `--hop-primary-surface-active` | primary-active | #3b57ff |  |
| `--hop-primary-surface-strong-active` | primary-strong-active | #2a43e8 |  |
| `--hop-primary-surface-weak-active` | primary-weak-active | #2a43e8 |  |
| `--hop-primary-text-active` | primary-active | #d6e0ff |  |
| `--hop-primary-border` | primary | #6c8ffd |  |
| `--hop-primary-border-selected` | primary-selected | #6c8ffd |  |
| `--hop-primary-border-focus` | primary-focus | #95b1ff |  |
| `--hop-primary-border-press` | primary-press | #3b57ff |  |
| `--hop-primary-icon` | primary | #95b1ff |  |
| `--hop-primary-icon-selected` | primary-selected | #95b1ff |  |
| `--hop-primary-icon-disabled` | primary-disabled | #2040c7 |  |
| `--hop-primary-icon-hover` | primary-hover | #6c8ffd |  |
| `--hop-primary-icon-press` | primary-press | #d6e0ff |  |
| `--hop-primary-icon-strong` | primary-strong | #ffffff |  |
| `--hop-primary-icon-strong-hover` | primary-strong-hover | #6c8ffd |  |
| `--hop-primary-surface` | primary | #95b1ff |  |
| `--hop-primary-surface-selected` | primary-selected | #1b3587 |  |
| `--hop-primary-surface-disabled` | primary-disabled | #2040c7 |  |
| `--hop-primary-surface-focus` | primary-focus | #152450 |  |
| `--hop-primary-surface-hover` | primary-hover | #4767fe |  |
| `--hop-primary-surface-press` | primary-press | #3b57ff |  |
| `--hop-primary-surface-strong` | primary-strong | #4767fe |  |
| `--hop-primary-surface-strong-selected` | primary-strong-selected | #1b3587 |  |
| `--hop-primary-surface-strong-hover` | primary-strong-hover | #3b57ff |  |
| `--hop-primary-surface-strong-press` | primary-strong-press | #2a43e8 |  |
| `--hop-primary-surface-weak` | primary-weak | #1b3587 |  |
| `--hop-primary-surface-weak-hover` | primary-weak-hover | #2040c7 |  |
| `--hop-primary-surface-weak-press` | primary-weak-press | #2a43e8 |  |
| `--hop-primary-text` | primary | #b9cbff |  |
| `--hop-primary-text-hover` | primary-hover | #95b1ff |  |
| `--hop-primary-text-press` | primary-press | #d6e0ff |  |
| `--hop-primary-text-strong` | primary-strong | #ffffff |  |
| `--hop-primary-text-strong-hover` | primary-strong-hover | #ffffff |  |
| `--hop-primary-text-selected` | primary-selected | #95b1ff |  |
| `--hop-primary-text-disabled` | primary-disabled | #2040c7 |  |

### [Success](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-success)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-success-border` | success | #0c796b |  |
| `--hop-success-icon` | success | #132a27 |  |
| `--hop-success-icon-weakest` | success-weakest | #7dc291 |  |
| `--hop-success-icon-weak` | success-weak | #cde8ac |  |
| `--hop-success-surface` | success | #cde8ac |  |
| `--hop-success-surface-strong` | success-strong | #47a584 |  |
| `--hop-success-surface-weak` | success-weak | #16433d |  |
| `--hop-success-text` | success | #132a27 |  |
| `--hop-success-text-weak` | success-weak | #cde8ac |  |
| `--hop-success-text-hover` | success-hover | #115a52 |  |

### [Warning](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-warning)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-warning-border` | warning | #ba4705 |  |
| `--hop-warning-icon` | warning | #451a02 |  |
| `--hop-warning-icon-weakest` | warning-weakest | #ff9b3f |  |
| `--hop-warning-icon-weak` | warning-weak | #ffd8be |  |
| `--hop-warning-surface` | warning | #ffd8be |  |
| `--hop-warning-surface-strong` | warning-strong | #e57723 |  |
| `--hop-warning-surface-weak` | warning-weak | #692803 |  |
| `--hop-warning-text` | warning | #451a02 |  |
| `--hop-warning-text-weak` | warning-weak | #ffd8be |  |

### [Danger](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-danger)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-danger-border-active` | danger-active | #fa4d59 |  |
| `--hop-danger-icon-active` | danger-active | #fde6e5 |  |
| `--hop-danger-icon-weak-active` | danger-weak-active | #fa4d59 |  |
| `--hop-danger-surface-active` | danger-active | #ba2d2d |  |
| `--hop-danger-surface-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-text-active` | danger-active | #fde6e5 |  |
| `--hop-danger-text-weak-active` | danger-weak-active | #fa4d59 |  |
| `--hop-danger-border` | danger | #cb2e31 |  |
| `--hop-danger-border-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-border-press` | danger-press | #df3236 |  |
| `--hop-danger-border-strong` | danger-strong | #fa4d59 |  |
| `--hop-danger-icon` | danger | #431a17 |  |
| `--hop-danger-icon-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-icon-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-icon-hover` | danger-hover | #ff8e8e |  |
| `--hop-danger-icon-press` | danger-press | #fde6e5 |  |
| `--hop-danger-icon-strong` | danger-strong | #ffffff |  |
| `--hop-danger-icon-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-icon-weak` | danger-weak | #ffbcb7 |  |
| `--hop-danger-icon-weak-hover` | danger-weak-hover | #ff8e8e |  |
| `--hop-danger-icon-weak-press` | danger-weak-press | #fa4d59 |  |
| `--hop-danger-icon-weakest` | danger-weakest | #ffbcb7 |  |
| `--hop-danger-surface` | danger | #ff8e8e |  |
| `--hop-danger-surface-selected` | danger-selected | #6c2320 |  |
| `--hop-danger-surface-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-surface-hover` | danger-hover | #fa4d59 |  |
| `--hop-danger-surface-press` | danger-press | #ba2d2d |  |
| `--hop-danger-surface-strong` | danger-strong | #df3236 |  |
| `--hop-danger-surface-strong-hover` | danger-strong-hover | #cb2e31 |  |
| `--hop-danger-surface-weak` | danger-weak | #431a17 |  |
| `--hop-danger-surface-weak-hover` | danger-weak-hover | #952927 |  |
| `--hop-danger-surface-weak-press` | danger-weak-press | #ba2d2d |  |
| `--hop-danger-text` | danger | #431a17 |  |
| `--hop-danger-text-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-text-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-text-hover` | danger-hover | #ff8e8e |  |
| `--hop-danger-text-press` | danger-press | #fde6e5 |  |
| `--hop-danger-text-strong` | danger-strong | #ffffff |  |
| `--hop-danger-text-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-text-weak` | danger-weak | #ffbcb7 |  |
| `--hop-danger-text-weak-hover` | danger-weak-hover | #ff8e8e |  |
| `--hop-danger-text-weak-press` | danger-weak-press | #fa4d59 |  |

### [Information](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-information)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-information-border` | information | #3a7bb2 |  |
| `--hop-information-icon` | information | #00274b |  |
| `--hop-information-icon-weakest` | information-weakest | #81b9e4 |  |
| `--hop-information-icon-weak` | information-weak | #5d9acd |  |
| `--hop-information-surface` | information | #bae6ff |  |
| `--hop-information-surface-strong` | information-strong | #5d9acd |  |
| `--hop-information-surface-weak` | information-weak | #003d70 |  |
| `--hop-information-text` | information | #00274b |  |
| `--hop-information-text-weak` | information-weak | #bae6ff |  |

### [Upsell](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-upsell)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-upsell-border-active` | upsell-active | #996f08 |  |
| `--hop-upsell-icon-active` | upsell-active | #2f250d |  |
| `--hop-upsell-icon-weak-active` | upsell-weak-active | #c28b12 |  |
| `--hop-upsell-surface-active` | upsell-active | #c28b12 |  |
| `--hop-upsell-surface-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-text-active` | upsell-active | #2f250d |  |
| `--hop-upsell-text-weak-active` | upsell-weak-active | #c28b12 |  |
| `--hop-upsell-border` | upsell | #e2a934 |  |
| `--hop-upsell-border-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-border-disabled` | upsell-disabled | #654c0d |  |
| `--hop-upsell-border-press` | upsell-press | #996f08 |  |
| `--hop-upsell-icon` | upsell | #654c0d |  |
| `--hop-upsell-icon-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-icon-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-icon-press` | upsell-press | #2f250d |  |
| `--hop-upsell-icon-weakest` | upsell-weakest | #eac96d |  |
| `--hop-upsell-icon-weak` | upsell-weak | #eac96d |  |
| `--hop-upsell-icon-weak-hover` | upsell-weak-hover | #e2a934 |  |
| `--hop-upsell-icon-weak-press` | upsell-weak-press | #c28b12 |  |
| `--hop-upsell-surface` | upsell | #f7e694 |  |
| `--hop-upsell-surface-selected` | upsell-selected | #4b390f |  |
| `--hop-upsell-surface-disabled` | upsell-disabled | #654c0d |  |
| `--hop-upsell-surface-hover` | upsell-hover | #eac96d |  |
| `--hop-upsell-surface-press` | upsell-press | #e2a934 |  |
| `--hop-upsell-surface-weak` | upsell-weak | #4b390f |  |
| `--hop-upsell-surface-weak-hover` | upsell-weak-hover | #654c0d |  |
| `--hop-upsell-surface-weak-press` | upsell-weak-press | #7e5e0a |  |
| `--hop-upsell-text` | upsell | #654c0d |  |
| `--hop-upsell-text-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-text-disabled` | upsell-disabled | #c28b12 |  |
| `--hop-upsell-text-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-text-press` | upsell-press | #2f250d |  |
| `--hop-upsell-text-weak` | upsell-weak | #eac96d |  |
| `--hop-upsell-text-weak-hover` | upsell-weak-hover | #e2a934 |  |
| `--hop-upsell-text-weak-press` | upsell-weak-press | #c28b12 |  |

### [Decorative](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-decorative)

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option1-border` | decorative-option1 | #4767fe |  |
| `--hop-decorative-option1-icon` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-surface` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-surface-hover` | decorative-option1-hover | #95b1ff |  |
| `--hop-decorative-option1-surface-strong` | decorative-option1-strong | #95b1ff |  |
| `--hop-decorative-option1-surface-weak` | decorative-option1-weak | #e6ebff |  |
| `--hop-decorative-option1-surface-weak-hover` | decorative-option1-weak-hover | #d6e0ff |  |
| `--hop-decorative-option1-surface-weakest` | decorative-option1-weakest | #f5f6ff |  |
| `--hop-decorative-option1-text` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-text-weak` | decorative-option1-weak | #6c8ffd |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option2-border` | decorative-option2 | #38836a |  |
| `--hop-decorative-option2-icon` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-surface` | decorative-option2 | #a3d6cb |  |
| `--hop-decorative-option2-surface-hover` | decorative-option2-hover | #83beaf |  |
| `--hop-decorative-option2-surface-strong` | decorative-option2-strong | #83beaf |  |
| `--hop-decorative-option2-surface-weak` | decorative-option2-weak | #cff4ef |  |
| `--hop-decorative-option2-surface-weak-hover` | decorative-option2-weak-hover | #bde8e1 |  |
| `--hop-decorative-option2-surface-weakest` | decorative-option2-weakest | #ddfdf9 |  |
| `--hop-decorative-option2-text` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-text-weak` | decorative-option2-weak | #5da18c |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option3-border` | decorative-option3 | #c95109 |  |
| `--hop-decorative-option3-icon` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-surface` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-surface-hover` | decorative-option3-hover | #ff9b3f |  |
| `--hop-decorative-option3-surface-strong` | decorative-option3-strong | #ff9b3f |  |
| `--hop-decorative-option3-surface-weak` | decorative-option3-weak | #ffe8d3 |  |
| `--hop-decorative-option3-surface-weak-hover` | decorative-option3-weak-hover | #ffd8be |  |
| `--hop-decorative-option3-surface-weakest` | decorative-option3-weakest | #fff5e9 |  |
| `--hop-decorative-option3-text` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-text-weak` | decorative-option3-weak | #e57723 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option4-border` | decorative-option4 | #188a71 |  |
| `--hop-decorative-option4-icon` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-surface` | decorative-option4 | #cde8ac |  |
| `--hop-decorative-option4-surface-hover` | decorative-option4-hover | #aad89d |  |
| `--hop-decorative-option4-surface-strong` | decorative-option4-strong | #aad89d |  |
| `--hop-decorative-option4-surface-weak` | decorative-option4-weak | #e3f3b9 |  |
| `--hop-decorative-option4-surface-weak-hover` | decorative-option4-weak-hover | #cde8ac |  |
| `--hop-decorative-option4-surface-weakest` | decorative-option4-weakest | #f4f9e9 |  |
| `--hop-decorative-option4-text` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-text-weak` | decorative-option4-weak | #188a71 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option5-border` | decorative-option5 | #3a7bb2 |  |
| `--hop-decorative-option5-icon` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-surface` | decorative-option5 | #bae6ff |  |
| `--hop-decorative-option5-surface-hover` | decorative-option5-hover | #9fd2f7 |  |
| `--hop-decorative-option5-surface-strong` | decorative-option5-strong | #9fd2f7 |  |
| `--hop-decorative-option5-surface-weak` | decorative-option5-weak | #d9efff |  |
| `--hop-decorative-option5-surface-weak-hover` | decorative-option5-weak-hover | #bae6ff |  |
| `--hop-decorative-option5-surface-weakest` | decorative-option5-weakest | #f0f8ff |  |
| `--hop-decorative-option5-text` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-text-weak` | decorative-option5-weak | #5d9acd |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option6-border` | decorative-option6 | #996f08 |  |
| `--hop-decorative-option6-icon` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-surface` | decorative-option6 | #f7e694 |  |
| `--hop-decorative-option6-surface-hover` | decorative-option6-hover | #eac96d |  |
| `--hop-decorative-option6-surface-strong` | decorative-option6-strong | #eac96d |  |
| `--hop-decorative-option6-surface-weak` | decorative-option6-weak | #fff2b8 |  |
| `--hop-decorative-option6-surface-weak-hover` | decorative-option6-weak-hover | #f7e694 |  |
| `--hop-decorative-option6-surface-weakest` | decorative-option6-weakest | #fff8d6 |  |
| `--hop-decorative-option6-text` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-text-weak` | decorative-option6-weak | #e2a934 |  |

#### [Option 7](https://hopper.workleap.design/tokens/semantic/color\#option-7)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option7-border` | decorative-option7 | #837463 |  |
| `--hop-decorative-option7-icon` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-surface` | decorative-option7 | #f0eae3 |  |
| `--hop-decorative-option7-surface-hover` | decorative-option7-hover | #d4cbc0 |  |
| `--hop-decorative-option7-surface-strong` | decorative-option7-strong | #d4cbc0 |  |
| `--hop-decorative-option7-surface-weak` | decorative-option7-weak | #f0eae3 |  |
| `--hop-decorative-option7-surface-weak-hover` | decorative-option7-weak-hover | #e5ded6 |  |
| `--hop-decorative-option7-surface-weakest` | decorative-option7-weakest | #fef6ef |  |
| `--hop-decorative-option7-text` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-text-weak` | decorative-option7-weak | #776a59 |  |

#### [Option 8](https://hopper.workleap.design/tokens/semantic/color\#option-8)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option8-border` | decorative-option8 | #df3236 |  |
| `--hop-decorative-option8-icon` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-surface` | decorative-option8 | #ffd6d3 |  |
| `--hop-decorative-option8-surface-hover` | decorative-option8-hover | #ff8e8e |  |
| `--hop-decorative-option8-surface-strong` | decorative-option8-strong | #ffbcb7 |  |
| `--hop-decorative-option8-surface-weak` | decorative-option8-weak | #fde6e5 |  |
| `--hop-decorative-option8-surface-weak-hover` | decorative-option8-weak-hover | #ffd6d3 |  |
| `--hop-decorative-option8-surface-weakest` | decorative-option8-weakest | #fdf6f6 |  |
| `--hop-decorative-option8-text` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-text-weak` | decorative-option8-weak | #fa4d59 |  |

#### [Option 9](https://hopper.workleap.design/tokens/semantic/color\#option-9)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option9-border` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-icon` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-surface` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-surface-hover` | decorative-option9-hover | #6c6c6b |  |
| `--hop-decorative-option9-surface-strong` | decorative-option9-strong | #3c3c3c |  |
| `--hop-decorative-option9-surface-weak` | decorative-option9-weak | #959593 |  |
| `--hop-decorative-option9-surface-weak-hover` | decorative-option9-weak-hover | #777775 |  |
| `--hop-decorative-option9-surface-weakest` | decorative-option9-weakest | #b3b3b1 |  |
| `--hop-decorative-option9-text` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-text-weak` | decorative-option9-weak | #959593 |  |

### [Status](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-status)

#### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-neutral-border` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-border-disabled` | status-neutral-disabled | #3c3c3c |  |
| `--hop-status-neutral-border-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-border-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-border-selected` | status-neutral-selected | #f8f6f3 |  |
| `--hop-status-neutral-icon` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-icon-disabled` | status-neutral-disabled | #6c6c6b |  |
| `--hop-status-neutral-icon-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-icon-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-icon-selected` | status-neutral-selected | #f8f6f3 |  |
| `--hop-status-neutral-surface` | status-neutral | #1d1d1c |  |
| `--hop-status-neutral-surface-disabled` | status-neutral-disabled | #505050 |  |
| `--hop-status-neutral-surface-hover` | status-neutral-hover | #3c3c3c |  |
| `--hop-status-neutral-surface-press` | status-neutral-press | #505050 |  |
| `--hop-status-neutral-surface-selected` | status-neutral-selected | #fef6ef |  |
| `--hop-status-neutral-surface-strong` | status-neutral-strong | #ccccca |  |
| `--hop-status-neutral-text` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-text-disabled` | status-neutral-disabled | #6c6c6b |  |
| `--hop-status-neutral-text-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-text-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-text-selected` | status-neutral-selected | #292929 |  |

#### [Progress](https://hopper.workleap.design/tokens/semantic/color\#progress)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-progress-border` | status-progress | #4767fe |  |
| `--hop-status-progress-border-disabled` | status-progress-disabled | #2a43e8 |  |
| `--hop-status-progress-border-hover` | status-progress-hover | #3b57ff |  |
| `--hop-status-progress-border-press` | status-progress-press | #4767fe |  |
| `--hop-status-progress-border-selected` | status-progress-selected | #d6e0ff |  |
| `--hop-status-progress-icon` | status-progress | #1b3587 |  |
| `--hop-status-progress-icon-disabled` | status-progress-disabled | #3b57ff |  |
| `--hop-status-progress-icon-hover` | status-progress-hover | #152450 |  |
| `--hop-status-progress-icon-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-icon-selected` | status-progress-selected | #d6e0ff |  |
| `--hop-status-progress-surface` | status-progress | #b9cbff |  |
| `--hop-status-progress-surface-disabled` | status-progress-disabled | #1b3587 |  |
| `--hop-status-progress-surface-hover` | status-progress-hover | #95b1ff |  |
| `--hop-status-progress-surface-press` | status-progress-press | #6c8ffd |  |
| `--hop-status-progress-surface-selected` | status-progress-selected | #1b3587 |  |
| `--hop-status-progress-surface-strong` | status-progress-strong | #95b1ff |  |
| `--hop-status-progress-text` | status-progress | #1b3587 |  |
| `--hop-status-progress-text-disabled` | status-progress-disabled | #3b57ff |  |
| `--hop-status-progress-text-hover` | status-progress-hover | #152450 |  |
| `--hop-status-progress-text-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-text-selected` | status-progress-selected | #d6e0ff |  |

#### [Positive](https://hopper.workleap.design/tokens/semantic/color\#positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-positive-border` | status-positive | #188a71 |  |
| `--hop-status-positive-border-disabled` | status-positive-disabled | #16433d |  |
| `--hop-status-positive-border-hover` | status-positive-hover | #0c796b |  |
| `--hop-status-positive-border-press` | status-positive-press | #188a71 |  |
| `--hop-status-positive-border-selected` | status-positive-selected | #cde8ac |  |
| `--hop-status-positive-icon` | status-positive | #16433d |  |
| `--hop-status-positive-icon-disabled` | status-positive-disabled | #0c796b |  |
| `--hop-status-positive-icon-hover` | status-positive-hover | #132a27 |  |
| `--hop-status-positive-icon-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-icon-selected` | status-positive-selected | #cde8ac |  |
| `--hop-status-positive-surface` | status-positive | #aad89d |  |
| `--hop-status-positive-surface-disabled` | status-positive-disabled | #16433d |  |
| `--hop-status-positive-surface-hover` | status-positive-hover | #7dc291 |  |
| `--hop-status-positive-surface-press` | status-positive-press | #47a584 |  |
| `--hop-status-positive-surface-selected` | status-positive-selected | #16433d |  |
| `--hop-status-positive-surface-strong` | status-positive-strong | #7dc291 |  |
| `--hop-status-positive-text` | status-positive | #16433d |  |
| `--hop-status-positive-text-disabled` | status-positive-disabled | #0c796b |  |
| `--hop-status-positive-text-hover` | status-positive-hover | #132a27 |  |
| `--hop-status-positive-text-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-text-selected` | status-positive-selected | #cde8ac |  |

#### [Caution](https://hopper.workleap.design/tokens/semantic/color\#caution)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-caution-border` | status-caution | #c95109 |  |
| `--hop-status-caution-border-disabled` | status-caution-disabled | #ab4104 |  |
| `--hop-status-caution-border-hover` | status-caution-hover | #ba4705 |  |
| `--hop-status-caution-border-press` | status-caution-press | #c95109 |  |
| `--hop-status-caution-border-selected` | status-caution-selected | #ffd8be |  |
| `--hop-status-caution-icon` | status-caution | #692803 |  |
| `--hop-status-caution-icon-disabled` | status-caution-disabled | #ba4705 |  |
| `--hop-status-caution-icon-hover` | status-caution-hover | #451a02 |  |
| `--hop-status-caution-icon-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-icon-selected` | status-caution-selected | #ffd8be |  |
| `--hop-status-caution-surface` | status-caution | #ffbf92 |  |
| `--hop-status-caution-surface-disabled` | status-caution-disabled | #692803 |  |
| `--hop-status-caution-surface-hover` | status-caution-hover | #ff9b3f |  |
| `--hop-status-caution-surface-press` | status-caution-press | #e57723 |  |
| `--hop-status-caution-surface-selected` | status-caution-selected | #692803 |  |
| `--hop-status-caution-surface-strong` | status-caution-strong | #ff9b3f |  |
| `--hop-status-caution-text` | status-caution | #692803 |  |
| `--hop-status-caution-text-disabled` | status-caution-disabled | #ba4705 |  |
| `--hop-status-caution-text-hover` | status-caution-hover | #451a02 |  |
| `--hop-status-caution-text-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-text-selected` | status-caution-selected | #ffd8be |  |

#### [Negative](https://hopper.workleap.design/tokens/semantic/color\#negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-negative-border` | status-negative | #df3236 |  |
| `--hop-status-negative-border-disabled` | status-negative-disabled | #ba2d2d |  |
| `--hop-status-negative-border-hover` | status-negative-hover | #cb2e31 |  |
| `--hop-status-negative-border-press` | status-negative-press | #df3236 |  |
| `--hop-status-negative-border-selected` | status-negative-selected | #ffd6d3 |  |
| `--hop-status-negative-icon` | status-negative | #6c2320 |  |
| `--hop-status-negative-icon-disabled` | status-negative-disabled | #cb2e31 |  |
| `--hop-status-negative-icon-hover` | status-negative-hover | #431a17 |  |
| `--hop-status-negative-icon-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-icon-selected` | status-negative-selected | #ffd6d3 |  |
| `--hop-status-negative-surface` | status-negative | #ffbcb7 |  |
| `--hop-status-negative-surface-disabled` | status-negative-disabled | #6c2320 |  |
| `--hop-status-negative-surface-hover` | status-negative-hover | #ff8e8e |  |
| `--hop-status-negative-surface-press` | status-negative-press | #fa4d59 |  |
| `--hop-status-negative-surface-selected` | status-negative-selected | #6c2320 |  |
| `--hop-status-negative-surface-strong` | status-negative-strong | #ff8e8e |  |
| `--hop-status-negative-text` | status-negative | #6c2320 |  |
| `--hop-status-negative-text-disabled` | status-negative-disabled | #cb2e31 |  |
| `--hop-status-negative-text-hover` | status-negative-hover | #431a17 |  |
| `--hop-status-negative-text-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-text-selected` | status-negative-selected | #ffd6d3 |  |

#### [Inactive](https://hopper.workleap.design/tokens/semantic/color\#inactive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-inactive-border` | status-inactive | #777775 |  |
| `--hop-status-inactive-border-disabled` | status-inactive-disabled | #636362 |  |
| `--hop-status-inactive-border-hover` | status-inactive-hover | #6c6c6b |  |
| `--hop-status-inactive-border-press` | status-inactive-press | #777775 |  |
| `--hop-status-inactive-border-selected` | status-inactive-selected | #e0dfdd |  |
| `--hop-status-inactive-icon` | status-inactive | #3c3c3c |  |
| `--hop-status-inactive-icon-disabled` | status-inactive-disabled | #6c6c6b |  |
| `--hop-status-inactive-icon-hover` | status-inactive-hover | #292929 |  |
| `--hop-status-inactive-icon-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-icon-selected` | status-inactive-selected | #e0dfdd |  |
| `--hop-status-inactive-surface` | status-inactive | #e0dfdd |  |
| `--hop-status-inactive-surface-disabled` | status-inactive-disabled | #3c3c3c |  |
| `--hop-status-inactive-surface-hover` | status-inactive-hover | #b3b3b1 |  |
| `--hop-status-inactive-surface-press` | status-inactive-press | #959593 |  |
| `--hop-status-inactive-surface-selected` | status-inactive-selected | #3c3c3c |  |
| `--hop-status-inactive-surface-strong` | status-inactive-strong | #ccccca |  |
| `--hop-status-inactive-text` | status-inactive | #3c3c3c |  |
| `--hop-status-inactive-text-disabled` | status-inactive-disabled | #6c6c6b |  |
| `--hop-status-inactive-text-hover` | status-inactive-hover | #292929 |  |
| `--hop-status-inactive-text-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-text-selected` | status-inactive-selected | #e0dfdd |  |

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option1-border` | status-option1 | #3a7bb2 |  |
| `--hop-status-option1-border-disabled` | status-option1-disabled | #23669f |  |
| `--hop-status-option1-border-hover` | status-option1-hover | #2e70a8 |  |
| `--hop-status-option1-border-press` | status-option1-press | #3a7bb2 |  |
| `--hop-status-option1-border-selected` | status-option1-selected | #bae6ff |  |
| `--hop-status-option1-icon` | status-option1 | #003d70 |  |
| `--hop-status-option1-icon-disabled` | status-option1-disabled | #2e70a8 |  |
| `--hop-status-option1-icon-hover` | status-option1-hover | #00274b |  |
| `--hop-status-option1-icon-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-icon-selected` | status-option1-selected | #bae6ff |  |
| `--hop-status-option1-surface` | status-option1 | #9fd2f7 |  |
| `--hop-status-option1-surface-disabled` | status-option1-disabled | #003d70 |  |
| `--hop-status-option1-surface-hover` | status-option1-hover | #81b9e4 |  |
| `--hop-status-option1-surface-press` | status-option1-press | #5d9acd |  |
| `--hop-status-option1-surface-selected` | status-option1-selected | #003d70 |  |
| `--hop-status-option1-surface-strong` | status-option1-strong | #9fd2f7 |  |
| `--hop-status-option1-text` | status-option1 | #003d70 |  |
| `--hop-status-option1-text-disabled` | status-option1-disabled | #2e70a8 |  |
| `--hop-status-option1-text-hover` | status-option1-hover | #00274b |  |
| `--hop-status-option1-text-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-text-selected` | status-option1-selected | #bae6ff |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option2-border` | status-option2 | #8d91dc |  |
| `--hop-status-option2-border-disabled` | status-option2-disabled | #5454be |  |
| `--hop-status-option2-border-hover` | status-option2-hover | #5f61c5 |  |
| `--hop-status-option2-border-press` | status-option2-press | #8d91dc |  |
| `--hop-status-option2-border-selected` | status-option2-selected | #322b8d |  |
| `--hop-status-option2-icon` | status-option2 | #322b8d |  |
| `--hop-status-option2-icon-disabled` | status-option2-disabled | #5f61c5 |  |
| `--hop-status-option2-icon-hover` | status-option2-hover | #1e1c5d |  |
| `--hop-status-option2-icon-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-icon-selected` | status-option2-selected | #ddddf7 |  |
| `--hop-status-option2-surface` | status-option2 | #c8caf0 |  |
| `--hop-status-option2-surface-disabled` | status-option2-disabled | #322b8d |  |
| `--hop-status-option2-surface-hover` | status-option2-hover | #aeb3e8 |  |
| `--hop-status-option2-surface-press` | status-option2-press | #8d91dc |  |
| `--hop-status-option2-surface-selected` | status-option2-selected | #322b8d |  |
| `--hop-status-option2-surface-strong` | status-option2-strong | #c8caf0 |  |
| `--hop-status-option2-text` | status-option2 | #322b8d |  |
| `--hop-status-option2-text-disabled` | status-option2-disabled | #5f61c5 |  |
| `--hop-status-option2-text-hover` | status-option2-hover | #1e1c5d |  |
| `--hop-status-option2-text-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-text-selected` | status-option2-selected | #ddddf7 |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option3-border` | status-option3 | #38836a |  |
| `--hop-status-option3-border-disabled` | status-option3-disabled | #206f54 |  |
| `--hop-status-option3-border-hover` | status-option3-hover | #2b795e |  |
| `--hop-status-option3-border-press` | status-option3-press | #38836a |  |
| `--hop-status-option3-border-selected` | status-option3-selected | #bde8e1 |  |
| `--hop-status-option3-icon` | status-option3 | #00452d |  |
| `--hop-status-option3-icon-disabled` | status-option3-disabled | #2b795e |  |
| `--hop-status-option3-icon-hover` | status-option3-hover | #002d1c |  |
| `--hop-status-option3-icon-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-icon-selected` | status-option3-selected | #bde8e1 |  |
| `--hop-status-option3-surface` | status-option3 | #a3d6cb |  |
| `--hop-status-option3-surface-disabled` | status-option3-disabled | #00452d |  |
| `--hop-status-option3-surface-hover` | status-option3-hover | #83beaf |  |
| `--hop-status-option3-surface-press` | status-option3-press | #5da18c |  |
| `--hop-status-option3-surface-selected` | status-option3-selected | #00452d |  |
| `--hop-status-option3-surface-strong` | status-option3-strong | #a3d6cb |  |
| `--hop-status-option3-text` | status-option3 | #00452d |  |
| `--hop-status-option3-text-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-text-hover` | status-option3-hover | #002d1c |  |
| `--hop-status-option3-text-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-text-selected` | status-option3-selected | #bde8e1 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option4-border` | status-option4 | #5e7b84 |  |
| `--hop-status-option4-border-disabled` | status-option4-disabled | #4e6770 |  |
| `--hop-status-option4-border-hover` | status-option4-hover | #557079 |  |
| `--hop-status-option4-border-press` | status-option4-press | #5e7b84 |  |
| `--hop-status-option4-border-selected` | status-option4-selected | #d2e3e7 |  |
| `--hop-status-option4-icon` | status-option4 | #313e43 |  |
| `--hop-status-option4-icon-disabled` | status-option4-disabled | #557079 |  |
| `--hop-status-option4-icon-hover` | status-option4-hover | #20282a |  |
| `--hop-status-option4-icon-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-icon-selected` | status-option4-selected | #d2e3e7 |  |
| `--hop-status-option4-surface` | status-option4 | #bad0d5 |  |
| `--hop-status-option4-surface-disabled` | status-option4-disabled | #4e6770 |  |
| `--hop-status-option4-surface-hover` | status-option4-hover | #9cb7be |  |
| `--hop-status-option4-surface-press` | status-option4-press | #7c9aa3 |  |
| `--hop-status-option4-surface-selected` | status-option4-selected | #313e43 |  |
| `--hop-status-option4-surface-strong` | status-option4-strong | #bad0d5 |  |
| `--hop-status-option4-text` | status-option4 | #313e43 |  |
| `--hop-status-option4-text-disabled` | status-option4-disabled | #557079 |  |
| `--hop-status-option4-text-hover` | status-option4-hover | #20282a |  |
| `--hop-status-option4-text-press` | status-option4-press | #20282a |  |
| `--hop-status-option4-text-selected` | status-option4-selected | #d2e3e7 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option5-border` | status-option5 | #837463 |  |
| `--hop-status-option5-border-disabled` | status-option5-disabled | #6e6151 |  |
| `--hop-status-option5-border-hover` | status-option5-hover | #776a59 |  |
| `--hop-status-option5-border-press` | status-option5-press | #837463 |  |
| `--hop-status-option5-border-selected` | status-option5-selected | #e5ded6 |  |
| `--hop-status-option5-icon` | status-option5 | #433b31 |  |
| `--hop-status-option5-icon-disabled` | status-option5-disabled | #776a59 |  |
| `--hop-status-option5-icon-hover` | status-option5-hover | #2a2620 |  |
| `--hop-status-option5-icon-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-icon-selected` | status-option5-selected | #e5ded6 |  |
| `--hop-status-option5-surface` | status-option5 | #d4cbc0 |  |
| `--hop-status-option5-surface-disabled` | status-option5-disabled | #433b31 |  |
| `--hop-status-option5-surface-hover` | status-option5-hover | #bdb1a3 |  |
| `--hop-status-option5-surface-press` | status-option5-press | #a19382 |  |
| `--hop-status-option5-surface-selected` | status-option5-selected | #433b31 |  |
| `--hop-status-option5-surface-strong` | status-option5-strong | #d4cbc0 |  |
| `--hop-status-option5-text` | status-option5 | #433b31 |  |
| `--hop-status-option5-text-disabled` | status-option5-disabled | #776a59 |  |
| `--hop-status-option5-text-hover` | status-option5-hover | #2a2620 |  |
| `--hop-status-option5-text-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-text-selected` | status-option5-selected | #e5ded6 |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option6-border` | status-option6 | #996f08 |  |
| `--hop-status-option6-border-disabled` | status-option6-disabled | #7e5e0a |  |
| `--hop-status-option6-border-hover` | status-option6-hover | #8b6609 |  |
| `--hop-status-option6-border-press` | status-option6-press | #996f08 |  |
| `--hop-status-option6-border-selected` | status-option6-selected | #f7e694 |  |
| `--hop-status-option6-icon` | status-option6 | #4b390f |  |
| `--hop-status-option6-icon-disabled` | status-option6-disabled | #8b6609 |  |
| `--hop-status-option6-icon-hover` | status-option6-hover | #2f250d |  |
| `--hop-status-option6-icon-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-icon-selected` | status-option6-selected | #f7e694 |  |
| `--hop-status-option6-surface` | status-option6 | #eac96d |  |
| `--hop-status-option6-surface-disabled` | status-option6-disabled | #4b390f |  |
| `--hop-status-option6-surface-hover` | status-option6-hover | #e2a934 |  |
| `--hop-status-option6-surface-press` | status-option6-press | #c28b12 |  |
| `--hop-status-option6-surface-selected` | status-option6-selected | #4b390f |  |
| `--hop-status-option6-surface-strong` | status-option6-strong | #eac96d |  |
| `--hop-status-option6-text` | status-option6 | #4b390f |  |
| `--hop-status-option6-text-disabled` | status-option6-disabled | #8b6609 |  |
| `--hop-status-option6-text-hover` | status-option6-hover | #2f250d |  |
| `--hop-status-option6-text-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-text-selected` | status-option6-selected | #f7e694 |  |

### [Data Visualization](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-data-visualization)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-unavailable` | dataviz\_unavailable | #636362 |  |
| `--hop-dataviz-unavailable-weak` | dataviz\_unavailable-weak | #777775 |  |
| `--hop-dataviz-unavailable-strong` | dataviz\_unavailable-strong | #505050 |  |
| `--hop-dataviz-text-onlight` | dataviz\_onlight | #3c3c3c |  |
| `--hop-dataviz-text-ondark` | dataviz\_ondark | #ffffff |  |

## Elevation Guidelines

# Elevation

## [Guidelines](https://hopper.workleap.design/tokens/semantic/elevation\#guidelines)

- **Working with elevation** \- Elevation allows to bring a sense of materiality and depth to an interface. Use elevation to infer information hierarchy.
- **Don’t skip elevation levels** \- When applying elevation to visual elements, ensure that each level is used progressively so users can understand the layering of elements on the page. Start with no elevation at the background level and build interfaces by 'piling up' containers and other elements step by step. Avoid jumping from a raised token to a floating token without using the intermediate lifted level.
- **Use elevation purposefully** \- Each elevation has a purpose and allow users to see what is closer to them – what requires their attention now. Always respect how elements are stacked on top of each other so that users understand the materiality of the application.

## [Tokens](https://hopper.workleap.design/tokens/semantic/elevation\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-elevation-none` | none | none |  |
| `--hop-elevation-raised` | raised | 0 1px 6px 0 rgba(60, 60, 60, 0.10) |  |
| `--hop-elevation-lifted` | lifted | 0 4px 10px 4px rgba(60, 60, 60, 0.08) |  |
| `--hop-elevation-floating` | floating | 0 10px 18px 8px rgba(60, 60, 60, 0.08) |  |

## Shape Tokens

# Shape

Shape tokens refer to the border radius of a visual element. Border radius is the amount of smoothness applied to the corners of a shape. The higher the value, the smoother the corners are. In addition to t-shirt-sized tokens, there are some utility tokens used for specific elements such as pill and circle.

## [Tokens](https://hopper.workleap.design/tokens/semantic/shape\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-shape-circle` | circle | 624.9375rem |  |
| `--hop-shape-pill` | pill | 1.5rem |  |
| `--hop-shape-rounded-lg` | rounded-lg | 1rem |  |
| `--hop-shape-rounded-md` | rounded-md | 0.5rem |  |
| `--hop-shape-rounded-sm` | rounded-sm | 0.25rem |  |

## Design Space Tokens

# Space

## [Guidelines](https://hopper.workleap.design/tokens/semantic/space\#guidelines)

- **Working with space** \- Space is the distance between two objects in your design. It should be used to complement the purpose of a page by creating hierarchy and making the content clearer and more comprehensible.
- **Be harmonious** \- Use space tokens in a way that is consistent with the rest of the experience. Some spaces are used in specific context, follow the proper documentation to apply space at the right places.
- **Create visual groups** \- The more visual elements are related, the closer they should be to each other.

## [Tokens](https://hopper.workleap.design/tokens/semantic/space\#tokens)

### [Padding](https://hopper.workleap.design/tokens/semantic/space\#tokens-padding)

Padding refers to the space within a block or container from which elements are separated from the edge. Is is refered as inset in Hopper.

#### [Inset](https://hopper.workleap.design/tokens/semantic/space\#inset)

By default, the inset is equal on all four sides.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-xs` | inset-xs | 0.25rem |  |
| `--hop-space-inset-sm` | inset-sm | 0.5rem |  |
| `--hop-space-inset-md` | inset-md | 1rem |  |
| `--hop-space-inset-lg` | inset-lg | 1.5rem |  |
| `--hop-space-inset-xl` | inset-xl | 2rem |  |

#### [Inset Squish](https://hopper.workleap.design/tokens/semantic/space\#inset-squish)

Squish inset reduces the top and bottom padding by one increment relative to the declared inset space.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-squish-sm` | inset-squish-sm | 0.25rem 0.5rem |  |
| `--hop-space-inset-squish-md` | inset-squish-md | 0.5rem 1rem |  |
| `--hop-space-inset-squish-lg` | inset-squish-lg | 1rem 2rem |  |

#### [Inset Stretch](https://hopper.workleap.design/tokens/semantic/space\#inset-stretch)

Stretch inset increases the top and bottom padding by one increment relative to the declared inset space.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-stretch-sm` | inset-stretch-sm | 1rem 0.5rem |  |
| `--hop-space-inset-stretch-md` | inset-stretch-md | 1.5rem 1rem |  |
| `--hop-space-inset-stretch-lg` | inset-stretch-lg | 3rem 1.5rem |  |

### [Margin](https://hopper.workleap.design/tokens/semantic/space\#tokens-margin)

Margin refers to the traditional meaning of space between elements. It can be used as a margin or gap when in a grid or flex layout. It is refered as stack in Hopper. The last element of a stack should omit this space.

#### [Stack](https://hopper.workleap.design/tokens/semantic/space\#stack)

Stack is the space that separates elements or containers arranged vertically within a column.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-stack-xs` | stack-xs | 0.25rem |  |
| `--hop-space-stack-sm` | stack-sm | 0.5rem |  |
| `--hop-space-stack-md` | stack-md | 1rem |  |
| `--hop-space-stack-lg` | stack-lg | 1.5rem |  |
| `--hop-space-stack-xl` | stack-xl | 2rem |  |

#### [Inline](https://hopper.workleap.design/tokens/semantic/space\#inline)

Inline refers to the space that separates inline elements arranged horizontally.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inline-xs` | inline-xs | 0.25rem |  |
| `--hop-space-inline-sm` | inline-sm | 0.5rem |  |
| `--hop-space-inline-md` | inline-md | 1rem |  |
| `--hop-space-inline-lg` | inline-lg | 1.5rem |  |
| `--hop-space-inline-xl` | inline-xl | 2rem |  |

## Typography Tokens

# Typography

Typography tokens are composite tokens, meaning they are made up of multiple other tokens. This allows us to create a consistent typographic scale across our products.

## [Guidelines](https://hopper.workleap.design/tokens/semantic/typography\#guidelines)

- **Use the bounding box to align with the grid** \- The bounding box is the vertical height of the text and is defined by the line height. That value of the line height is critical to make sure text is aligned to the 8px grid of the interface.
- **Use text-crop when a font looks off-centered** \- Some fonts, such as _ABC Favorit_ requires a little help to look centered. In those cases, apply a [text-crop](https://hopper.workleap.design/getting-started/guides/text-crop) to adjust the line height. These values are available as tokens and are documented below. Hopper Components already make use of these values when necessary.
- **Align text using baseline** \- When aligning different text boxes together horizontally, use their baselines as a guide instead of their true center for a more harmonious look.
- **Line length should be between 40 to 60 characters** \- Lines of text that are too short make the eyes strain while long lines make it hard to concentrate. As a way to give users the best reading experience, aim for lines of text between 40 to 60 characters, including spaces. If your text doesn’t fit this rule, review the content length, font size or even information hierarchy.

## [Tokens](https://hopper.workleap.design/tokens/semantic/typography\#tokens)

### [Heading](https://hopper.workleap.design/tokens/semantic/typography\#tokens-heading)

Headings are used to create a hierarchy of content. They are used to help users scan and understand the content on a page.

| Size | Values | Preview |
| --- | --- | --- |
| 3xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-3xl-font-size` | 2.25rem |
| Font Weight | `hop-heading-3xl-font-weight` | 680 |
| Line Height | `hop-heading-3xl-line-height` | 1.3333333 |
| Font Family | `hop-heading-3xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-3xl-top-offset` | -0.9375rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-3xl-bottom-offset` | -0.5625rem | | Aa |
| 2xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-2xl-font-size` | 2rem |
| Font Weight | `hop-heading-2xl-font-weight` | 580 |
| Line Height | `hop-heading-2xl-line-height` | 1.25 |
| Font Family | `hop-heading-2xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-2xl-top-offset` | -0.6667rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-2xl-bottom-offset` | -0.3334rem | | Aa |
| xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-xl-font-size` | 1.75rem |
| Font Weight | `hop-heading-xl-font-weight` | 680 |
| Line Height | `hop-heading-xl-line-height` | 1.1428571 |
| Font Family | `hop-heading-xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xl-top-offset` | -0.5rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xl-bottom-offset` | -0.1875rem | | Aa |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-lg-font-size` | 1.5rem |
| Font Weight | `hop-heading-lg-font-weight` | 680 |
| Line Height | `hop-heading-lg-line-height` | 1.3333333 |
| Font Family | `hop-heading-lg-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-lg-top-offset` | -0.5625rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-lg-bottom-offset` | -0.3125rem | | Aa |
| md | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-md-font-size` | 1.25rem |
| Font Weight | `hop-heading-md-font-weight` | 580 |
| Line Height | `hop-heading-md-line-height` | 1.2 |
| Font Family | `hop-heading-md-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-md-top-offset` | -0.3333rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-md-bottom-offset` | -0.125rem | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-sm-font-size` | 1.125rem |
| Font Weight | `hop-heading-sm-font-weight` | 580 |
| Line Height | `hop-heading-sm-line-height` | 1.3333333 |
| Font Family | `hop-heading-sm-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-sm-top-offset` | -0.375rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-sm-bottom-offset` | -0.1875rem | | Aa |
| xs | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-xs-font-size` | 1rem |
| Font Weight | `hop-heading-xs-font-weight` | 410 |
| Line Height | `hop-heading-xs-line-height` | 1.5 |
| Font Family | `hop-heading-xs-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xs-top-offset` | -0.4166rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xs-bottom-offset` | -0.25rem | | Aa |

#### [Variations](https://hopper.workleap.design/tokens/semantic/typography\#variations)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-heading-xs-medium-font-weight` | 580 | Aa |

### [Overline](https://hopper.workleap.design/tokens/semantic/typography\#tokens-overline)

Used to introduce a headline.

_Adding a text-transform of uppercase is necessary in order to render overline as intended by the Design. A letter spacing of `0.24px` is also necessary._

| Values | Preview |
| --- | --- |
| |     |     |     |
| --- | --- | --- |
| Font Size | `hop-overline-font-size` | 0.75rem |
| Font Weight | `hop-overline-font-weight` | 400 |
| Line Height | `hop-overline-line-height` | 1.3333333 |
| Font Family | `hop-overline-font-family` | 'ABC Favorit Mono', Consolas, 'SF Mono', monospace |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-overline-top-offset` | -0.25rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-overline-bottom-offset` | -0.25rem | | Aa |

### [Body](https://hopper.workleap.design/tokens/semantic/typography\#tokens-body)

Body text is used to communicate the main content of a page.

| Size | Values | Preview |
| --- | --- | --- |
| 2xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-2xl-font-size` | 2rem |
| Font Weight | `hop-body-2xl-font-weight` | 410 |
| Line Height | `hop-body-2xl-line-height` | 1.125 |
| Font Family | `hop-body-2xl-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-xl-font-size` | 1.75rem |
| Font Weight | `hop-body-xl-font-weight` | 410 |
| Line Height | `hop-body-xl-line-height` | 1.1428571 |
| Font Family | `hop-body-xl-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-lg-font-size` | 1.125rem |
| Font Weight | `hop-body-lg-font-weight` | 410 |
| Line Height | `hop-body-lg-line-height` | 1.3333333 |
| Font Family | `hop-body-lg-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| md | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-md-font-size` | 1rem |
| Font Weight | `hop-body-md-font-weight` | 410 |
| Line Height | `hop-body-md-line-height` | 1.5 |
| Font Family | `hop-body-md-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-sm-font-size` | 0.875rem |
| Font Weight | `hop-body-sm-font-weight` | 410 |
| Line Height | `hop-body-sm-line-height` | 1.4285714 |
| Font Family | `hop-body-sm-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| xs | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-xs-font-size` | 0.75rem |
| Font Weight | `hop-body-xs-font-weight` | 410 |
| Line Height | `hop-body-xs-line-height` | 1.3333333 |
| Font Family | `hop-body-xs-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |

#### [Variations](https://hopper.workleap.design/tokens/semantic/typography\#variations)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-body-lg-medium-font-weight` | 505 | Aa |
| `--hop-body-lg-semibold-font-weight` | 590 | Aa |
| `--hop-body-lg-bold-font-weight` | 690 | Aa |
| `--hop-body-md-medium-font-weight` | 505 | Aa |
| `--hop-body-md-semibold-font-weight` | 590 | Aa |
| `--hop-body-md-bold-font-weight` | 690 | Aa |
| `--hop-body-sm-medium-font-weight` | 505 | Aa |
| `--hop-body-sm-semibold-font-weight` | 590 | Aa |
| `--hop-body-sm-bold-font-weight` | 690 | Aa |
| `--hop-body-xs-medium-font-weight` | 505 | Aa |
| `--hop-body-xs-semibold-font-weight` | 590 | Aa |
| `--hop-body-xs-bold-font-weight` | 690 | Aa |

### [Accent](https://hopper.workleap.design/tokens/semantic/typography\#tokens-accent)

Accent text is used to highlight important information on a page.

| Size | Values | Preview |
| --- | --- | --- |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-accent-lg-font-size` | 3rem |
| Font Weight | `hop-accent-lg-font-weight` | 580 |
| Line Height | `hop-accent-lg-line-height` | 1.125 |
| Font Family | `hop-accent-lg-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-accent-sm-font-size` | 1.125rem |
| Font Weight | `hop-accent-sm-font-weight` | 580 |
| Line Height | `hop-accent-sm-line-height` | 1.3333333 |
| Font Family | `hop-accent-sm-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif | | Aa |

1. These values are meant to be used in tandem, they have been meticulously crafted to trim unwanted blank space in the _ABC Favorit_ typeface, and it's _Mono_ variant. They have been generated using [Eight Shape tool](https://text-crop.eightshapes.com/) and adjusted to fit our needs. You can see how and when to use them in the [Use text-crop when a font looks off-centered](https://hopper.workleap.design/tokens/semantic/typography#guidelines) section.

## HopperProvider Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

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

## [Props](https://hopper.workleap.design/components/HopperProvider\#props)

locale?

`string`

The BCP47 language code for the locale.

Show example code

navigate?

`((path: string, routerOptions: undefined) => void)`

Set this up once in the root of your app, and any Hopper component with the href prop will automatically navigate using your router.
This prop should be set to a function received from your router for performing a client side navigation programmatically.

Show example code

useHref?

`((href: string) => string)`

useHref is an optional prop that converts a router-specific href to a native HTML href, e.g. prepending a base path.

Show example code

children

`ReactNode`

The children of the component

withBodyStyle?

`boolean`

Determines whether the styles should be added to the document's body
By default, it is set to `false`. If set to `true`, it will apply additional styling to the document's body.

colorScheme?

`ColorSchemeOrSystem`

The color scheme to use.

_Defaults to light._

defaultColorScheme?

`ColorScheme`

Default color scheme to use when a user preferred color scheme (system) is not available.

_Defaults to light._

withCssVariables?

`boolean`

Determines whether token CSS variables should be added to the document's head
By default, it is set to `true`, you should not change it unless you want to manage CSS variables via `.css` files

_Defaults to true._

unsupportedMatchMediaBreakpoint?

`Breakpoint`

The breakpoint to use when the browser does not support matchMedia.

_Defaults to lg._

style?

`CSSProperties`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Button Components Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Button

A button allows a user to initiate an action.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/buttons/src/Button.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Button]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button } from "@hopper-ui/components";

export default function Example() {
    return (
        <Button>Save</Button>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Button\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Button\#anatomy-composed-components)

A `Button` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Button\#usage)

### [Variants](https://hopper.workleap.design/components/Button\#usage-variants)

A button can use different variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Save</Button>
            <Button variant="upsell">Save</Button>
            <Button variant="danger">Save</Button>
            <Button variant="ghost-primary">Save</Button>
            <Button variant="ghost-secondary">Save</Button>
            <Button variant="ghost-danger">Save</Button>
        </Inline>
    );
}


```

**Primary** \- For the principal call to action on the page. Primary buttons should only appear once per screen — not including the application header, modal or side panel.

**Secondary** \- For secondary actions on each page. Secondary buttons can be used in conjunction with a primary button or on its own. Paired with a Primary button, the secondary button usually performs the negative action of the set, such as “Cancel.”

**Upsell** \- For upsell actions that relate to upgrading an account or a plan. Use the upsell button to distinguish it from an existing primary button. In some cases, a primary button can be used instead when the general context of the page is about upselling.

**Danger** \- For actions that could have destructive effects on the user’s data.

**Ghost-\[primary\|secondary\|danger\]** \- For less prominent, and sometimes independent, actions. Ghost buttons can be used in isolation or paired with a primary button when there are multiple calls to action. Ghost buttons can also be used for subtasks on a
page where a primary button for the main and final action is present.

### [Sizes](https://hopper.workleap.design/components/Button\#usage-sizes)

A button can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button variant="primary">Save</Button>
            <Button size="sm" variant="primary">Save</Button>
        </Inline>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Button\#usage-disabled)

A button can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isDisabled variant="primary">Save</Button>
            <Button isDisabled variant="ghost-primary">Save</Button>
        </Inline>
    );
}


```

### [Loading](https://hopper.workleap.design/components/Button\#usage-loading)

A button can show a loading indicator. The button text is hidden but the button maintains the width that it would have if the text were visible.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Button isLoading variant="primary">Save</Button>
            <Button isLoading variant="secondary">Save</Button>
            <Button isLoading variant="upsell">Save</Button>
            <Button isLoading variant="danger">Save</Button>
            <Button isLoading variant="ghost-primary">Save</Button>
            <Button isLoading variant="ghost-secondary">Save</Button>
            <Button isLoading variant="ghost-danger">Save</Button>
        </Inline>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/Button\#usage-fluid)

A button can be expanded to full width to fill its parent container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button isFluid variant="primary">
                Save
            </Button>
            <Button isFluid variant="primary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
            <Button isFluid>
                <Text>Save</Text>
                <SparklesIcon slot="end-icon" />
            </Button>
        </Inline>
    );
}


```

### [Icon Only](https://hopper.workleap.design/components/Button\#usage-icon-only)

A button can contain only an icon. An accessible name must be provided through [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) prop. See also [WCAG practices](https://www.w3.org/TR/WCAG20-TECHS/ARIA6.html).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
            <Button size="sm" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </Button>
        </Inline>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Button\#usage-icon)

A button can contain icons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Save" variant="secondary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
            <Button size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon />
                <Text>Save</Text>
            </Button>
        </Inline>
    );
}


```

### [End Icon](https://hopper.workleap.design/components/Button\#usage-end-icon)

Nonstandard end icons can be provided to handle special cases. However, think twice before adding end icons, start icons should be your go-to.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Button aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
            <Button size="sm" aria-label="Save" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Save</Text>
            </Button>
        </Inline>
    );
}


```

## [Props](https://hopper.workleap.design/components/Button\#props)

variant?

`ButtonVariant`

The visual style of the button.

_Defaults to primary._

size?

`ResponsiveProp<ButtonSize>`

A button can vary in size.

_Defaults to md._

isFluid?

`ResponsiveProp<boolean>`

Whether or not the button takes up the width of its container.

isLoading?

`boolean`

A button can show a loading indicator.

spinnerProps?

`SpinnerProps`

The props for the Spinner.

form?

`string`

The `element to associate the button with. The value of this attribute must be the id of a` in the same document.

style?

`CSSProperties | ((values: ButtonRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: ButtonRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

isDisabled?

`boolean`

Whether the button is disabled.

autoFocus?

`boolean`

Whether the element should receive focus on render.

type?

`"button" | "submit" | "reset"`

The behavior of the button when used in an HTML form.

_Defaults to 'button'._

formAction?

`string`

The URL that processes the information submitted by the button.
Overrides the action attribute of the button's form owner.

formEncType?

`string`

Indicates how to encode the form data that is submitted.

formMethod?

`string`

Indicates the HTTP method used to submit the form.

formNoValidate?

`boolean`

Indicates that the form is not to be validated when it is submitted.

formTarget?

`string`

Overrides the target attribute of the button's form owner.

name?

`string`

Submitted as a pair with the button's value as part of the form data.

value?

`string`

The value associated with the button's name when it's submitted with the form data.

className?

`string | ((values: ButtonRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onPress?

`((e: PressEvent) => void)`

Handler that is called when the press is released over the target.

onPressStart?

`((e: PressEvent) => void)`

Handler that is called when a press interaction starts.

onPressEnd?

`((e: PressEvent) => void)`

Handler that is called when a press interaction ends, either
over the target or when the pointer leaves the target.

onPressChange?

`((isPressed: boolean) => void)`

Handler that is called when the press state changes.

onPressUp?

`((e: PressEvent) => void)`

Handler that is called when a press is released over the target, regardless of
whether it started on the target or not.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-expanded?

`boolean | "true" | "false"`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "true" | "false" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-pressed?

`boolean | "true" | "false" | "mixed"`

Indicates the current "pressed" state of toggle buttons.

aria-current?

`boolean | "time" | "true" | "false" | "page" | "step" | "location" | "date"`

Indicates whether this element represents the current item within a container or set of related elements.

preventFocusOnPress?

`boolean`

Whether to prevent focus from moving to the button when pressing it.

Caution, this can make the button inaccessible and should only be used when alternative keyboard interaction is provided,
such as ComboBox's MenuTrigger or a NumberField's increment/decrement control.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Button\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `onClick` has been renamed to `onPress` to be closer to the [React Aria API](https://react-spectrum.adobe.com/react-aria/Button.html#events).
- `Counter` is no longer allowed as a specialized slot.
- `ButtonAsLink` is renamed to `LinkButton`.
- `IconButton` is now integrated into the Button component.
- `as(Button, ReactRouterLink)` is now integrated into the Button component.

## Button Group

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# ButtonGroup

A button group handles the spacing and orientation for a grouping of buttons.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/buttons/src/ButtonGroup.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[ButtonGroup]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup>
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/ButtonGroup\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/ButtonGroup\#guidelines-composed-components)

A `ButtonGroup` uses the following component.

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**LinkButton** \\
\\
A LinkButton looks like a button but behaves like a link.](https://hopper.workleap.design/components/LinkButton)

## [Usage](https://hopper.workleap.design/components/ButtonGroup\#usage)

### [Orientation](https://hopper.workleap.design/components/ButtonGroup\#usage-orientation)

A button group can render his items vertically.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup orientation="vertical">
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}


```

### [Alignment](https://hopper.workleap.design/components/ButtonGroup\#usage-alignment)

A button group can change the alignment of his items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup width="100%" align="end">
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/ButtonGroup\#usage-disabled)

A button group can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup isDisabled>
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/ButtonGroup\#usage-fluid)

A button group can be fluid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <ButtonGroup isFluid>
            <Button variant="secondary">No, thanks</Button>
            <Button variant="secondary">Remind me later</Button>
            <Button variant="primary">Rate Now</Button>
        </ButtonGroup>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/ButtonGroup\#usage-sizes)

A button group can be of different sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No, thanksRemind me laterRate Now

No, thanksRemind me laterRate Now

```

import { Button, ButtonGroup, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ButtonGroup>
                <Button variant="secondary">No, thanks</Button>
                <Button variant="secondary">Remind me later</Button>
                <Button variant="primary">Rate Now</Button>
            </ButtonGroup>
            <ButtonGroup size="sm">
                <Button variant="secondary">No, thanks</Button>
                <Button variant="secondary">Remind me later</Button>
                <Button variant="primary">Rate Now</Button>
            </ButtonGroup>
        </Stack>
    );
}


```

## [Props](https://hopper.workleap.design/components/ButtonGroup\#props)

orientation?

`ResponsiveProp<Orientation>`

The axis the ButtonGroup should align with.

_Defaults to 'horizontal'._

isDisabled?

`boolean`

Whether the Buttons in the ButtonGroup are all disabled.

isFluid?

`ResponsiveProp<boolean>`

Whether the Buttons in the ButtonGroup are all fluid.

size?

`ResponsiveProp<ButtonSize>`

The size of the buttons in the ButtonGroup.

_Defaults to md._

wrap?

`ResponsiveProp<boolean>`

Whether elements are forced onto one line or can wrap onto multiple rows.

_Defaults to true._

align?

`ResponsiveProp<Align>`

The alignment of the buttons within the ButtonGroup.

_Defaults to 'start'._

style?

`CSSProperties`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## [Migration Notes](https://hopper.workleap.design/components/ButtonGroup\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `fluid` has been renamed `isFluid`.
- `disabled` has been renamed `isDisabled`.

## LinkButton Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# LinkButton

A LinkButton looks like a button but behaves like a link.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/buttons/src/LinkButton.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[LinkButton]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/link/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Support](https://www.google.com/)

```

import { LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <LinkButton href="https://www.google.com">Support</LinkButton>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/LinkButton\#anatomy)

### [Concepts](https://hopper.workleap.design/components/LinkButton\#anatomy-concepts)

_LinkButton_ makes use of the following concepts:

- [Client Side Routing](https://hopper.workleap.design/components/client-side-routing)

### [Composed Components](https://hopper.workleap.design/components/LinkButton\#anatomy-composed-components)

A _LinkButton_ uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/LinkButton\#usage)

### [Variants](https://hopper.workleap.design/components/LinkButton\#usage-variants)

A link button can use different variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/)

```

import { Inline, LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" variant="primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="secondary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="upsell">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="danger">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-secondary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-danger">Help</LinkButton>
        </Inline>
    );
}


```

**Primary** \- For the principal call to action on the page. Primary buttons should only appear once per screen — not including the application header, modal or side panel.

**Secondary** \- For secondary actions on each page. Secondary buttons can be used in conjunction with a primary link button or on its own. Paired with a Primary link button, the secondary link button usually performs the negative action of the set, such as “Cancel.”

**Upsell** \- For upsell actions that relate to upgrading an account or a plan. Use the upsell link button to distinguish it from an existing primary link button. In some cases, a primary link button can be used instead when the general context of the page is about upselling.

**Danger** \- For actions that could have destructive effects on the user’s data.

**Ghost-\[primary\|secondary\|danger\]** \- For less prominent, and sometimes independent, actions. Ghost buttons can be used in isolation or paired with a primary link button when there are multiple calls to action. Ghost buttons can also be used for subtasks on a
page where a primary link button for the main and final action is present.

### [Sizes](https://hopper.workleap.design/components/LinkButton\#usage-sizes)

A link button can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Help](https://www.google.com/) [Help](https://www.google.com/)

```

import { Inline, LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" size="md" variant="primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" size="sm" variant="primary">Help</LinkButton>
        </Inline>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/LinkButton\#usage-disabled)

A link button can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

HelpHelp

```

import { Inline, LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" isDisabled variant="primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" isDisabled variant="ghost-primary">Help</LinkButton>
        </Inline>
    );
}


```

### [External](https://hopper.workleap.design/components/LinkButton\#usage-external)

Add isExternal attributes to render an external link button.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://www.google.com/)

```

import { LinkButton, Text } from "@hopper-ui/components";
import { NewTabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <LinkButton href="https://www.google.com" isExternal>
            <Text>Learn more</Text>
            <NewTabIcon />
        </LinkButton>
    );
}


```

### [No Href](https://hopper.workleap.design/components/LinkButton\#usage-no-href)

When a link button link does not have an href prop, it is rendered as a `<span role="link">` instead of an `<a>`. Events will need to be handled in JavaScript with the `onPress` prop.

Note: this will not behave like a native link. Browser features like context menus and open in a new tab will not apply.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Learn more

```

import { LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <LinkButton
            onPress={() => {
                window.alert("You clicked the link button!");
            }}
        >
            Learn more
        </LinkButton>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/LinkButton\#usage-fluid)

A link button can be expanded to full width to fill its parent container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Help](https://www.google.com/) [Help](https://www.google.com/) [Help](https://www.google.com/)

```

import { Inline, LinkButton, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" isFluid variant="primary">
                Help
            </LinkButton>
            <LinkButton href="https://www.google.com" isFluid variant="primary">
                <SparklesIcon />
                <Text>Help</Text>
            </LinkButton>
            <LinkButton href="https://www.google.com" isFluid>
                <Text>Help</Text>
                <SparklesIcon slot="end-icon" />
            </LinkButton>
        </Inline>
    );
}


```

### [Icon Only](https://hopper.workleap.design/components/LinkButton\#usage-icon-only)

A link button can contain only an icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Clean](https://www.google.com/)[Clean](https://www.google.com/)

```

import { Inline, LinkButton } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </LinkButton>
            <LinkButton href="https://www.google.com" size="sm" aria-label="Clean" variant="secondary">
                <SparklesIcon />
            </LinkButton>
        </Inline>
    );
}


```

### [Router Link](https://hopper.workleap.design/components/LinkButton\#usage-router-link)

A link button can be used with any Router. For more information, see the [Client Side Routing](https://hopper.workleap.design/components/client-side-routing) article.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Go to next router page](https://hopper.workleap.design/123)

```

import { HopperProvider, LinkButton, Text } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([{\
        path: "/123",\
        element: (\
            <Text>\
                Navigated Successfully!\
            </Text>\
        )\
    }, {\
        path: "*",\
        element: <Example />\
    }\
    ]);

    return (
        <RouterProvider router={router} />
    );
}

function Example() {
    const navigate = useNavigate();

    return (
        // Set up the HopperProvider at the root of your app.
        <HopperProvider colorScheme="light" navigate={navigate}>
            <LinkButton href="/123">Go to next router page</LinkButton>
        </HopperProvider>

    );
}


```

### [Icon](https://hopper.workleap.design/components/LinkButton\#usage-icon)

A link button can contain icons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Help](https://www.google.com/) [Help](https://www.google.com/)

```

import { Inline, LinkButton, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" variant="secondary">
                <SparklesIcon />
                <Text>Help</Text>
            </LinkButton>
            <LinkButton href="https://www.google.com" size="sm" variant="secondary">
                <SparklesIcon />
                <Text>Help</Text>
            </LinkButton>
        </Inline>
    );
}


```

### [End Icon](https://hopper.workleap.design/components/LinkButton\#usage-end-icon)

Nonstandard end icons can be provided to handle special cases. However, think twice before adding end icons, start icons should be your go-to.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Help](https://www.google.com/) [Help](https://www.google.com/)

```

import { Inline, LinkButton, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Help</Text>
            </LinkButton>
            <LinkButton href="https://www.google.com" size="sm" variant="secondary">
                <SparklesIcon slot="end-icon" />
                <Text>Help</Text>
            </LinkButton>
        </Inline>
    );
}


```

## [Props](https://hopper.workleap.design/components/LinkButton\#props)

variant?

`ButtonVariant`

The visual style of the button.

_Defaults to primary._

size?

`ResponsiveProp<ButtonSize>`

A button can vary in size.

_Defaults to md._

isFluid?

`ResponsiveProp<boolean>`

Whether or not the button takes up the width of its container.

isExternal?

`boolean`

Whether the button should open in a new tab.

style?

`CSSProperties | ((values: LinkRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

isDisabled?

`boolean`

Whether the link is disabled.

autoFocus?

`boolean`

Whether the element should receive focus on render.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

children?

`ReactNode | ((values: LinkRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: LinkRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onPress?

`((e: PressEvent) => void)`

Handler that is called when the press is released over the target.

onPressStart?

`((e: PressEvent) => void)`

Handler that is called when a press interaction starts.

onPressEnd?

`((e: PressEvent) => void)`

Handler that is called when a press interaction ends, either
over the target or when the pointer leaves the target.

onPressChange?

`((isPressed: boolean) => void)`

Handler that is called when the press state changes.

onPressUp?

`((e: PressEvent) => void)`

Handler that is called when a press is released over the target, regardless of
whether it started on the target or not.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/LinkButton\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `onClick` has been renamed to `onPress` to be closer to the [React Aria API](https://react-spectrum.adobe.com/react-aria/Button.html#events).
- `Counter` is no longer allowed as a specialized slot.
- `ButtonAsLink` is renamed to `LinkButton`.

## Segmented Control Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# SegmentedControl

The SegmentedControl component presents a horizontal row of options or actions that are contextually or conceptually related. It allows users to select a single option at a time.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/SegmentedControl/src/SegmentedControl.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[SegmentedControl]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Day

Week

Month

Year

```

import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl aria-label="Time granularity">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}


```

## [Usage](https://hopper.workleap.design/components/SegmentedControl\#usage)

### [Selected](https://hopper.workleap.design/components/SegmentedControl\#usage-selected)

A segmented control can have an item initially selected, by using `defaultSelectedKey` for uncontrolled or `selectedKey` for controlled.
Here's an example where one item is selected using defaultSelectedKey.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Day

Week

Month

Year

```

import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl aria-label="Time granularity" defaultSelectedKey="day">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}


```

### [Size](https://hopper.workleap.design/components/SegmentedControl\#usage-size)

A segmented control supports multiple sizes. Here’s an example demonstrating the medium size option:

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Day

Week

Month

Year

```

import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl aria-label="Time granularity" defaultSelectedKey="day" size="md">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}


```

### [Icon only](https://hopper.workleap.design/components/SegmentedControl\#usage-icon-only)

Items within a segmented control can contain only icons. An accessible name must be provided through [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) prop. See also [WCAG practices](https://www.w3.org/TR/WCAG20-TECHS/ARIA6.html).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";
import { OrderedListIcon, UnorderedListIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <SegmentedControl aria-label="List ordering">
            <SegmentedControlItem id="unordered">
                <UnorderedListIcon aria-label="unordered" />
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <OrderedListIcon aria-label="ordered" />
            </SegmentedControlItem>
        </SegmentedControl>
    );
}


```

### [Icon](https://hopper.workleap.design/components/SegmentedControl\#usage-icon)

A segmented control can contain items with icons, starting or ending.
**Non standard** starting icons can be provided to handle special cases. However, think twice before adding start icons, end icons should be your go to.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Unordered

Ordered

```

import { SegmentedControl, SegmentedControlItem, Text } from "@hopper-ui/components";
import { OrderedListIcon, UnorderedListIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <SegmentedControl aria-label="List ordering">
            <SegmentedControlItem id="unordered">
                <UnorderedListIcon slot="start-icon" />
                <Text>Unordered</Text>
            </SegmentedControlItem>
            <SegmentedControlItem id="ordered">
                <Text>Ordered</Text>
                <OrderedListIcon />
            </SegmentedControlItem>
        </SegmentedControl>
    );
}


```

### [Justified](https://hopper.workleap.design/components/SegmentedControl\#usage-justified)

A segmented control can have items with similar widths.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Day

Week

Month

Year

```

import { SegmentedControl, SegmentedControlItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <SegmentedControl UNSAFE_width="400px" isJustified aria-label="Time granularity">
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/SegmentedControl\#usage-controlled)

A segmented control can have a controlled selected value. In this example, it shows how it is possible to select an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Day

Week

Month

Year

```

import { SegmentedControl, SegmentedControlItem, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key>("day");

    const handleSelectionChange = (key: Key) => {
        if (selectedKey === key) {
            return;
        }

        setSelectedKey(key);
    };

    return (
        <SegmentedControl
            aria-label="Time granularity"
            selectedKey={selectedKey}
            onSelectionChange={handleSelectionChange}
        >
            <SegmentedControlItem id="day">Day</SegmentedControlItem>
            <SegmentedControlItem id="week">Week</SegmentedControlItem>
            <SegmentedControlItem id="month">Month</SegmentedControlItem>
            <SegmentedControlItem id="year">Year</SegmentedControlItem>
        </SegmentedControl>
    );
}


```

## [Props](https://hopper.workleap.design/components/SegmentedControl\#props)

### [SegmentedControl](https://hopper.workleap.design/components/SegmentedControl\#props-segmentedcontrol)

isDisabled?

`boolean`

Whether the segmented control is disabled.

isJustified?

`boolean`

Whether the items should divide the container width equally.

selectedKey?

`Key`

The id of the currently selected item (controlled).

defaultSelectedKey?

`Key`

The id of the initial selected item (uncontrolled).

size?

`ResponsiveProp<SegmentedControlItemSize>`

The size of the controls.
\*

_Defaults to sm._

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Events

onSelectionChange?

`((id: Key) => void)`

Handler that is called when the selection changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [SegmentedControlItem](https://hopper.workleap.design/components/SegmentedControl\#props-segmentedcontrolitem)

id

`Key`

The id of the item, matching the value used in SegmentedControl's `selectedKey` prop.

isDisabled?

`boolean`

Whether the item is disabled or not.

size?

`ResponsiveProp<SegmentedControlItemSize>`

The size of the item.
\*

_Defaults to sm._

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Tile Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Tile

### Alpha component

This component is still a work in progress and may not fully address all design requirements. Its API and properties are subject to change as we refine the design and functionality to better meet user needs.

A tile groups information into an interactive element to let users browse and take action on a group of related items.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Tile/src/Tile.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Tile]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tile } from "../src/index.ts";

export default function Example() {
    return (
        <Tile id="camel">Camel</Tile>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Tile\#usage)

### [Selected](https://hopper.workleap.design/components/Tile\#usage-selected)

A tile can be initially selected, by using `defaultSelectedKey` or `isSelected`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Camel

```

import { Tile } from "../src/index.ts";

export default function Example() {
    return (
        <Tile id="camel" isSelected>Camel</Tile>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Tile\#usage-disabled)

A tile can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tile } from "../src/index.ts";

export default function Example() {
    return (
        <Tile id="camel" isDisabled>Camel</Tile>
    );
}


```

### [Selected and Disabled](https://hopper.workleap.design/components/Tile\#usage-selected-and-disabled)

A tile can be selected and disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Camel

```

import { Tile } from "../src/index.ts";

export default function Example() {
    return (
        <Tile id="camel" isDisabled isSelected>Camel</Tile>
    );
}


```

## [Props](https://hopper.workleap.design/components/Tile\#props)

### [Tile](https://hopper.workleap.design/components/Tile\#props-tile)

id

`Key`

The id of the Tile, matching the values used in TileGroup's `selectedKeys` prop.

style?

`CSSProperties | ((values: ToggleButtonRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: ToggleButtonRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

type?

`"button" | "submit" | "reset"`

The behavior of the button when used in an HTML form.

_Defaults to 'button'._

isSelected?

`boolean`

Whether the element should be selected (controlled).

defaultSelected?

`boolean`

Whether the element should be selected (uncontrolled).

isDisabled?

`boolean`

Whether the button is disabled.

autoFocus?

`boolean`

Whether the element should receive focus on render.

className?

`string | ((values: ToggleButtonRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onChange?

`((isSelected: boolean) => void)`

Handler that is called when the element's selection state changes.

onPress?

`((e: PressEvent) => void)`

Handler that is called when the press is released over the target.

onPressStart?

`((e: PressEvent) => void)`

Handler that is called when a press interaction starts.

onPressEnd?

`((e: PressEvent) => void)`

Handler that is called when a press interaction ends, either
over the target or when the pointer leaves the target.

onPressChange?

`((isPressed: boolean) => void)`

Handler that is called when the press state changes.

onPressUp?

`((e: PressEvent) => void)`

Handler that is called when a press is released over the target, regardless of
whether it started on the target or not.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-expanded?

`boolean | "true" | "false"`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "true" | "false" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-pressed?

`boolean | "true" | "false" | "mixed"`

Indicates the current "pressed" state of toggle buttons.

preventFocusOnPress?

`boolean`

Whether to prevent focus from moving to the button when pressing it.

Caution, this can make the button inaccessible and should only be used when alternative keyboard interaction is provided,
such as ComboBox's MenuTrigger or a NumberField's increment/decrement control.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## TileGroup Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# TileGroup

### Alpha component

This component is still a work in progress and may not fully address all design requirements. Its API and properties are subject to change as we refine the design and functionality to better meet user needs.

A TileGroup groups Tiles to let users browse and take action on a group of related items.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Tile/src/TileGroup.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[TileGroup]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

FrogCamelElephant

```

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals">
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}


```

## [Usage](https://hopper.workleap.design/components/TileGroup\#usage)

### [Selected](https://hopper.workleap.design/components/TileGroup\#usage-selected)

A tile group can have an item initially selected, by using `defaultSelectedKeys` for uncontrolled or `selectedKeys` for controlled.
Here's an example where one item is selected using defaultSelectedKeys.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

FrogCamelElephant

```

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals" defaultSelectedKeys={["camel"]}>
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/TileGroup\#usage-controlled)

A tile group can have a controlled selected value. In this example, it shows how it is possible to select an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

FrogCamelElephant

```

import type { Key } from "@hopper-ui/components";
import { useState } from "react";

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>();

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    return (
        <TileGroup aria-label="Animals"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
        >
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/TileGroup\#usage-disabled)

A tile group can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

FrogCamelElephant

```

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals" isDisabled>
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}


```

### [Wrapping](https://hopper.workleap.design/components/TileGroup\#usage-wrapping)

Tiles are automatically wrapped

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals">
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
            <Tile id="giraffe">Giraffe</Tile>
            <Tile id="hippo">Hippo</Tile>
        </TileGroup>
    );
}


```

### [Number of columns](https://hopper.workleap.design/components/TileGroup\#usage-number-of-columns)

A tile group can have a number of columns. Default is 3. Here's an example where it's 4.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

FrogCamelElephantGiraffeHippo

```

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals" numberOfColumns={4}>
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
            <Tile id="giraffe">Giraffe</Tile>
            <Tile id="hippo">Hippo</Tile>
        </TileGroup>
    );
}


```

## [Props](https://hopper.workleap.design/components/TileGroup\#props)

### [TileGroup](https://hopper.workleap.design/components/TileGroup\#props-tilegroup)

numberOfColumns?

`ResponsiveProp<number>`

The number of columns to display the tiles in.

_Defaults to 3._

selectionMode?

`"single" | "multiple"`

Whether single or multiple selection is enabled.

_Defaults to single._

disallowEmptySelection?

`boolean`

Whether the collection allows empty selection.

_Defaults to true._

style?

`CSSProperties | ((values: ToggleButtonGroupRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

orientation?

`Orientation`

The orientation of the the toggle button group.

_Defaults to 'horizontal'._

selectedKeys?

`Iterable<Key>`

The currently selected keys in the collection (controlled).

defaultSelectedKeys?

`Iterable<Key>`

The initial selected keys in the collection (uncontrolled).

isDisabled?

`boolean`

Whether all items are disabled.

children?

`ReactNode | ((values: ToggleButtonGroupRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ToggleButtonGroupRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onSelectionChange?

`((keys: Set<Key>) => void)`

Handler that is called when the selection changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## ListBox Component Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# ListBox

A list box displays actions relevant to the user’s current selection.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/ListBox/src/ListBox.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[ListBox]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox aria-label="list of options">
            <ListBoxItem>Developer</ListBoxItem>
            <ListBoxItem>Designer</ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Listbox\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Listbox\#anatomy-composed-components)

#### [ListBox](https://hopper.workleap.design/components/Listbox\#listbox)

A `ListBox` uses the following components:

[**Avatar** \\
\\
An avatar is used to represent a user, team or another entity.](https://hopper.workleap.design/components/Avatar)

[**Badge** \\
\\
A badge is used to bring attention to an element.](https://hopper.workleap.design/components/Badge)

[A placeholder for an header section.](https://hopper.workleap.design/components/Header)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Listbox\#usage)

### [Empty state](https://hopper.workleap.design/components/Listbox\#usage-empty-state)

A list box can have an empty state.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox aria-label="list of options" renderEmptyState={() => "No results found."}>
            {[]}
        </ListBox>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Listbox\#usage-disabled)

A list box with a disabled item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            disabledKeys={["2"]}
            aria-label="list of options"
        >
            <ListBoxItem id="1">Developer</ListBoxItem>
            <ListBoxItem id="2">Designer</ListBoxItem>
            <ListBoxItem id="3">Manager</ListBoxItem>
        </ListBox>
    );
}


```

### [Invalid](https://hopper.workleap.design/components/Listbox\#usage-invalid)

A list box that is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox
            isInvalid
            selectionMode="multiple"
            disabledKeys={["2"]}
            aria-label="list of options with a description"
        >
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/Listbox\#usage-fluid)

A fluid list box will take up the full width of its container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox isFluid aria-label="list of options with a description">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Section](https://hopper.workleap.design/components/Listbox\#usage-section)

A list box can have sections and section headers.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Header, ListBox, ListBoxItem, ListBoxSection } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem>Developer</ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
            <ListBoxSection>
                <Header>Creative Department</Header>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Copywriter</ListBoxItem>
                <ListBoxItem>UX Researcher</ListBoxItem>
            </ListBoxSection>
            <ListBoxSection>
                <Header>Operations</Header>
                <ListBoxItem>Project Coordinator</ListBoxItem>
                <ListBoxItem>QA Specialist</ListBoxItem>
            </ListBoxSection>
            <ListBoxItem>Product Owner</ListBoxItem>
        </ListBox>
    );
}


```

### [Dividers](https://hopper.workleap.design/components/Listbox\#usage-dividers)

A list box can have dividers.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Divider, ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem>Item 1</ListBoxItem>
            <ListBoxItem>Item 2</ListBoxItem>
            <ListBoxItem>Item 3</ListBoxItem>
            <Divider />
            <ListBoxItem>Item 4</ListBoxItem>
            <ListBoxItem>Item 5</ListBoxItem>
        </ListBox>
    );
}


```

### [Avatar](https://hopper.workleap.design/components/Listbox\#usage-avatar)

A ListBox can contain an avatar.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="Team">
            <ListBoxItem textValue="Fred Smith">
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
                <SparklesIcon slot="end-icon" />
            </ListBoxItem>
            <ListBoxItem textValue="Karen Smith">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </ListBoxItem>
            <ListBoxItem textValue="John Doe">
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Count](https://hopper.workleap.design/components/Listbox\#usage-count)

A list box can contain a count using a badge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <SparklesIcon slot="end-icon" />
                <Badge>50</Badge>
            </ListBoxItem>
            <ListBoxItem textValue="Developer">
                <Badge variant="subdued">99+</Badge>
                <Text>Developer</Text>
            </ListBoxItem>
            <ListBoxItem>Designer</ListBoxItem>
        </ListBox>
    );
}


```

### [Dynamic Lists](https://hopper.workleap.design/components/Listbox\#usage-dynamic-lists)

Items and sections can be populated from a hierarchial data structure.
If a section has a header, the `Collection` component can be used to render the child items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Collection, Header, ListBox, ListBoxItem, ListBoxSection } from "@hopper-ui/components";

const OPTIONS_WITH_SECTIONS = [\
    {\
        name: "Boy Names", children: [\
            { id: 2, name: "Fred" },\
            { id: 3, name: "Bob" },\
            { id: 4, name: "Gabriel" }\
        ]\
    },\
    {\
        name: "Girl Names", children: [\
            { id: 6, name: "Sarah" },\
            { id: 7, name: "Louise" },\
            { id: 8, name: "Karen2" }\
        ]\
    }\
];

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            aria-label="Names"
            items={OPTIONS_WITH_SECTIONS}
        >
            {section => {
                return (
                    <ListBoxSection id={section.name}>
                        <Header>{section.name}</Header>
                        <Collection items={section.children}>
                            {item => <ListBoxItem id={item.name}>{item.name}</ListBoxItem>}
                        </Collection>
                    </ListBoxSection>
                );
            }}
        </ListBox>
    );
}


```

### [Icons](https://hopper.workleap.design/components/Listbox\#usage-icons)

A list box can contain icons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <SparklesIcon />
                <Text>Designer</Text>
            </ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}


```

### [End Icons](https://hopper.workleap.design/components/Listbox\#usage-end-icons)

A list box can contain icons at the end of a list item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, ListBox, ListBoxItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <SparklesIcon slot="end-icon" />
            </ListBoxItem>
            <ListBoxItem>Manager</ListBoxItem>
        </ListBox>
    );
}


```

### [Loading](https://hopper.workleap.design/components/Listbox\#usage-loading)

A list box can have a loading state.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            aria-label="list of options"
            isLoading
        >
            {[]}
        </ListBox>
    );
}


```

### [Load on scroll](https://hopper.workleap.design/components/Listbox\#usage-load-on-scroll)

A list box can load more items when scrolling within.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, useAsyncList } from "@hopper-ui/components";

interface Character {
    name: string;
}

export default function Example() {
    const list = useAsyncList<Character>({
        async load({ signal, cursor }) {
            const res = await fetch(cursor || "https://pokeapi.co/api/v2/pokemon", {
                signal
            });
            const json = await res.json();

            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    return (
        <ListBox
            selectionMode="single"
            aria-label="list of options"
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
            maxHeight="core_1280"
        >
            {item => (
                <ListBoxItem id={item.name}>{item.name}</ListBoxItem>
            )}
        </ListBox>
    );
}


```

### [Single selection](https://hopper.workleap.design/components/Listbox\#usage-single-selection)

A list box can have a single selected item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, Text, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));

    return (
        <ListBox
            selectionMode="single"
            aria-label="list of options"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <ListBoxItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Single selection indicator](https://hopper.workleap.design/components/Listbox\#usage-single-selection-indicator)

A list box can have a different selection indicator for single select.
By default, `disallowEmptySelection` is set to true when the selection indicator is a radio button.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, Text, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));

    return (
        <ListBox
            selectionMode="single"
            selectionIndicator="input"
            aria-label="list of options"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <ListBoxItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Multiple selection](https://hopper.workleap.design/components/Listbox\#usage-multiple-selection)

A list box can have multiple selected items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Header, ListBox, ListBoxItem, ListBoxSection, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));

    return (
        <ListBox
            selectionMode="multiple"
            aria-label="list of options"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <ListBoxSection aria-label="section">
                <Header>Self review</Header>
                <ListBoxItem id="1">Overdue</ListBoxItem>
                <ListBoxItem id="2">In progress</ListBoxItem>
                <ListBoxItem id="3">Submitted</ListBoxItem>
            </ListBoxSection>
            <ListBoxSection aria-label="section">
                <Header>Manager review</Header>
                <ListBoxItem id="4">Overdue</ListBoxItem>
                <ListBoxItem id="5">In progress</ListBoxItem>
                <ListBoxItem id="6">Submitted</ListBoxItem>
            </ListBoxSection>
        </ListBox>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Listbox\#usage-sizes)

List boxes can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="flex-start">
            <ListBox size="lg" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="md" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="sm" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
            <ListBox size="xs" selectionMode="single" aria-label="list of options">
                <ListBoxItem>Developer</ListBoxItem>
                <ListBoxItem>Designer</ListBoxItem>
                <ListBoxItem>Manager</ListBoxItem>
            </ListBox>
        </Inline>
    );
}


```

### [Description](https://hopper.workleap.design/components/Listbox\#usage-description)

A list box item can have a description.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox aria-label="list of options with a description">
            <ListBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ListBoxItem>
            <ListBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ListBoxItem>
        </ListBox>
    );
}


```

### [Item size](https://hopper.workleap.design/components/Listbox\#usage-item-size)

List box items can vary in sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ListBox, ListBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ListBox selectionMode="single" aria-label="list of options">
            <ListBoxItem size="xs">Developer</ListBoxItem>
            <ListBoxItem size="sm">Designer</ListBoxItem>
            <ListBoxItem size="md">Manager</ListBoxItem>
            <ListBoxItem size="lg">Copywriter</ListBoxItem>
        </ListBox>
    );
}


```

## [Props](https://hopper.workleap.design/components/Listbox\#props)

### [ListBox](https://hopper.workleap.design/components/Listbox\#props-listbox)

isFluid?

`ResponsiveProp<boolean>`

Whether or not the ListBox is 100% of its container's width.

isInvalid?

`boolean`

Whether or not the ListBox is in an invalid state.

isLoading?

`boolean`

Whether data is currently being loaded.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be either a radio or checkbox based on the selection mode.

_Defaults to check._

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBox can vary in size.

_Defaults to sm._

loadingListBoxItemProps?

`ListBoxItemProps<T>`

The props of the ListBoxItem.

style?

`CSSProperties | ((values: ListBoxRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((item: T) => ReactNode)`

The contents of the collection.

selectionBehavior?

`SelectionBehavior`

How multiple selection should behave in the collection.

autoFocus?

`boolean | FocusStrategy`

Whether to auto focus the listbox or an option.

shouldFocusWrap?

`boolean`

Whether focus should wrap around when the end/start is reached.

items?

`Iterable<T>`

Item objects in the collection.

disabledKeys?

`Iterable<Key>`

The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.

selectionMode?

`SelectionMode`

The type of selection that is allowed in the collection.

disallowEmptySelection?

`boolean`

Whether the collection allows empty selection.

selectedKeys?

`Iterable<Key> | "all"`

The currently selected keys in the collection (controlled).

defaultSelectedKeys?

`Iterable<Key> | "all"`

The initial selected keys in the collection (uncontrolled).

dragAndDropHooks?

`DragAndDropHooks`

The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for the ListBox.

renderEmptyState?

`((props: ListBoxRenderProps) => ReactNode)`

Provides content to display when there are no items in the list.

layout?

`"grid" | "stack"`

Whether the items are arranged in a stack or grid.

_Defaults to 'stack'._

orientation?

`Orientation`

The primary orientation of the items. Usually this is the
direction that the collection scrolls.

_Defaults to 'vertical'._

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

className?

`string | ((values: ListBoxRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onLoadMore?

`(() => void)`

Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.

onAction?

`((key: Key) => void)`

Handler that is called when a user performs an action on an item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onSelectionChange?

`((keys: Selection) => void)`

Handler that is called when the selection changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onScroll?

`((e: UIEvent<HTMLDivElement, UIEvent>) => void)`

Handler that is called when a user scrolls. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [ListBoxSection](https://hopper.workleap.design/components/Listbox\#props-listboxsection)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode | ((item: T) => ReactElement<any, string | JSXElementConstructor<any>>)`

Static child items or a function to render children.

items?

`Iterable<T>`

Item objects in the section.

id?

`Key`

The unique id of the section.

value?

`object`

The object value that this section represents. When using dynamic collections, this is set automatically.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for the section.

### [ListBoxItem](https://hopper.workleap.design/components/Listbox\#props-listboxitem)

isLoading?

`boolean`

Whether the item is loading.

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBoxItem can vary in size.

_Defaults to sm._

isInvalid?

`boolean`

Whether or not the ListBoxItem is in an invalid state.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.

_Defaults to check._

radioProps?

`DecorativeRadioProps`

The props for the Radio.

checkboxProps?

`DecorativeCheckboxProps`

The props for the Checkbox.

style?

`CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

The unique id of the item.

value?

`object`

The object value that this item represents. When using dynamic collections, this is set automatically.

textValue?

`string`

A string representation of the item's contents, used for features like typeahead.

isDisabled?

`boolean`

Whether the item is disabled.

children?

`ReactNode | ((values: ListBoxItemRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ListBoxItemRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

### \#\#\#\# Events

onAction?

`(() => void)`

Handler that is called when a user performs an action on the item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for this item.

## [Migration Notes](https://hopper.workleap.design/components/Listbox\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `disabled` has been renamed to `isDisabled`.
- `validationState` has been removed. `isInvalid` should be used instead.
- `tabbable` has been removed.
- `useVirtualFocus` doesn't exist.
- `Listbox` has been renamed to `ListBox` to follow [React Aria Components](https://react-spectrum.adobe.com/react-aria/ListBox.html).

## TagGroup Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# TagGroup

The TagGroup is a dynamic UI component that encapsulates a collection of tags. Each tag represents a label, category, keyword, or filter, and can be used for various groupings

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/tag/src/TagGroup.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[TagGroup]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/TagGroup\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/TagGroup\#anatomy-composed-components)

A `TagGroup` uses the following components:

[**Avatar** \\
\\
An avatar is used to represent a user, team or another entity.](https://hopper.workleap.design/components/Avatar)

[**Badge** \\
\\
A badge is used to bring attention to an element.](https://hopper.workleap.design/components/Badge)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/TagGroup\#usage)

### [Label](https://hopper.workleap.design/components/TagGroup\#usage-label)

A tag group can use the `label` prop to provide more context to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Jobs

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup label="Jobs">
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}

```

### [Description](https://hopper.workleap.design/components/TagGroup\#usage-description)

A tag group can use a `description` prop to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

The jobs in this list are in no particular order.

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" description="The jobs in this list are in no particular order.">
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}

```

### [Disabled](https://hopper.workleap.design/components/TagGroup\#usage-disabled)

Tags can be disabled using the `disabledKeys` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" disabledKeys={["1", "2", "3"]}>
            <Tag id="1">Designer</Tag>
            <Tag id="2">Developer</Tag>
            <Tag id="3">Manager</Tag>
        </TagGroup>
    );
}


```

### [Disabled Item](https://hopper.workleap.design/components/TagGroup\#usage-disabled-item)

A tag can be disabled using the `isDisabled` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Designer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" isDisabled>
                Designer
            </Tag>
            <Tag id="developer">
                Designer
            </Tag>
            <Tag id="manager">
                Manager
            </Tag>
        </TagGroup>
    );
}


```

### [Invalid Tag](https://hopper.workleap.design/components/TagGroup\#usage-invalid-tag)

If a tag group is invalid, it will display an error message. Displaying this error message will hide the helper message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

Select a job and the description will appear

```

import { Tag, TagGroup, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isInvalid, setIsInvalid] = useState(true);

    function onChange(keys: Selection) {
        // if value is empty, then it is invalid
        if (typeof keys === "object") {
            setIsInvalid(keys.size === 0);
        }
    }

    return (
        <TagGroup
            aria-label="Jobs"
            selectionMode="multiple"
            onSelectionChange={onChange}
            isInvalid={isInvalid}
            description="Unselect all to show the error message"
            errorMessage="Select a job and the description will appear"
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

### [Removable](https://hopper.workleap.design/components/TagGroup\#usage-removable)

Tags can be removed using the `onRemove` callback.
If you are using a keyboard, you can press the backspace key to remove a tag.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

### [Selectable](https://hopper.workleap.design/components/TagGroup\#usage-selectable)

Tags can be selected using the `selectionMode` prop.
Use `defaultSelectedKeys` for initially selected items (uncontrolled) and `selectedKeys` to manage selected items (controlled).
The selected keys should match the item's `id` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" selectionMode="multiple" defaultSelectedKeys={["designer", "developer"]}>
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/TagGroup\#usage-sizes)

A tag group can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

Designer

Developer

Manager

Designer

Developer

Manager

```

import { Stack, Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TagGroup aria-label="Jobs" size="sm" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
            <TagGroup aria-label="Jobs" size="md" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
            <TagGroup aria-label="Jobs" size="lg" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
        </Stack>
    );
}


```

### [Item Sizes](https://hopper.workleap.design/components/TagGroup\#usage-item-sizes)

A tag can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" size="sm">Designer</Tag>
            <Tag id="developer" size="md">Developer</Tag>
            <Tag id="manager" size="lg">Manager</Tag>
        </TagGroup>
    );
}


```

### [Variants](https://hopper.workleap.design/components/TagGroup\#usage-variants)

A tag group can vary in style using the `variant` prop. The one seen here is `subdued`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Developer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" variant="subdued">
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

### [Item Variants](https://hopper.workleap.design/components/TagGroup\#usage-item-variants)

A tag can vary in style using the `variant` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Neutral

Subdued

Progress

Positive

Caution

Negative

Option 1

Option 2

Option 3

Option 4

Option 5

Option 6

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag variant="neutral">
                Neutral
            </Tag>
            <Tag variant="subdued">
                Subdued
            </Tag>
            <Tag variant="progress">
                Progress
            </Tag>
            <Tag variant="positive">
                Positive
            </Tag>
            <Tag variant="caution">
                Caution
            </Tag>
            <Tag variant="negative">
                Negative
            </Tag>
            <Tag variant="option1">
                Option 1
            </Tag>
            <Tag variant="option2">
                Option 2
            </Tag>
            <Tag variant="option3">
                Option 3
            </Tag>
            <Tag variant="option4">
                Option 4
            </Tag>
            <Tag variant="option5">
                Option 5
            </Tag>
            <Tag variant="option6">
                Option 6
            </Tag>
        </TagGroup>
    );
}


```

### [Empty List](https://hopper.workleap.design/components/TagGroup\#usage-empty-list)

Using the `renderEmptyState` prop, you can customize the empty state message when there are no tags.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No jobs posting available

```

import { TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Status" renderEmptyState={() => "No jobs posting available"}>
            {[]}
        </TagGroup>
    );
}


```

### [Invalid TagGroup](https://hopper.workleap.design/components/TagGroup\#usage-invalid-taggroup)

A tag can be set as invalid using the `isInvalid` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer

Designer

Manager

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" isInvalid>
                Designer
            </Tag>
            <Tag id="developer">
                Designer
            </Tag>
            <Tag id="manager">
                Manager
            </Tag>
        </TagGroup>
    );
}


```

### [Loading](https://hopper.workleap.design/components/TagGroup\#usage-loading)

A tag can have a loading state using the `isLoading` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Manager

Developer

Designer

```

import { Tag, TagGroup, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <Tag id="manager" isLoading>Manager</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="designer">Designer</Tag>
        </TagGroup>
    );
}


```

### [Avatar](https://hopper.workleap.design/components/TagGroup\#usage-avatar)

A tag can contain an avatar.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Frodo Baggin

K

Karen Smith

John Smith

JS

```

import { Avatar, Tag, TagGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Team Members">
            <Tag id="1" textValue="Frodo Baggin" size="sm">
                <Avatar name="Frodo Baggins" src="https://i.pravatar.cc/96?img=3" />
                <Text>Frodo Baggin</Text>
            </Tag>
            <Tag id="2" textValue="Karen Smith" size="md">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </Tag>
            <Tag id="3" textValue="John Smith" size="lg">
                <Text>John Smith</Text>
                <Avatar name="John Smith" />
            </Tag>
        </TagGroup>
    );
}


```

### [Icons](https://hopper.workleap.design/components/TagGroup\#usage-icons)

A tag can contain an icon or an icon list.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

Manager

```

import { IconList, Tag, TagGroup, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="developer" size="sm" textValue="Developer">
                <SparklesIcon />
                <Text>Developer</Text>
            </Tag>
            <Tag id="designer" size="md" textValue="Designer">
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Tag>
            <Tag id="manager" size="lg" textValue="Manager">
                <Text>Manager</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Tag>
        </TagGroup>
    );
}


```

### [Count](https://hopper.workleap.design/components/TagGroup\#usage-count)

A tag can contain a count using the `Badge` component.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Designer12

Developer100

Manager99+

```

import { Badge, Tag, TagGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="designer" size="sm" textValue="Designer">
                <Text>Designer</Text>
                <Badge>12</Badge>
            </Tag>
            <Tag id="developer" size="md" textValue="Developer">
                <Text>Developer</Text>
                <Badge variant="subdued">100</Badge>
            </Tag>
            <Tag id="manager" size="lg" textValue="Manager">
                <Text>Manager</Text>
                <Badge>99+</Badge>
            </Tag>
        </TagGroup>
    );
}


```

### [Links](https://hopper.workleap.design/components/TagGroup\#usage-links)

A tag can be a link by using the `href` prop on the Tag component. Tags with an `href` are not selectable.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Google

Bing

Yahoo

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="1" href="https://www.google.com">Google</Tag>
            <Tag id="2" href="https://www.bing.com">Bing</Tag>
            <Tag id="3" href="https://www.yahoo.com">Yahoo</Tag>
        </TagGroup>
    );
}


```

### [React Router Links](https://hopper.workleap.design/components/TagGroup\#usage-react-router-links)

A tag can be rendered as a react router link when using the `href` prop and setting the `navigate` prop on the `HopperProvider`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Page 1

Page 2

```

import { HopperProvider, Tag, TagGroup } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([{\
        path: "/123",\
        element: <>Navigated Successfully to page 1! <Example /></>\
    }, {\
        path: "/456",\
        element: <>Navigated Successfully to page 2! <Example /></>\
    }, {\
        path: "*",\
        element: <Example />\
    }\
    ]);

    return (
        <RouterProvider router={router} />
    );
}

function Example() {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            <TagGroup aria-label="tag-group">
                <Tag id="1" href="/123">Page 1</Tag>
                <Tag id="2" href="/456">Page 2</Tag>
            </TagGroup>
        </HopperProvider>
    );
}


```

## [Props](https://hopper.workleap.design/components/TagGroup\#props)

### [TagGroup](https://hopper.workleap.design/components/TagGroup\#props-taggroup)

isInvalid?

`boolean`

Whether the tags are invalid or not.

size?

`ResponsiveProp<TagSize>`

A tag can vary in size.

_Defaults to md._

tagListProps?

`(Omit<Omit<TagListProps<T>, ListProps>, keyof StyledSystemProps> & StyledSystemProps)`

The tag list props

variant?

`TagVariant`

The visual style of the TagGroup.

_Defaults to neutral._

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

selectionBehavior?

`SelectionBehavior`

How multiple selection should behave in the collection.

disabledKeys?

`Iterable<Key>`

The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.

selectionMode?

`SelectionMode`

The type of selection that is allowed in the collection.

disallowEmptySelection?

`boolean`

Whether the collection allows empty selection.

selectedKeys?

`Iterable<Key> | "all"`

The currently selected keys in the collection (controlled).

defaultSelectedKeys?

`Iterable<Key> | "all"`

The initial selected keys in the collection (uncontrolled).

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

children?

`ReactNode | ((item: T) => ReactNode)`

The contents of the collection.

items?

`Iterable<T>`

Item objects in the collection.

renderEmptyState?

`((props: TagListRenderProps) => ReactNode)`

Provides content to display when there are no items in the tag list.

label?

`ReactNode`

The label of the field.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

### \#\#\#\# Events

onRemove?

`((keys: Set<Key>) => void)`

Handler that is called when a user deletes a tag.

onSelectionChange?

`((keys: Selection) => void)`

Handler that is called when the selection changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [Tag](https://hopper.workleap.design/components/TagGroup\#props-tag)

isInvalid?

`boolean`

Whether the tag is invalid or not.

isLoading?

`boolean`

Whether the tag is loading or not.

size?

`ResponsiveProp<TagSize>`

The size of the tag.

_Defaults to md._

variant?

`TagVariant`

The visual style of the Tag.

_Defaults to neutral._

clearButtonProps?

`ClearButtonProps`

The props of the ClearButton.

spinnerProps?

`SpinnerProps`

The props of the Spinner.

style?

`CSSProperties | ((values: TagRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

A unique id for the tag.

textValue?

`string`

A string representation of the tags's contents, used for accessibility.
Required if children is not a plain text string.

isDisabled?

`boolean`

Whether the tag is disabled.

children?

`ReactNode | ((values: TagRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: TagRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

### \#\#\#\# Events

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

## [Migration Notes](https://hopper.workleap.design/components/TagGroup\#migration-notes)

### [TagGroup](https://hopper.workleap.design/components/TagGroup\#migration-notes-taggroup)

Coming from Orbiter, you should be aware of the following changes:

- `onClear` is not supported.
- `validationState` is not supported. Use `isInvalid` instead,

### [Tag](https://hopper.workleap.design/components/TagGroup\#migration-notes-tag)

Coming from Orbiter, you should be aware of the following changes:

- A tag cannot be used without `TagList` and `TagGroup`.
- A dot is not supported
- `fluid` is not supported.
- `variant` values are now `neutral` \| `subdued` \| `progress` \| `positive` \| `caution` \| `negative` \| `option1` \| `option2` \| `option3` \| `option4` \| `option5` \| `option6` and not `solid` \| `outline`.
- `validationState` is not supported. Use `isInvalid` instead.

## Client Side Routing Guide

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Client Side Routing

Many Hopper components support rendering as HTML links. This page discusses how to set up your app to integrate Hopper links with your framework or client side router.

_Since Hopper components are designed on top of React Aria, this article is heavily inspired by the [Client Side Routing](https://react-spectrum.adobe.com/react-spectrum/routing.html) article in React-Aria's documentation._

## [Introduction](https://hopper.workleap.design/components/client-side-routing\#introduction)

Hopper components such as [Link](https://hopper.workleap.design/components/Link), Menu, Tabs, Table, and many others support rendering elements as links that perform navigation when the user interacts with them. Each component that supports link behavior accepts the href prop, which causes the component to render an `<a>` element. Other link DOM props such as target and download are also supported.

Depending on the component, users may interact with links in different ways. For example, users can navigate between tabs using the arrow keys, or open a link in a ComboBox using the enter key. Because Hopper components accept the href prop rather than supporting arbitrary element overrides, they can ensure that link navigation occurs when it is appropriate for the component.

By default, links perform native browser navigation when they are interacted with. However, many apps and frameworks use client side routers to avoid a full page reload when navigating between pages. The `HopperProvider` component configures all Hopper components within it to navigate using the client side router you provide. Set this up once in the root of your app, and any Hopper component with the href prop will automatically navigate using your router.

## [Provider setup](https://hopper.workleap.design/components/client-side-routing\#provider-setup)

The HopperProvider component accepts two props: `navigate` and `useHref`. `navigate` should be set to a function received from your router for performing a client side navigation programmatically. `useHref` is an optional prop that converts a router-specific href to a native HTML href, e.g. prepending a base path. The following example shows the general pattern. Framework-specific examples are shown below.

```hd-code

import { HopperProvider } from "@hopper-ui/components";
import { useNavigate, useHref } from "your-router";

function App() {
    const navigate = useNavigate();

    return (
        <HopperProvider navigate={navigate} useHref={useHref}>
            {/* ... */}
        </HopperProvider>
    );
}

```

### [Router options](https://hopper.workleap.design/components/client-side-routing\#provider-setup-router-options)

All link components accept a `routerOptions` prop, which is an object that is passed through to the client side router's navigate function as the second argument. This can be used to control any router-specific behaviors, such as scrolling, replacing instead of pushing to the history, etc.

```hd-code

<Link href="/login" routerOptions={{ replace: true }}>
  {/* ...*/}
</Link>

```

When using TypeScript, you can configure the RouterConfig type globally so that all link components have auto complete and type safety using a type provided by your router.

```hd-code

import type { RouterOptions } from "your-router";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: RouterOptions
    }
}

```

### [React Router](https://hopper.workleap.design/components/client-side-routing\#provider-setup-react-router)

The [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) hook from `react-router-dom` returns a navigate function you can pass to `HopperProvider`. The [useHref](https://reactrouter.com/en/main/hooks/use-href) hook can also be provided if you're using React Router's `basename` option. Ensure that the component that calls `useNavigate` and renders `HopperProvider` is inside the router component (e.g. BrowserRouter) so that it has access to React Router's internal context. The React Router `<Routes>` element should also be defined inside Hopper's `<HopperProvider>` so that links inside the rendered routes have access to the router.

```hd-code

import { BrowserRouter, type NavigateOptions, useHref, useNavigate } from "react-router-dom";
import { HopperProvider } from "@hopper-ui/components";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

function App() {
    const navigate = useNavigate();

    return (
        <HopperProvider navigate={navigate} useHref={useHref}>
            {/* Your app here... */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* ... */}
            </Routes>
        </HopperProvider>
    );
}

<BrowserRouter>
    <App />
</BrowserRouter>

```

## Hopper Color Schemes

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Color Schemes

Learn how color schemes work in Hopper, including how applications can adapt to operating system's dark mode.

## [Introduction](https://hopper.workleap.design/components/color-schemes\#introduction)

Hopper supports a light and a dark mode. These correspond to color schemes found in popular operating systems. Hopper defaults to the light color scheme, but the `colorScheme` property on the `HopperProvider` can be used to set the color scheme to `dark` or `system` (which will follow the user's operating system setting).

We recommend that all Hopper applications support both light and dark mode. It can be very jarring to use a light themed application when the rest of your applications are in dark mode, and visa versa. This can be accomplished by using Hopper color variables rather than hard coded color values. All Hopper components adapt to color scheme out of the box. See the [Styled System documentation](https://hopper.workleap.design/styled-system/overview/introduction) for details on how to use Hopper color variables in your own custom components.

## [Applying a color scheme](https://hopper.workleap.design/components/color-schemes\#applying-a-color-scheme)

A color scheme can either be enforced by providing a specific light or dark value to a [HopperProvider](https://hopper.workleap.design/components/HopperProvider).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

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

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

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

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

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

## [Context Hooks](https://hopper.workleap.design/components/color-schemes\#context-hooks)

To manage the color scheme in your application, Hopper exposes a `ColorSchemeContext` and a `useColorSchemeContext` hook.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

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

## [Utility Methods](https://hopper.workleap.design/components/color-schemes\#utility-methods)

### [useColorSchemeValue](https://hopper.workleap.design/components/color-schemes\#utility-methods-usecolorschemevalue)

Some features require the usage of custom colors. Those colors aren't like Hopper tokens and will not support color schemes out of the box.

To help with that, Hopper offers the `useColorSchemeValue` hook which will return the value matching the current color scheme of the closest `HopperProvider`.

You can test this hook by clicking the moon icon in the example below.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

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

## Hopper Component Modes

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Controlled Mode

Learn how to use controlled and uncontrolled modes to customize Hopper components.

When working with Hopper components, you can customize a component's behavior using **controlled** or **uncontrolled** properties, depending on your needs. This flexibility is the foundation for **building custom components** on top of Hopper, enabling you to implement interactive features or modify the default behavior of components while preserving their visual style and structure.

**Tip**: To dive deeper into the concept of controlled and uncontrolled components in React, read [React's guide here](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

## [Uncontrolled Mode](https://hopper.workleap.design/components/controlled-mode\#uncontrolled-mode)

**Uncontrolled mode** is great for situations where you don’t need to manage the component’s behavior with your own code.

In uncontrolled mode, the component manages its internal state. You provide an initial value using _defaultX_ properties, and the component updates its state automatically in response to user interactions.

For example, to create a [TagGroup](https://hopper.workleap.design/components/TagGroup) where some tags are initially selected, use the `defaultSelectedKeys` prop:

```

import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            selectionMode="multiple"
            defaultSelectedKeys={["designer", "developer"]}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

In this example:

- `defaultSelectedKeys`: Specifies the initially selected items.
- The component handles the selection state internally.

## [Controlled Mode](https://hopper.workleap.design/components/controlled-mode\#controlled-mode)

**Controlled mode** is suitable for scenarios where the component's state depends on external data or when you need to respond programmatically to user interactions or when you need to build a custom component.

In controlled mode, you manage the state of the component externally by providing the `X` and `onXChanged` properties. This allows for full control over the component's behavior and is ideal for complex interactions or when the component's state is derived from external logic.

For example, to fully manage the selected tags:

```

import { Tag, TagGroup, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState(["designer"]);

    const handleSelectionChange = (newSelectedKeys: Selection) => {
        if (newSelectedKeys === "all") {
            setSelectedKeys(["designer", "developer", "manager"]);
        } else {
            setSelectedKeys([...Array.from(newSelectedKeys).map(x => x.toString())]);
        }
    };

    return (
        <TagGroup
            aria-label="Jobs"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}


```

In this example:

- `selectedKeys`: Represents the current selection, controlled externally.
- `onSelectionChange`: Callback invoked when the selection changes, allowing you to update the external state.

## [Choosing Between Controlled and Uncontrolled Modes](https://hopper.workleap.design/components/controlled-mode\#choosing-between-controlled-and-uncontrolled-modes)

- Use uncontrolled mode (defaultX) for simpler use cases where internal state management by the component suffices.
- Use controlled mode (X and onXChanged) when external logic or advanced control is required.

By leveraging these modes, you can tailor Hopper components to meet your application's functional requirements while maintaining consistency and reusability.

## Hopper Form Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Forms

Forms allow users to enter and submit data, and provide them with feedback along the way. Hopper includes many components that integrate with HTML forms, with support for custom validation, labels, and help text.

_Since Hopper components are designed on top of React Aria, this article is heavily inspired by the [Forms](https://react-spectrum.adobe.com/react-spectrum/forms.html) article in React-Aria's documentation._

## [Labels and help text](https://hopper.workleap.design/components/forms\#labels-and-help-text)

Accessible forms start with clear, descriptive labels for each field. All Hopper form components support labeling using the `label` prop. In addition, help text associates additional context with a field such as a description or error message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Password

Password must be at least 8 characters.

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField
            label="Password"
            description="Password must be at least 8 characters."
        />
    );
}


```

Most fields should have a visible label. In rare exceptions, the aria-label or aria-labelledby attribute must be provided instead to identify the element.

## [Submitting data](https://hopper.workleap.design/components/forms\#submitting-data)

How you submit form data depends on your framework, application, and server. By default, HTML forms are submitted by the browser using a full page refresh. You can take control of form submission by calling preventDefault during the onSubmit event, and make an API call to submit the data however you like.

### [Uncontrolled forms](https://hopper.workleap.design/components/forms\#submitting-data-uncontrolled-forms)

The simplest way to get data from a form is using the browser's FormData API during the onSubmit event. This can be passed directly to [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch), or converted into a regular JavaScript object using [Object.fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries). Each field should have a name prop to identify it, and values will be serialized to strings by the browser.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Username

SubmitReset

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField
                label="Username"
                validate={value => value === "admin" ? "Nice try!" : null}
            />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}


```

By default, all Hopper components are uncontrolled, which means that the state is stored internally on your behalf. If you need access to the value in realtime, as the user is editing, you can make it controlled. You'll need to manage the state using React's [useState](https://react.dev/reference/react/useState) hook, and pass the current value and a change handler into each form component.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

You entered:

SubmitReset

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";
import { useState, type FormEvent } from "react";

export default function Example() {
    const [name, setName] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Submit data to your backend API...
        alert(name);
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextField label="Name" value={name} onChange={setName} />
            <div>You entered: {name}</div>
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}


```

## [Validation](https://hopper.workleap.design/components/forms\#validation)

Form validation is important to ensure user input is in an expected format and meets business requirements. Well-designed form validation assists the user with specific, helpful error messages without confusing and frustrating them with unnecessary errors on partial input. Hopper supports native HTML constraint validation with customizable UI, custom validation functions, realtime validation, and integration with server-side validation errors.

### [Built-in validation](https://hopper.workleap.design/components/forms\#validation-builtin-validation)

All Hopper form components integrate with native HTML [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This allows you to define constraints on each field such as required, minimum and maximum values, text formats such as email addresses, and even custom regular expression patterns. These constraints are checked by the browser when the user commits changes to the value (e.g. on blur) or submits the form.

To enable native validation, set the `validationBehavior="native"` prop on the [Form](https://hopper.workleap.design/components/Form) component. This example shows a required email field, which is validated by the browser and displayed with a help text.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Email

SubmitReset

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField label="Email" name="email" type="email" isRequired />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}


```

Supported constraints include:

- `isRequired` indicates that a field must have a value before the form can be submitted.
- `minValue` and `maxValue` specify the minimum and maximum value in a date picker or number field.
- `minLength` and `maxLength` specify the minimum and length of text input.
- `pattern` provides a custom [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) that a text input must conform to.
- `type="email"` and `type="url"` provide builtin validation for email addresses and URLs.

### [Customizing error messages](https://hopper.workleap.design/components/forms\#validation-customizing-error-messages)

By default, Hopper displays the error message provided by the browser, which is localized in the user's preferred language. You can customize these messages by providing a function to the `errorMessage` prop. This receives a list of error strings along with a [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object describing why the field is invalid, and should return an error message to display.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

SubmitReset

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField
                label="Name"
                name="name"
                isRequired
                errorMessage={({ validationDetails }) => (
                    validationDetails.valueMissing ? "Please enter a name." : ""
                )}
            />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}


```

**Note**: The default error messages are localized by the browser using the browser/operating system language setting. Hopper's Provider has no effect on validation errors.

### [Custom validation](https://hopper.workleap.design/components/forms\#validation-custom-validation)

In addition to the built-in constraints, custom validation is supported by providing a function to the validate prop. This function receives the current field value, and can return a string or array of strings representing one or more error messages. These are displayed to the user after the value is committed (e.g. on blur) to avoid distracting them on each keystroke.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";
import { useState, type FormEvent } from "react";

export default function Example() {
    const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Prevent default browser page refresh.
        e.preventDefault();

        // Get form data as an object.
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Submit to your backend API...
        setSubmitted(data);
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextField name="name" label="Name" />
            <ButtonGroup>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="secondary">Reset</Button>
            </ButtonGroup>
            {submitted && (
                <div>
                    You submitted: <code>{JSON.stringify(submitted)}</code>
                </div>
            )}
        </Form>
    );
}


```

## [Form libraries](https://hopper.workleap.design/components/forms\#form-libraries)

In most cases, uncontrolled forms with the builtin validation features are enough. However, if you are building a truly complex form, or integrating Hopper components into an existing form, a separate form library such as [React Hook Form](https://react-hook-form.com/) or [Formik](https://formik.org/) may be helpful.

### [React Hook Form](https://hopper.workleap.design/components/forms\#form-libraries-react-hook-form)

[React Hook Form](https://react-hook-form.com/) is a popular form library for React. It is primarily designed to work directly with plain HTML input elements, but supports custom form components like the ones in Hopper as well.

Since Hopper manages the state for components internally, you can use the (Controller)\[<https://react-hook-form.com/docs/usecontroller/controller\>] component from React Hook Form to integrate Hopper components. Pass the props for the `field` render prop through to the Hopper component you're using, and use the `fieldState` to get validation errors to display.

```

import { Button, Form, TextField } from "@hopper-ui/components";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
    name: string;
}


export default function Example() {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = (data: FormValues) => {
        // Call your API here...
        window.alert(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required." }}
                render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error }
                }) => (
                    <TextField
                        label="Name"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        isRequired
                        isInvalid={invalid}
                        errorMessage={error?.message}
                    />
                )}
            />
            <Button type="submit" variant="primary">Submit</Button>
        </Form>
    );
}


```

## Internationalization Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Internationalization

Adapting components to respect languages and cultures of users around the world is an great way to make your application accessible to the widest number of people.

## [Introduction](https://hopper.workleap.design/components/internationalization\#introduction)

Internationalization is the process of structuring your code and user interface to support localization. Hopper supports many aspects of localization for many components out of the box, including translations for builtin strings, localized date and number formatting. By using Hopper to build your applications, these aspects of internationalization are handled for you.

To set the locale of your application, follow the procedure described in the [Hopper Provider documentation](https://hopper.workleap.design/components/HopperProvider#application-provider-locales).

## [Supported locales](https://hopper.workleap.design/components/internationalization\#supported-locales)

Hopper currently supports translations for 2 locales. They are listed below.

- English (United States) - `en-US`
- French (Canada) - `fr-CA`

## [Optimizing bundle size](https://hopper.workleap.design/components/internationalization\#optimizing-bundle-size)

Hopper uses React-Aria for internationalization, which is a peer dependency. This means that you must install `react-aria` in your application. React-Aria includes translations for over 30 languages.
This is inclusive to the most users out of the box, but comes at the cost of bundle size. Since applications using Hopper do not support all of these locales, you can use React-Aria build plugins to include only the languages that we support in your JavaScript bundle.

The complete process is described in the [React-Aria documentation](https://react-spectrum.adobe.com/react-aria/internationalization.html#optimizing-bundle-size).

## [Utility Methods](https://hopper.workleap.design/components/internationalization\#utility-methods)

React-Aria (a peer dependency of Hopper) provides some utility methods to help with localization. See [useDateFormatter](https://react-spectrum.adobe.com/react-aria/useDateFormatter.html), [useNumberFormatter](https://react-spectrum.adobe.com/react-aria/useNumberFormatter.html), and [useCollator](https://react-spectrum.adobe.com/react-aria/useCollator.html) for more information. The [Internationalized](https://react-spectrum.adobe.com/internationalized/index.html) collection of libraries provides framework-agnostic utilities for representing and manipulating dates and times, as well as parsing and formatting numbers across many locales, calendar systems and numbering systems.

## Application Layouts with Flex and Grid

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Layout

Learn how to build application layouts with Hopper using Flex or Grid.

## [Introduction](https://hopper.workleap.design/components/layout\#introduction)

Hopper includes layout components to help build applications. The [Flex](https://hopper.workleap.design/components/Flex) and [Grid](https://hopper.workleap.design/components/Grid)
components are containers responsible for the layout of their children. `Flex` follows the the
[CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
algorithm, while `Grid` implements
[CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout).

These components provide props with predefined Hopper tokens for sizing, spacing,
and other layout options. You can use `Flex` and `Grid` together to build different
parts of your application, and even nest them to create more complex layouts.

You should prefer using flex and grid over other CSS layout models. Spacing between components should be managed by parent layout components rather than added directly to the children. This ensures components are composable when reused in different places and that spacing remains consistent.

In addition to `Flex` and `Grid`, some Hopper components include prebuilt layouts which you can
insert your content into via slots. You can read more about slots in the [slots](https://hopper.workleap.design/components/slots) concept page.

## [Flex](https://hopper.workleap.design/components/layout\#flex)

The [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
layout model is a simple yet versatile method of laying out components in rows and columns.
Use it to build vertical or horizontal stacks, simple wrapping grids, and more. The [Flex](https://hopper.workleap.design/components/Flex)
component can be used to create flexbox containers. Any Hopper component can be used as a child within these containers.
Flex layouts can be nested to create more complex layouts.

The `gap`, `rowGap` and `columnGap` can be defined with [Hopper space tokens](https://hopper.workleap.design/tokens/semantic/space)
to ensure consistency across applications, and allow the layout to adapt to different devices automatically.

### [Example](https://hopper.workleap.design/components/layout\#flex-example)

A simple vertical stack, with a gap between each item defined using a [Hopper space token](https://hopper.workleap.design/tokens/semantic/space).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Div, Flex } from "@hopper-ui/components";

export default function Example() {
    return (
        <Flex direction="column" width="core_1280" gap="inline-sm">
            <Div backgroundColor="decorative-option1" height="core_640" />
            <Div backgroundColor="decorative-option3" height="core_640" />
            <Div backgroundColor="decorative-option4" height="core_640" />
        </Flex>
    );
}


```

### [Learn more](https://hopper.workleap.design/components/layout\#flex-learn-more)

You can learn more about `Flex` and see more examples on the [Flex](https://hopper.workleap.design/components/Flex) page. There are many great resources on the web for learning flexbox as well.

- [The MDN guide to flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) — full walkthrough
of flexbox layout.
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — great reference for all of the
properties supported by flexbox.

## [Grid](https://hopper.workleap.design/components/layout\#grid)

[CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
is a powerful way to lay out elements in two dimensions. It can be used to to build full page application
layouts, or smaller user interface elements. It is especially powerful because it allows you to build many types of
layouts without extra presentational elements, keeping your code clean and semantic. In addition, grid layouts
are automatically mirrored in right-to-left languages.

The [Grid](https://hopper.workleap.design/components/Grid) component can be used as a container to define a grid layout. Any Hopper component can be used as
a child of a `Grid`. The `Grid` component extends the CSS syntax to support
defining grids using [Hopper-defined dimension tokens](https://hopper.workleap.design/tokens/core/dimensions).
This ensures that sizing and spacing is consistent between applications, and allows the layout to adapt to different devices
automatically.

### [Defining grids](https://hopper.workleap.design/components/layout\#grid-defining-grids)

There are many ways to define grids, but the simplest is to use the `areas` prop to declaratively
specify your layout using named areas. This prop accepts an array of strings which represent rows. Within the rows,
you specify space separated names for grid areas. The children of the `Grid` can declare the `gridArea` prop, which
places them into these named regions.

In addition, you can define the `columns` and `rows` props on the `Grid` container to specify the widths and heights of the columns and rows respectively. This can be
done using [Hopper-defined dimension tokens](https://hopper.workleap.design/tokens/core/dimensions) to ensure they are adaptive on various devices.

The following example shows how you could use `Grid` to declare a common application layout, with a header, sidebar,
content area, and footer. Notice how there are no nested layout elements — the layout is entirely declared in the
`Grid` and the children simply declare where they should be placed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Div, Grid } from "@hopper-ui/components";

export default function Example() {
    return (
        <Grid
            areas={[\
                "header header",\
                "sidebar content",\
                "footer footer"\
            ]}
            templateColumns={["1fr", "3fr"]}
            templateRows={["core_640", "auto", "core_640"]}
            UNSAFE_height="480px"
            UNSAFE_width="600px"
            gap="core_80"
        >
            <Div backgroundColor="decorative-option1" gridArea="header" />
            <Div backgroundColor="decorative-option2" gridArea="sidebar" />
            <Div backgroundColor="decorative-option3" gridArea="content" />
            <Div backgroundColor="decorative-option4" gridArea="footer" />
        </Grid>
    );
}


```

### [Learn more](https://hopper.workleap.design/components/layout\#grid-learn-more)

You can learn more about `Grid` and see more examples on the [Grid](https://hopper.workleap.design/components/Grid) page. There are many great resources on the web for learning CSS grid as well.

- [The MDN guide to CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) — full walkthrough of
grid layout.
- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid) — great reference for all of the
properties supported by grid.
- [The Difference Between Explicit and Implicit Grids](https://css-tricks.com/difference-explicit-implicit-grids/) — an
article that discusses the various ways of defining grids.

## [Responsive layout](https://hopper.workleap.design/components/layout\#responsive-layout)

All props of the Flex and Grid components support object syntax to specify different values for the prop depending on a responsive breakpoint.
You can learn more about responsive styles on the [Responsive Styles](https://hopper.workleap.design/styled-system/concepts/responsive-styles) page.

## Hopper Component Slots

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Slots

This page describes how Hopper components include predefined layouts that you can insert elements into via slots. Slots are named areas in a component that receive children and provide style and layout for them.

_Since Hopper components are designed on top of React Aria, this article is heavily inspired by the [Advanced Customization article](https://react-spectrum.adobe.com/react-aria/advanced.html#slots) in React-Aria's documentation._

## [Introduction](https://hopper.workleap.design/components/slots\#introduction)

The Hopper component API is designed around composition. Components are reused between patterns to build larger composite components. For example, there is no dedicated `NumberFieldIncrementButton` or `SelectPopover` component. Instead, the standalone [Button](https://hopper.workleap.design/components/Button) and [Popover](https://hopper.workleap.design/components/Popover) components are reused within [NumberField](https://hopper.workleap.design/components/NumberField) and [Select](https://hopper.workleap.design/components/Select). This reduces the amount of duplicate styling code you need to write and maintain, and provides powerful composition capabilities you can use in your own components.

```hd-code

<Stepper>
  <Button slot="increment">⬆</Button>
  <Button slot="decrement">⬇</Button>
</Stepper>

```

Slots in Hopper are named areas within a component where developers can insert content. They make it easier to create flexible and reusable components while keeping layouts accessible and consistent. Instead of using only children for content, slots act as specific placeholders that clearly define where each piece of content goes.

Hopper builds on React Aria's context-based design to make working with slots simple and efficient. This approach gives developers more control over how components are customized and ensures they follow accessibility best practices. This guide explains how slots work in Hopper, how they use contexts, and how to create or extend components with them.

## [Custom patterns](https://hopper.workleap.design/components/slots\#custom-patterns)

Each Hopper exports a corresponding context that you can use to build your own compositional APIs similar to the built-in components. You can send any prop or ref via context that you could pass to the corresponding component. The local props and ref on the component are merged with the ones passed via context, with the local props taking precedence (following the rules documented in [mergeProps](https://react-spectrum.adobe.com/react-aria/mergeProps.html)).

This example shows a `FieldGroup` component that renders a group of text fields. The entire group can be marked as disabled via the isDisabled prop, which is passed to all child text fields via the TextFieldContext provider.

```

import { TextFieldContext } from "@hopper-ui/components";
import type { ReactNode } from "react";

export interface FieldGroupProps {
    children?: ReactNode;
    isDisabled?: boolean;
}

export function FieldGroup({ children, isDisabled }: FieldGroupProps) {
    return (
        <TextFieldContext.Provider value={{ isDisabled }}>
            {children}
        </TextFieldContext.Provider>
    );
}


```

Any `TextField` component you place inside a `FieldGroup` will automatically receive the `isDisabled` prop from the group, including those that are deeply nested inside other components.

```hd-code

<FieldGroup isDisabled={isSubmitting}>
  <TextField label="Name" />
  <TextField label="Email" />
</FieldGroup>

```

## [Slots](https://hopper.workleap.design/components/slots\#slots)

Some patterns include multiple instances of the same component. These use the `slot` prop to distinguish each instance. Slots are named children within a component that can receive separate behaviors and [styles](https://hopper.workleap.design/styled-system/overview/introduction). Separate props can be sent to slots by providing an object with keys for each slot name to the component's context provider.

This example shows a `Stepper` component with slots for its increment and decrement buttons.

```

import { ButtonContext } from "@hopper-ui/components";
import { useState, type PropsWithChildren } from "react";

export function Stepper({ children }: PropsWithChildren) {
    const [value, setValue] = useState(0);

    return (
        <ButtonContext.Provider
            value={{
                slots: {
                    increment: {
                        onPress: () => setValue(value + 1)
                    },
                    decrement: {
                        onPress: () => setValue(value - 1)
                    }
                }
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
}


```

And it can be used like this:

```hd-code

<Stepper>
  <Button slot="increment">⬆</Button>
  <Button slot="decrement">⬇</Button>
</Stepper>

```

### [Default slot](https://hopper.workleap.design/components/slots\#slots-default-slot)

The default slot is used to provide props to a component without specifying a slot name. This approach allows you to assign a default slot to a component for its default use case and enables you to specify a slot name for a specific use case.

This example shows a custom component that passes a specific class name to a standard button child and to a button child with a slot named "end".

```

import { ButtonContext, DEFAULT_SLOT } from "@hopper-ui/components";
import type { PropsWithChildren } from "react";

export function MyCustomComponent({ children }: PropsWithChildren) {
    return (
        <ButtonContext.Provider
            value={{
                slots: {
                    [DEFAULT_SLOT]: {
                        className: "left-button"
                    },
                    end: {
                        className: "right-button"
                    }
                }
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
}


```

And it can be used like this:

```hd-code

<MyCustomComponent>
  {/* Consumes the props passed to the default slot */}
  <Button>Click me</Button>
</MyCustomComponent>

<MyCustomComponent>
  {/* Consumes the props passed to the "end" slot */}
  <Button slot="end">Click me</Button>
</MyCustomComponent>

```

## [Consuming contexts](https://hopper.workleap.design/components/slots\#consuming-contexts)

You can also consume from contexts provided by Hopper components in your own custom components. This allows you to replace a component used as part of a larger pattern with a custom implementation. For example, you could consume from `LabelContext` in an existing styled label component to make it compatible with Hopper Components.

### [useContextProps](https://hopper.workleap.design/components/slots\#consuming-contexts-usecontextprops)

The `useContextProps` hook merges the local props and ref with the ones provided via context by a parent component. The local props always take precedence over the context values (following the rules documented in [mergeProps](https://react-spectrum.adobe.com/react-aria/mergeProps.html)). `useContextProps` supports the slot prop to indicate which value to consume from context.

```hd-code

import { type LabelProps, LabelContext, useContextProps } from "@hopper-ui/components";
import { forwardRef } from "react";

export const MyCustomLabel = forwardRef(
    (props: LabelProps, ref: React.ForwardedRef<HTMLLabelElement>) => {
    // Merge the local props and ref with the ones provided via context.
        [props, ref] = useContextProps(props, ref, LabelContext);

        // ... your existing Label component
        return <label {...props} ref={ref} />;
    }
);

```

Since it consumes from LabelContext, MyCustomLabel can be used within any Hopper component instead of the built-in Label.

```hd-code

<TextField>
    <MyCustomLabel>Name</MyCustomLabel>
    <Input />
</TextField>

```

### [useSlottedContext](https://hopper.workleap.design/components/slots\#consuming-contexts-useslottedcontext)

To consume a context without merging with existing props, use the `useSlottedContext` hook. This works like React's `useContext`, and also accepts an optional slot argument to identify which slot name to consume.

```hd-code

import { useSlottedContext } from "react-aria-components";

// Consume the un-slotted value.
let buttonContext = useSlottedContext(ButtonContext);

// Consume the value for a specific slot name.
let incrementButtonContext = useSlottedContext(ButtonContext, "increment");

```

## [Accessing state](https://hopper.workleap.design/components/slots\#accessing-state)

Most Hopper components are built on top of React Aria Components. React Aria Components compose other standalone components in their children to build larger patterns. However, some components are made up of more tightly coupled children. For example, Calendar includes children such as CalendarGrid and CalendarCell that cannot be used standalone, and must appear within a Calendar or RangeCalendar. These components access the state from their parent via context.

You can access the state from a parent component via the same contexts in order to build your own custom children. This example shows a CalendarValue component that displays the currently selected date from a calendar as a formatted string.

## Styled System Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Styled System

All components are designed to be styled using props.

## [Introduction](https://hopper.workleap.design/components/styled-system\#introduction)

Hopper embraces a **Styled System-inspired** approach to styling components, allowing developers to define styles directly via props rather than writing CSS. This method provides a **type-safe and intuitive API**, making it easier to build consistent, on-brand interfaces without dealing with complex class names or global styles. With built-in **intellisense and static analysis**, developers can confidently apply design tokens without memorizing them, ensuring efficiency and reducing errors.

## [Style Props](https://hopper.workleap.design/components/styled-system\#style-props)

Style props are the most fundamental way to style your components in Hopper. They are basically css styles as props. [Learn more about style props](https://hopper.workleap.design/styled-system/concepts/styling)

## [Key Concepts](https://hopper.workleap.design/components/styled-system\#key-concepts)

Follow these links to learn key concepts about the Styled System:

- [Responsive Styles](https://hopper.workleap.design/styled-system/concepts/responsive-styles)
- [Using Style Props on HTML Elements](https://hopper.workleap.design/styled-system/concepts/html-elements)
- [Using Style Props on custom components](https://hopper.workleap.design/styled-system/concepts/custom-components)

## Avatar Component Guide

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Avatar

An avatar is used to represent a user, team or another entity.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Avatar/src/Avatar.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Avatar]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

JD

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar name="John Doe" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/Avatar\#usage)

### [Local Image](https://hopper.workleap.design/components/Avatar\#usage-local-image)

An avatar can display a local image.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar name="Kermit Frog" src="/frog.jpg" />
    );
}



```

### [Remote image](https://hopper.workleap.design/components/Avatar\#usage-remote-image)

An avatar can fetch a remote image.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar name="John Doe" src="https://i.pravatar.cc/96?img=1" />
    );
}



```

### [Fallback image](https://hopper.workleap.design/components/Avatar\#usage-fallback-image)

A fallback image can be set in case the `src` fails to load.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar
            name="John Doe"
            src="https://example.com/image.jpg"
            fallbackSrc="https://i.pravatar.cc/96?img=2"
        />
    );
}


```

### [Loading Failure](https://hopper.workleap.design/components/Avatar\#usage-loading-failure)

When an image fails to load, a default image will be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar
            name="John Doe"
            src="https://example.com/image.jpg"
        />
    );
}


```

### [Double Failure](https://hopper.workleap.design/components/Avatar\#usage-double-failure)

When the fallback image fails to load, a default image will be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar
            name="John Doe"
            src="https://example.com/image.jpg"
            fallbackSrc="https://example.com/image2.jpg"
        />
    );
}


```

### [Src and Fallback Bypass](https://hopper.workleap.design/components/Avatar\#usage-src-and-fallback-bypass)

If no fallback image is provided and the image fails to load, the initials will be displayed instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

JD

```

import { Avatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <Avatar
            name="John Doe"
            src="https://example.com/image.jpg"
            fallbackSrc={null}
        />
    );
}


```

### [Anonymous](https://hopper.workleap.design/components/Avatar\#usage-anonymous)

An anonymous avatar can be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { AnonymousAvatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <AnonymousAvatar
            aria-label="anonymous"
        />
    );
}


```

### [Deleted](https://hopper.workleap.design/components/Avatar\#usage-deleted)

A deleted avatar can be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { DeletedAvatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <DeletedAvatar
            aria-label="deleted user"
        />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Avatar\#usage-sizes)

An avatar can be displayed in different sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

J

JD

JD

JD

JD

JD

```

import { Avatar, Stack, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Inline>
                <Avatar name="John Doe" size="xs" />
                <Avatar name="John Doe" size="sm" />
                <Avatar name="John Doe" size="md" />
                <Avatar name="John Doe" size="lg" />
                <Avatar name="John Doe" size="xl" />
                <Avatar name="John Doe" size="2xl" />
            </Inline>
            <Inline>
                <Avatar name="John Doe" size="xs" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="sm" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="md" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="lg" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="xl" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="2xl" src="https://i.pravatar.cc/96?img=1" />
            </Inline>
            <Inline>
                <Avatar name="John Doe" size="xs" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="sm" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="md" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="lg" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="xl" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="2xl" src="https://example.com/image.jpg" />
            </Inline>
        </Stack>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Avatar\#usage-disabled)

An avatar can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

JD

```

import { AnonymousAvatar, Avatar, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Avatar name="John Doe" size="lg" isDisabled />
            <Avatar name="John Doe" size="lg" isDisabled src="https://i.pravatar.cc/96?img=1" />
            <AnonymousAvatar aria-label="anonymous" size="lg" isDisabled />
        </Inline>
    );
}


```

### [Customize the image props](https://hopper.workleap.design/components/Avatar\#usage-customize-the-image-props)

Using a custom hook to retry loading the image up to 5 times with a 250ms delay.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

JD

The avatar failed to load **0** times.

JD

The avatar failed to load **0** times.

```

import { Avatar, Stack } from "@hopper-ui/components";
import { type ReactEventHandler, useEffect, useState } from "react";

function useAsyncImage(src: string, retryCount = 5, delay = 250) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    useEffect(() => {
        if (isLoaded || failureCount >= retryCount) {
            return;
        }

        const loadImage = () => {
            const image: HTMLImageElement = new Image();

            image.src = currentSrc;

            image.onload = () => {
                setIsLoaded(true);
            };

            image.onerror = () => {
                if (failureCount < retryCount) {
                    setFailureCount(prevCount => prevCount + 1);
                    setCurrentSrc(src); // Trigger retry by resetting src
                }
            };
        };

        const timeoutId = setTimeout(loadImage, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentSrc, isLoaded, failureCount, retryCount, delay, src]);

    const onError: ReactEventHandler<HTMLImageElement> | undefined = () => {
        if (failureCount < retryCount) {
            setFailureCount(prevCount => prevCount + 1);
            setCurrentSrc(src); // Manually trigger retry
        }
    };

    return [isLoaded ? currentSrc : undefined, onError, failureCount] as const;
}

export default function Example() {
    const [src, handleError, failureCount] = useAsyncImage("https://example.com/image.jpg");
    const [src2, handleError2, failureCount2] = useAsyncImage("https://i.pravatar.cc/96?img=1");

    return (
        <Stack>
            <Stack alignX="center">
                <Avatar name="John Doe"
                    src={src}
                    imageProps={{ onError: handleError }}
                />
                <p>The avatar failed to load <strong>{failureCount}</strong> times.</p>
            </Stack>
            <Stack alignX="center">
                <Avatar name="John Doe"
                    src={src2}
                    imageProps={{ onError: handleError2 }}
                />
                <p>The avatar failed to load <strong>{failureCount2}</strong> times.</p>
            </Stack>
        </Stack>
    );
}


```

## [Props](https://hopper.workleap.design/components/Avatar\#props)

fallbackSrc?

`string | null`

The src of the image to display if the image fails to load. If set to null, the initials will be displayed instead.
\*

_Defaults to BrokenImageRichIcon._

imageProps?

`AvatarImageBaseProps`

Props to add to the img element when src is provided.

isDisabled?

`boolean`

Whether or not the avatar is disabled.

name

`string`

The name of the Avatar. This will be used for the alt text of the image or the initials if no image is provided.

size?

`ResponsiveProp<AvatarSize>`

The size of the avatar.
\*

_Defaults to md._

src?

`string`

The src of the image to display. If not provided, the initials will be displayed instead.

className?

`string | ((values: AvatarRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

style?

`CSSProperties | ((values: AvatarRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Card Components Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Card

Cards are used to group similar concepts and tasks to make it easier for users to scan, read and get things done.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Card/src/Card.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Card]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { Card } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-squish-lg" maxWidth="1/2">
            Software built for everyone to do their best work
        </Card>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Card\#usage)

### [Variants](https://hopper.workleap.design/components/Card\#usage-variants)

A card can use different variants. Second-level cards need to be used within a first-level card.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

## Roles

### Manager

A manager leads team operations, aligns goals, and fosters a productive work environment to achieve results.

```

import { Card, H2, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-squish-lg" width="3/4" gap="stack-md">
            <H2>Roles</H2>
            <Card gap="stack-md" padding="inset-squish-lg" variant="second-level">
                <H3>Manager</H3>
                <Text>A manager leads team operations, aligns goals, and fosters a productive work environment to achieve results.</Text>
            </Card>
        </Card>
    );
}


```

### [Sections](https://hopper.workleap.design/components/Card\#usage-sections)

A card can use a header, content, and footer section.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Developer

A developer builds and maintains software, ensuring functionality, performance, and alignment with project goals.Start date : _September 13th_

```

import { Card, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="inline-lg" padding="inset-squish-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>Developer</H3>
            <Text>
                A developer builds and maintains software, ensuring functionality, performance, and alignment with project goals.
            </Text>
            <Text>Start date : <em>September 13th</em></Text>
        </Card>
    );
}


```

## [Props](https://hopper.workleap.design/components/Card\#props)

variant?

`"main" | "second-level"`

The visual style of the card.

_Defaults to main._

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Card\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `outline` variant has been renamed `main`.
- `elevated` variant has been renamed `second-level`. You shouldn't use a `second-level` variant without a parent `main` variant.
- `orientation` has been removed. Refer to this [sample](https://hopper.workleap.design/components/Card#orientation) to see an implementation example.
- `fluid` prop has been removed. Refer to this [sample](https://hopper.workleap.design/components/Card#fluid) to see an implementation example.
- `size` has been removed. Refer to this [sample](https://hopper.workleap.design/components/Card#size) to quickly match old sizes.
- The Hopper Card component does not include predefined layouts; developers are responsible for implementing any required [layouts](https://hopper.workleap.design/components/Card#migration-notes-layout-samples) to meet their specific needs..

### [Layout Samples](https://hopper.workleap.design/components/Card\#migration-notes-layout-samples)

To facilitate the migration process, we've provided layout samples as reference guides. These examples demonstrate how to recreate features previously supported in [Orbiter](https://wl-orbiter-website.netlify.app/?path=/docs/card--default-story).

#### [Default](https://hopper.workleap.design/components/Card\#default)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### NASA Headquarters

NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.

```

import { Card, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
            <H3>NASA Headquarters</H3>
            <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
        </Card>
    );
}


```

#### [Image](https://hopper.workleap.design/components/Card\#image)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Space landscape](https://hopper.workleap.design/_next/static/media/space-landscape.84e08e02.png)

### NASA Headquarters

NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.

```

import { Card, H3, Image, Stack, Text } from "@hopper-ui/components";

import SpaceLandscape from "./assets/space-landscape.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Image src={SpaceLandscape.src} alt="Space landscape" objectFit="cover" width="100%" UNSAFE_height="8rem" />
            <Stack padding="inset-lg">
                <H3>NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}


```

#### [Illustration](https://hopper.workleap.design/components/Card\#illustration)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Flex UNSAFE_height="8rem" backgroundColor="primary-weak" alignItems="center" justifyContent="center">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3 marginBottom="inline-lg">NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}


```

#### [Size](https://hopper.workleap.design/components/Card\#size)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Card, H3, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-sm" wrap="wrap">
            <Card padding="inset-lg" UNSAFE_maxWidth="16rem" width="100%" gap="stack-md">
                <H3>XS Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="20rem" width="100%" gap="stack-md">
                <H3>SM Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
                <H3>MD Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="35rem" width="100%" gap="stack-md">
                <H3>LG Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="40rem" width="100%" gap="stack-md">
                <H3>XL Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
        </Inline>
    );
}


```

#### [Button](https://hopper.workleap.design/components/Card\#button)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Card, H3, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
            <Inline alignX="space-between" wrap gap="inline-md">
                <H3>NASA Headquarters</H3>
                <Text>No visitors allowed.</Text>
            </Inline>
            <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            <Button variant="secondary">Plan a visit</Button>
        </Card>
    );
}


```

#### [Button group](https://hopper.workleap.design/components/Card\#button-group)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ButtonGroup, Card, H3, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="stack-md" padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>NASA Headquarters</H3>
            <Stack>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                    <br />
                </Text>
                <em>Any trespassers are going to be sent in space.</em>
            </Stack>
            <ButtonGroup>
                <Button>Plan a visit</Button>
                <Button variant="secondary">Cancel a booking</Button>
            </ButtonGroup>
        </Card>
    );
}


```

#### [Orientation](https://hopper.workleap.design/components/Card\#orientation)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" display="grid" gridTemplateAreas={["image aside"]} gridTemplateColumns={["max-content", "auto"]} alignItems="start" overflow="hidden" >
            <Flex height="100%" backgroundColor="primary-weak" alignItems="center" justifyContent="center" padding="inset-md">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3>NASA</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
                <em>Please note that we are moving from December 12th to December 23rd.</em>
            </Stack>
        </Card>
    );
}


```

#### [Fluid](https://hopper.workleap.design/components/Card\#fluid)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card display="grid" gridTemplateAreas={["image aside"]} gridTemplateColumns={["max-content", "auto"]} width="100%" overflow="hidden" >
            <Flex backgroundColor="primary-weak" alignItems="center" justifyContent="center" padding="inset-md">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3>NASA</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
                <em>Please note that we are moving from December 12th to December 23rd.</em>
            </Stack>
        </Card>
    );
}


```

## Content Separator

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Divider

A divider separates sections of content or groups.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Divider/src/Divider.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Divider]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

* * *

```

import { Div, Divider } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%">
            <Divider />
        </Div>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Divider\#usage)

### [Orientation](https://hopper.workleap.design/components/Divider\#usage-orientation)

A divider can have two orientations: horizontal or vertical.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Divider, Inline, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack width="100%">
            <Stack>
                <Text>Content above</Text>
                <Divider orientation="horizontal" />
                <Text>Content below</Text>
            </Stack>
            <Inline alignY="stretch">
                <Text>Content left</Text>
                <Divider orientation="vertical" />
                <Text>Content right</Text>
            </Inline>
        </Stack>
    );
}


```

## [Props](https://hopper.workleap.design/components/Divider\#props)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

orientation?

`Orientation`

The orientation of the separator.

_Defaults to 'horizontal'._

elementType?

`string`

The HTML element type that will be used to render the separator.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Divider\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `Children` is not supported.

## Hopper Heading Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Heading

A heading is a primitive component matching Hopper's typography type scale.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/typography/Heading/src/Heading.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Heading]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Great work

```

import { Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Heading>Great work!</Heading>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Heading\#usage)

### [Sizes](https://hopper.workleap.design/components/Heading\#usage-sizes)

You can alter the size of the heading by specifying a `size` prop.
The available sizes match Hopper Typography Type Scale — a type scale is a set of [font-size and line-height](https://hopper.workleap.design/tokens/semantic/typography#tokens-heading) pairs.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Great work

### Great work

### Great work

### Great work

### Great work

### Great work

### Great work

```

import { Heading, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Heading size="xs">Great work!</Heading>
            <Heading size="sm">Great work!</Heading>
            <Heading size="md">Great work!</Heading>
            <Heading size="lg">Great work!</Heading>
            <Heading size="xl">Great work!</Heading>
            <Heading size="2xl">Great work!</Heading>
            <Heading size="3xl">Great work!</Heading>
        </Stack>
    );
}


```

### [Levels](https://hopper.workleap.design/components/Heading\#usage-levels)

You can alter the level of the heading by specifying a `level` prop.
The available levels match HTML heading elements — h1-h6.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

# Great work

## Great work

### Great work

#### Great work

##### Great work

###### Great work

```

import { Heading, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Heading level={1}>Great work!</Heading>
            <Heading level={2}>Great work!</Heading>
            <Heading level={3}>Great work!</Heading>
            <Heading level={4}>Great work!</Heading>
            <Heading level={5}>Great work!</Heading>
            <Heading level={6}>Great work!</Heading>
        </Stack>
    );
}


```

### [Inherit](https://hopper.workleap.design/components/Heading\#usage-inherit)

You can alter the size of a heading to match the parent element's type scale by using the `inherit` size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Great work

```

import { Div, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div fontSize="heading-lg">
            <Heading size="inherit">Great work!</Heading>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Heading\#props)

These props are also available for `H1`, `H2`, `H3`, `H4`, `H5` and `H6` components.

size?

`ResponsiveProp<HeadingSize>`

The Typography Type Scale to use.

_Defaults to md._

style?

`CSSProperties`

level?

`number`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## [Migration Notes](https://hopper.workleap.design/components/Heading\#migration-notes)

Coming from Orbiter, you should be aware of the following change:

- Headings no longer come with margin by default; you're now responsible for adding the appropriate margin yourself.

In order to migrate to Hopper Heading seamlessly here's a cheatsheet regarding the applied margin-bottom of each heading sizes:

**xs** `calc(1.125rem * .5) | 9px`

**sm** `calc(1.375rem * .5) | 11px`

**md** `calc(1.75rem * .5) | 14px`

**lg** `calc(2rem * .5) | 16px`

**xl** `calc(2.5rem * .5) | 20px`

**2xl** `calc(1rem * .5) | 8px`

**3xl** `calc(1rem * .5) | 8px`

_Some UI might require different margins, this table is provided as a guidance to kickstart youre migration toward Hopper._

## Illustrated Message Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# IllustratedMessage

An illustrated message display an image and a message, usually for an empty state or an error page.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/IllustratedMessage/src/IllustratedMessage.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[IllustratedMessage]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Content, Heading, IllustratedMessage, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/IllustratedMessage\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/IllustratedMessage\#anatomy-composed-components)

A `IllustratedMessage` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**ButtonGroup** \\
\\
A button group handles the spacing and orientation for a grouping of buttons.](https://hopper.workleap.design/components/ButtonGroup)

[**Content** \\
\\
A placeholder for the main content section of a component.](https://hopper.workleap.design/components/Content)

[**Heading** \\
\\
A heading is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Heading)

[**Image** \\
\\
An image component that can be used to display images.](https://hopper.workleap.design/components/Image)

## [Usage](https://hopper.workleap.design/components/IllustratedMessage\#usage)

### [Sizes](https://hopper.workleap.design/components/IllustratedMessage\#usage-sizes)

An illustrated message can use different sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Content, Heading, IllustratedMessage, Image, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="core_480" alignX="center">
            <IllustratedMessage size="sm">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="md">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="lg">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
        </Stack>

    );
}


```

### [Image](https://hopper.workleap.design/components/IllustratedMessage\#usage-image)

An illustrated message can handle images (jpg, png).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Content, Heading, IllustratedMessage, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <IllustratedMessage>
            <Image src="/frog.jpg" alt="No Results" />
            <Heading>No results found</Heading>
            <Content>It seems like there’s nothing here for now. Hop on and add something new!</Content>
        </IllustratedMessage>
    );
}


```

### [Buttons](https://hopper.workleap.design/components/IllustratedMessage\#usage-buttons)

An illustrated message can handle either a button

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Heading, IllustratedMessage, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
            <Button>Try again</Button>
        </IllustratedMessage>
    );
}


```

or a group of buttons

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ButtonGroup, Content, Heading, IllustratedMessage, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
            <ButtonGroup>
                <Button variant="secondary">Back</Button>
                <Button>Try again</Button>
            </ButtonGroup>
        </IllustratedMessage>
    );
}


```

### [SVG](https://hopper.workleap.design/components/IllustratedMessage\#usage-svg)

An illustrated message can handle svgs.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Content, Heading, IllustratedMessage, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <IllustratedMessage>
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Heading>No results found</Heading>
            <Content>Try searching for something else.</Content>
        </IllustratedMessage>
    );
}


```

## [Props](https://hopper.workleap.design/components/IllustratedMessage\#props)

size?

`IllustratedMessageSize`

The size of the IllustratedMessage.

_Defaults to md._

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## [Migration Notes](https://hopper.workleap.design/components/IllustratedMessage\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `orientation` has been removed. Refer to this [sample](https://hopper.workleap.design/components/IllustratedMessage#horizontal) to see an implementation example for a horizontal orientation.
- `width` and `height` prop will now affect the whole wrapper instead of just the image.

### [Layout Samples](https://hopper.workleap.design/components/IllustratedMessage\#migration-notes-layout-samples)

To facilitate the migration process, we've provided layout samples as reference guides. These examples demonstrate how to recreate features previously supported in [Orbiter](https://wl-orbiter-website.netlify.app/?path=/docs/illustrated-message--docs).

#### [Horizontal](https://hopper.workleap.design/components/IllustratedMessage\#horizontal)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Content, Heading, Inline, Stack, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../../assets/index.ts";

export default function Example() {
    return (
        <Inline alignY="center" gap="stack-lg">
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Stack gap="stack-sm">
                <Heading>No results found</Heading>
                <Content color="neutral-weak">Please try another search term.</Content>
            </Stack>
        </Inline>
    );
}


```

## Image Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Image

An image component that can be used to display images.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Image/src/Image.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Image]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Frog](https://hopper.workleap.design/frog.jpg)

```

import { Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/Image\#usage)

### [Shapes](https://hopper.workleap.design/components/Image\#usage-shapes)

An image can use a different shape.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Frog](https://hopper.workleap.design/frog.jpg)![Frog](https://hopper.workleap.design/frog.jpg)

```

import { Image, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" shape="rounded" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" shape="circular" />
        </Inline>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Image\#usage-sizes)

An image can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Frog](https://hopper.workleap.design/frog.jpg)![Frog](https://hopper.workleap.design/frog.jpg)![Frog](https://hopper.workleap.design/frog.jpg)

```

import { Image, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="200px" height="auto" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" height="auto" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="400px" height="auto" />
        </Inline>
    );
}


```

## [Object fit](https://hopper.workleap.design/components/Image\#object-fit)

An image can have different object fits

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Frog](https://hopper.workleap.design/frog.jpg)

```

import { Div, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_width="200px" UNSAFE_height="200px">
            <Image objectFit="cover" src="/frog.jpg" alt="Frog" />
        </Div>
    );
}


```

### [Retina](https://hopper.workleap.design/components/Image\#object-fit-retina)

You can let the browser decide which image is best to serve according to the user device screen pixel density.

It is highly recommended to serve a 1x image as well as a 2x image, twice the intended size. This assures the user has the best looking image possible.

Avoid serving images that are unecessary big, images should be resized to the intended final image display size. This assures we don't waste bandwith for the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

![Frog](https://hopper.workleap.design/frog2x.jpg)

```

import { Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Image srcSet="/frog.jpg 1x, /frog2x.jpg 2x" alt="Frog" UNSAFE_width="300px" />
    );
}


```

## [SvgImage](https://hopper.workleap.design/components/Image\#svgimage)

For some use cases, like dark mode support, an SVG image is a better fit than a standard PNG or JPG image.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
    );
}


```

### [Size](https://hopper.workleap.design/components/Image\#svgimage-size)

An SVG image size can be specified with the `width` and `height` props.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" UNSAFE_width="200px" UNSAFE_height="200px" />
    );
}


```

### [Color](https://hopper.workleap.design/components/Image\#svgimage-color)

An SVG image `stroke` and `fill` color can vary.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SvgImage } from "@hopper-ui/components";

import { NoResults } from "../assets/index.ts";

export default function Example() {
    return (
        <SvgImage
            aria-label="No results"
            fill="core_sunken-treasure-100"
            src={NoResults}
            stroke="core_sapphire-600"
        />
    );
}


```

## [Props](https://hopper.workleap.design/components/Image\#props)

### [Image](https://hopper.workleap.design/components/Image\#props-image)

shape?

`"straight" | "rounded" | "circular"`

The image shape.

src?

`ResponsiveProp<string>`

An image path.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

### [SvgImage](https://hopper.workleap.design/components/Image\#props-svgimage)

src?

`ResponsiveProp<ElementType>`

An SVG as a component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## Hopper Label Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Label

A label is a primitive component matching Hopper's typography type scale.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/typography/Label/src/Label.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Label]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <Label>Software built for everyone to do their best work</Label>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Label\#usage)

### [Color](https://hopper.workleap.design/components/Label\#usage-color)

The label component has a default color, but it can be easily overridden.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <Label color="decorative-option3">Software built for everyone to do their best work</Label>
    );
}


```

### [Required](https://hopper.workleap.design/components/Label\#usage-required)

The label component can be marked as required. You can customize the necessity indicator by using an asterisk.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Username\*

```

import { Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <Label isRequired necessityIndicator="asterisk">Username</Label>
    );
}


```

### [Optional](https://hopper.workleap.design/components/Label\#usage-optional)

The label component can show the optional necessity indicator as a label.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Username (Optional)

```

import { Label } from "@hopper-ui/components";

export default function Example() {
    return (
        <Label necessityIndicator="label">Username</Label>
    );
}


```

## [Props](https://hopper.workleap.design/components/Label\#props)

isRequired?

`boolean`

Whether the label shows a required state.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

style?

`CSSProperties`

elementType?

`string`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Hopper Text Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Text

A text component is a primitive component matching Hopper's typography type scale.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/typography/Text/src/Text.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Text]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Text>Software built for everyone to do their best work</Text>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Text\#usage)

### [Sizes](https://hopper.workleap.design/components/Text\#usage-sizes)

You can alter the size of the text by specifying a `size` prop.
The available sizes match the Hopper Typography Type Scale — a type scale is a set of [font-size and line-height](https://hopper.workleap.design/tokens/semantic/typography#tokens-body) pairs.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best workSoftware built for everyone to do their best workSoftware built for everyone to do their best workSoftware built for everyone to do their best workSoftware built for everyone to do their best workSoftware built for everyone to do their best work

```

import { Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Text size="xs">Software built for everyone to do their best work</Text>
            <Text size="sm">Software built for everyone to do their best work</Text>
            <Text size="md">Software built for everyone to do their best work</Text>
            <Text size="lg">Software built for everyone to do their best work</Text>
            <Text size="xl">Software built for everyone to do their best work</Text>
            <Text size="2xl">Software built for everyone to do their best work</Text>
        </Stack>
    );
}


```

### [Inherit](https://hopper.workleap.design/components/Text\#usage-inherit)

You can also alter the size to match the parent element's type scale by using the `inherit` size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { Text, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div fontSize="body-xs">
            <Text size="inherit">Software built for everyone to do their best work</Text>
        </Div>
    );
}


```

### [Nested](https://hopper.workleap.design/components/Text\#usage-nested)

The Text component can be nested within other Text components and inherit the parent's size by default.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Mr. Johnson

```

import { Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Text size="lg">
            <Text color="primary">Mr.</Text> Johnson
        </Text>
    );
}


```

## [Props](https://hopper.workleap.design/components/Text\#props)

size?

`ResponsiveProp<TextSize>`

The Typography Type Scale to use.

_Defaults to md._

style?

`CSSProperties`

elementType?

`string`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Checkbox Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Checkbox

A checkbox allows the user to select an option.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/checkbox/src/Checkbox.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Checkbox]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox>Developer</Checkbox>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Checkbox\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Checkbox\#anatomy-composed-components)

A `Checkbox` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Checkbox\#usage)

### [No Label](https://hopper.workleap.design/components/Checkbox\#usage-no-label)

A checkbox can be rendered without a label.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox aria-label="Developer" />
    );
}


```

### [Checked](https://hopper.workleap.design/components/Checkbox\#usage-checked)

A checkbox can be checked.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox defaultSelected>Developer</Checkbox>
    );
}


```

### [Indeterminate](https://hopper.workleap.design/components/Checkbox\#usage-indeterminate)

A checkbox can be indeterminate.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox isSelected isIndeterminate>Developer</Checkbox>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Checkbox\#usage-disabled)

A checkbox can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox isDisabled>Developer</Checkbox>
    );
}


```

### [Read-only](https://hopper.workleap.design/components/Checkbox\#usage-readonly)

A checkbox can be read-only.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox isReadOnly>Developer</Checkbox>
    );
}


```

### [Invalid](https://hopper.workleap.design/components/Checkbox\#usage-invalid)

A checkbox can be invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox } from "@hopper-ui/components";

export default function Example() {
    return (
        <Checkbox isInvalid>Developer</Checkbox>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Checkbox\#usage-sizes)

A checkbox can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Checkbox size="sm">Developer</Checkbox>
            <Checkbox size="md">Designer</Checkbox>
        </Inline>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Checkbox\#usage-icon)

A checkbox can be rendered with an icon or an icon list.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox, IconList, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Checkbox>
                <Text>Developer</Text>
                <SparklesIcon />
            </Checkbox>
            <Checkbox>
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Checkbox>
        </Inline>
    );
}


```

### [Description](https://hopper.workleap.design/components/Checkbox\#usage-description)

A checkbox can have a description to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Checkbox, CheckboxField } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxField description="Team Manager">
            <Checkbox>Manager</Checkbox>
        </CheckboxField>
    );
}


```

## [Props](https://hopper.workleap.design/components/Checkbox\#props)

### [Checkbox](https://hopper.workleap.design/components/Checkbox\#props-checkbox)

size?

`ResponsiveProp<FieldSize>`

A checkbox can vary in size.

_Defaults to md._

style?

`CSSProperties | ((values: CheckboxRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: CheckboxRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

isIndeterminate?

`boolean`

Indeterminism is presentational only.
The indeterminate visual representation remains regardless of user interaction.

value?

`string`

The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).

defaultSelected?

`boolean`

Whether the element should be selected (uncontrolled).

isSelected?

`boolean`

Whether the element should be selected (controlled).

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the input value is invalid.

validate?

`((value: boolean) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

inputRef?

`RefObject<HTMLInputElement | null>`

A ref for the HTML input element.

className?

`string | ((values: CheckboxRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onChange?

`((isSelected: boolean) => void)`

Handler that is called when the element's selection state changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

### [CheckboxField](https://hopper.workleap.design/components/Checkbox\#props-checkboxfield)

description?

`ReactNode`

The description of the checkbox field.

isDisabled?

`boolean`

Whether the checkbox field is disabled.

size?

`ResponsiveProp<FieldSize>`

A checkbox field can vary in size.

_Defaults to md._

children?

`ReactNode | ((values: CheckboxFieldRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: CheckboxFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

style?

`CSSProperties | ((values: CheckboxFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Checkbox\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `onChange` signature has been changed (no event are passed).
- `onValueChange` has been deleted, use `onChange` instead.
- `checked` has been renamed to `isSelected`.
- `disabled` has been renamed to `isDisabled`.
- `required` has been renamed to `isRequired`.
- `indeterminate` has been renamed to `isIndeterminate`.
- `defaultIndeterminate` prop has been removed.
- The `Counter` component is no longer allowed as a specialized slot.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `validationState` has been removed. Use `isInvalid` instead. There is no `isValid`.
- Values are not auto-generated when missed.

## Checkbox Group Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# CheckboxGroup

A checkbox group handles the spacing and orientation for a grouping of checkboxes, as well as providing a label.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/checkbox/src/CheckboxGroup.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[CheckboxGroup]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/CheckboxGroup\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/CheckboxGroup\#anatomy-composed-components)

A `CheckboxGroup` uses the following components:

[**Checkbox** \\
\\
A checkbox allows the user to select an option.](https://hopper.workleap.design/components/Checkbox)

## [Usage](https://hopper.workleap.design/components/CheckboxGroup\#usage)

### [Read-only](https://hopper.workleap.design/components/CheckboxGroup\#usage-readonly)

A checkbox group can be read-only.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup isReadOnly label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/CheckboxGroup\#usage-disabled)

A checkbox group can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup isDisabled label="Roles">
            <Checkbox value="option1">Developer</Checkbox>
            <Checkbox value="option2">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Invalid](https://hopper.workleap.design/components/CheckboxGroup\#usage-invalid)

A checkbox group can be invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup isInvalid label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/CheckboxGroup\#usage-sizes)

A checkbox group can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Roles

Designer

Developer

```

import { Checkbox, CheckboxGroup, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <CheckboxGroup size="sm" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup size="md" label="Roles">
                <Checkbox value="developer">Designer</Checkbox>
                <Checkbox value="designer">Developer</Checkbox>
            </CheckboxGroup>
        </Inline>
    );
}


```

### [No Label](https://hopper.workleap.design/components/CheckboxGroup\#usage-no-label)

A checkbox group can be rendered without a label.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup aria-label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Description](https://hopper.workleap.design/components/CheckboxGroup\#usage-description)

A checkbox group can have a description to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Select one to continue

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles" description="Select one to continue">
            <Checkbox value="option1">Developer</Checkbox>
            <Checkbox value="option2">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Bordered](https://hopper.workleap.design/components/CheckboxGroup\#usage-bordered)

A checkbox group can be bordered.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup variant="bordered" label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Orientation](https://hopper.workleap.design/components/CheckboxGroup\#usage-orientation)

A checkbox group can have a different orientation.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Roles

Developer

Designer

```

import { Checkbox, CheckboxGroup, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <CheckboxGroup orientation="horizontal" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup orientation="vertical" label="Roles">
                <Checkbox value="developer">Developer</Checkbox>
                <Checkbox value="designer">Designer</Checkbox>
            </CheckboxGroup>
        </Inline>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/CheckboxGroup\#usage-controlled)

A checkbox group can handle value state in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Manager

```

import { Checkbox, CheckboxGroup } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selected, setSelected] = useState<string[]>(["designer"]);

    return (
        <CheckboxGroup
            label="Roles"
            onChange={setSelected}
            value={selected}
        >
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
            <Checkbox value="manager">Manager</Checkbox>
        </CheckboxGroup>
    );
}


```

### [Description on Items](https://hopper.workleap.design/components/CheckboxGroup\#usage-description-on-items)

A checkbox can have a description to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

ManagerTeam Manager

```

import { Checkbox, CheckboxField, CheckboxGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <CheckboxGroup label="Roles">
            <Checkbox value="developer">Developer</Checkbox>
            <Checkbox value="designer">Designer</Checkbox>
            <CheckboxField description="Team Manager">
                <Checkbox value="manager">Manager</Checkbox>
            </CheckboxField>
        </CheckboxGroup>
    );
}


```

## [Props](https://hopper.workleap.design/components/CheckboxGroup\#props)

listProps?

`CheckboxListProps`

The props of the list element that wraps the Checkbox components.

orientation?

`ResponsiveProp<Orientation>`

A CheckboxGroup can be displayed horizontally or vertically.

_Defaults to vertical._

variant?

`InputGroupVariant`

A CheckboxGroup has two variants: borderless and bordered.

_Defaults to borderless._

style?

`CSSProperties | ((values: CheckboxGroupRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: CheckboxGroupRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

value?

`string[]`

The current value (controlled).

defaultValue?

`string[]`

The default value (uncontrolled).

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the input value is invalid.

validate?

`((value: string[]) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

className?

`string | ((values: CheckboxGroupRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onChange?

`((value: string[]) => void)`

Handler that is called when the value changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

## [Migration Notes](https://hopper.workleap.design/components/CheckboxGroup\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `onChange` signature has been changed – no events are passed.
- `disabled` has been renamed to `isDisabled`.
- `required` has been renamed to `isRequired`.
- `fluid` has been removed.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `autofocus` is not supported. You must put `autofocus` on the actual Checkbox.
- The default orientation is now vertical instead of horizontal.
- `validationState` is removed. use `isInvalid` instead. There is no `isValid`.
- `wrap` is removed. If horizontal, radios will wrap.
- There is no `align` prop. If needed, the styled system can be used.
- The `inline` prop is not available.

## Form Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Form

Forms are used to gather information from the user.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Form/src/Form.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Form]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Email

Sign In

```

import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form>
            <TextField name="email" placeholder="Enter your email" label="Email" />
            <Button type="submit">Sign In</Button>
        </Form>
    );
}


```

### [Composed Components](https://hopper.workleap.design/components/Form\#anatomy-composed-components)

A `Form` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**ButtonGroup** \\
\\
A button group handles the spacing and orientation for a grouping of buttons.](https://hopper.workleap.design/components/ButtonGroup)

[**ErrorMessage** \\
\\
An error message displays validation errors for a form field.](https://hopper.workleap.design/components/ErrorMessage)

[**HelperMessage** \\
\\
A helper message component displays auxiliary text to guide users in the interface.](https://hopper.workleap.design/components/HelperMessage)

[**NumberField** \\
\\
A number field is a specialized input that allows a user to enter a number.](https://hopper.workleap.design/components/NumberField)

[**PasswordField** \\
\\
A password field is a specialized text field that allows a user to enter a password.](https://hopper.workleap.design/components/PasswordField)

[**TextField** \\
\\
A text field allows a user to enter a plain text value.](https://hopper.workleap.design/components/TextField)

## [Usage](https://hopper.workleap.design/components/Form\#usage)

### [Disabled](https://hopper.workleap.design/components/Form\#usage-disabled)

A disabled form will not allow the user to interact with the form.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Email

Sign In

```

import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form isDisabled>
            <TextField name="email" placeholder="Enter your email" label="Email" />
            <Button type="submit">Sign In</Button>
        </Form>
    );
}


```

### [Validation](https://hopper.workleap.design/components/Form\#usage-validation)

To provide validation errors, the `validationErrors` prop should be set to an object that maps each field's `name` prop
to a string or array of strings representing one or more errors. These are displayed to the user as soon as the
`validationErrors` prop is set and cleared after the user modifies each field's value.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Username

Sorry, this username is taken.

```

import { Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationErrors={{ username: "Sorry, this username is taken." }}>
            <TextField name="username" defaultValue="john_doe" label="Username" />
        </Form>
    );
}


```

#### [Native Behavior](https://hopper.workleap.design/components/Form\#native-behavior)

Native HTML form validation is used to display errors and block form submission.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ButtonGroup, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="native">
            <TextField
                name="email"
                type="email"
                isRequired
                label="Email"
            />
            <ButtonGroup>
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </ButtonGroup>
        </Form>
    );
}


```

#### [Aria Behavior](https://hopper.workleap.design/components/Form\#aria-behavior)

To use form validation via ARIA, set the `validationBehavior` property to "aria".
This will not block form submission and will display validation errors to the user in real time as the value is modified.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Username

Nice try.

Submit

```

import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form validationBehavior="aria">
            <TextField
                name="username"
                defaultValue="admin"
                isRequired
                validate={value => value === "admin" ? "Nice try." : null}
                label="Username"
            />
            <Button type="submit">Submit</Button>
        </Form>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Form\#usage-sizes)

A form has multiple sizes to choose from.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Form, Stack, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-sm" margin="stack-lg">
            <Form>
                <TextField name="email" placeholder="Enter your email" label="Email" />
                <Button type="submit">Sign In</Button>
            </Form>
            <Form size="sm">
                <TextField name="email" placeholder="Enter your email" label="Email" />
                <Button type="submit">Sign In</Button>
            </Form>
        </Stack>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/Form\#usage-fluid)

Form fields can take the width of their container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Email

Sign In

```

import { Button, Form, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form isFluid width="80%">
            <TextField name="email" placeholder="Enter your email" label="Email" />
            <Button type="submit">Sign In</Button>
        </Form>
    );
}


```

## [Props](https://hopper.workleap.design/components/Form\#props)

isDisabled?

`boolean`

Whether the form elements are disabled.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the Form will take all available width.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

The size of the fields and buttons within the form.

_Defaults to md._

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

validationBehavior?

`"aria" | "native"`

Whether to use native HTML form validation to prevent form submission
when a field value is missing or invalid, or mark fields as required
or invalid via ARIA.

_Defaults to 'native'._

validationErrors?

`ValidationErrors`

Validation errors for the form, typically returned by a server.
This should be set to an object mapping from input names to errors.

action?

`string`

Where to send the form-data when the form is submitted.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action).

encType?

`"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain"`

The enctype attribute specifies how the form-data should be encoded when submitting it to the server.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype).

method?

`"dialog" | "get" | "post"`

The HTTP method to submit the form with.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method).

target?

`"_blank" | "_self" | "_parent" | "_top"`

The target attribute specifies a name or a keyword that indicates where to display the response that is received after submitting the form.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target).

autoComplete?

`"off" | "on"`

Indicates whether input elements can by default have their values automatically completed by the browser.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#autocomplete).

autoCapitalize?

`"off" | "on" | "none" | "sentences" | "words" | "characters"`

Controls whether inputted text is automatically capitalized and, if so, in what manner.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize).

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Events

onSubmit?

`((event: FormEvent<HTMLFormElement>) => void)`

Triggered when a user submits the form.

onReset?

`((event: FormEvent<HTMLFormElement>) => void)`

Triggered when a user resets the form.

onInvalid?

`((event: FormEvent<HTMLFormElement>) => void)`

Triggered for each invalid field when a user submits the form.

### \#\#\#\# Accessibility

role?

`"search" | "presentation"`

An ARIA role override to apply to the form element.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## Number Field Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# NumberField

A number field is a specialized input that allows a user to enter a number.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/inputs/src/NumberField.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[NumberField]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField label="Training hours completed" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/NumberField\#usage)

### [Disabled](https://hopper.workleap.design/components/NumberField\#usage-disabled)

A number field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField isDisabled label="Training hours completed" />
    );
}


```

### [ReadOnly](https://hopper.workleap.design/components/NumberField\#usage-readonly)

The `isReadOnly` prop makes the number field's content immutable. Unlike `isDisabled`, the number field remains focusable and the contents can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField value={42} isReadOnly label="Training hours completed" />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/NumberField\#usage-sizes)

Number fields have multiple sizes to choose from.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <NumberField label="Training hours completed" size="sm" />
            <NumberField label="Training hours completed" />
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/NumberField\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the number field for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField aria-label="Training hours completed" />
    );
}


```

### [Description](https://hopper.workleap.design/components/NumberField\#usage-description)

A number field with a helper message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField label="Training hours completed" description="In person training hours only." />
    );
}


```

### [Icon Prefix](https://hopper.workleap.design/components/NumberField\#usage-icon-prefix)

An icon can be displayed at the start of the input.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";
import { UserIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <NumberField prefix={<UserIcon />} label="Training hours completed" />
    );
}


```

### [Text Prefix](https://hopper.workleap.design/components/NumberField\#usage-text-prefix)

A short text can be displayed at the start of the input.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField prefix="Kg" label="Training hours completed" />
    );
}


```

### [Error](https://hopper.workleap.design/components/NumberField\#usage-error)

A number field can be displayed in an error state to indicate that the user input is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField value={42} isInvalid label="Training hours completed" errorMessage="You cannot enter more than 40 training hours for this period." />
    );
}


```

### [Min Max](https://hopper.workleap.design/components/NumberField\#usage-min-max)

A number field can have a minimum and maximum value.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField minValue={42} maxValue={50} label="Training hours completed" description="Please enter a value between 10 and 40." />
    );
}


```

### [Formatting](https://hopper.workleap.design/components/NumberField\#usage-formatting)

A number field can be formatted using this [format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField
            formatOptions={{
                style: "currency",
                currency: "USD"
            }}
            label="Training Budget Allocated"
        />
    );
}


```

### [Fluid](https://hopper.workleap.design/components/NumberField\#usage-fluid)

A number field can take the width of its container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { NumberField } from "@hopper-ui/components";

export default function Example() {
    return (
        <NumberField isFluid label="Training hours completed" />
    );
}


```

## [Props](https://hopper.workleap.design/components/NumberField\#props)

prefix?

`ReactNode`

An icon or text to display at the start of the input.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the NumberField will take all available width.

_Defaults to false._

inputRef?

`MutableRefObject<HTMLInputElement | null>`

A ref for the HTML input element.

inputGroupProps?

`InputGroupProps`

The props for the InputGroup.

style?

`CSSProperties | ((values: NumberFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

decrementAriaLabel?

`string`

A custom aria-label for the decrement button. If not provided, the localized string "Decrement" is used.

incrementAriaLabel?

`string`

A custom aria-label for the increment button. If not provided, the localized string "Increment" is used.

isWheelDisabled?

`boolean`

Enables or disables changing the value with scroll.

formatOptions?

`NumberFormatOptions`

Formatting options for the value displayed in the number field.
This also affects what characters are allowed to be typed by the user.

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the input value is invalid.

validate?

`((value: number) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

value?

`number`

The current value (controlled).

defaultValue?

`number`

The default value (uncontrolled).

minValue?

`number`

The smallest value allowed for the input.

maxValue?

`number`

The largest value allowed for the input.

step?

`number`

The amount that the input value changes with each increment or decrement "tick".

className?

`string | ((values: NumberFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onChange?

`((value: number) => void)`

Handler that is called when the value changes.

onCopy?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).

onCut?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).

onPaste?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).

onCompositionStart?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).

onCompositionEnd?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).

onCompositionUpdate?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).

onSelect?

`ReactEventHandler<HTMLInputElement>`

Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).

onBeforeInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).

onInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/NumberField\#migration-notes)

- Boolean props are now prefixed by `is`.
- There is no longer a loading state.
- `icon` prop has been renamed to `prefix`.
- `wrapperProps` is not supported.
- `validationState` was renamed to `isInvalid`.
- `min` and `max` props have been renamed to `minValue` and `maxValue`.

## Password Field Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# PasswordField

A password field is a specialized text field that allows a user to enter a password.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/inputs/src/PasswordField.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[PasswordField]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField label="Password" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/PasswordField\#usage)

### [Disabled](https://hopper.workleap.design/components/PasswordField\#usage-disabled)

A password field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField isDisabled label="Password" />
    );
}


```

### [ReadOnly](https://hopper.workleap.design/components/PasswordField\#usage-readonly)

The `isReadOnly` prop makes the PasswordField's text content immutable. Unlike `isDisabled`, the password field remains focusable and its content can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField isReadOnly label="Password" />
    );
}


```

### [Error](https://hopper.workleap.design/components/PasswordField\#usage-error)

A password field can be displayed in an error state to indicate that the user input is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField isInvalid label="Password" errorMessage="Password can't be empty." />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/PasswordField\#usage-sizes)

Password fields can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <PasswordField label="Password" size="sm" />
            <PasswordField label="Password" />
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/PasswordField\#usage-labeling)

If a visible label isn't specified, an aria-label must be provided to the password field for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField aria-label="Label" />
    );
}


```

### [Description](https://hopper.workleap.design/components/PasswordField\#usage-description)

A password field with a helper message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { PasswordField } from "@hopper-ui/components";

export default function Example() {
    return (
        <PasswordField label="Password" description="Should contain more than 10 characters" />
    );
}


```

## [Props](https://hopper.workleap.design/components/PasswordField\#props)

placeholder?

`string`

The placeholder text when the PasswordField is empty.

size?

`ResponsiveProp<FieldSize>`

The size of the PasswordField.

_Defaults to md._

isFluid?

`ResponsiveProp<boolean>`

If `true`, the PasswordField will take all available width.

_Defaults to false._

inputRef?

`MutableRefObject<HTMLInputElement | null>`

A ref for the HTML input element.

inputGroupProps?

`InputGroupProps`

The props for the InputGroup.

inputProps?

`InputProps`

The props for the Input.

embeddedButtonProps?

`EmbeddedButtonProps`

The props for the EmbeddedButton.

style?

`CSSProperties | ((values: TextFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

pattern?

`string`

Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

enterKeyHint?

`"search" | "enter" | "done" | "go" | "next" | "previous" | "send"`

An enumerated attribute that defines what action label or icon to preset for the enter key on virtual keyboards. See \[<https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/enterkeyhint\>].

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the value is invalid.

validate?

`((value: string) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

value?

`string`

The current value (controlled).

defaultValue?

`string`

The default value (uncontrolled).

autoComplete?

`string`

Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).

maxLength?

`number`

The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength).

minLength?

`number`

The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength).

inputMode?

`"search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).

autoCorrect?

`string`

An attribute that takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete).

spellCheck?

`string`

An enumerated attribute that defines whether the element may be checked for spelling errors. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

className?

`string | ((values: TextFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

### \#\#\#\# Events

onFocus?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onChange?

`((value: string) => void)`

Handler that is called when the value changes.

onCopy?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).

onCut?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).

onPaste?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).

onCompositionStart?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).

onCompositionEnd?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).

onCompositionUpdate?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).

onSelect?

`ReactEventHandler<HTMLInputElement>`

Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).

onBeforeInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).

onInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-activedescendant?

`string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

aria-autocomplete?

`"none" | "inline" | "list" | "both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "false" | "true" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

## [Migration Notes](https://hopper.workleap.design/components/PasswordField\#migration-notes)

- Boolean props are now prefixed by `is`.
- There is no longer a loading state.
- `icon` prop has been renamed to `prefix`.
- Button props have been removed. To add a clear button, use the `isClearable` prop. For a more complex use case, create your own input using InputGroup.
- `wrapperProps` no longer exists.
- `validationState` has been changed to `isInvalid`.

## RadioGroup Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# RadioGroup

A radio group is used to group related options together.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/radio/src/RadioGroup.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[RadioGroup]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
        </RadioGroup>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/RadioGroup\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/RadioGroup\#anatomy-composed-components)

A `RadioGroup` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/RadioGroup\#usage)

### [Label](https://hopper.workleap.design/components/RadioGroup\#usage-label)

A radio group can have a label to provide more context to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Manager

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup label="Roles">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/RadioGroup\#usage-disabled)

A radio group can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Manager

Designer

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup isDisabled aria-label="roles">
            <Radio value="manager">Manager</Radio>
            <Radio value="designer">Designer</Radio>
        </RadioGroup>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/RadioGroup\#usage-sizes)

A radio group can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Manager

Designer

Manager

Designer

```

import { Inline, Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <RadioGroup size="sm" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
            <RadioGroup size="md" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
        </Inline>
    );
}


```

### [Orientation](https://hopper.workleap.design/components/RadioGroup\#usage-orientation)

A radio group can be displayed horizontally or vertically.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Manager

Designer

Manager

Designer

```

import { Inline, Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <RadioGroup orientation="horizontal" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
            <RadioGroup orientation="vertical" aria-label="roles">
                <Radio value="manager">Manager</Radio>
                <Radio value="designer">Designer</Radio>
            </RadioGroup>
        </Inline>
    );
}


```

### [Description](https://hopper.workleap.design/components/RadioGroup\#usage-description)

A radio group can have a description to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

Manager

Select one to continue

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles" description="Select one to continue">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}


```

### [Variants](https://hopper.workleap.design/components/RadioGroup\#usage-variants)

A radio group can be bordered.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

```

import { Radio, RadioGroup, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup variant="bordered" aria-label="roles">
            <Radio value="developer"><Text>Developer</Text></Radio>
            <Radio value="designer">
                <Text>Designer</Text>
            </Radio>
        </RadioGroup>
    );
}


```

### [Invalid](https://hopper.workleap.design/components/RadioGroup\#usage-invalid)

A radio group can be invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Roles

Developer

Designer

Manager

Check this box and the description will appear

```

import { Radio, RadioGroup } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isInvalid, setIsInvalid] = useState(true);

    function onChange(value: string) {
        // if value is empty, then it is invalid
        setIsInvalid(value.length === 0);
    }

    return (
        <RadioGroup
            onChange={onChange}
            isInvalid={isInvalid}
            label="Roles"
            description="These are all excellent roles"
            errorMessage="Check this box and the description will appear"
        >
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <Radio value="manager">Manager</Radio>
        </RadioGroup>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/RadioGroup\#usage-controlled)

A radio group can handle `value` state in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

ManagerTeam Manager

```

import { Radio, RadioField, RadioGroup } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selected, setSelected] = useState<string>("designer");

    return (
        <RadioGroup
            aria-label="Roles"
            value={selected}
            onChange={setSelected}
        >
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <RadioField description="Team Manager">
                <Radio value="manager">Manager</Radio>
            </RadioField>
        </RadioGroup>
    );
}


```

### [No Label on Items](https://hopper.workleap.design/components/RadioGroup\#usage-no-label-on-items)

A radio component can be rendered without a label.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="label" aria-label="Label"></Radio>
        </RadioGroup>
    );
}


```

### [Disabled Items](https://hopper.workleap.design/components/RadioGroup\#usage-disabled-items)

A radio component can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Manager

Designer

```

import { Radio, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="manager" isDisabled>Manager</Radio>
            <Radio value="designer">Designer</Radio>
        </RadioGroup>
    );
}


```

### [Description on Items](https://hopper.workleap.design/components/RadioGroup\#usage-description-on-items)

A radio component can have a description to provide more information to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

ManagerTeam Manager

```

import { Radio, RadioField, RadioGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="developer">Developer</Radio>
            <Radio value="designer">Designer</Radio>
            <RadioField description="Team Manager">
                <Radio value="manager">Manager</Radio>
            </RadioField>
        </RadioGroup>
    );
}


```

### [Icon](https://hopper.workleap.design/components/RadioGroup\#usage-icon)

Each radio can be customized with an icon or an icon list.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Developer

Designer

```

import { IconList, Radio, RadioGroup, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <RadioGroup aria-label="roles">
            <Radio value="developer"><SparklesIcon /><Text>Developer</Text></Radio>
            <Radio value="designer">
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </Radio>
        </RadioGroup>
    );
}


```

## [Props](https://hopper.workleap.design/components/RadioGroup\#props)

### [RadioGroup](https://hopper.workleap.design/components/RadioGroup\#props-radiogroup)

listProps?

`RadioListProps`

The props of the list element that wraps the Radio components.

orientation?

`ResponsiveProp<Orientation>`

A RadioGroup can be displayed horizontally or vertically.

_Defaults to vertical._

variant?

`InputGroupVariant`

A RadioGroup has two variants: borderless and bordered.

_Defaults to borderless._

style?

`CSSProperties | ((values: RadioGroupRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: RadioGroupRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

value?

`string | null`

The current value (controlled).

defaultValue?

`string | null`

The default value (uncontrolled).

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the input value is invalid.

validate?

`((value: string | null) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

className?

`string | ((values: RadioGroupRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onChange?

`((value: string) => void)`

Handler that is called when the value changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

### [Radio](https://hopper.workleap.design/components/RadioGroup\#props-radio)

size?

`ResponsiveProp<FieldSize>`

A radio can vary in size.

_Defaults to md._

style?

`CSSProperties | ((values: RadioRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: RadioRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

value

`string`

The value of the radio button, used when submitting an HTML form.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).

isDisabled?

`boolean`

Whether the radio button is disabled or not.
Shows that a selection exists, but is not available in that circumstance.

autoFocus?

`boolean`

Whether the element should receive focus on render.

inputRef?

`RefObject<HTMLInputElement | null>`

A ref for the HTML input element.

className?

`string | ((values: RadioRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/RadioGroup\#migration-notes)

### [RadioGroup](https://hopper.workleap.design/components/RadioGroup\#migration-notes-radiogroup)

Coming from Orbiter, you should be aware of the following changes:

- `required` has been renamed to `isRequired`.
- `onChange` signature has changed (no event are passed).
- `disabled` has been renamed to `isDisabled`.
- `autofocus` is not supported. You must use `autofocus` on the actual Radio.
- `fluid` has been removed.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- The default orientation is now vertical instead of horizontal.
- `validationState` has been removed. Use `isInvalid` instead. There is no `isValid`.
- `wrap` has been removed. If `horizontal`, radios will wrap.
- There is no `align` prop. If needed, the styled system can be used.
- `inline` prop is not available.

### [Radio](https://hopper.workleap.design/components/RadioGroup\#migration-notes-radio)

Coming from Orbiter, you should be aware of the following changes:

- The `Counter` component is no longer allowed as a specialized slot.
- Values are not auto-generated when missed.
- `onChange` is only supported on `RadioGroup`, not on `Radio`.
- `onValueChange` has been deleted, use `onChange` instead.
- `checked` has been renamed to `isSelected`.
- `disabled` has been renamed to `isDisabled`.
- `required` has been renamed to `isRequired`.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `validationState` has been removed. Yse `isInvalid` instead. There is no `isValid`.
- `value` is required.

## Search Field Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# SearchField

A search field is a specialized text input allowing the user to perform a search.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/inputs/src/SearchField.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[SearchField]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" label="Filter by location" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/SearchField\#usage)

### [Disabled](https://hopper.workleap.design/components/SearchField\#usage-disabled)

A search field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" isDisabled label="Filter by location" />
    );
}


```

### [ReadOnly](https://hopper.workleap.design/components/SearchField\#usage-readonly)

The `isReadOnly` prop makes the SearchField's text content immutable. Unlike `isDisabled`, the search field remains focusable and the contents can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" isReadOnly label="Filter by location" />
    );
}


```

### [Error](https://hopper.workleap.design/components/SearchField\#usage-error)

A search field can be displayed in an error state to indicate that the user input is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" isInvalid label="Filter by location" errorMessage="No results were found" />
    );
}


```

### [Hide Clear Button](https://hopper.workleap.design/components/SearchField\#usage-hide-clear-button)

A search field can hide its clear button.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" isClearable={false} label="Filter by location" />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/SearchField\#usage-sizes)

Search fields have multiple sizes to choose from.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <SearchField label="Filter by location" placeholder="New York, NY" size="sm" />
            <SearchField label="Filter by location" placeholder="New York, NY" />
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/SearchField\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the search field for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" aria-label="Filter by location" />
    );
}


```

### [Description](https://hopper.workleap.design/components/SearchField\#usage-description)

A search field with a helper message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { SearchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SearchField placeholder="New York, NY" label="Filter by location" description="Search by city, state, or postal code" />
    );
}


```

## [Props](https://hopper.workleap.design/components/SearchField\#props)

isClearable?

`boolean`

Whether the SearchField is clearable.

_Defaults to true._

placeholder?

`string`

The placeholder text when the SearchField is empty.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the SearchField will take all available width.

_Defaults to false._

icon?

`ReactNode`

An icon to display at the start of the input.

inputRef?

`MutableRefObject<HTMLInputElement | null>`

A ref for the HTML input element.

inputGroupProps?

`InputGroupProps`

The props for the InputGroup.

clearButtonProps?

`ClearButtonProps`

The props for the EmbeddedButton.

style?

`CSSProperties | ((values: SearchFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

pattern?

`string`

Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

enterKeyHint?

`"search" | "enter" | "done" | "go" | "next" | "previous" | "send"`

An enumerated attribute that defines what action label or icon to preset for the enter key on virtual keyboards. See \[<https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/enterkeyhint\>].

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the input value is invalid.

validate?

`((value: string) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

value?

`string`

The current value (controlled).

defaultValue?

`string`

The default value (uncontrolled).

autoComplete?

`string`

Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).

maxLength?

`number`

The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength).

minLength?

`number`

The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength).

type?

`"search" | "text" | (string & {}) | "url" | "tel" | "email" | "password"`

The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).

inputMode?

`"search" | "text" | "none" | "url" | "tel" | "email" | "numeric" | "decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).

autoCorrect?

`string`

An attribute that takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete).

spellCheck?

`string`

An enumerated attribute that defines whether the element may be checked for spelling errors. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

className?

`string | ((values: SearchFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onSubmit?

`((value: string) => void)`

Handler that is called when the SearchField is submitted.

onClear?

`(() => void)`

Handler that is called when the clear button is pressed.

onFocus?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onChange?

`((value: string) => void)`

Handler that is called when the value changes.

onCopy?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).

onCut?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).

onPaste?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).

onCompositionStart?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).

onCompositionEnd?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).

onCompositionUpdate?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).

onSelect?

`ReactEventHandler<HTMLInputElement>`

Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).

onBeforeInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).

onInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-activedescendant?

`string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

aria-autocomplete?

`"none" | "inline" | "list" | "both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "false" | "true" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

## [Migration Notes](https://hopper.workleap.design/components/SearchField\#migration-notes)

- Boolean props are now prefixed by `is`.
- There is no longer a loading state.
- `icon` prop has been renamed to `prefix`.
- Button props have been removed. To add a clear button, use the `isClearable` prop. For a more complex use case, create your own input using InputGroup.
- `wrapperProps` no longer exists.
- `validationState` has been changed to `isInvalid`.

## Switch Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Switch

A switch is used to quickly switch between two possible states.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/switch/src/Switch.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Switch]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Switch } from "@hopper-ui/components";

export default function Example() {
    return (
        <Switch>Save</Switch>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Switch\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Switch\#anatomy-composed-components)

A `Switch` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**IconList** \\
\\
An IconList encapsulates a collection of icons.](https://hopper.workleap.design/components/IconList)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Switch\#usage)

### [Selected](https://hopper.workleap.design/components/Switch\#usage-selected)

A switch can be selected.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Switch } from "@hopper-ui/components";

export default function Example() {
    return (
        <Switch defaultSelected>Save</Switch>
    );
}


```

### [No label](https://hopper.workleap.design/components/Switch\#usage-no-label)

A switch can be rendered without a label.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Switch } from "@hopper-ui/components";

export default function Example() {
    return (
        <Switch aria-label="Label" />
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Switch\#usage-disabled)

A switch can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Switch, SwitchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SwitchField isDisabled>
            <Switch>Save</Switch>
        </SwitchField>
    );
}


```

### [Disabled Field](https://hopper.workleap.design/components/Switch\#usage-disabled-field)

A switch field can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Switch, SwitchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <SwitchField isDisabled description="This will override your changes">
            <Switch>Save</Switch>
        </SwitchField>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Switch\#usage-sizes)

A switch can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Switch } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Switch size="sm">Save</Switch>
            <Switch size="md">Save</Switch>
        </Inline>
    );
}


```

### [Field Sizes](https://hopper.workleap.design/components/Switch\#usage-field-sizes)

A switch field can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Switch, SwitchField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <SwitchField size="sm" description="This will override your changes.">
                <Switch>Save</Switch>
            </SwitchField>
            <SwitchField size="md" description="This will override your changes.">
                <Switch>Save</Switch>
            </SwitchField>
        </Inline>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Switch\#usage-icon)

A switch can be rendered with an icon or an icon list.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, Inline, Switch } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Switch>
                Save
                <SparklesIcon />
            </Switch>
            <Switch>
                Save
                <IconList>
                    <SparklesIcon />
                    <SparklesIcon />
                </IconList>
            </Switch>
        </Inline>
    );
}


```

## [Props](https://hopper.workleap.design/components/Switch\#props)

### [Switch](https://hopper.workleap.design/components/Switch\#props-switch)

size?

`ResponsiveProp<FieldSize>`

A Switch can vary in size.

_Defaults to md._

style?

`CSSProperties | ((values: SwitchRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: SwitchRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

defaultSelected?

`boolean`

Whether the Switch should be selected (uncontrolled).

isSelected?

`boolean`

Whether the Switch should be selected (controlled).

value?

`string`

The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

autoFocus?

`boolean`

Whether the element should receive focus on render.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

inputRef?

`RefObject<HTMLInputElement | null>`

A ref for the HTML input element.

className?

`string | ((values: SwitchRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onChange?

`((isSelected: boolean) => void)`

Handler that is called when the Switch's selection state changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [SwitchField](https://hopper.workleap.design/components/Switch\#props-switchfield)

description?

`ReactNode`

The description of the switch field.

isDisabled?

`boolean`

Whether the switch field is disabled.

size?

`ResponsiveProp<FieldSize>`

A switch field can vary in size.

_Defaults to md._

children?

`ReactNode | ((values: SwitchFieldRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: SwitchFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

style?

`CSSProperties | ((values: SwitchFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Switch\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `onChange` signature has been changed – no events are passed.
- `onValueChange` has been deleted, use `onChange` instead.
- `checked` has been renamed to `isSelected`.
- `disabled` has been renamed to `isDisabled`.
- The `Counter` component is no longer allowed as a specialized slot.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `validationState` has been removed. A `Switch` cannot be invalid.

## Text Area Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# TextArea

A text area serves as a multi-line, plain-text editing interface.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/inputs/src/TextArea.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[TextArea]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" label="Address" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/TextArea\#usage)

### [Disabled](https://hopper.workleap.design/components/TextArea\#usage-disabled)

A text area in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" isDisabled label="Address" />
    );
}


```

### [ReadOnly](https://hopper.workleap.design/components/TextArea\#usage-readonly)

The `isReadOnly` prop makes the text area's text content immutable. Unlike `isDisabled`, the text area remains focusable and the contents can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" value="280 Baker Street" isReadOnly label="Address" />
    );
}


```

### [Error](https://hopper.workleap.design/components/TextArea\#usage-error)

A text area can be displayed in an error state to indicate that the user input is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

This field is required

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" isInvalid label="Address" errorMessage="This field is required" />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/TextArea\#usage-sizes)

A text area can vary in size. The height is determined by the number of rows. Each size has a unique font size, resulting in varying heights across different sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

Address

```

import { Stack, TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TextArea label="Address" placeholder="123 Main St, City, State" size="sm" />
            <TextArea label="Address" placeholder="123 Main St, City, State" />
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/TextArea\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the text area for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" aria-label="Address" />
    );
}


```

### [Description](https://hopper.workleap.design/components/TextArea\#usage-description)

A text area can have a description using the [HelperMessage](https://hopper.workleap.design/components/HelperMessage) component to provide additional context to the user.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

Enter on multiple lines if needed

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" label="Address" description="Enter on multiple lines if needed" />
    );
}


```

### [Character Count](https://hopper.workleap.design/components/TextArea\#usage-character-count)

A character count can be displayed below the input. The character count is based on the `maxLength` prop. If the `maxLength` prop is not set, the character count will not be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

60

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" showCharacterCount maxLength={60} label="Address" />
    );
}


```

### [Max Length Exceeded](https://hopper.workleap.design/components/TextArea\#usage-max-length-exceeded)

To exceed the max length, set the `allowExceedingMaxLength` prop to `true` – default is `false`. When the character count is displayed, it turns red if the max length is exceeded.

Note: If allowExceedingMaxLength is set, a character count is required to be set as well.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Comment

-68

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            showCharacterCount
            maxLength={20}
            allowExceedingMaxLength
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns."
            label="Comment"
        />
    );
}


```

### [Rows](https://hopper.workleap.design/components/TextArea\#usage-rows)

The `rows` prop can be used to set the height of the text area and should be used in favor of the `height` prop. One row is equivalent to the height of one line of text.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            rows={8}
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns. "
            label="Name"
        />
    );
}


```

### [Max Rows](https://hopper.workleap.design/components/TextArea\#usage-max-rows)

The `maxRows` prop can be used to set the maximum height of the text area and should be used in favor of the `maxHeight` prop.
It differs from the `rows` prop in that it will not set the initial height of the text area.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Comment

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea
            maxRows={8}
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns."
            label="Comment"
        />
    );
}


```

### [Vertical Resize](https://hopper.workleap.design/components/TextArea\#usage-vertical-resize)

The `resizeMode` prop can be used to set the resize behavior of the text area.
The default behavior is `none`, which prevents the user from resizing the text area.
The `vertical` behavior allows the user to resize the text area vertically.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Address

```

import { TextArea } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextArea placeholder="123 Main St, City, State" resizeMode="vertical" label="Address" />
    );
}


```

## [Props](https://hopper.workleap.design/components/TextArea\#props)

showCharacterCount?

`boolean`

True to display the number of remaining allowed characters on the right of the input. Requires a valid value in the "maxLength" prop.

maxRows?

`number`

The maximum number of visible text lines before displaying a scrollbar.

placeholder?

`string`

The placeholder text when the TextArea is empty.

rows?

`number`

See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows).

cols?

`number`

See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols).

isFluid?

`ResponsiveProp<boolean>`

If `true`, the TextArea will take all available width.

allowExceedingMaxLength?

`boolean`

This should only be used with the `showCharacterCount` prop.
If `true`, the TextArea will allow the text to go over the max length, but it will add an error look to the character count.

resizeMode?

`ResponsiveProp<ResizeMode>`

The resize mode value of the TextArea. It's equivalent to the CSS resize property.

_Defaults to none._

inputRef?

`MutableRefObject<HTMLTextAreaElement | null>`

A ref for the HTML textarea element.

inputGroupProps?

`InputGroupProps`

The props for the InputGroup.

remainingCharacterCountProps?

`RemainingCharacterCountProps`

The props for the RemainingCharacterCount.

style?

`CSSProperties | ((values: TextFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

pattern?

`string`

Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

enterKeyHint?

`"search" | "enter" | "done" | "go" | "next" | "previous" | "send"`

An enumerated attribute that defines what action label or icon to preset for the enter key on virtual keyboards. See \[<https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/enterkeyhint\>].

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the value is invalid.

validate?

`((value: string) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

value?

`string`

The current value (controlled).

defaultValue?

`string`

The default value (uncontrolled).

autoComplete?

`string`

Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).

maxLength?

`number`

The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength).

minLength?

`number`

The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength).

type?

`"search" | "text" | (string & {}) | "url" | "tel" | "email" | "password"`

The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).

inputMode?

`"search" | "text" | "none" | "url" | "tel" | "email" | "numeric" | "decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).

autoCorrect?

`string`

An attribute that takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete).

spellCheck?

`string`

An enumerated attribute that defines whether the element may be checked for spelling errors. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

className?

`string | ((values: TextFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onFocus?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onChange?

`((value: string) => void)`

Handler that is called when the value changes.

onCopy?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).

onCut?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).

onPaste?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).

onCompositionStart?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).

onCompositionEnd?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).

onCompositionUpdate?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).

onSelect?

`ReactEventHandler<HTMLInputElement>`

Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).

onBeforeInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).

onInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-activedescendant?

`string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

aria-autocomplete?

`"none" | "inline" | "list" | "both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "false" | "true" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

## [Migration Notes](https://hopper.workleap.design/components/TextArea\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- Boolean props are now prefixed by `is`.
- There is no longer a loading state.
- `icon` prop has been removed since it is not used in a TextArea.
- `button` prop has been removed.
- `wrapperProps` no longer exists.
- `validationState` has been changed to `isInvalid`.
- `showCharacterCount` has been added.

## Text Field Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# TextField

A text field allows a user to enter a plain text value.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/inputs/src/TextField.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[TextField]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

Specialized text fields are available for different scenarios:

- If you want a text field with `type="search"`, use the [SearchField](https://hopper.workleap.design/components/SearchField) component.
- If you want a text field that shows/hides a password, use the [PasswordField](https://hopper.workleap.design/components/PasswordField) component.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" label="Name" />
    );
}


```

## [Usage](https://hopper.workleap.design/components/TextField\#usage)

### [Disabled](https://hopper.workleap.design/components/TextField\#usage-disabled)

A text field in a disabled state shows that an input field exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" isDisabled label="Name" />
    );
}


```

### [ReadOnly](https://hopper.workleap.design/components/TextField\#usage-readonly)

The `isReadOnly` prop makes the text field's text content immutable. Unlike `isDisabled`, the text field remains focusable and the contents can still be copied. See [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) for more information.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField value="John Doe" placeholder="Full name (e.g., Jane Smith)" isReadOnly label="Name" />
    );
}


```

### [Error](https://hopper.workleap.design/components/TextField\#usage-error)

A text field can be displayed in an error state to indicate that the user input is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

This field is required

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField
            placeholder="Full name (e.g., Jane Smith)"
            isInvalid
            label="Name"
            errorMessage="This field is required"
        />
    );
}


```

### [Clearable](https://hopper.workleap.design/components/TextField\#usage-clearable)

The `isClearable` prop can be set to `true` to display a clear button at the end of the input.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField defaultValue="John Doe" placeholder="Full name (e.g., Jane Smith)" isClearable label="Name" />
    );
}


```

### [Sizes](https://hopper.workleap.design/components/TextField\#usage-sizes)

Text fields have multiple sizes to choose from.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

Name

```

import { Stack, TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TextField label="Name" placeholder="Full name (e.g., Jane Smith)" size="sm" />
            <TextField label="Name" placeholder="Full name (e.g., Jane Smith)" />
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/TextField\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the text field for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" aria-label="Name" />
    );
}


```

### [Description](https://hopper.workleap.design/components/TextField\#usage-description)

A text field with a helper message.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

Enter both first name and last name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField
            placeholder="Full name (e.g., Jane Smith)"
            label="Name"
            description="Enter both first name and last name"
        />
    );
}


```

### [Icon Prefix](https://hopper.workleap.design/components/TextField\#usage-icon-prefix)

An icon can be displayed at the start of the input.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";
import { SearchIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" prefix={<SearchIcon />} label="Name" />
    );
}


```

### [Text Prefix](https://hopper.workleap.design/components/TextField\#usage-text-prefix)

A short text can be displayed at the start of the input.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Phone number

+1

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="(000) 000-0000" prefix="+1" label="Phone number" />
    );
}


```

### [Character Count](https://hopper.workleap.design/components/TextField\#usage-character-count)

A character count can be displayed at the end of the input.
The character count is based on the `maxLength` prop.
If the `maxLength` prop is not set, the character count will not be displayed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

60

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" showCharacterCount maxLength={60} label="Name" />
    );
}


```

### [Max Length Exceeded](https://hopper.workleap.design/components/TextField\#usage-max-length-exceeded)

To exceed the max length, set the `allowExceedingMaxLength` prop to `true` – default is `false`. When the character count is displayed, it turns red if the max length is exceeded.

Note: If allowExceedingMaxLength is set, a character count is required to be set as well.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

-68

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField
            showCharacterCount
            maxLength={20}
            allowExceedingMaxLength
            defaultValue="I appreciate their open-door policy and willingness to listen to our ideas and concerns."
            label="Name"
        />
    );
}


```

### [Fluid](https://hopper.workleap.design/components/TextField\#usage-fluid)

A text field can take the width of its container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Name

```

import { TextField } from "@hopper-ui/components";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" isFluid label="Name" />
    );
}


```

## [Props](https://hopper.workleap.design/components/TextField\#props)

prefix?

`ReactNode`

An icon or text to display at the start of the input.

showCharacterCount?

`boolean`

True to display the number of remaining allowed characters on the right of the input. Requires a valid value in the "maxLength" prop.

_Defaults to false._

isClearable?

`boolean`

Whether the TextField is clearable.

placeholder?

`string`

The placeholder text when the TextField is empty.

allowExceedingMaxLength?

`boolean`

This should only be used with the `showCharacterCount` prop.
If `true`, the TextField will allow the text to go over the max length, but it will add an error look to the character count.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the TextField will take all available width.

_Defaults to false._

inputRef?

`MutableRefObject<HTMLInputElement | null>`

A ref for the HTML input element.

inputGroupProps?

`InputGroupProps`

The props for the InputGroup.

remainingCharacterCountProps?

`RemainingCharacterCountProps`

The props for the RemainingCharacterCount.

style?

`CSSProperties | ((values: TextFieldRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

pattern?

`string`

Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

enterKeyHint?

`"search" | "enter" | "done" | "go" | "next" | "previous" | "send"`

An enumerated attribute that defines what action label or icon to preset for the enter key on virtual keyboards. See \[<https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/enterkeyhint\>].

isDisabled?

`boolean`

Whether the input is disabled.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

isInvalid?

`boolean`

Whether the value is invalid.

validate?

`((value: string) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

value?

`string`

The current value (controlled).

defaultValue?

`string`

The default value (uncontrolled).

autoComplete?

`string`

Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).

maxLength?

`number`

The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength).

minLength?

`number`

The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength).

type?

`"search" | "text" | (string & {}) | "url" | "tel" | "email" | "password"`

The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype).

inputMode?

`"search" | "text" | "none" | "url" | "tel" | "email" | "numeric" | "decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).

autoCorrect?

`string`

An attribute that takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete).

spellCheck?

`string`

An enumerated attribute that defines whether the element may be checked for spelling errors. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

className?

`string | ((values: TextFieldRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

size?

`ResponsiveProp<FieldSize>`

A Field can vary in size.

_Defaults to md._

### \#\#\#\# Events

onClear?

`(() => void)`

Handler that is called when the clear button is pressed.

onFocus?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onChange?

`((value: string) => void)`

Handler that is called when the value changes.

onCopy?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).

onCut?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).

onPaste?

`ClipboardEventHandler<HTMLInputElement>`

Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).

onCompositionStart?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).

onCompositionEnd?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).

onCompositionUpdate?

`CompositionEventHandler<HTMLInputElement>`

Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).

onSelect?

`ReactEventHandler<HTMLInputElement>`

Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).

onBeforeInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).

onInput?

`FormEventHandler<HTMLInputElement>`

Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-activedescendant?

`string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

aria-autocomplete?

`"none" | "inline" | "list" | "both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

aria-haspopup?

`boolean | "dialog" | "menu" | "grid" | "false" | "true" | "listbox" | "tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

aria-controls?

`string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-errormessage?

`string`

Identifies the element that provides an error message for the object.

## [Migration Notes](https://hopper.workleap.design/components/TextField\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `disabled` has been renamed `isDisabled`.
- `fluid` has been renamed `isFluid`.
- `readOnly` has been renamed `isReadOnly`.
- There is no longer a loading state.
- `icon` prop has been renamed to `prefix`.
- Button props have been removed. To add a clear button, use the `isClearable` prop. For a more complex use case, create your own input using InputGroup.
- `wrapperProps` no longer exists.
- `validationState` has been changed to `isInvalid`.
- `showCharacterCount` has been added.

## Icon Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Icon

An icon component is used to render a custom icon.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/icons/src/Icon.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Icon]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { createIcon } from "@hopper-ui/icons";

import { Sparkles16, Sparkles24, Sparkles32 } from "../src/index.ts";

const CustomIcon = createIcon(Sparkles16, Sparkles24, Sparkles32, "CustomIcon");

export default function Example() {
    return (
        <CustomIcon />
    );
}


```

Hopper provides multiple ways to use icons in your project:

- Using the [Workleap icon library](https://hopper.workleap.design/icons/overview/introduction)
- [Creating your own icons](https://hopper.workleap.design/components/Icon#creating-your-custom-icons)

## [Creating your custom icons](https://hopper.workleap.design/components/Icon\#creating-your-custom-icons)

To use an icon component to create custom icons you must first import your SVG icon as a component by using [`@svgr/webpack`](https://react-svgr.com/docs/getting-started/).

Hopper provides two methods for creating your custom icons:

- Using the `createIcon` function (recommended)
- Using the `Icon` component

Both `Icon` and `createIcon` enable you to style the icon using the styled system.

### [Using the createIcon function](https://hopper.workleap.design/components/Icon\#creating-your-custom-icons-using-the-createicon-function)

The `createIcon` function is a convenience wrapper around the process of generating icons with `Icon`, allowing you to achieve the same functionality with less effort.

```hd-code

import CustomIcon16 from "./path/to/custom-icon-16.svg";
import CustomIcon24 from "./path/to/custom-icon-24.svg";
import CustomIcon32 from "./path/to/custom-icon-32.svg";
import { createIcon } from "@hopper-ui/icons";

const CustomIcon = createIcon(CustomIcon16, CustomIcon24, CustomIcon32, "CustomIcon")

```

### [Using the Icon component](https://hopper.workleap.design/components/Icon\#creating-your-custom-icons-using-the-icon-component)

```hd-code

import CustomIcon16 from "./path/to/custom-icon-16.svg"
import CustomIcon24 from "./path/to/custom-icon-24.svg"
import CustomIcon32 from "./path/to/custom-icon-32.svg"
import { Icon, type CreatedIconProps } from "@hopper-ui/icons";

function CustomIcon(props: CreatedIconProps) {
  return (
    <Icon
        src16={CustomIcon16}
        src24={CustomIcon24}
        src32={CustomIcon32}
        {...props} />
  )
}

```

## [Usage](https://hopper.workleap.design/components/Icon\#usage)

### [Sizes](https://hopper.workleap.design/components/Icon\#usage-sizes)

An icon can vary in size. When used inside another component, it'll generally be sized automatically. If you use a standalone icon, you can use the size prop to control the sizing.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline } from "@hopper-ui/components";
import { createIcon } from "@hopper-ui/icons";

import { Sparkles16, Sparkles24, Sparkles32 } from "../src/index.ts";

const CustomIcon = createIcon(Sparkles16, Sparkles24, Sparkles32, "CustomIcon");

export default function Example() {
    return (
        <Inline>
            <CustomIcon size="sm" />
            <CustomIcon size="md" />
            <CustomIcon size="lg" />
        </Inline>
    );
}


```

### [Styling](https://hopper.workleap.design/components/Icon\#usage-styling)

The color of the icon can be changed using the `fill` prop. All the styled system props are also available.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { createIcon } from "@hopper-ui/icons";

import { Sparkles16, Sparkles24, Sparkles32 } from "../src/index.ts";

const CustomIcon = createIcon(Sparkles16, Sparkles24, Sparkles32, "CustomIcon");

export default function Example() {
    return (
        <CustomIcon fill="primary" />
    );
}


```

## [Props](https://hopper.workleap.design/components/Icon\#props)

style?

`CSSProperties`

className?

`string`

size?

`ResponsiveProp<IconSize>`

The size of the icon.

_Defaults to md._

src16

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 16px.

src24

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 24px.

src32

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 32px.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

## IconList Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# IconList

An IconList encapsulates a collection of icons.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/IconList/src/IconList.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[IconList]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList } from "@hopper-ui/components";
import { StarIcon, StarSolidIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <IconList>
            <StarSolidIcon />
            <StarSolidIcon />
            <StarSolidIcon />
            <StarSolidIcon />
            <StarIcon />
        </IconList>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/IconList\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/IconList\#anatomy-composed-components)

An `IconList` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

## [Usage](https://hopper.workleap.design/components/IconList\#usage)

### [Sizes](https://hopper.workleap.design/components/IconList\#usage-sizes)

An icon list can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, Stack } from "@hopper-ui/components";
import { StarIcon, StarSolidIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Stack alignX="center">
            <IconList size="sm">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
            <IconList size="md">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
            <IconList size="lg">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
        </Stack>
    );
}


```

## [Props](https://hopper.workleap.design/components/IconList\#props)

size?

`ResponsiveProp<IconSize>`

The size of the icon.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/IconList\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `disabled` prop is no longer available.

## Rich Icon Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# RichIcon

A rich icon component is used to render a rich custom icon.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/icons/src/RichIcon.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[RichIcon]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <CustomRichIcon />
    );
}




```

Similar to icons, RichIcons are vibrant and colorful. Perfect for decorative purposes or drawing attention to specific elements.

Hopper provides multiple ways to use rich icons in your project:

- Using the [Workleap icon library](https://hopper.workleap.design/icons/overview/introduction)
- [Creating your own icons](https://hopper.workleap.design/components/RichIcon#creating-your-custom-rich-icons)

## [Creating your custom rich icons](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons)

To use an rich icon component to create custom rich icons you must first import your SVG icon as a component by using [`@svgr/webpack`](https://react-svgr.com/docs/getting-started/).

Hopper provides two methods for creating your custom icons:

- Using the `createRichIcon` function (recommended)
- Using the `RichIcon` component

Both `RichIcon` and `createRichIcon` enable you to style the icon using the styled system.

### [Using the createRichIcon function](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons-using-the-createrichicon-function)

The `createRichIcon` function is a convenience wrapper around the process of generating rich icons with `RichIcon`, allowing you to achieve the same functionality with less effort.

```hd-code

import CustomRichIcon24 from "./path/to/custom-rich-icon-24.svg";
import CustomRichIcon32 from "./path/to/custom-rich-icon-32.svg";
import CustomRichIcon40 from "./path/to/custom-rich-icon-40.svg";
import { createRichIcon } from "@hopper-ui/icons";

const CustomRichIcon = createRichIcon(CustomRichIcon24, CustomRichIcon32, CustomRichIcon40, "CustomIcon")

```

### [Using the RichIcon component](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons-using-the-richicon-component)

```hd-code

import CustomRichIcon24 from "./path/to/custom-icon-24.svg"
import CustomRichIcon32 from "./path/to/custom-icon-32.svg"
import CustomRichIcon40 from "./path/to/custom-icon-40.svg"
import { Icon, type CreatedRichIconProps } from "@hopper-ui/icons";

function CustomRichIcon(props: CreatedRichIconProps) {
  return (
    <RichIcon
        src24={CustomIcon24}
        src32={CustomRichIcon24}
        src40={CustomRichIcon32}
        {...props} />
  )
}

```

### [Sizes](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons-sizes)

A rich icon can vary in size. When used inside another component, it'll generally be sized automatically. If you use a standalone icon, you can use the size prop to control the sizing.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline } from "@hopper-ui/components";
import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <Inline>
            <CustomRichIcon size="md" />
            <CustomRichIcon size="lg" />
            <CustomRichIcon size="xl" />
        </Inline>
    );
}


```

### [Styling](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons-styling)

The color of the rich icon can be changed using the `fill` prop. All the styled system props are also available.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <CustomRichIcon fill="primary" />
    );
}


```

### [Variants](https://hopper.workleap.design/components/RichIcon\#creating-your-custom-rich-icons-variants)

The color of the rich icon can be changed using the `variant` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Stack } from "@hopper-ui/components";
import { createRichIcon } from "@hopper-ui/icons";

import { SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40 } from "../src/index.ts";

const CustomRichIcon = createRichIcon(SparklesRichIcon24, SparklesRichIcon32, SparklesRichIcon40, "SparklesRichIcon");

export default function Example() {
    return (
        <Inline alignY="flex-start">
            <Stack>
                <CustomRichIcon variant="option1" />
                <CustomRichIcon variant="option2" />
                <CustomRichIcon variant="option3" />
                <CustomRichIcon variant="option4" />
                <CustomRichIcon variant="option5" />
                <CustomRichIcon variant="option6" />
                <CustomRichIcon variant="option7" />
                <CustomRichIcon variant="option8" />
            </Stack>
            <Stack>
                <CustomRichIcon variant="success" />
                <CustomRichIcon variant="warning" />
                <CustomRichIcon variant="danger" />
                <CustomRichIcon variant="information" />
                <CustomRichIcon variant="upsell" />
            </Stack>
        </Inline>
    );
}


```

## [Props](https://hopper.workleap.design/components/RichIcon\#props)

style?

`CSSProperties`

className?

`string`

variant?

`RichIconVariant`

The visual style of the icon.

_Defaults to option7._

size?

`ResponsiveProp<"md" | "lg" | "xl">`

The size of the icon.

_Defaults to lg._

src24

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 24px.

src32

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 32px.

src40

`ElementType<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>`

The source of the icon with a size of 40px.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

## Error Message Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# ErrorMessage

An error message displays validation errors for a form field.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/ErrorMessage/src/ErrorMessage.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[ErrorMessage]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ErrorMessage, SlotProvider } from "@hopper-ui/components";
import { FieldErrorContext } from "react-aria-components";

export default function Example() {
    return (
        <SlotProvider values={[\
            [FieldErrorContext, {\
                isInvalid: true,\
                validationErrors: [] as never[],\
                validationDetails: {} as never\
            }]\
        ]}
        >
            <ErrorMessage>This field is required</ErrorMessage>
        </SlotProvider>
    );
}


```

## [Usage](https://hopper.workleap.design/components/ErrorMessage\#usage)

### [No icon](https://hopper.workleap.design/components/ErrorMessage\#usage-no-icon)

An error message can hide its default icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ErrorMessage, SlotProvider } from "@hopper-ui/components";
import { FieldErrorContext } from "react-aria-components";

export default function Example() {
    return (
        <SlotProvider values={[\
            [FieldErrorContext, {\
                isInvalid: true,\
                validationErrors: [] as never[],\
                validationDetails: {} as never\
            }]\
        ]}
        >
            <ErrorMessage hideIcon>This field is required</ErrorMessage>
        </SlotProvider>
    );
}


```

### [Multiple errors](https://hopper.workleap.design/components/ErrorMessage\#usage-multiple-errors)

An error message can display multiple validation errors created by a form field.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ErrorMessage, SlotProvider } from "@hopper-ui/components";
import { FieldErrorContext } from "react-aria-components";

export default function Example() {
    return (
        <SlotProvider values={[\
            [FieldErrorContext, {\
                isInvalid: true,\
                validationErrors: ["This field is required.", "This field is too long."],\
                validationDetails: {} as never\
            }]\
        ]}
        >
            <ErrorMessage />
        </SlotProvider>
    );
}


```

## [Props](https://hopper.workleap.design/components/ErrorMessage\#props)

hideIcon?

`boolean`

Whether or not to hide the error message icon.

style?

`CSSProperties | ((values: FieldErrorRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: FieldErrorRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: FieldErrorRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

elementType?

`string`

size?

`ResponsiveProp<TextSize>`

The Typography Type Scale to use.

_Defaults to md._

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## Helper Message Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# HelperMessage

A helper message component displays auxiliary text to guide users in the interface.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/HelperMessage/src/HelperMessage.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[HelperMessage]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { HelperMessage } from "@hopper-ui/components";

export default function Example() {
    return (
        <HelperMessage>Software built for everyone to do their best work</HelperMessage>
    );
}


```

## [Usage](https://hopper.workleap.design/components/HelperMessage\#usage)

### [No icon](https://hopper.workleap.design/components/HelperMessage\#usage-no-icon)

A helper message can hide its default icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work

```

import { HelperMessage } from "@hopper-ui/components";

export default function Example() {
    return (
        <HelperMessage hideIcon>Software built for everyone to do their best work</HelperMessage>
    );
}


```

## [Props](https://hopper.workleap.design/components/HelperMessage\#props)

hideIcon?

`boolean`

Whether or not to hide the helper message icon.

style?

`CSSProperties`

elementType?

`string`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Accordion Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Accordion

An Accordion is a grouping of related disclosures. It supports both single and multiple expanded items.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Accordion/src/Accordion.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Accordion]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion defaultExpandedKeys={["pingboard"]}>
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Accordion\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Accordion\#anatomy-composed-components)

An `Accordion` uses the following components.

[**Disclosure** \\
\\
The disclosure component is used to put long sections of information under a block that users can expand or collapse.](https://hopper.workleap.design/components/Disclosure)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Accordion\#usage)

### [Disabled](https://hopper.workleap.design/components/Accordion\#usage-disabled)

An accordion can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion isDisabled>
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

### [Variants](https://hopper.workleap.design/components/Accordion\#usage-variants)

An accordion has multiple variants.

**Standalone** \- Used when the accordion is not inside a container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion variant="standalone">
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

**Inline** \- Used when placing a accordion inside a container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion variant="inline">
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

### [Expanded](https://hopper.workleap.design/components/Accordion\#usage-expanded)

By default, only one disclosure will be expanded at a time. Use `allowsMultipleExpanded` prop to expand multiple disclosures.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion defaultExpandedKeys={["pingboard", "performance"]} allowsMultipleExpanded>
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Accordion\#usage-icon)

An accordion heading can contain an icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap Officevibe

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap Pingboard

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap Performance

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div, Text } from "@hopper-ui/components";
import { PinSolidIcon, SparklesIcon, SproutIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion defaultExpandedKeys={["pingboard"]}>
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <SparklesIcon />
                        <Text>Workleap Officevibe</Text>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <PinSolidIcon />
                        <Text>Workleap Pingboard</Text>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <SproutIcon />
                        <Text>Workleap Performance</Text>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

### [Description](https://hopper.workleap.design/components/Accordion\#usage-description)

An accordion heading can contain a description.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Workleap OfficevibeEngagement survey and feedback

Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.

### Workleap PingboardInteractive org chart and directory

Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.

### Workleap PerformancePerformance review management and tracking

Drive impact by simplifying how your leaders and you manage team performance throughout the year.

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Accordion>
                <Disclosure id="officevibe">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Officevibe</Text>
                            <Text color="neutral-weak" size="sm">Engagement survey and feedback</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Pingboard</Text>
                            <Text color="neutral-weak" size="sm">Interactive org chart and directory</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>
                        <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                            <Text>Workleap Performance</Text>
                            <Text color="neutral-weak" size="sm">Performance review management and tracking</Text>
                        </Inline>
                    </DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}



```

### [Controlled](https://hopper.workleap.design/components/Accordion\#usage-controlled)

An accordion can handle its opened panels in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Accordion, Disclosure, DisclosureHeader, DisclosurePanel, Div, Span } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set());

    const handleExpandedChange = (keys: Set<string | number>) => {
        setExpandedKeys(keys);
    };

    return (
        <Div width="100%" paddingX="core_320" paddingY="core_480">
            <Span
                display="flex"
                marginBottom="stack-md"
            >
                {expandedKeys.size > 0 ? `${Array.from(expandedKeys).join(", ")} is opened.` : "No sections are opened."}
            </Span>
            <Accordion
                onExpandedChange={handleExpandedChange}
                expandedKeys={expandedKeys}
                allowsMultipleExpanded
            >
                <Disclosure id="officevibe">
                    <DisclosureHeader>Workleap Officevibe</DisclosureHeader>
                    <DisclosurePanel>Help employees speak up and make sure they feel heard. Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="pingboard">
                    <DisclosureHeader>Workleap Pingboard</DisclosureHeader>
                    <DisclosurePanel>Make teamwork work. Use your org chart to create lasting connections across your distributed and hybrid teams to make collaboration easier.</DisclosurePanel>
                </Disclosure>
                <Disclosure id="performance">
                    <DisclosureHeader>Workleap Performance</DisclosureHeader>
                    <DisclosurePanel>Drive impact by simplifying how your leaders and you manage team performance throughout the year.</DisclosurePanel>
                </Disclosure>
            </Accordion>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Accordion\#props)

variant?

`"standalone" | "inline"`

style?

`CSSProperties | ((values: DisclosureGroupRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

allowsMultipleExpanded?

`boolean`

Whether multiple items can be expanded at the same time.

isDisabled?

`boolean`

Whether all items are disabled.

expandedKeys?

`Iterable<Key>`

The currently expanded keys in the group (controlled).

defaultExpandedKeys?

`Iterable<Key>`

The initial expanded keys in the group (uncontrolled).

children?

`ReactNode | ((values: DisclosureGroupRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: DisclosureGroupRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onExpandedChange?

`((keys: Set<Key>) => any)`

Handler that is called when items are expanded or collapsed.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## [Migration Notes](https://hopper.workleap.design/components/Accordion\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `expansionMode="multiple"` has been replaced with `allowsMultipleExpanded`.
- `borderless` and `bordered` variants are no more. `inline` and `standalone` are the new variants. There is no direct match; the new variants are context-based, depending on whether an accordion is contained or not.
- `autofocus` is removed. It did not make sense to have.
- The `disclosure` component is used instead of `Item`.
- `disabled` is renamed to `isDisabled` on the item/disclosure.

## Disclosure Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Disclosure

The disclosure component is used to put long sections of information under a block that users can expand or collapse.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Disclosure/src/Disclosure.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Disclosure]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel } from "@hopper-ui/components";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                Help your people work better
            </DisclosureHeader>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Disclosure\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Disclosure\#anatomy-composed-components)

A `Disclosure` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Disclosure\#usage)

### [Disabled](https://hopper.workleap.design/components/Disclosure\#usage-disabled)

A disclosure can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel, Inline, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Disclosure width="100%" isDisabled>
            <DisclosureHeader>
                <SparklesIcon />
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Officevibe</Text>
                    <Text color="neutral-disabled" size="sm">Engagement and Feedback</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>
                Help employees speak up and make sure they feel heard.
                Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

### [Variants](https://hopper.workleap.design/components/Disclosure\#usage-variants)

A disclosure has multiple variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack width="100%">
            <Disclosure variant="standalone">
                <DisclosureHeader>
                    Help your people work better
                </DisclosureHeader>
                <DisclosurePanel>
                    Tackle the challenges of hybrid, remote and distributed work, no matter what.
                    The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
                </DisclosurePanel>
            </Disclosure>
            <Disclosure variant="inline">
                <DisclosureHeader>
                    Help your people work better
                </DisclosureHeader>
                <DisclosurePanel>
                    Tackle the challenges of hybrid, remote and distributed work, no matter what.
                    The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
                </DisclosurePanel>
            </Disclosure>
        </Stack>
    );
}


```

**Standalone** \- Used when the disclosure is not inside a container.

**Inline** \- Used when placing a disclosure inside a container.

### [Icon](https://hopper.workleap.design/components/Disclosure\#usage-icon)

A disclosure can contain an icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                <SparklesIcon />
                <Text>Help your people work better</Text>
            </DisclosureHeader>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

### [Description](https://hopper.workleap.design/components/Disclosure\#usage-description)

A disclosure can contain a description.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Disclosure width="100%">
            <DisclosureHeader>
                <Inline columnGap="inline-sm" rowGap="core_0" alignY="baseline">
                    <Text>Workleap Officevibe</Text>
                    <Text color="neutral-weak" size="sm">Engagement and Feedback</Text>
                </Inline>
            </DisclosureHeader>
            <DisclosurePanel>
                Help employees speak up and make sure they feel heard.
                Continuous and real-time surveys offer feedback to celebrate every win, recognize commitment, and uncover challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/Disclosure\#usage-controlled)

A disclosure can handle its expanded state in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Disclosure, DisclosureHeader, DisclosurePanel } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Disclosure
            width="100%"
            isExpanded={isExpanded}
            onExpandedChange={setIsExpanded}
        >
            <DisclosureHeader>
                This disclosure is {isExpanded ? "expanded" : "collapsed"}
            </DisclosureHeader>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

### [Custom Header](https://hopper.workleap.design/components/Disclosure\#usage-custom-header)

A disclosure can have a custom header. To accomplish this, do not use `DisclosureHeader` and use the [Button](https://hopper.workleap.design/components/Button) component with `slot="trigger"` instead.
Using React Aria's [Button](https://react-spectrum.adobe.com/react-aria/Button.html) component will also work.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Disclosure, DisclosurePanel, Text } from "@hopper-ui/components";

import { ToggleArrow } from "../../ToggleArrow/index.ts";

export default function Example() {
    return (
        <Disclosure width="100%">
            <Button slot="trigger" variant="secondary">
                <Text>Help your people work better</Text>
                <ToggleArrow slot="end-icon" />
            </Button>
            <DisclosurePanel>
                Tackle the challenges of hybrid, remote and distributed work, no matter what.
                The Workleap platform builds solutions tailored to your existing HR and productivity tools to answer these challenges.
            </DisclosurePanel>
        </Disclosure>
    );
}


```

## [Props](https://hopper.workleap.design/components/Disclosure\#props)

### [Disclosure](https://hopper.workleap.design/components/Disclosure\#props-disclosure)

variant?

`"standalone" | "inline"`

style?

`CSSProperties | ((values: DisclosureRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children?

`ReactNode | ((values: DisclosureRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

isDisabled?

`boolean`

Whether the disclosure is disabled.

isExpanded?

`boolean`

Whether the disclosure is expanded (controlled).

defaultExpanded?

`boolean`

Whether the disclosure is expanded by default (uncontrolled).

id?

`Key`

An id for the disclosure when used within a DisclosureGroup, matching the id used in `expandedKeys`.

className?

`string | ((values: DisclosureRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onExpandedChange?

`((isExpanded: boolean) => void)`

Handler that is called when the disclosure's expanded state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### [Disclosure Header](https://hopper.workleap.design/components/Disclosure\#props-disclosure-header)

buttonProps?

`DisclosureHeaderButtonProps`

The props for the button that triggers the disclosure.

size?

`ResponsiveProp<HeadingSize>`

The Typography Type Scale to use.

_Defaults to md._

style?

`CSSProperties`

level?

`number`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

### [Disclosure Panel](https://hopper.workleap.design/components/Disclosure\#props-disclosure-panel)

style?

`CSSProperties | ((values: DisclosurePanelRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

children

`ReactNode`

The children of the component.

className?

`string | ((values: DisclosurePanelRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Accessibility

role?

`"group" | "region"`

The accessibility role for the disclosure's panel.

_Defaults to 'group'._

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## [Progressive Enhancement](https://hopper.workleap.design/components/Disclosure\#progressive-enhancement)

Our Disclosure component uses experimental CSS features like:

- **interpolate-size: allow-keywords**: Enables fluid transitions between dynamic sizes.

- **transition-behavior: allow-discrete**: Allows transitions for properties like content-visibility.

These features enhance animations where supported. In browsers without support, the component remains fully usable without animations, maintaining progressive enhancement.

## [Migration Notes](https://hopper.workleap.design/components/Disclosure\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- Disclosure now has two children components called `DisclosureHeader` and `DisclosurePanel`.
- `DisclosurePanel` is optional and most likely wouldn't be used for Orbiter. A custom header can be used by using a Button component inside Disclosure.
- `defaultOpen` is renamed to `defaultExpanded`.
- `open` is renamed to `isExpanded`.
- `onOpenChange` is renamed to `onExpandedChange`.

## Link Components Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Link

A link allows a user to navigate to a different location.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Link/src/Link.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Link]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/link/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#)

```

import { Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Link href="#">Learn more</Link>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Link\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Link\#anatomy-composed-components)

A `Link` uses the following components:

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Link\#usage)

### [Disabled](https://hopper.workleap.design/components/Link\#usage-disabled)

Links can be disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Learn moreLearn more

```

import { Inline, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Link isDisabled variant="primary" href="#">Learn more</Link>
            <Link isDisabled variant="secondary" href="#">Learn more</Link>
        </Inline>
    );
}


```

### [External](https://hopper.workleap.design/components/Link\#usage-external)

An external text link will render by default with `rel="noopener noreferrer"` and `target="_blank"` attributes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#)

```

import { Link, Text } from "@hopper-ui/components";
import { NewTabIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Link href="#" isExternal alignItems="end">
            <Text>Learn more</Text>
            <NewTabIcon size="sm" />
        </Link>
    );
}


```

### [No Href](https://hopper.workleap.design/components/Link\#usage-no-href)

When a `<Link>` does not have an href prop, it is rendered as a `<span role="link">` instead of an `<a>`. Events will need to be handled in JavaScript with the `onPress` prop.

Note: this will not behave like a native link. Browser features like context menus and open in a new tab will not apply.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Learn more

```

import { Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Link
            onPress={() => {
                window.alert("You clicked the link!");
            }}
        >
            Learn more
        </Link>
    );
}


```

### [Variants](https://hopper.workleap.design/components/Link\#usage-variants)

Links can be presented in different variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#) [Learn more](https://hopper.workleap.design/components/Link#)

```

import { Inline, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Link variant="primary" href="#">Learn more</Link>
            <Link variant="secondary" href="#">Learn more</Link>
        </Inline>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Link\#usage-sizes)

Links can be presented in different sizes.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Would you like to [learn more](https://hopper.workleap.design/components/Link#) about this role? [learn more](https://hopper.workleap.design/components/Link#) [learn more](https://hopper.workleap.design/components/Link#) [learn more](https://hopper.workleap.design/components/Link#) [learn more](https://hopper.workleap.design/components/Link#) [learn more](https://hopper.workleap.design/components/Link#) [learn more](https://hopper.workleap.design/components/Link#)

```

import { Link, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack padding="inset-xl">
            <Text size="xs">
                Would you like to <Link size="inherit" href="#">learn more</Link> about this role?
            </Text>
            <Link size="xs" href="#">learn more</Link>
            <Link size="sm" href="#">learn more</Link>
            <Link size="md" href="#">learn more</Link>
            <Link size="lg" href="#">learn more</Link>
            <Link size="xl" href="#">learn more</Link>
            <Link size="2xl" href="#">learn more</Link>
        </Stack>
    );
}


```

### [Inherit Size](https://hopper.workleap.design/components/Link\#usage-inherit-size)

The size can also be inherited.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Would you like to [learn more](https://hopper.workleap.design/components/Link#) about this role?

```

import { Link, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Text size="lg">
            Would you like to <Link href="#">learn more</Link> about this role?
        </Text>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Link\#usage-icon)

Links can contain an icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#) [Learn more](https://hopper.workleap.design/components/Link#)

```

import { Inline, Link, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link variant="primary" href="#">
                <Text>Learn more</Text>
                <SparklesIcon />
            </Link>
            <Link variant="secondary" href="#">
                <Text>Learn more</Text>
                <SparklesIcon />
            </Link>
        </Inline>
    );
}


```

### [Start Icon](https://hopper.workleap.design/components/Link\#usage-start-icon)

**Non standard** start icons can be provided to handle special cases. However, think twice before adding start icons, end icons should be your go to.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#) [Learn more](https://hopper.workleap.design/components/Link#)

```

import { Inline, Link, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link variant="primary" href="#">
                <SparklesIcon slot="start-icon" />
                <Text>Learn more</Text>
            </Link>
            <Link variant="secondary" href="#">
                <SparklesIcon slot="start-icon" />
                <Text>Learn more</Text>
            </Link>
        </Inline>
    );
}


```

### [Icon Only](https://hopper.workleap.design/components/Link\#usage-icon-only)

A link's content can be a single icon. When using this variant, an accessible name must be provided through the `aria-label` prop. See [WCAG practices](https://www.w3.org/TR/WCAG20-TECHS/ARIA6.html).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Link, Inline } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link aria-label="Clean" variant="primary" href="#">
                <SparklesIcon />
            </Link>
            <Link aria-label="Clean" variant="secondary" href="#">
                <SparklesIcon />
            </Link>
        </Inline>
    );
}


```

### [Quiet](https://hopper.workleap.design/components/Link\#usage-quiet)

All links can have a quiet style, without an underline. This style should only be used when the placement and context of the link is explicit enough that a visible underline isn’t necessary.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Would you like to [learn more](https://hopper.workleap.design/components/Link#) about this role?

```

import { Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <p>
            Would you like to <Link isQuiet href="#">learn more</Link> about this role?
        </p>
    );
}


```

### [Standalone](https://hopper.workleap.design/components/Link\#usage-standalone)

All links can have a standalone style, without an underline which is similar to quiet, the difference is this adds block padding to make it more similar to a button.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

### Card component

This card component can include a link which is standalone [Learn more](https://hopper.workleap.design/components/Link#)

```

import { Card, Link, Text } from "@hopper-ui/components";
import { Heading } from "react-aria-components";

export default function Example() {
    return (
        <Card padding="core_240" UNSAFE_width="300px">
            <Heading>
                Card component
            </Heading>
            <Text>
                This card component can include a link which is standalone
            </Text>
            <Link isStandalone href="#">Learn more</Link>
        </Card>
    );
}


```

### [React Router Link](https://hopper.workleap.design/components/Link\#usage-react-router-link)

A button can be rendered as a react router link when using the `href` property and setting the navigate property on the `HopperProvider`

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Go to next router page](https://hopper.workleap.design/123)

```

import { Link, HopperProvider } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([{\
        path: "/123",\
        element: <>Navigated Successfully! <Example /></>\
    }, {\
        path: "*",\
        element: <Example />\
    }\
    ]);

    return (
        <RouterProvider router={router} />
    );
}

function Example() {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            <Link href="/123">Go to next router page</Link>
        </HopperProvider>

    );
}


```

### [Custom Styles](https://hopper.workleap.design/components/Link\#usage-custom-styles)

When the colors from the variant props are not enough, you can use the `color` prop to set the color of the link. This removes the hover and focus colors from the link. Use the color props when a link needs to be placed on top of a colored background or visual. Make sure that the background and the link color meet the minimum color contrast ratio.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[Learn more](https://hopper.workleap.design/components/Link#)

```

import { Link, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div width="80%" padding="inset-md" backgroundColor="decorative-option3">
            <Link
                color="decorative-option3"
                colorHover="decorative-option3-weak"
                colorFocus="decorative-option3-weak"
                href="#"
            >
                Learn more
            </Link>
        </Div>
    );
}


```

### [Image](https://hopper.workleap.design/components/Link\#usage-image)

A link's content can be an image element.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

[![Kermit Frog](https://hopper.workleap.design/frog.jpg)](https://hopper.workleap.design/components/Link#)

```

import { Image, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Link href="#" borderRadius="rounded-md" overflow="hidden">
            <Image UNSAFE_width="150px" src="/frog.jpg" alt="Kermit Frog" />
        </Link>
    );
}



```

## [Props](https://hopper.workleap.design/components/Link\#props)

variant?

`LinkVariant`

The visual style of the link.

_Defaults to primary._

size?

`ResponsiveProp<LinkSize>`

Size of the link.

_Defaults to inherit._

isQuiet?

`boolean`

Whether the link should be displayed with a quiet style.

isExternal?

`boolean`

Whether the link should open in a new tab.

isStandalone?

`boolean`

Wheter the link is standalone

style?

`CSSProperties | ((values: LinkRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

isDisabled?

`boolean`

Whether the link is disabled.

autoFocus?

`boolean`

Whether the element should receive focus on render.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

children?

`ReactNode | ((values: LinkRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: LinkRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onPress?

`((e: PressEvent) => void)`

Handler that is called when the press is released over the target.

onPressStart?

`((e: PressEvent) => void)`

Handler that is called when a press interaction starts.

onPressEnd?

`((e: PressEvent) => void)`

Handler that is called when a press interaction ends, either
over the target or when the pointer leaves the target.

onPressChange?

`((isPressed: boolean) => void)`

Handler that is called when the press state changes.

onPressUp?

`((e: PressEvent) => void)`

Handler that is called when a press is released over the target, regardless of
whether it started on the target or not.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Link\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `Link`, `IconLink` and `TextLink` have all been merged into one.
- `LinkAsButton` has been removed. It is now possible to use the `Link` component without an `href` attribute.

## Tabs Component Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Tabs

Tabs are used to organize content by grouping similar information on the same page.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/tabs/src/Tabs.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Tabs]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Tabs\#anatomy)

A `Tab` uses the following components:

[**Badge** \\
\\
A badge is used to bring attention to an element.](https://hopper.workleap.design/components/Badge)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Tabs\#usage)

### [Sizes](https://hopper.workleap.design/components/Tabs\#usage-sizes)

Tabs can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Stack, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-md">
            <Tabs aria-label="Frogs">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
            <Tabs aria-label="Frogs" size="md">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
        </Stack>
    );
}


```

### [Icon](https://hopper.workleap.design/components/Tabs\#usage-icon)

A tab can contain an icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">
                    <SparklesIcon />
                    <Text>Poison Dart Frog</Text>
                </Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Lozenge](https://hopper.workleap.design/components/Tabs\#usage-lozenge)

A tab can contain a lozenge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs, Tag, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">
                    <Tag>New</Tag>
                    <Text>Poison Dart Frog</Text>
                </Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Badge](https://hopper.workleap.design/components/Tabs\#usage-badge)

A tab can contain a badge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Tab, TabList, TabPanel, Tabs, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">
                    <Badge>100</Badge>
                    <Text>Poison Dart Frog</Text>
                </Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Dynamic Tabs](https://hopper.workleap.design/components/Tabs\#usage-dynamic-tabs)

Tabs items can be rendered dynamically.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Collection, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    const items = [\
        {\
            id: "red-eye-tree",\
            header: "Red-Eyed Tree Frog",\
            content: "The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest."\
        },\
        {\
            id: "poison-dart",\
            header: "Poison Dart Frog",\
            content: "The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters."\
        },\
        {\
            id: "goliath",\
            header: "Goliath Frog",\
            content: "The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa."\
        }\
    ];

    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Collection items={items}>
                    {({ id, header }) => (
                        <Tab id={id}>{header}</Tab>
                    )}
                </Collection>
            </TabList>
            <Collection items={items}>
                {({ id, content }) => (
                    <TabPanel id={id} padding="inset-md">
                        {content}
                    </TabPanel>
                )}
            </Collection>
        </Tabs>
    );
}


```

### [Manually Activated Tabs](https://hopper.workleap.design/components/Tabs\#usage-manually-activated-tabs)

By default, tabs are activated automatically. This means when you use the arrow keys to change tabs, the tab is activated and focused.

The content of a tab should ideally be preloaded. However, if switching to a tab panel causes a network request and possibly a page refresh, there might be some notable latency and this might affect the experience for keyboard and screen reader users.

In this scenario, you should use a manually activated tab, which moves focus without activating the tabs. With the focus on a specific tab, users can activate a tab by pressing Space or Enter.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs" keyboardActivation="manual">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Variants](https://hopper.workleap.design/components/Tabs\#usage-variants)

Tabs can use different variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Card, Stack, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-lg">
            <Tabs aria-label="Frogs" variant="standalone">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
            <Card>
                <Tabs aria-label="Frogs" variant="in-card">
                    <TabList>
                        <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                        <Tab id="poison-dart">Poison Dart Frog</Tab>
                        <Tab id="goliath">Goliath Frog</Tab>
                    </TabList>
                    <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                    </TabPanel>
                    <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                    </TabPanel>
                    <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                    </TabPanel>
                </Tabs>
            </Card>
            <Tabs aria-label="Frogs" variant="heading">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
        </Stack>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/Tabs\#usage-fluid)

A tabs component can split the width of its container equally between its tabs.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs" isFluid>
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/Tabs\#usage-controlled)

The selectedKey state can be handled in a controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { type Key, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState("poison-dart");
    const handleSelectionChange = useCallback((key: Key) => {
        setSelectedKey(key as string);
    }, [setSelectedKey]);

    return (
        <Tabs aria-label="Frogs" onSelectionChange={handleSelectionChange} selectedKey={selectedKey}>
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Disabled](https://hopper.workleap.design/components/Tabs\#usage-disabled)

All tabs can be disabled using the `isDisabled` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs" isDisabled>
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath">Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

#### [Disabled items](https://hopper.workleap.design/components/Tabs\#disabled-items)

An individual Tab can be disabled with the isDisabled prop. Disabled tabs are not focusable, selectable, or keyboard navigable.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Tabs aria-label="Frogs">
            <TabList>
                <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                <Tab id="poison-dart">Poison Dart Frog</Tab>
                <Tab id="goliath" isDisabled>Goliath Frog</Tab>
            </TabList>
            <TabPanel id="red-eye-tree" padding="inset-md">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" padding="inset-md">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" padding="inset-md">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

In dynamic collections, it may be more convenient to use the disabledKeys prop at the Tabs level instead of isDisabled on individual tabs.
Each key in this list corresponds with the `id` prop passed to the Tab component, or automatically derived from the values passed to the items prop.
A tab is considered disabled if its id exists in `disabledKeys` or if it has `isDisabled`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Collection, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    const items = [\
        {\
            id: "red-eye-tree",\
            header: "Red-Eyed Tree Frog",\
            content: "The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest."\
        },\
        {\
            id: "poison-dart",\
            header: "Poison Dart Frog",\
            content: "The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters."\
        },\
        {\
            id: "goliath",\
            header: "Goliath Frog",\
            content: "The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa."\
        }\
    ];

    return (
        <Tabs aria-label="Frogs" disabledKeys={["poison-dart"]}>
            <TabList>
                <Collection items={items}>
                    {({ id, header }) => (
                        <Tab id={id}>{header}</Tab>
                    )}
                </Collection>
            </TabList>
            <Collection items={items}>
                {({ id, content }) => (
                    <TabPanel id={id} padding="inset-md">
                        {content}
                    </TabPanel>
                )}
            </Collection>
        </Tabs>
    );
}


```

### [Embedded](https://hopper.workleap.design/components/Tabs\#usage-embedded)

Tabs can be embedded in other components.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Heading, Inline, Tab, TabList, TabPanel, Tabs, Text } from "@hopper-ui/components";
import { PlusIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Tabs aria-label="Frogs" variant="heading">
            <Inline justifyItems="space-between" alignY="flex-end">
                <Heading>Goal</Heading>
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <Button>
                    <PlusIcon />
                    <Text>New goal</Text>
                </Button>
            </Inline>
            <TabPanel id="red-eye-tree" paddingTop="inset-lg">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" paddingTop="inset-lg">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species' toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" paddingTop="inset-lg">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn't croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}


```

### [Links](https://hopper.workleap.design/components/Tabs\#usage-links)

Tabs can be used as links.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { HopperProvider, Stack, Tab, TabList, Tabs } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([\
        {\
            path: "/deleted",\
            element: (\
                <Stack>\
                    <Example />\
                    Deleted\
                </Stack>\
            )\
        },\
        {\
            path: "/shared",\
            element: (\
                <Stack>\
                    <Example />\
                    Shared\
                </Stack>\
            )\
        },\
        {\
            path: "/",\
            element: (\
                <Stack>\
                    <Example />\
                    Home\
                </Stack>\
            )\
        }, {\
            path: "*",\
            element: <Example />\
        }\
    ]);

    return (
        <RouterProvider router={router} />
    );
}

function Example() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <HopperProvider colorScheme="system" navigate={navigate}>
            <Tabs aria-label="Navigation" selectedKey={pathname}>
                <TabList>
                    <Tab id="/" href="/">Home</Tab>
                    <Tab id="/shared" href="/shared">Shared</Tab>
                    <Tab id="/deleted" href="/deleted">Deleted</Tab>
                </TabList>
            </Tabs>
        </HopperProvider>
    );
}


```

## [Props](https://hopper.workleap.design/components/Tabs\#props)

### [Tabs](https://hopper.workleap.design/components/Tabs\#props-tabs)

variant?

`"standalone" | "in-card" | "heading"`

The variant of the tabs.

_Defaults to standalone._

size?

`"sm" | "md"`

The size of the tabs.

_Defaults to sm._

isFluid?

`boolean`

Whether or not the tabs takes up the width of its container.

selectedKey?

`Key | null`

The currently selected key in the collection (controlled).

defaultSelectedKey?

`Key`

The initial selected key in the collection (uncontrolled).

isDisabled?

`boolean`

Whether the TabList is disabled.
Shows that a selection exists, but is not available in that circumstance.

disabledKeys?

`Iterable<Key>`

The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.

keyboardActivation?

`"automatic" | "manual"`

Whether tabs are activated automatically on focus or manually.

_Defaults to 'automatic'._

children?

`ReactNode`

The children of the component.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Events

onSelectionChange?

`((key: Key) => void)`

Handler that is called when the selection changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

### [TabList](https://hopper.workleap.design/components/Tabs\#props-tablist)

items?

`Iterable<T>`

Item objects in the collection.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

### [Tab](https://hopper.workleap.design/components/Tabs\#props-tab)

isDisabled?

`boolean`

Whether the tab is disabled.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Events

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

### [TabPanel](https://hopper.workleap.design/components/Tabs\#props-tabpanel)

shouldForceMount?

`boolean`

Whether to mount the tab panel in the DOM even when it is not currently selected.
Inactive tab panels are inert and cannot be interacted with. They must be styled appropriately so this is clear to the user visually.

_Defaults to false._

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

## [Migration Notes](https://hopper.workleap.design/components/Tabs\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `orientation` has been removed, not supported.
- `disabled` has been removed, not supported.
- `manual` has been removed. Refer to this [sample](https://hopper.workleap.design/components/Tabs#usage-manually-activated-tabs) to quickly match old sizes.

## Flex Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Flex

A flex component is used to create a flex container.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Flex.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Flex]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex>
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Flex\#usage)

### [Vertical Alignment](https://hopper.workleap.design/components/Flex\#usage-vertical-alignment)

A flex layout can have vertically aligned items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="column">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

### [Gap](https://hopper.workleap.design/components/Flex\#usage-gap)

A flex layout can have a gap between his items. `columnGap` and `rowGap` are also available to specify a gap for a single axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-sm">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

### [Align Items](https://hopper.workleap.design/components/Flex\#usage-align-items)

A flex layout can align its items along the cross-axis. When the direction is "column", this refers to horizontal alignment, and when the direction is "row", it refers to vertical alignment.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="column" alignItems="center">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

### [Justify Content](https://hopper.workleap.design/components/Flex\#usage-justify-content)

A flex layout can justify its items along the main axis. When the direction is "column", this refers to vertical alignment, and when the direction is "row", it refers to horizontal alignment.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex justifyContent="space-between">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

### [Reverse](https://hopper.workleap.design/components/Flex\#usage-reverse)

A flex layout can show its items in reverse order.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex direction="row-reverse">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}


```

### [Wrap](https://hopper.workleap.design/components/Flex\#usage-wrap)

Flex layout items can wrap multiple rows.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Flex wrap>
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
                <Square backgroundColor="decorative-option6-weak" />
                <Square backgroundColor="decorative-option7-weak" />
                <Square backgroundColor="decorative-option8-weak" />
                <Square backgroundColor="decorative-option9-weak" />
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
                <Square backgroundColor="decorative-option7" />
                <Square backgroundColor="decorative-option8" />
                <Square backgroundColor="decorative-option9" />
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
                <Square backgroundColor="decorative-option7-strong" />
                <Square backgroundColor="decorative-option8-strong" />
                <Square backgroundColor="decorative-option9-strong" />
            </Flex>
        </Div>
    );
}


```

### [Nesting](https://hopper.workleap.design/components/Flex\#usage-nesting)

Flex layouts can be nested.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Flex, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-md">
                <Flex>
                    <Square backgroundColor="decorative-option1-weak" />
                    <Square backgroundColor="decorative-option3-weak" />
                </Flex>
                <Flex direction="column">
                    <Square backgroundColor="decorative-option1" />
                    <Square backgroundColor="decorative-option3" />
                </Flex>
                <Flex>
                    <Square backgroundColor="decorative-option1-strong" />
                    <Square backgroundColor="decorative-option3-strong" />
                </Flex>
            </Flex>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Flex\#props)

direction?

`ResponsiveProp<FlexDirection>`

The flex direction of the container. Can be row, column, row-reverse or column-reverse.

wrap?

`ResponsiveProp<FlexWrap> | ResponsiveProp<boolean>`

Whether to wrap the flex items. The value can also be a boolean.

basis?

`ResponsiveProp<FlexBasis<0 | (string & {})>>`

An alias for the css flex-basis property.

grow?

`ResponsiveProp<FlexGrow>`

An alias for the css flex-grow property.

shrink?

`ResponsiveProp<FlexShrink>`

An alias for the css flex-shrink property.

inline?

`boolean`

Whether to display the flex container as an inline element.

style?

`CSSProperties`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Grid Layout Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Grid

The grid component is used to create a grid container.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Grid.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Grid]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid autoFlow="column">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Grid\#usage)

### [Areas](https://hopper.workleap.design/components/Grid\#usage-areas)

A grid can define explicit sections with areas.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid areas={["a  a", "b c"]}>
                <Square gridArea="a" backgroundColor="decorative-option1" />
                <Square gridArea="b" backgroundColor="decorative-option3" />
                <Square gridArea="c" backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

### [Template Columns](https://hopper.workleap.design/components/Grid\#usage-template-columns)

A grid can define explicit columns and rows. A value can be a grid length value or a Hopper spacing scale value.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid templateColumns={["core_800", "core_1280", "1fr"]}>
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

### [Auto Columns](https://hopper.workleap.design/components/Grid\#usage-auto-columns)

A grid can define the size of implicitly created columns. A value can be a grid length value or a Hopper spacing scale value.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid autoColumns="1fr">
                <Square gridColumn={2} backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

### [Gap](https://hopper.workleap.design/components/Grid\#usage-gap)

A grid layout can have a gap between its columns and rows. `columnGap` and `rowGap` are also available to specify a gap for a single axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid templateColumns={["1fr", "1fr"]} gap="stack-sm">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

### [Column Spanning](https://hopper.workleap.design/components/Grid\#usage-column-spanning)

A grid item can span over multiple columns.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap="stack-sm">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square gridColumnSpan={3} gridRow={2} backgroundColor="decorative-option4" />
            </Grid>
        </Div>
    );
}


```

### [Nesting](https://hopper.workleap.design/components/Grid\#usage-nesting)

Grids can be nested to create complex layouts.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid templateRows={["1fr", "1fr"]} gap="stack-sm">
                <Grid templateColumns={["core_800", "auto"]}>
                    <Square backgroundColor="decorative-option1" />
                    <Square backgroundColor="decorative-option3" />
                </Grid>
                <Grid templateColumns={["auto", "core_960"]}>
                    <Square backgroundColor="decorative-option1-strong" />
                    <Square backgroundColor="decorative-option3-strong" />
                </Grid>
            </Grid>
        </Div>
    );
}


```

### [Repeat](https://hopper.workleap.design/components/Grid\#usage-repeat)

A custom `repeat` function is available to support Hopper spacing scale values. However, if you prefer, you can use the [native CSS repeat function](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat()).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps, repeat } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={repeat("auto-fit", "core_640")}
                autoRows="core_640"
                gap="stack-sm"
            >
                <Square backgroundColor="decorative-option1-weak" />
                <Square backgroundColor="decorative-option2-weak" />
                <Square backgroundColor="decorative-option3-weak" />
                <Square backgroundColor="decorative-option4-weak" />
                <Square backgroundColor="decorative-option5-weak" />
                <Square backgroundColor="decorative-option6-weak" />
                <Square backgroundColor="decorative-option7-weak" />
                <Square backgroundColor="decorative-option8-weak" />
                <Square backgroundColor="decorative-option9-weak" />
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
                <Square backgroundColor="decorative-option5" />
                <Square backgroundColor="decorative-option6" />
                <Square backgroundColor="decorative-option7" />
                <Square backgroundColor="decorative-option8" />
                <Square backgroundColor="decorative-option9" />
                <Square backgroundColor="decorative-option1-strong" />
                <Square backgroundColor="decorative-option2-strong" />
                <Square backgroundColor="decorative-option3-strong" />
                <Square backgroundColor="decorative-option4-strong" />
                <Square backgroundColor="decorative-option5-strong" />
                <Square backgroundColor="decorative-option6-strong" />
                <Square backgroundColor="decorative-option7-strong" />
                <Square backgroundColor="decorative-option8-strong" />
                <Square backgroundColor="decorative-option9-strong" />
            </Grid>
        </Div>
    );
}


```

### [Minmax](https://hopper.workleap.design/components/Grid\#usage-minmax)

A custom `minmax` function is available to support Hopper spacing scale values. However, if you prefer, you can use the [native CSS minmax function](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax()).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps, minmax } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={[minmax("core_800", "1fr"), "core_960", minmax("core_800", "1fr")]}
                gap="stack-sm"
            >
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option2" />
                <Square backgroundColor="decorative-option3" />
            </Grid>
        </Div>
    );
}


```

### [Fit Content](https://hopper.workleap.design/components/Grid\#usage-fit-content)

A custom `fit-content` function is available to support Hopper spacing scale values. However, if you prefer, you can use the [native CSS fit-content function](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content).

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Grid, Div, type DivProps, fitContent } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" minHeight="core_640" minWidth="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_400">
            <Grid
                templateColumns={[fitContent("core_800"), fitContent("core_800"), "1fr"]}
                gap="stack-sm"
                alignItems="center"
            >
                <Square padding="inset-sm" backgroundColor="decorative-option1" />
                <Square padding="inset-sm" backgroundColor="decorative-option2" />
                <Square padding="inset-sm" backgroundColor="decorative-option3" />
            </Grid>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Grid\#props)

inline?

`boolean`

Whether or not the element generate line breaks before or after himself.

autoRows?

`ResponsiveProp<GridAutoRowsValue>`

An alias for the css grid-auto-rows property.

areas?

`ResponsiveProp<GridTemplateAreasValue>`

An alias for the css grid-template-areas property.

templateColumns?

`ResponsiveProp<GridTemplateColumnsValue>`

An alias for the css grid-template-columns property.

templateRows?

`ResponsiveProp<GridTemplateRowsValue>`

An alias for the css grid-template-rows property.

autoColumns?

`ResponsiveProp<GridAutoColumnsValue>`

An alias for the css grid-auto-columns property.

autoFlow?

`ResponsiveProp<GridAutoFlow>`

An alias for the css grid-auto-flow property.

UNSAFE\_autoRows?

`ResponsiveProp<UNSAFE_GridAutoRowsValue>`

An alias for the css grid-auto-rows property.

UNSAFE\_templateColumns?

`ResponsiveProp<UNSAFE_GridTemplateColumnsValue>`

An alias for the css grid-template-columns property.

UNSAFE\_templateRows?

`ResponsiveProp<UNSAFE_GridTemplateRowsValue>`

An alias for the css grid-template-rows property.

UNSAFE\_autoColumns?

`ResponsiveProp<UNSAFE_GridAutoColumnsValue>`

An alias for the css grid-auto-columns property.

style?

`CSSProperties`

className?

`string`

### \#\#\#\# Accessibility

id?

`string`

## Inline Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Inline

An inline component is a layout primitive used to arrange elements horizontally.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Inline.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Inline]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline>
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Inline\#usage)

### [Reverse](https://hopper.workleap.design/components/Inline\#usage-reverse)

The order and direction of inline items can be reversed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline reverse>
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}


```

### [Align X](https://hopper.workleap.design/components/Inline\#usage-align-x)

Inline items can be aligned on the horizontal axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Inline alignX="center">
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}


```

### [Align Y](https://hopper.workleap.design/components/Inline\#usage-align-y)

Inline items can be aligned on the vertical axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Inline alignY="flex-end" UNSAFE_height="10rem">
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Inline\#props)

reverse?

`boolean`

Whether or not to reverse the order of the elements.

alignX?

`ResponsiveProp<JustifyContent>`

An alias for the css justify-content property.

alignY?

`ResponsiveProp<AlignItems>`

An alias for the css align-items property.

style?

`CSSProperties`

className?

`string`

wrap?

`ResponsiveProp<FlexWrap> | ResponsiveProp<boolean>`

Whether to wrap the flex items. The value can also be a boolean.

basis?

`ResponsiveProp<FlexBasis<0 | (string & {})>>`

An alias for the css flex-basis property.

grow?

`ResponsiveProp<FlexGrow>`

An alias for the css flex-grow property.

shrink?

`ResponsiveProp<FlexShrink>`

An alias for the css flex-shrink property.

inline?

`boolean`

Whether to display the flex container as an inline element.

### \#\#\#\# Accessibility

id?

`string`

## [Migration Notes](https://hopper.workleap.design/components/Inline\#migration-notes)

Coming from Orbiter, you should be aware of the following change:

- The default `gap` value has been reduced to `1rem` / `var(--hop-space-inline-md)` from `1.25rem`. Use `UNSAFE_gap="1.25rem"` as a temporary measure during the migration to the Hopper design system. This value should eventually be removed to align with the new design standards.

## Stack Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Stack

A stack component is a layout primitive used to arrange elements vertically.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Stack.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Stack]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack>
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Stack\#usage)

### [Reverse](https://hopper.workleap.design/components/Stack\#usage-reverse)

The order and direction of stack items can be reversed.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%" paddingY="core_320">
            <Stack reverse UNSAFE_height="20rem">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}


```

### [Align X](https://hopper.workleap.design/components/Stack\#usage-align-x)

Stack items can be aligned on the horizontal axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack alignX="center">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}


```

### [Align Y](https://hopper.workleap.design/components/Stack\#usage-align-y)

Stack items can be aligned on the vertical axis.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Stack, Div, type DivProps } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack alignY="flex-end" UNSAFE_height="20rem">
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Stack\#props)

reverse?

`boolean`

Whether or not to reverse the order of the elements.

alignX?

`ResponsiveProp<AlignItems>`

An alias for the css align-items property.

alignY?

`ResponsiveProp<JustifyContent>`

An alias for the css justify-content property.

style?

`CSSProperties`

className?

`string`

wrap?

`ResponsiveProp<FlexWrap> | ResponsiveProp<boolean>`

Whether to wrap the flex items. The value can also be a boolean.

basis?

`ResponsiveProp<FlexBasis<0 | (string & {})>>`

An alias for the css flex-basis property.

grow?

`ResponsiveProp<FlexGrow>`

An alias for the css flex-grow property.

shrink?

`ResponsiveProp<FlexShrink>`

An alias for the css flex-shrink property.

inline?

`boolean`

Whether to display the flex container as an inline element.

### \#\#\#\# Accessibility

id?

`string`

## [Migration Notes](https://hopper.workleap.design/components/Stack\#migration-notes)

Coming from Orbiter, you should be aware of the following change:

- The default `gap` value has been reduced to `1rem` / `var(--hop-space-stack-md)` from `1.25rem`. Use `UNSAFE_gap="1.25rem"` as a temporary measure during the migration to the Hopper design system. This value should eventually be removed to align with the new design standards.

## Modal Components Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

Modals focus the user’s attention exclusively on one task or piece of information via a window that sits on top of the page content.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Modal/src/Modal.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Modal]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal, ModalTrigger, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    <Text size="sm">
                        Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                    </Text>
                    <Text size="sm">
                        Frogs don’t drink water with their mouths! Instead, they absorb moisture through their specialized skin patch on their belly and thighs.
                    </Text>
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Composed Components](https://hopper.workleap.design/components/Modal\#props-composed-components)

A `Modal` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**ButtonGroup** \\
\\
A button group handles the spacing and orientation for a grouping of buttons.](https://hopper.workleap.design/components/ButtonGroup)

[**Content** \\
\\
A placeholder for the main content section of a component.](https://hopper.workleap.design/components/Content)

[A placeholder for a footer section.](https://hopper.workleap.design/components/Footer)

[A placeholder for an header section.](https://hopper.workleap.design/components/Header)

[**Heading** \\
\\
A heading is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Heading)

[**Image** \\
\\
An image component that can be used to display images.](https://hopper.workleap.design/components/Image)

## [Usage](https://hopper.workleap.design/components/Modal\#usage)

### [Default](https://hopper.workleap.design/components/Modal\#usage-default)

A modal must have an heading and a content.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Image](https://hopper.workleap.design/components/Modal\#usage-image)

A modal can have a side banner image. Make sure the image has no essential information as it could be cropped in mobile view. Images should not prevent a user from seeing the close button, be conscious of this.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Image, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Choice](https://hopper.workleap.design/components/Modal\#usage-choice)

A modal can offer a choice between 2 options. Keep the copy not too long in order to help the user quickly make his choice.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Card, Content, Flex, Heading, Image, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    <Flex gap="stack-lg">
                        <Card flex={1}>
                            <Image objectFit="cover" alt="Frog" src="/frog.jpg" />
                            <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                                <Flex direction="column" gap="stack-sm">
                                    <Heading>Frog</Heading>
                                    <Content>
                                        Common frogs are found in ponds, marshes, and forests across the world. Unlike some of their flashier cousins, they rely on stealth and speed rather than bright colors to survive.
                                    </Content>
                                    <Button variant="secondary">Choose</Button>
                                </Flex>
                            </Flex>
                        </Card>
                        <Card flex={1}>
                            <Image objectFit="cover" alt="Mossy Frog" src="/mossy-frog.jpg" />
                            <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                                <Flex direction="column" gap="stack-sm">
                                    <Heading>Mossy Frog</Heading>
                                    <Content>
                                        A mossy tree frog with rough, bark-like skin, blending perfectly into its surroundings for camouflage and protection.
                                    </Content>
                                </Flex>
                                <Button variant="secondary">Choose</Button>
                            </Flex>
                        </Card>
                    </Flex>
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Header](https://hopper.workleap.design/components/Modal\#usage-header)

Use an header to provide additional information usually in the form of a link or a tooltip that provides more context to the task at hand. Links should open in a new window.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Header, Heading, Link, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Header>
                    <Link
                        isExternal
                        href="https://en.wikipedia.org/wiki/Frog"
                        size="sm"
                    >
                        Wikipedia
                    </Link>
                </Header>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Footer](https://hopper.workleap.design/components/Modal\#usage-footer)

Use a footer to provide trivial information about content present in the modal, like a step : 1/3.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Footer, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
                <Footer>
                    Copyright 2025
                </Footer>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Buttons](https://hopper.workleap.design/components/Modal\#usage-buttons)

A modal can have a single button. Use a primary button to provide the main action.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                {({ close }) => (
                    <>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <Button onPress={close}>
                            Save
                        </Button>
                    </>
                )}
            </Modal>
        </ModalTrigger>
    );
}


```

Or a group of button. A maximum of 3 buttons are allowed in a modal, when necessary. The secondary and tertiary actions should be using a secondary variant.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, ButtonGroup, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                {({ close }) => (
                    <>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <ButtonGroup>
                            <Button variant="secondary" onPress={close}>Cancel</Button>
                            <Button onPress={close}>Save</Button>
                        </ButtonGroup>
                    </>
                )}
            </Modal>
        </ModalTrigger>
    );
}


```

### [Dismissable](https://hopper.workleap.design/components/Modal\#usage-dismissable)

By default, a modal will dismiss on outside interactions and esc keydown. However, in some cases, you might want to force the user to explicitly dismiss the modal with a targeted call to action.
This is what the `isDismissable` and the `isKeyboardDismissDisabled` prop is for.

You can set the isDismissable prop to false and isKeyboardDismissDisabled to true and render a call to action which will manually dismiss the popover by calling a close function.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal isDismissible={false} isKeyboardDismissDisabled>
                {({ close }) => (
                    <>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <Button onPress={close}>
                            Save
                        </Button>
                    </>
                )}
            </Modal>
        </ModalTrigger>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/Modal\#usage-controlled)

The open state can be handled in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ModalTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );
}


```

### [Custom trigger](https://hopper.workleap.design/components/Modal\#usage-custom-trigger)

You don't have to use a ModalTrigger component if it doesn't fit your needs. A modal component can be used on it's own with any custom trigger.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, Heading, Modal } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button variant="secondary" onPress={() => setIsOpen(true)}>Open modal</Button>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Modal\#usage-sizes)

A modal can be small, medium, large, extra-large, fullscreen or fullscreenTakeover. The default size is medium.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open sm modalOpen md modalOpen lg modalOpen xl modalOpen fullscreen modalOpen fullscreenTakeover modal

```

import { Button, Content, Heading, Modal, type ModalProps, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    const modal = (size: ModalProps["size"]) => (
        <ModalTrigger>
            <Button variant="secondary">Open {size?.toString()} modal</Button>
            <Modal size={size}>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );

    return (
        <Stack gap="stack-md">
            {modal("sm")}
            {modal("md")}
            {modal("lg")}
            {modal("xl")}
            {modal("fullscreen")}
            {modal("fullscreenTakeover")}
        </Stack>
    );
}


```

### [Responsive sizes](https://hopper.workleap.design/components/Modal\#usage-responsive-sizes)

A modal can have different size in mobile and desktop view.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open responsive modal

```

import { Button, Content, Heading, Modal, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-md">
            <ModalTrigger>
                <Button variant="secondary">Open responsive modal</Button>
                <Modal
                    size={{
                        base: "fullscreenTakeover",
                        md: "md"
                    }}
                >
                    <Heading>Fascinating Frog Facts!</Heading>
                    <Content>
                        Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                    </Content>
                </Modal>
            </ModalTrigger>
        </Stack>
    );
}


```

### [Custom](https://hopper.workleap.design/components/Modal\#usage-custom)

A CustomModal is a Modal with a custom layout. A CustomModal must contain a `<Heading slot="title">` or have an aria-label or aria-labelledby attribute for accessibility.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Open modal

```

import { Button, Content, CustomModal, Heading, Image, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <CustomModal padding="inset-lg">
                {({ close }) => (
                    <Stack>
                        <Button variant="secondary" onPress={close}>Close</Button>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <Image src="/frog.jpg" alt="Frog" />
                    </Stack>
                )}
            </CustomModal>
        </ModalTrigger>
    );
}


```

## [Props](https://hopper.workleap.design/components/Modal\#props)

### [Modal](https://hopper.workleap.design/components/Modal\#props-modal)

isDismissible?

`boolean`

Whether the Modal is dismissible.

_Defaults to true._

isKeyboardDismissDisabled?

`boolean`

Whether pressing the escape key to close the dialog should be disabled.

size?

`ResponsiveProp<"sm" | "md" | "lg" | "xl" | "fullscreen" | "fullscreenTakeover">`

The size of the modal.

_Defaults to md._

overlayProps?

`Partial<ModalOverlayProps>`

The props of the overlay

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode | ((opts: DialogRenderProps) => ReactNode)`

Children of the dialog. A function may be provided to access a function to close the dialog.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

isOpen?

`boolean`

Whether the overlay is open by default (controlled).

defaultOpen?

`boolean`

Whether the overlay is open by default (uncontrolled).

### \#\#\#\# Events

onOpenChange?

`((isOpen: boolean) => void)`

Handler that is called when the overlay's open state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

role?

`"dialog" | "alertdialog"`

The accessibility role for the dialog.

_Defaults to 'dialog'._

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [ModalTrigger](https://hopper.workleap.design/components/Modal\#props-modaltrigger)

isOpen?

`boolean`

Whether the overlay is open by default (controlled).

defaultOpen?

`boolean`

Whether the overlay is open by default (uncontrolled).

### \#\#\#\# Events

onOpenChange?

`((isOpen: boolean) => void)`

Handler that is called when the overlay's open state changes.

### [CustomModal](https://hopper.workleap.design/components/Modal\#props-custommodal)

isDismissible?

`boolean`

Whether the CustomModal is dismissible.

_Defaults to true._

isKeyboardDismissDisabled?

`boolean`

Whether pressing the escape key to close the dialog should be disabled.

size?

`ResponsiveProp<"sm" | "md" | "lg" | "xl" | "fullscreen" | "fullscreenTakeover">`

The size of the CustomModal.

_Defaults to md._

overlayProps?

`Partial<ModalOverlayProps>`

The props of the overlay

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode | ((opts: DialogRenderProps) => ReactNode)`

Children of the dialog. A function may be provided to access a function to close the dialog.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

isOpen?

`boolean`

Whether the overlay is open by default (controlled).

defaultOpen?

`boolean`

Whether the overlay is open by default (uncontrolled).

### \#\#\#\# Events

onOpenChange?

`((isOpen: boolean) => void)`

Handler that is called when the overlay's open state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

role?

`"dialog" | "alertdialog"`

The accessibility role for the dialog.

_Defaults to 'dialog'._

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Popover Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Popover

A popover displays additional content when a user interacts with a trigger element.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/overlays/Popover/src/Popover.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Popover]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Footer, Heading, Link, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button aria-label="information" variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Footer>
                    <Link href="#">Website</Link>
                </Footer>
            </Popover>
        </PopoverTrigger>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Popover\#anatomy)

### [Composed Components](https://hopper.workleap.design/components/Popover\#anatomy-composed-components)

A `Popover` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**ButtonGroup** \\
\\
A button group handles the spacing and orientation for a grouping of buttons.](https://hopper.workleap.design/components/ButtonGroup)

[**Content** \\
\\
A placeholder for the main content section of a component.](https://hopper.workleap.design/components/Content)

[A placeholder for a footer section.](https://hopper.workleap.design/components/Footer)

[**Heading** \\
\\
A heading is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Heading)

[**Link** \\
\\
A link allows a user to navigate to a different location.](https://hopper.workleap.design/components/Link)

## [Usage](https://hopper.workleap.design/components/Popover\#usage)

### [Disabled](https://hopper.workleap.design/components/Popover\#usage-disabled)

A popover will not open when its trigger is disabled.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button isDisabled>Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
            </Popover>
        </PopoverTrigger>
    );
}



```

### [Single button](https://hopper.workleap.design/components/Popover\#usage-single-button)

A popover can have a single button.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Button>Apply</Button>
            </Popover>
        </PopoverTrigger>
    );
}



```

### [Multiple buttons](https://hopper.workleap.design/components/Popover\#usage-multiple-buttons)

A popover can have a group of buttons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ButtonGroup, Content, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button>Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <ButtonGroup>
                    <Button variant="secondary">Follow</Button>
                    <Button>Apply</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    );
}


```

### [Footer text](https://hopper.workleap.design/components/Popover\#usage-footer-text)

A popover can have footer text.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Footer, Heading, Popover, PopoverTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <PopoverTrigger>
            <Button variant="secondary">Company Profile</Button>
            <Popover>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
                <Footer>
                    1 of 5
                </Footer>
                <Button>Next</Button>
            </Popover>
        </PopoverTrigger>
    );
}


```

### [Placement](https://hopper.workleap.design/components/Popover\#usage-placement)

A popover can be positioned in different ways `top`, `right`, `bottom`, `left`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, PopoverTrigger, Popover, Heading, Content, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <PopoverTrigger>
                <Button aria-label="top popover" variant="secondary">Top</Button>
                <Popover placement="top">
                    <Heading>Popover top</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="right popover" variant="secondary">Right</Button>
                <Popover placement="right">
                    <Heading>Popover right</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="bottom popover" variant="secondary">Bottom</Button>
                <Popover placement="bottom">
                    <Heading>Popover bottom</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
            <PopoverTrigger>
                <Button aria-label="left popover" variant="secondary">Left</Button>
                <Popover placement="left">
                    <Heading>Popover left</Heading>
                    <Content>
                        And here's some amazing content. It's very engaging. Right?
                    </Content>
                </Popover>
            </PopoverTrigger>
        </Inline>
    );
}


```

### [Context](https://hopper.workleap.design/components/Popover\#usage-context)

A Popover's `isOpen` state or close function can be retrieved from `PopoverContext` and `ButtonContext`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import {
    Button,
    ButtonContext,
    Content,
    Heading,
    Popover,
    PopoverContext,
    PopoverTrigger,
    SlotProvider
} from "@hopper-ui/components";
import { type ReactNode, useRef, useState } from "react";

const HighlightedTrigger = ({ children }: { children: ReactNode }) => {
    const triggerRef = useRef(null);
    const [isOpen, setOpen] = useState(false);

    return (
        <SlotProvider values={[\
            [PopoverContext, { isOpen, onOpenChange: setOpen }],\
            [ButtonContext, {\
                onPress: () => setOpen(!isOpen),\
                ref: triggerRef,\
                variant: isOpen ? "primary" : "secondary"\
            }]\
        ]}
        >
            {children}
        </SlotProvider>
    );
};

export default function Example() {
    return (
        <HighlightedTrigger>
            <PopoverTrigger>
                <Button>Company Profile</Button>
                <Popover>
                    <Heading>ACME</Heading>
                    <Content>
                    A tech company focusing on the development of software and hardware solutions.
                    </Content>
                </Popover>
            </PopoverTrigger>
        </HighlightedTrigger>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/Popover\#usage-controlled)

A Popover's open state can be handled in controlled mode.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Content, Heading, Popover, Stack } from "@hopper-ui/components";
import { useRef, useState } from "react";

export default function Example() {
    const triggerRef = useRef(null);
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Stack alignX="center">
                <Button
                    onPress={() => setOpen(!isOpen)}
                    variant="secondary"
                >
                    Company Profile
                </Button>
                <span ref={triggerRef}>Popover will be positioned relative to me</span>
            </Stack>
            <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
                <Heading>ACME</Heading>
                <Content>
                    A tech company focusing on the development of software and hardware solutions.
                </Content>
            </Popover>
        </>
    );
}


```

### [Styled React Aria Component Popover](https://hopper.workleap.design/components/Popover\#advanced-customization-styled-react-aria-component-popover)

If you want to create a custom component using a Popover, and you just need the Popover styles, you can use the `PopoverBase` component instead.

## [Props](https://hopper.workleap.design/components/Popover\#props)

### [Popover](https://hopper.workleap.design/components/Popover\#props-popover)

isAutoWidth?

`boolean`

Whether the popover should have an auto width. Only available in non-dialog popovers.

boundaryOffset?

`number`

The minimum distance the trigger edge should be from the edge of the overlay element.

isNonDialog?

`boolean`

Whether the popover is a non-dialog. This is set to true in components such as selects.

containerProps?

`PopoverContainerProps`

The props of the popover's inner container.

placement?

`ResponsiveProp<Placement>`

The placement of the popover with respect to its anchor element.

_Defaults to bottom._

style?

`CSSProperties | ((values: PopoverRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

isOpen?

`boolean`

Whether the overlay is open by default (controlled).

containerPadding?

`number`

The placement padding that should be applied between the element and its
surrounding container.

_Defaults to 12._

offset?

`number`

The additional offset applied along the main axis between the element and its
anchor element.

_Defaults to 8._

crossOffset?

`number`

The additional offset applied along the cross axis between the element and its
anchor element.

_Defaults to 0._

shouldFlip?

`boolean`

Whether the element should flip its orientation (e.g. top to bottom or left to right) when
there is insufficient room for it to render completely.

_Defaults to true._

triggerRef?

`RefObject<Element | null>`

The ref for the element which the popover positions itself with respect to.

When used within a trigger component such as DialogTrigger, MenuTrigger, Select, etc.,
this is set automatically. It is only required when used standalone.

boundaryElement?

`Element`

Element that that serves as the positioning boundary.

_Defaults to document.body._

scrollRef?

`RefObject<Element | null>`

A ref for the scrollable region within the overlay.

_Defaults to overlayRef._

shouldUpdatePosition?

`boolean`

Whether the overlay should update its position automatically.

_Defaults to true._

arrowBoundaryOffset?

`number`

The minimum distance the arrow's edge should be from the edge of the overlay element.

_Defaults to 0._

isNonModal?

`boolean`

Whether the popover is non-modal, i.e. elements outside the popover may be
interacted with by assistive technologies.

Most popovers should not use this option as it may negatively impact the screen
reader experience. Only use with components such as combobox, which are designed
to handle this situation carefully.

isKeyboardDismissDisabled?

`boolean`

Whether pressing the escape key to close the popover should be disabled.

Most popovers should not use this option. When set to true, an alternative
way to close the popover with a keyboard must be provided.

_Defaults to false._

shouldCloseOnInteractOutside?

`((element: Element) => boolean)`

When user interacts with the argument element outside of the popover ref,
return true if onClose should be called. This gives you a chance to filter
out interaction with elements that should not dismiss the popover.
By default, onClose will always be called on interaction outside the popover ref.

trigger?

`string`

The name of the component that triggered the popover. This is reflected on the element
as the `data-trigger` attribute, and can be used to provide specific
styles for the popover depending on which element triggered it.

isEntering?

`boolean`

Whether the popover is currently performing an entry animation.

isExiting?

`boolean`

Whether the popover is currently performing an exit animation.

UNSTABLE\_portalContainer?

`Element`

The container element in which the overlay portal will be placed. This may have unknown behavior depending on where it is portalled to.

_Defaults to document.body._

defaultOpen?

`boolean`

Whether the overlay is open by default (uncontrolled).

children?

`ReactNode | ((values: PopoverRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: PopoverRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

### \#\#\#\# Events

onOpenChange?

`((isOpen: boolean) => void)`

Handler that is called when the overlay's open state changes.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [PopoverTrigger](https://hopper.workleap.design/components/Popover\#props-popovertrigger)

isOpen?

`boolean`

Whether the overlay is open by default (controlled).

defaultOpen?

`boolean`

Whether the overlay is open by default (uncontrolled).

### \#\#\#\# Events

onOpenChange?

`((isOpen: boolean) => void)`

Handler that is called when the overlay's open state changes.

## [Migration Notes](https://hopper.workleap.design/components/Popover\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- The `position` property has been renamed `placement`.

## ComboBox Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# ComboBox

A combo box allows the user to make a selection from a list of suggested, likely or desired values.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/checkbox/src/Checkbox.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[ComboBox]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._) [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/ComboBox\#anatomy)

The Header component represents a `header` within a Hopper container.

#### [Section](https://hopper.workleap.design/components/ComboBox\#section)

The Section component represents a `section` within a Hopper container.

### [Composed Components](https://hopper.workleap.design/components/ComboBox\#guidelines-composed-components)

A `ComboBox` uses the following components:

[**Avatar** \\
\\
An avatar is used to represent a user, team or another entity.](https://hopper.workleap.design/components/Avatar)

[**Badge** \\
\\
A badge is used to bring attention to an element.](https://hopper.workleap.design/components/Badge)

[A placeholder for an header section.](https://hopper.workleap.design/components/Header)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/ComboBox\#usage)

### [Disabled](https://hopper.workleap.design/components/ComboBox\#usage-disabled)

A combo box in a disabled state shows that it exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox isDisabled label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Disabled Item](https://hopper.workleap.design/components/ComboBox\#usage-disabled-item)

A combo box with a disabled item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="designer" isDisabled>Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Error](https://hopper.workleap.design/components/ComboBox\#usage-error)

A combo box can be displayed in an error state to indicate that the selection is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox isInvalid label="Roles" errorMessage="This field is required">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/ComboBox\#usage-sizes)

A combo box has multiple sizes to choose from.
The combo box option also changes size based on the size of the combo box.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <ComboBox size="sm" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
            <ComboBox size="md" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/ComboBox\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the combo box for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Icon Prefix](https://hopper.workleap.design/components/ComboBox\#usage-icon-prefix)

An icon can be displayed at the start of the select trigger.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";
import { OrgChartIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox prefix={<OrgChartIcon />} label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Text Prefix](https://hopper.workleap.design/components/ComboBox\#usage-text-prefix)

A short text can be displayed at the start of the select trigger.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            prefix="Operations"
            label="Roles"
        >
            <ComboBoxItem id="project-coordinator">Project Coordinator</ComboBoxItem>
            <ComboBoxItem id="qa-specialist">QA Specialist</ComboBoxItem>
            <ComboBoxItem id="system-administrator">System Administrator</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/ComboBox\#usage-fluid)

A combo box can take the width of its container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox isFluid label="Roles">
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/ComboBox\#usage-controlled)

A combo box can have a controlled selected value. In this example, it shows how it is possible to deselect an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, ComboBoxSection, Header, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>();

    const handleSelectionChange = (key: Key | null) => {
        if (selectedKey === key) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    };

    return (
        <ComboBox selectedKey={selectedKey} onSelectionChange={handleSelectionChange} label="Roles">
            <ComboBoxSection>
                <Header>Operations</Header>
                <ComboBoxItem id="1">Project Coordinator</ComboBoxItem>
                <ComboBoxItem id="2">QA Specialist</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxItem id="3">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Custom Filtering](https://hopper.workleap.design/components/ComboBox\#usage-custom-filtering)

A combo box can overridde the default [useFilter](https://react-spectrum.adobe.com/react-aria/useFilter.html) function from RAC. This can be overridden using the `defaultFilter` prop, or by using the `items` prop to control the filtered list. When `items` is provided rather than `defaultItems`, combo box does no filtering of its own.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, useFilter } from "@hopper-ui/components";
import { useMemo, useState } from "react";

const ROLE_OPTIONS = [\
    { id: 1, name: "Designer" },\
    { id: 2, name: "Developer" },\
    { id: 3, name: "Manager" },\
    { id: 4, name: "QA Engineer" },\
    { id: 5, name: "Product Owner" },\
    { id: 6, name: "Scrum Master" },\
    { id: 7, name: "UX Researcher" },\
    { id: 8, name: "Business Analyst" },\
    { id: 9, name: "DevOps Engineer" },\
    { id: 10, name: "Data Scientist" }\
];

export default function Example() {
    const { startsWith } = useFilter({ sensitivity: "base" });
    const [filterValue, setFilterValue] = useState("");

    const filteredItems = useMemo(() => {
        return ROLE_OPTIONS.filter(item => startsWith(item.name, filterValue));
    }, [startsWith, filterValue]);

    return (
        <ComboBox
            items={filteredItems}
            inputValue={filterValue}
            onInputChange={setFilterValue}
            label="Roles"
        >
            {item => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
        </ComboBox>
    );
}


```

### [Allow Empty Collection](https://hopper.workleap.design/components/ComboBox\#usage-allow-empty-collection)

A combo box can be rendered with an empty collection. If you want the popover to open with a custom message, you can use the `renderEmptyState` prop within the `listBoxProps` prop.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            allowsEmptyCollection
            label="Roles"
            listBoxProps={{
                renderEmptyState: () => "No roles found"
            }}
        >
            {[]}
        </ComboBox>
    );
}


```

### [Allow Custom Value](https://hopper.workleap.design/components/ComboBox\#usage-allow-custom-value)

A combo box can allow the user to enter a custom value that does not match the list.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox allowsCustomValue label="Roles">
            <ComboBoxSection>
                <Header>Creative Department</Header>
                <ComboBoxItem id="1">Designer</ComboBoxItem>
                <ComboBoxItem id="2">Content creator</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxItem id="3">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Form](https://hopper.workleap.design/components/ComboBox\#usage-form)

A combo box can be part of a form. To submit the value of a combo box, make sure you specify the `name` property.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, Form } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form>
            <ComboBox name="Roles" label="Roles">
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="developer">Developer</ComboBoxItem>
                <ComboBoxItem id="manager">Manager</ComboBoxItem>
            </ComboBox>
        </Form>
    );
}


```

### [Auto Menu Width](https://hopper.workleap.design/components/ComboBox\#usage-auto-menu-width)

A combo box can have a menu that automatically adjusts its width based on the longest item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            aria-label="list of options with a description"
            isAutoMenuWidth
            label="Roles"
        >
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds, tests, and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visually appealing, functional solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Responsible for leading and overseeing a team or department to ensure organizational goals are met.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}


```

### [Menu placement](https://hopper.workleap.design/components/ComboBox\#usage-menu-placement)

A combo box's menu can have a customized menu placement using the `direction` and `align` props.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            label="Roles"
            align="end"
            direction="top"
        >
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Section](https://hopper.workleap.design/components/ComboBox\#usage-section)

A combo box can have sections and section headers.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
            <ComboBoxSection>
                <Header>Operations</Header>
                <ComboBoxItem id="project-coordinator">Project Coordinator</ComboBoxItem>
                <ComboBoxItem id="qa-specialist">QA Specialist</ComboBoxItem>
            </ComboBoxSection>
            <ComboBoxSection>
                <Header>Creative Department</Header>
                <ComboBoxItem id="designer">Designer</ComboBoxItem>
                <ComboBoxItem id="copywriter">Copywriter</ComboBoxItem>
                <ComboBoxItem id="ux-researcher">UX Researcher</ComboBoxItem>
            </ComboBoxSection>
        </ComboBox>
    );
}


```

### [Footer](https://hopper.workleap.design/components/ComboBox\#usage-footer)

A combo box can have a footer.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";
import { AddIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox
            label="Roles"
            footer={(
                <Button variant="ghost-secondary" isFluid>
                    <AddIcon />
                    <Text>Add</Text></Button>
            )}
        >
            <ComboBoxItem id="developer">Developer</ComboBoxItem>
            <ComboBoxItem id="designer">Designer</ComboBoxItem>
            <ComboBoxItem id="manager">Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Avatar](https://hopper.workleap.design/components/ComboBox\#usage-avatar)

A combo box item can contain an avatar.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Username">
            <ComboBoxItem id="fred-smith" textValue="Fred Smith" >
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
            </ComboBoxItem>
            <ComboBoxItem id="karen-smith" textValue="Karen Smith" >
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </ComboBoxItem>
            <ComboBoxItem id="john-doe" textValue="John Doe" >
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}


```

### [Count](https://hopper.workleap.design/components/ComboBox\#usage-count)

A combo box item can contain a count using a badge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Badge>50</Badge>
            </ComboBoxItem>
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Badge variant="secondary">99+</Badge>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Dynamic Lists](https://hopper.workleap.design/components/ComboBox\#usage-dynamic-lists)

Options and sections can be populated from a hierarchial data structure.
If a section has a header, the `Collection` component can be used to render the child items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Collection, ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

const OPTIONS_WITH_SECTIONS = [\
    {\
        role: "Operations", children: [\
            { id: 2, role: "Project Coordinator" },\
            { id: 3, role: "QA Specialist" },\
            { id: 4, role: "System Administrator" }\
        ]\
    },\
    {\
        role: "Creative Department", children: [\
            { id: 6, role: "Designer" },\
            { id: 7, role: "Designer" },\
            { id: 8, role: "UX Researcher" }\
        ]\
    }\
];

export default function Example() {
    return (
        <ComboBox
            items={OPTIONS_WITH_SECTIONS}
            label="Section"
        >
            {section => {
                const { role: sectionName, children } = section;

                return (
                    <ComboBoxSection id={sectionName}>
                        <Header>{sectionName}</Header>
                        <Collection items={children}>
                            {item => <ComboBoxItem id={item.id}>{item.role}</ComboBoxItem>}
                        </Collection>
                    </ComboBoxSection>
                );
            }}
        </ComboBox>
    );
}


```

### [Icons](https://hopper.workleap.design/components/ComboBox\#usage-icons)

A combo box item can contain icons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <IconList>
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <SparklesIcon /><Text>Designer</Text>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [End Icons](https://hopper.workleap.design/components/ComboBox\#usage-end-icons)

A combo box can contain icons at the end of an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, IconList, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </ComboBoxItem>
            <ComboBoxItem textValue="Developer">
                <SparklesIcon slot="end-icon" /><Text>Developer</Text>
            </ComboBoxItem>
            <ComboBoxItem>Manager</ComboBoxItem>
        </ComboBox>
    );
}


```

### [Loading](https://hopper.workleap.design/components/ComboBox\#usage-loading)

A combo box can have a loading state.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox
            label="Roles"
            isLoading
        >
            {[]}
        </ComboBox>
    );
}


```

### [Load on scroll](https://hopper.workleap.design/components/ComboBox\#usage-load-on-scroll)

A combo box can load more items when scrolling within.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, useAsyncList } from "@hopper-ui/components";

interface Character {
    name: string;
}

export default function Example() {
    const list = useAsyncList<Character>({
        async load({ signal, cursor }) {
            const res = await fetch(cursor || "https://pokeapi.co/api/v2/pokemon", {
                signal
            });
            const json = await res.json();

            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    return (
        <ComboBox
            label="Roles"
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
            listBoxProps={{
                maxHeight: "core_1280"
            }}
        >
            {item => {
                return <ComboBoxItem id={item.name}>{item.name}</ComboBoxItem>;
            }}
        </ComboBox>
    );
}


```

### [Selection indicator](https://hopper.workleap.design/components/ComboBox\#usage-selection-indicator)

A combo box can have a different selection indicator.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, Text, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>("1");

    return (
        <ComboBox
            aria-label="list of options"
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            label="Roles"
            selectionIndicator="input"
        >
            <ComboBoxItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}


```

### [Description](https://hopper.workleap.design/components/ComboBox\#usage-description)

A combo box item can have a description.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { ComboBox, ComboBoxItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ComboBox label="Roles">
            <ComboBoxItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </ComboBoxItem>
            <ComboBoxItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </ComboBoxItem>
        </ComboBox>
    );
}


```

## [Props](https://hopper.workleap.design/components/ComboBox\#props)

### [ComboBox](https://hopper.workleap.design/components/ComboBox\#props-combobox)

isLoading?

`boolean`

Whether the item is loading.

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBoxItem can vary in size.

_Defaults to sm._

isInvalid?

`boolean`

Whether or not the ListBoxItem is in an invalid state.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.

_Defaults to check._

radioProps?

`DecorativeRadioProps`

The props for the Radio.

checkboxProps?

`DecorativeCheckboxProps`

The props for the Checkbox.

style?

`CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

The unique id of the item.

value?

`object`

The object value that this item represents. When using dynamic collections, this is set automatically.

textValue?

`string`

A string representation of the item's contents, used for features like typeahead.

isDisabled?

`boolean`

Whether the item is disabled.

children?

`ReactNode | ((values: ListBoxItemRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ListBoxItemRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

items?

`Iterable<T>`

Item objects in the section.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

align?

`ResponsiveProp<MenuAlignment>`

The alignment of the menu.

_Defaults to start._

direction?

`ResponsiveProp<MenuDirection>`

The direction that the menu should open.

_Defaults to bottom._

footer?

`ReactNode`

The footer of the combo box.

isAutoMenuWidth?

`boolean`

If `true`, the combo box menu will not be the width of the trigger and instead be the width of its contents.

inputRef?

`MutableRefObject<HTMLInputElement | null>`

A ref for the HTML input element.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the select will take all available width.

_Defaults to false._

listBoxProps?

`ListBoxProps<T>`

The list box props.

placeholder?

`string`

The placeholder text when the select is empty.

popoverProps?

`PopoverProps`

The props for the popover.

prefix?

`ReactNode`

An icon or text to display at the start of the select trigger.

shouldFlip?

`boolean`

Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely.

triggerProps?

`InputGroupProps`

The props for the select's trigger.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

selectedKey?

`Key | null`

The currently selected key in the collection (controlled).

defaultSelectedKey?

`Key`

The initial selected key in the collection (uncontrolled).

shouldFocusWrap?

`boolean`

Whether keyboard navigation is circular.

defaultItems?

`Iterable<T>`

The list of ComboBox items (uncontrolled).

inputValue?

`string`

The value of the ComboBox input (controlled).

defaultInputValue?

`string`

The default value of the ComboBox input (uncontrolled).

allowsCustomValue?

`boolean`

Whether the ComboBox allows a non-item matching input value to be set.

menuTrigger?

`MenuTriggerAction`

The interaction required to display the ComboBox menu.

_Defaults to 'input'._

disabledKeys?

`Iterable<Key>`

The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.

isReadOnly?

`boolean`

Whether the input can be selected but not changed by the user.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

validate?

`((value: ComboBoxValidationValue) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

name?

`string`

The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).

defaultFilter?

`((textValue: string, inputValue: string) => boolean)`

The filter function used to determine if a option should be included in the combo box list.

formValue?

`"text" | "key"`

Whether the text or key of the selected item is submitted as part of an HTML form.
When `allowsCustomValue` is `true`, this option does not apply and the text is always submitted.

_Defaults to 'key'._

allowsEmptyCollection?

`boolean`

Whether the combo box allows the menu to be open when the collection is empty.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

### \#\#\#\# Events

onAction?

`(() => void)`

Handler that is called when a user performs an action on the item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

onLoadMore?

`(() => void)`

Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.

onSelectionChange?

`((key: Key | null) => void)`

Handler that is called when the selection changes.

onOpenChange?

`((isOpen: boolean, menuTrigger?: MenuTriggerAction) => void)`

Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu.

onInputChange?

`((value: string) => void)`

Handler that is called when the ComboBox input value changes.

onFocus?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<HTMLInputElement, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for this item.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### [ComboBoxSection](https://hopper.workleap.design/components/ComboBox\#props-comboboxsection)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode | ((item: T) => ReactElement<any, string | JSXElementConstructor<any>>)`

Static child items or a function to render children.

items?

`Iterable<T>`

Item objects in the section.

id?

`Key`

The unique id of the section.

value?

`object`

The object value that this section represents. When using dynamic collections, this is set automatically.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for the section.

### [ComboBoxItem](https://hopper.workleap.design/components/ComboBox\#props-comboboxitem)

isLoading?

`boolean`

Whether the item is loading.

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBoxItem can vary in size.

_Defaults to sm._

isInvalid?

`boolean`

Whether or not the ListBoxItem is in an invalid state.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.

_Defaults to check._

radioProps?

`DecorativeRadioProps`

The props for the Radio.

checkboxProps?

`DecorativeCheckboxProps`

The props for the Checkbox.

style?

`CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

The unique id of the item.

value?

`object`

The object value that this item represents. When using dynamic collections, this is set automatically.

textValue?

`string`

A string representation of the item's contents, used for features like typeahead.

isDisabled?

`boolean`

Whether the item is disabled.

children?

`ReactNode | ((values: ListBoxItemRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ListBoxItemRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

### \#\#\#\# Events

onAction?

`(() => void)`

Handler that is called when a user performs an action on the item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for this item.

## Select Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Select

A select displays a collapsible list of options from which the user can select one.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Select/src/Select.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Select]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select label="Roles">
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

## [Anatomy](https://hopper.workleap.design/components/Select\#anatomy)

The Header component represents a `header` within a Hopper container.

#### [Section](https://hopper.workleap.design/components/Select\#section)

The Section component represents a `section` within a Hopper container.

### [Composed Components](https://hopper.workleap.design/components/Select\#guidelines-composed-components)

A `Select` uses the following components:

[**Avatar** \\
\\
An avatar is used to represent a user, team or another entity.](https://hopper.workleap.design/components/Avatar)

[**Badge** \\
\\
A badge is used to bring attention to an element.](https://hopper.workleap.design/components/Badge)

[A placeholder for an header section.](https://hopper.workleap.design/components/Header)

[**Icon** \\
\\
An icon component is used to render a custom icon.](https://hopper.workleap.design/components/Icon)

[**Text** \\
\\
A text component is a primitive component matching Hopper's typography type scale.](https://hopper.workleap.design/components/Text)

## [Usage](https://hopper.workleap.design/components/Select\#usage)

### [Disabled](https://hopper.workleap.design/components/Select\#usage-disabled)

A select in a disabled state shows that it exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a field may become available later.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            isDisabled
            label="Roles"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Disabled Item](https://hopper.workleap.design/components/Select\#usage-disabled-item)

A select with a disabled item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            disabledKeys={["developer"]}
            aria-label="list of options"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Error](https://hopper.workleap.design/components/Select\#usage-error)

A select can be displayed in an error state to indicate that the selection is invalid.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            isInvalid
            label="Roles"
            errorMessage="This field is required"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Sizes](https://hopper.workleap.design/components/Select\#usage-sizes)

A select has multiple sizes to choose from.
The select menu also changes size based on the size of the select.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Select label="Roles">
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
            <Select size="md" label="Roles">
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
        </Stack>
    );
}


```

### [Labeling](https://hopper.workleap.design/components/Select\#usage-labeling)

If a visible label isn't specified, an `aria-label` must be provided to the select for accessibility. If the field is labeled by a separate element, an `aria-labelledby` prop must be provided using the ID of the labeling element instead.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="Roles">
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Icon Prefix](https://hopper.workleap.design/components/Select\#usage-icon-prefix)

An icon can be displayed at the start of the select trigger.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";
import { OrgChartIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select
            prefix={<OrgChartIcon />}
            label="Roles"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Text Prefix](https://hopper.workleap.design/components/Select\#usage-text-prefix)

A short text can be displayed at the start of the select trigger.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            prefix="Operations"
            label="Roles"
        >
            <SelectItem id="project-coordinator">Project Coordinator</SelectItem>
            <SelectItem id="qa-specialist">QA Specialist</SelectItem>
            <SelectItem id="system-administrator">System Administrator</SelectItem>
        </Select>
    );
}


```

### [Fluid](https://hopper.workleap.design/components/Select\#usage-fluid)

A select can take the width of its container.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            isFluid
            label="Roles"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Custom Value](https://hopper.workleap.design/components/Select\#usage-custom-value)

A select's trigger value can be customized using the `renderValue` function to allow other elements such as an avatar or icon inside the trigger value.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar, Select, SelectItem, Text, type ValueRenderProps } from "@hopper-ui/components";

import { users, type User } from "./data.ts";

const renderValue = ({ defaultChildren, selectedItem }: ValueRenderProps<User>) => {
    if (selectedItem) {
        const { name, avatar } = selectedItem;

        return (
            <>
                <Avatar name={name} src={avatar} />
                <Text>{name}</Text>
            </>
        );
    }

    return defaultChildren;
};

export default function Example() {
    const [firstUser] = users;

    return (
        <Select
            renderValue={renderValue}
            defaultSelectedKey={firstUser.id}
            items={users}
            label="Users"
        >
            {({ id, name, avatar, role }) => {
                return (
                    <SelectItem id={id} textValue={name}>
                        <Avatar name={name} src={avatar} />
                        <Text>{name}</Text>
                        <Text slot="description">{role}</Text>
                    </SelectItem>
                );
            }}
        </Select>
    );
}


```

### [Controlled](https://hopper.workleap.design/components/Select\#usage-controlled)

A select can have a controlled selected value. In this example, it shows how it is possible to deselect an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Header, Select, SelectItem, SelectSection, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key | null>();

    const handleSelectionChange = (key: Key) => {
        if (selectedKey === key) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    };

    return (
        <Select selectedKey={selectedKey} onSelectionChange={handleSelectionChange} label="Roles">
            <SelectSection>
                <Header>Operations</Header>
                <SelectItem id="1">Project Coordinator</SelectItem>
                <SelectItem id="2">QA Specialist</SelectItem>
            </SelectSection>
            <SelectItem id="3">Manager</SelectItem>
        </Select>
    );
}


```

### [Form](https://hopper.workleap.design/components/Select\#usage-form)

A select can be part of a form. To submit the value of a select, make sure you specify the `name` property.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Form, Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Form>
            <Select
                name="roles"
                label="Roles"
            >
                <SelectItem id="designer">Designer</SelectItem>
                <SelectItem id="developer">Developer</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
            </Select>
        </Form>
    );
}


```

### [Auto Menu Width](https://hopper.workleap.design/components/Select\#usage-auto-menu-width)

A select can have a menu that automatically adjusts its width based on the longest item.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            aria-label="list of options with a description"
            isAutoMenuWidth
        >
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}


```

### [Menu placement](https://hopper.workleap.design/components/Select\#usage-menu-placement)

A select's menu can have a customized menu placement using the `direction` and `align` props.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            aria-label="Roles"
            isAutoMenuWidth
            align="start"
            direction="top"
        >
            <SelectItem id="designer">Designer</SelectItem>
            <SelectItem id="developer">Developer</SelectItem>
            <SelectItem id="manager">Manager</SelectItem>
        </Select>
    );
}


```

### [Section](https://hopper.workleap.design/components/Select\#usage-section)

A select can have sections and section headers.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Header, Select, SelectItem, SelectSection } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem>Developer</SelectItem>
            <SelectItem>Manager</SelectItem>
            <SelectSection>
                <Header>Creative Department</Header>
                <SelectItem>Designer</SelectItem>
                <SelectItem>Copywriter</SelectItem>
                <SelectItem>UX Researcher</SelectItem>
            </SelectSection>
            <SelectSection>
                <Header>Operations</Header>
                <SelectItem>Project Coordinator</SelectItem>
                <SelectItem>QA Specialist</SelectItem>
            </SelectSection>
            <SelectItem>Product Owner</SelectItem>
        </Select>
    );
}


```

### [Footer](https://hopper.workleap.design/components/Select\#usage-footer)

A select can have a footer.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Select, SelectItem, Text } from "@hopper-ui/components";
import { AddIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select
            aria-label="list of options with a description"
            footer={<Button variant="ghost-secondary" isFluid><AddIcon /><Text>Add</Text></Button>}
        >
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}


```

### [Avatar](https://hopper.workleap.design/components/Select\#usage-avatar)

A select option can contain an avatar.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Avatar, Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="Team">
            <SelectItem textValue="Fred Smith">
                <Avatar src="https://i.pravatar.cc/96?img=3" name="Fred Smith" />
                <Text>Fred Smith</Text>
            </SelectItem>
            <SelectItem textValue="Karen Smith">
                <Avatar name="Karen Smith" />
                <Text>Karen Smith</Text>
            </SelectItem>
            <SelectItem textValue="John Doe">
                <Avatar name="John Doe" />
                <Text>John Doe</Text>
            </SelectItem>
        </Select>
    );
}


```

### [Count](https://hopper.workleap.design/components/Select\#usage-count)

A select option can contain a count using a badge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <Badge>50</Badge>
            </SelectItem>
            <SelectItem textValue="Developer">
                <Badge variant="secondary">99+</Badge>
                <Text>Developer</Text>
            </SelectItem>
            <SelectItem>Manager</SelectItem>
        </Select>
    );
}


```

### [Dynamic Lists](https://hopper.workleap.design/components/Select\#usage-dynamic-lists)

Options and sections can be populated from a hierarchial data structure.
If a section has a header, the `Collection` component can be used to render the child items.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Collection, Header, Select, SelectItem, SelectSection } from "@hopper-ui/components";

const OPTIONS = [\
    {\
        role: "Operations", children: [\
            { id: 2, role: "Project Coordinator" },\
            { id: 3, role: "QA Specialist" },\
            { id: 4, role: "System Administrator" }\
        ]\
    },\
    {\
        role: "Creative Department", children: [\
            { id: 6, role: "Designer" },\
            { id: 7, role: "Designer" },\
            { id: 8, role: "UX Researcher" }\
        ]\
    }\
];

export default function Example() {
    return (
        <Select items={OPTIONS} label="Section">
            {section => {
                const { role: sectionName, children } = section;

                return (
                    <SelectSection id={sectionName}>
                        <Header>{sectionName}</Header>
                        <Collection items={children}>
                            {item => <SelectItem id={item.id}>{item.role}</SelectItem>}
                        </Collection>
                    </SelectSection>
                );
            }}
        </Select>
    );
}


```

### [Icons](https://hopper.workleap.design/components/Select\#usage-icons)

A select option can contain icons.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, Select, SelectItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <IconList>
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </SelectItem>
            <SelectItem textValue="Developer">
                <SparklesIcon />
                <Text>Developer</Text>
            </SelectItem>
            <SelectItem>Manager</SelectItem>
        </Select>
    );
}


```

### [End Icons](https://hopper.workleap.design/components/Select\#usage-end-icons)

A select can contain icons at the end of an option.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { IconList, Select, SelectItem, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Select aria-label="list of options">
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <IconList slot="end-icon">
                    <SparklesIcon /><SparklesIcon /><SparklesIcon />
                </IconList>
            </SelectItem>
            <SelectItem textValue="Developer">
                <SparklesIcon slot="end-icon" />
                <Text>Developer</Text>
            </SelectItem>
            <SelectItem>Manager</SelectItem>
        </Select>
    );
}


```

### [Loading](https://hopper.workleap.design/components/Select\#usage-loading)

A select can have a loading state.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select
            aria-label="list of options"
            isLoading
        >
            {[]}
        </Select>
    );
}


```

### [Load on scroll](https://hopper.workleap.design/components/Select\#usage-load-on-scroll)

A select can load more items when scrolling within.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem, useAsyncList } from "@hopper-ui/components";

interface Character {
    name: string;
}

export default function Example() {
    const list = useAsyncList<Character>({
        async load({ signal, cursor }) {
            const res = await fetch(cursor || "https://pokeapi.co/api/v2/pokemon", {
                signal
            });
            const json = await res.json();

            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    return (
        <Select
            aria-label="list of options"
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
            listBoxProps={{
                maxHeight: "core_1280"
            }}
        >
            {item => {
                const { name } = item;

                return <SelectItem id={name}>{name}</SelectItem>;
            }}
        </Select>
    );
}


```

### [Selection indicator](https://hopper.workleap.design/components/Select\#usage-selection-indicator)

A select can have a different selection indicator.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem, Text, type Key } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKey, setSelectedKey] = useState<Key>("1");

    return (
        <Select
            aria-label="list of options"
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            selectionIndicator="input"
        >
            <SelectItem textValue="Developer" id="1">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Designer" id="2">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager" id="3">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}


```

### [Description](https://hopper.workleap.design/components/Select\#usage-description)

A select item can have a description.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Select, SelectItem, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Select aria-label="list of options with a description">
            <SelectItem textValue="Developer">
                <Text>Developer</Text>
                <Text slot="description">Builds and maintains software.</Text>
            </SelectItem>
            <SelectItem textValue="Designer">
                <Text>Designer</Text>
                <Text slot="description">Creates visual design solutions.</Text>
            </SelectItem>
            <SelectItem textValue="Manager">
                <Text>Manager</Text>
                <Text slot="description">Leads teams and projects.</Text>
            </SelectItem>
        </Select>
    );
}


```

## [Props](https://hopper.workleap.design/components/Select\#props)

### [Select](https://hopper.workleap.design/components/Select\#props-select)

isLoading?

`boolean`

Whether the item is loading.

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBoxItem can vary in size.

_Defaults to sm._

isInvalid?

`boolean`

Whether or not the ListBoxItem is in an invalid state.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.

_Defaults to check._

radioProps?

`DecorativeRadioProps`

The props for the Radio.

checkboxProps?

`DecorativeCheckboxProps`

The props for the Checkbox.

style?

`CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

The unique id of the item.

value?

`object`

The object value that this item represents. When using dynamic collections, this is set automatically.

textValue?

`string`

A string representation of the item's contents, used for features like typeahead.

isDisabled?

`boolean`

Whether the item is disabled.

children?

`ReactNode | ((values: ListBoxItemRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ListBoxItemRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

items?

`Iterable<T>`

Item objects in the section.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

align?

`ResponsiveProp<MenuAlignment>`

The alignment of the menu.

_Defaults to start._

direction?

`ResponsiveProp<MenuDirection>`

The direction that the menu should open.

_Defaults to bottom._

footer?

`ReactNode`

The footer of the select.

isAutoMenuWidth?

`boolean`

If `true`, the select menu will not be the width of the trigger and instead be the width of its contents.

isFluid?

`ResponsiveProp<boolean>`

If `true`, the select will take all available width.

_Defaults to false._

listBoxProps?

`ListBoxProps<T>`

The list box props.

placeholder?

`string`

The placeholder text when the select is empty.

popoverProps?

`PopoverProps`

The props for the popover.

prefix?

`ReactNode`

An icon or text to display at the start of the select trigger.

renderValue?

`((valueRenderProps: ValueRenderProps<T>) => ReactNode)`

A function to render the value of the select. It will render the selected item's text by default.

shouldFlip?

`boolean`

Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely.

triggerProps?

`(Omit<ButtonProps, keyof StyledSystemProps> & StyledSystemProps)`

The props for the select's trigger.

validationBehavior?

`"native" | "aria"`

Whether to use native HTML form validation to prevent form submission
when the value is missing or invalid, or mark the field as required
or invalid via ARIA.

_Defaults to 'native'._

selectedKey?

`Key | null`

The currently selected key in the collection (controlled).

defaultSelectedKey?

`Key`

The initial selected key in the collection (uncontrolled).

autoComplete?

`string`

Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).

name?

`string`

The name of the input, used when submitting an HTML form.

isOpen?

`boolean`

Sets the open state of the menu.

defaultOpen?

`boolean`

Sets the default open state of the menu.

disabledKeys?

`Iterable<Key>`

The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.

isRequired?

`boolean`

Whether user input is required on the input before form submission.

validate?

`((value: Key) => true | ValidationError | null)`

A function that returns an error message if a given value is invalid.
Validation errors are displayed to the user when the form is submitted
if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
prop instead.

autoFocus?

`boolean`

Whether the element should receive focus on render.

description?

`ReactNode`

The helper message of the field.

errorMessage?

`ReactNode | ((v: ValidationResult) => ReactNode)`

The error message of the field.

label?

`ReactNode`

The label of the field.

necessityIndicator?

`NecessityIndicator`

Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.

### \#\#\#\# Events

onAction?

`(() => void)`

Handler that is called when a user performs an action on the item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

onLoadMore?

`(() => void)`

Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.

onSelectionChange?

`((key: Key) => void)`

Handler that is called when the selection changes.

onOpenChange?

`((isOpen: boolean) => void)`

Method that is called when the open state of the menu changes.

onFocus?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element receives focus.

onBlur?

`((e: FocusEvent<Element, Element>) => void)`

Handler that is called when the element loses focus.

onFocusChange?

`((isFocused: boolean) => void)`

Handler that is called when the element's focus status changes.

onKeyDown?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is pressed.

onKeyUp?

`((e: KeyboardEvent) => void)`

Handler that is called when a key is released.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for this item.

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

excludeFromTabOrder?

`boolean`

Whether to exclude the element from the sequential tab order. If true,
the element will not be focusable via the keyboard by tabbing. This should
be avoided except in rare scenarios where an alternative means of accessing
the element or its functionality via the keyboard is available.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### [SelectSection](https://hopper.workleap.design/components/Select\#props-selectsection)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode | ((item: T) => ReactElement<any, string | JSXElementConstructor<any>>)`

Static child items or a function to render children.

items?

`Iterable<T>`

Item objects in the section.

id?

`Key`

The unique id of the section.

value?

`object`

The object value that this section represents. When using dynamic collections, this is set automatically.

dependencies?

`readonly any[]`

Values that should invalidate the item cache when using dynamic collections.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for the section.

### [SelectItem](https://hopper.workleap.design/components/Select\#props-selectitem)

isLoading?

`boolean`

Whether the item is loading.

size?

`ResponsiveProp<ListBoxItemSize>`

A ListBoxItem can vary in size.

_Defaults to sm._

isInvalid?

`boolean`

Whether or not the ListBoxItem is in an invalid state.

selectionIndicator?

`SelectionIndicator`

The selection indicator to use. Only available if the selection mode is not "none".
When set to "input", the selection indicator will be an either a radio or checkbox based on the selection mode.

_Defaults to check._

radioProps?

`DecorativeRadioProps`

The props for the Radio.

checkboxProps?

`DecorativeCheckboxProps`

The props for the Checkbox.

style?

`CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

id?

`Key`

The unique id of the item.

value?

`object`

The object value that this item represents. When using dynamic collections, this is set automatically.

textValue?

`string`

A string representation of the item's contents, used for features like typeahead.

isDisabled?

`boolean`

Whether the item is disabled.

children?

`ReactNode | ((values: ListBoxItemRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: ListBoxItemRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

href?

`string`

A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).

hrefLang?

`string`

Hints at the human language of the linked URL. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).

target?

`HTMLAttributeAnchorTarget`

The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

rel?

`string`

The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).

download?

`string | boolean`

Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).

ping?

`string`

A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).

referrerPolicy?

`HTMLAttributeReferrerPolicy`

How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).

routerOptions?

`undefined`

Options for the configured client side router.

### \#\#\#\# Events

onAction?

`(() => void)`

Handler that is called when a user performs an action on the item. The exact user event depends on
the collection's `selectionBehavior` prop and the interaction modality.

onHoverStart?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction starts.

onHoverEnd?

`((e: HoverEvent) => void)`

Handler that is called when a hover interaction ends.

onHoverChange?

`((isHovering: boolean) => void)`

Handler that is called when the hover state changes.

### \#\#\#\# Accessibility

aria-label?

`string`

An accessibility label for this item.

## [Migration Notes](https://hopper.workleap.design/components/Select\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `Item` has been renamed to `SelectItem`.
- The selected value only includes text. If an icon or avatar is needed, customize it using the `renderValue` function.
- There is no `allowFlip`. Use `shouldFlip`.
- There is no `allowPreventOverflow`. This is done automatically.
- There is no `allowResponsiveMenuWidth`. Use `isAutoMenuWidth`.
- `disabled` has been renamed to `isDisabled`.
- `fluid` has been renamed to `isFluid`.
- `open` has been renamed to `isOpen`..
- `required` has been renamed to `isRequired`.
- A select cannot be read-only.
- `overlayProps` has been removed. Use `popoverProps` instead.
- Use `isInvalid` instead of `validationState`.
- `variant` has been removed.
- `zIndex` has been removed.
- Custom tooltips are not supported.

## Content Placeholder Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Content

A placeholder for the main content section of a component.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Content.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Content]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

A content placeholder component provides no specific styling by itself, but receives styling from the parent container. In addition, a content placeholder will be automatically placed within the container's layout according to Hopper guidelines.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

Software built for everyone to do their best work.

```

import { Content } from "@hopper-ui/components";

export default function Example() {
    return (
        <Content>Software built for everyone to do their best work.</Content>
    );
}


```

## [Props](https://hopper.workleap.design/components/Content\#props)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Footer Component Overview

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

A placeholder for a footer section.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/layout/src/Footer.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Footer]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

A footer placeholder component provides no specific styling by itself, but receives styling from the parent container. In addition, a footer placeholder will be automatically placed within the container's layout according to Hopper guidelines.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Footer } from "@hopper-ui/components";

export default function Example() {
    return (
        <Footer>Software built for everyone to do their best work.</Footer>
    );
}


```

## [Props](https://hopper.workleap.design/components/Footer\#props)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Header Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

A placeholder for an header section.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Header/src/Header.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Header]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

An header placeholder component provides no specific styling by itself, but receives styling from the parent container. In addition, an header placeholder will be automatically placed within the container's layout according to Hopper guidelines.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Header } from "@hopper-ui/components";

export default function Example() {
    return (
        <Header>Software built for everyone to do their best work.</Header>
    );
}


```

## [Props](https://hopper.workleap.design/components/Header\#props)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Badge Components

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Badge

A badge is used to bring attention to an element.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Badge/src/Badge.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Badge]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>12</Badge>
    );
}


```

## [Usage](https://hopper.workleap.design/components/Badge\#usage)

### [Disabled](https://hopper.workleap.design/components/Badge\#usage-disabled)

A disabled badge is usually used inside other components that may be disabled, like a tag or a list box.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge isDisabled>12</Badge>
    );
}


```

### [Indeterminate](https://hopper.workleap.design/components/Badge\#usage-indeterminate)

An indeterminate badge is used when the value is unknown or not applicable.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge />
    );
}


```

### [Variants](https://hopper.workleap.design/components/Badge\#usage-variants)

The different variants of a badge.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Badge variant="primary">BETA</Badge>
            <Badge variant="secondary">NEW</Badge>
            <Badge variant="subdued">50</Badge>
        </Inline>
    );
}


```

### [High Count](https://hopper.workleap.design/components/Badge\#usage-high-count)

If a value above 99 is needed, use `99+` instead of the number.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>99+</Badge>
    );
}


```

### [Text](https://hopper.workleap.design/components/Badge\#usage-text)

A badge can have any text content.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Badge>New</Badge>
    );
}


```

## [Props](https://hopper.workleap.design/components/Badge\#props)

variant?

`BadgeVariant`

The visual style of the badge.

_Defaults to primary._

isDisabled?

`boolean`

Whether or not the badge is disabled.

isIndeterminate?

`boolean`

Whether or not the badge is indeterminate and should just be a dot. This will ignore any children.

children?

`ReactNode | ((values: BadgeRenderProps & { defaultChildren: ReactNode; }) => ReactNode)`

The children of the component. A function may be provided to alter the children based on component state.

className?

`string | ((values: BadgeRenderProps & { defaultClassName: string; }) => string)`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.

style?

`CSSProperties | ((values: BadgeRenderProps & { defaultStyle: CSSProperties; }) => CSSProperties)`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Badge\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- `highlight` is not supported.
- `pushed` is not supported.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `size` is not supported.
- `variant` has different values.
- `icon` variant it not supported.
- `wrapperProps` has been removed.
- Badge is no longer floating. Use the `FloatingBadge` component to add this feature.
- `FloatingBadge` has new props such as `placement` and `offset`.
- `overlap` is used inside `FloatingBadge` and the new values are `circular` and `rectangular`.

## User Notification Callout

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Callout

### Alpha component

This component still has accessibility issues in Dark Mode. It can be used if the application is in Light mode only, but know the colors of this components might change in the future.

A Callout informs users about important changes or persistent conditions. Use this component to communicate to users in a prominent way. Callouts are placed at the top of the page or section they apply to, and below the page or section header.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Callout/src/Callout.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Callout]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Callout onClose={() => alert("Closed")}>
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary">Undo</Button>
        </Callout>
    );
}


```

### [Composed Components](https://hopper.workleap.design/components/Callout\#props-composed-components)

A `Callout` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**Content** \\
\\
A placeholder for the main content section of a component.](https://hopper.workleap.design/components/Content)

[A placeholder for an header section.](https://hopper.workleap.design/components/Header)

[**RichIcon** \\
\\
A rich icon component is used to render a rich custom icon.](https://hopper.workleap.design/components/RichIcon)

A `CompactCallout` uses the following components:

[**Button** \\
\\
A button allows a user to initiate an action.](https://hopper.workleap.design/components/Button)

[**Content** \\
\\
A placeholder for the main content section of a component.](https://hopper.workleap.design/components/Content)

[**Link** \\
\\
A link allows a user to navigate to a different location.](https://hopper.workleap.design/components/Link)

## [Usage](https://hopper.workleap.design/components/Callout\#usage)

### [Variants](https://hopper.workleap.design/components/Callout\#usage-variants)

A callout can use different variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Content, Heading, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Callout onClose={() => alert("Closed")}>
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary">Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="success">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary">Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="warning">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary">Undo</Button>
            </Callout>
            <Callout onClose={() => alert("Closed")} variant="upsell">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary">Undo</Button>
            </Callout>
        </Stack>

    );
}


```

### [Hide Icon](https://hopper.workleap.design/components/Callout\#usage-hide-icon)

A callout can hide the icon in scenarios where it takes up too much space, such as very small breakpoints.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Callout onClose={() => alert("Closed")} hideIcon>
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary">Undo</Button>
        </Callout>
    );
}


```

### [Custom Icon](https://hopper.workleap.design/components/Callout\#usage-custom-icon)

A callout can have a custom rich icon.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Content, Heading } from "@hopper-ui/components";
import { IdeaRichIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Callout onClose={() => alert("Closed")}>
            <IdeaRichIcon />
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary">Undo</Button>
        </Callout>
    );
}


```

### [Dismissable](https://hopper.workleap.design/components/Callout\#usage-dismissable)

A callout is only dismissable when `onClose` prop is set.

Here's an example without `onClose`.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Callout>
            <Heading>New users will be automatically invited</Heading>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary">Undo</Button>
        </Callout>
    );
}


```

### [Inline callout](https://hopper.workleap.design/components/Callout\#usage-inline-callout)

Within a container, a callout shouldn't have borders. Here's an example of a callout inside a Card.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, Callout, Card, Content, Heading } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="core_240">
            <Callout onClose={() => alert("Closed")} fillStyle="subtleFill">
                <Heading>New users will be automatically invited</Heading>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary">Undo</Button>
            </Callout>
        </Card>
    );
}


```

### [Compact callout](https://hopper.workleap.design/components/Callout\#usage-compact-callout)

A more streamlined version of the Callout component that is designed to be used in more compact spaces.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, CompactCallout, Content } from "@hopper-ui/components";

export default function Example() {
    return (
        <CompactCallout>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary" size="sm">Undo</Button>
        </CompactCallout>
    );
}


```

### [Compact callout variants](https://hopper.workleap.design/components/Callout\#usage-compact-callout-variants)

A compact callout can have the same variants.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, CompactCallout, Content, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <CompactCallout>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary" size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout variant="success">
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary" size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout variant="warning">
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary" size="sm">Undo</Button>
            </CompactCallout>
            <CompactCallout>
                <Content>You have selected to automatically invite users when they are created.</Content>
                <Button variant="secondary" size="sm">Undo</Button>
            </CompactCallout>
        </Stack>
    );
}


```

### [Compact callout CTAs](https://hopper.workleap.design/components/Callout\#usage-compact-callout-ctas)

A compact callout can have either a button or a link as CTA. Here's an example where it's a link.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { CompactCallout, Content, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <CompactCallout>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Link variant="secondary" size="sm">Learn more</Link>
        </CompactCallout>
    );
}


```

### [Dismissable compact callout](https://hopper.workleap.design/components/Callout\#usage-dismissable-compact-callout)

Similar to the Callout, the dismiss icon appears only when `onClose` is set.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Button, CompactCallout, Content } from "@hopper-ui/components";

export default function Example() {
    return (
        <CompactCallout onClose={() => alert("Closed")}>
            <Content>You have selected to automatically invite users when they are created.</Content>
            <Button variant="secondary" size="sm">Undo</Button>
        </CompactCallout>
    );
}


```

## [Props](https://hopper.workleap.design/components/Callout\#props)

### [Callout](https://hopper.workleap.design/components/Callout\#props-callout)

variant?

`CalloutVariant`

The overall hue of the callout.

_Defaults to information._

fillStyle?

`"border" | "subtleFill"`

The appearance of the callout.

_Defaults to border._

hideIcon?

`ResponsiveProp<boolean>`

If true, the callout won't have an icon

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

### \#\#\#\# Events

onClose?

`(() => void)`

Callback function that happens when the callout is dismissed.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

### [CompactCallout](https://hopper.workleap.design/components/Callout\#props-compactcallout)

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

variant?

`CalloutVariant`

The overall hue of the callout.

_Defaults to information._

fillStyle?

`"border" | "subtleFill"`

The appearance of the callout.

_Defaults to border._

### \#\#\#\# Events

onClose?

`(() => void)`

Callback function that happens when the callout is dismissed.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Floating Badge Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# FloatingBadge

A floating badge allows the user to position a badge relative to another component.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Badge/src/FloatingBadge.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[FloatingBadge]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Div, FloatingBadge } from "@hopper-ui/components";

export default function Example() {
    return (
        <FloatingBadge>
            <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
            <Badge>NEW</Badge>
        </FloatingBadge>
    );
}


```

## [Usage](https://hopper.workleap.design/components/FloatingBadge\#usage)

### [Placement](https://hopper.workleap.design/components/FloatingBadge\#usage-placement)

A floating badge can be positioned relative to another component using the `placement` prop. This allows the badge to be placed in any of the 4 positions around the target component.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Inline, Badge, Div, FloatingBadge } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <FloatingBadge placement="top left">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
            <FloatingBadge placement="bottom left">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
            <FloatingBadge placement="bottom right">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
            <FloatingBadge placement="top right">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
        </Inline>
    );
}


```

### [Overlap](https://hopper.workleap.design/components/FloatingBadge\#usage-overlap)

Allows you to specify whether the badge overlaps a rectangular or circular component.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Div, FloatingBadge, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <FloatingBadge overlap="rectangular">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>NEW</Badge>
            </FloatingBadge>
            <FloatingBadge overlap="circular">
                <Div height="core_320" width="core_320" borderRadius="circle" backgroundColor="primary-weak" />
                <Badge>NEW</Badge>
            </FloatingBadge>
            <FloatingBadge overlap="rectangular">
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
            <FloatingBadge overlap="circular">
                <Div height="core_320" width="core_320" borderRadius="circle" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
        </Inline>
    );
}


```

### [Offset](https://hopper.workleap.design/components/FloatingBadge\#usage-offset)

The position of the badge can be adjusted using the `offset` prop. This prop accepts an object with `x` and `y` properties that will be used to adjust the badge's position.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Badge, Div, FloatingBadge, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-xl">
            <FloatingBadge offset={[10, "-5%"]}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge>NEW</Badge>
            </FloatingBadge>
            <FloatingBadge offset={[10, "-5%"]}>
                <Div height="core_320" width="core_320" backgroundColor="primary-weak" />
                <Badge isIndeterminate></Badge>
            </FloatingBadge>
        </Inline>
    );
}


```

## [Props](https://hopper.workleap.design/components/FloatingBadge\#props)

offset?

`[string | number, string | number]`

The offset of the badge from the anchor component. \[horizontal, vertical\]

overlap?

`FloatingBadgeOverlap`

The wrapped shape that the badge should overlap.

_Defaults to rectangular._

placement?

`ResponsiveProp<FloatingBadgePlacement>`

The placement of the badge relative to the anchor component.

_Defaults to top right._

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## Spinner Component

Preview Only: These components are for reference only. Continue using [Orbiter](https://wl-orbiter-website.netlify.app/) in production until further notice.

# Spinner

A spinner indicates that a part of the product is currently performing a task of unknown duration.

[View source](https://github.com/workleap/wl-hopper/blob/main/packages/components/src/Spinner/src/Spinner.tsx) [View on npm](https://www.npmjs.com/package/@hopper-ui/components) [Report an issue](https://github.com/gsoft-inc/wl-hopper/issues/new?title=%F0%9F%90%9B%20[Spinner]%20-%20%3CTITLE%3E&body=Component:%20Button%0A%0AIssue%20Summary:%0A_Describe%20the%20issue%20or%20enhancement%20you%27re%20experiencing%20with%20the%20component._%0A%0ASteps%20to%20Reproduce:%0A1.%20_Step%20one..._%0A2.%20_Step%20two..._%0A%0AExpected%20Behaviour:%0A_What%20did%20you%20expect%20to%20happen?_%0A%0AActual%20Behaviour:%0A_What%20actually%20happened?_%0A%0AScreenshots%20or%20Code%20Snippet:%0A_Include%20any%20screenshots,%20GIFs,%20or%20code%20snippets%20that%20help%20explain%20the%20issue._%0A%0AEnvironment:%0A-%20Design%20System%20Version:%20_Version%20number_%0A-%20Browser%20and%20Version:%20_Browser%20and%20version%20where%20the%20issue%20occurs_%0A-%20Operating%20System:%20_OS%20and%20version_%0A%0AAdditional%20Context:%0A_Any%20other%20details%20or%20context%20related%20to%20the%20issue._)

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Spinner } from "@hopper-ui/components";

export default function Example() {
    return (
        <Spinner aria-label="Loading..." />
    );
}


```

## [Usage](https://hopper.workleap.design/components/Spinner\#usage)

### [Sizes](https://hopper.workleap.design/components/Spinner\#usage-sizes)

A spinner can vary in size.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Spinner, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="end">
            <Spinner size="sm" aria-label="Loading..." />
            <Spinner aria-label="Loading..." />
            <Spinner size="lg" aria-label="Loading..." />
        </Inline>
    );
}


```

### [Label](https://hopper.workleap.design/components/Spinner\#usage-label)

A spinner can have a label on its side.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Spinner, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="end">
            <Spinner size="sm">Loading...</Spinner>
            <Spinner>Loading...</Spinner>
            <Spinner size="lg">Loading...</Spinner>
        </Inline>
    );
}


```

### [Over Background](https://hopper.workleap.design/components/Spinner\#usage-over-background)

You can change a spinner style when over a background by setting a color property on the spinner.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

```

import { Spinner, Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div backgroundColor="primary-strong" padding="inset-md">
            <Spinner color="primary-strong">Loading…</Spinner>
        </Div>
    );
}


```

## [Props](https://hopper.workleap.design/components/Spinner\#props)

size?

`ResponsiveProp<SpinnerSize>`

What the Spinner's diameter should be.

_Defaults to md._

children?

`ReactNode`

The children of the component.

className?

`string`

The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.

style?

`CSSProperties`

The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.

### \#\#\#\# Layout

slot?

`string | null`

A slot name for the component. Slots allow the component to receive props from a parent component.
An explicit `null` value indicates that the local props completely override all props received from a parent.

### \#\#\#\# Accessibility

id?

`string`

The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).

aria-label?

`string`

Defines a string value that labels the current element.

aria-labelledby?

`string`

Identifies the element (or elements) that labels the current element.

aria-describedby?

`string`

Identifies the element (or elements) that describes the object.

aria-details?

`string`

Identifies the element (or elements) that provide a detailed, extended description for the object.

## [Migration Notes](https://hopper.workleap.design/components/Spinner\#migration-notes)

Coming from Orbiter, you should be aware of the following changes:

- The `color` props will only affect the spinner's text color and not the color of the tracks.
- Use the `variant` prop to change the color of the tracks, which offers `default`, `white` and `black` options.

## Navigation Error

# Oops

## You hopped on the wrong side of the pond

 [Back to the shore](https://hopper.workleap.design/)
