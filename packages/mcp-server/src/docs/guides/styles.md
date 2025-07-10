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

## Concepts

# Style Props

Hopper components are designed to be consistent across all Workleap applications. They include built-in styling that has been considered carefully, and extensively tested. In general, customizing Hopper is discouraged, but most components do offer control over layout and other aspects. In addition, you can use Hopper's tokens to ensure your application conforms to design requirements, and is adaptive across color schemes.

## [Style props](https://hopper.workleap.design/styled-system/concepts/styling\#style-props)

A Hopper style property is a mapping of a CSS property to a component property. With style props, Hopper let you easily set style values for a curated set of CSS properties like font-size, margin, padding, width and many more.

All of the available style props are listed in the ["Properties List"](https://hopper.workleap.design/styled-system/concepts/styling#properties-list) section below.

### [Usage](https://hopper.workleap.design/styled-system/concepts/styling\#style-props-usage)

To use a style prop on a Hopper component, pass the prop as a camelCased string to the component.
By default, only tokens are accepted as values for style props. They help promote consistency and maintainability across your application.

If you need to pass a custom value, you can use the `UNSAFE_` prefix to bypass the token system. You can refer to the ["Escape hatches"](https://hopper.workleap.design/styled-system/concepts/styling#Escape-hatches) section for more information.

```

import { Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            fontSize="body-lg"
            fontWeight="body-lg"
            paddingTop="inset-md"
            paddingBottom="inset-md"
            marginBottom="stack-lg"
            color="neutral"
            borderRadius="rounded-md"
            backgroundColor="primary"
        >
            Style properties are fun.
        </Div>
    );
}


```

### [Shorthands](https://hopper.workleap.design/styled-system/concepts/styling\#style-props-shorthands)

Props like border and paddingX are also provided to help you save keystrokes. An exhaustive list of all the supported props is available in the ["Properties List"](https://hopper.workleap.design/styled-system/concepts/styling#properties-list) section.

```

import { Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div paddingY="inset-md" border="primary">
            Shorthands.
        </Div>
    );
}


```

### [Responsive styles](https://hopper.workleap.design/styled-system/concepts/styling\#style-props-responsive-styles)

All style props support responsive values. You can pass an object with breakpoints as keys and values as values to a style prop to set different values for different breakpoints. More information is available in the [Responsive Styles article](https://hopper.workleap.design/styled-system/concepts/responsive-styles).

### [Escape hatches](https://hopper.workleap.design/styled-system/concepts/styling\#style-props-escape-hatches)

While we encourage teams to utilize Hopper styles as it is, we do realize that sometimes product specific customizations may be needed. In these cases, we encourage you or your designers to talk to us. We may be able to suggest an alternative implementation strategy, or perhaps your design can help inform future Hopper additions.

While the traditional className and style props are always supported in Hopper components, we also provide an escape hatch for passing custom values to style props. This is done by prefixing the prop name with `UNSAFE_`.

The `UNSAFE_` prefix might look scary, but it's there to remind you that you're bypassing the token system. It's a way to ensure that you're aware that you're doing something that might not be automatically updated when tokens change.
It will also help you to search for these usages when you want to update them, or help us to provide missing tokens.

```

import { Div } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            UNSAFE_fontSize="1.5rem"
            UNSAFE_fontWeight="500"
            UNSAFE_paddingTop="14px"
            UNSAFE_paddingBottom="15rem"
            UNSAFE_marginBottom="12px"
            UNSAFE_color="#FFFFFF"
            UNSAFE_borderRadius="12px"
            UNSAFE_backgroundColor="#000000"
        >
            Style properties are fun.
        </Div>
    );
}


```

### [Pseudo-classes](https://hopper.workleap.design/styled-system/concepts/styling\#style-props-pseudoclasses)

Style props doesn't support every CSS pseudo-classes. [Location pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#location_pseudo-classes), [input pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#the_input_pseudo-classes), [tree-structural pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#tree-structural_pseudo-classes), ::before and ::after are not supported and will most likely never be.

When a CSS pseudo-class is not supported by Hopper style props, we recommend using a CSS class.

Since the following user action pseudo-classes are often used, some style props support them. These behaves like their pseudo CSS counterparts.

| Suffix | Pseudo state |
| --- | --- |
| active | :active |
| hover | :hover |
| focus | :focus |

Not all style props support user action pseudo-classes. Find out which props support user action pseudo-classes in the ["Properties List"](https://hopper.workleap.design/styled-system/concepts/styling#properties-list) section.

## [Properties List](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list)

The following tables provide a list of all available style props by category.

### [Space](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-space)

```hd-code

<Div padding="inset-md">
    Hopper
</Div>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| margin | margin | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginTop | margin-top | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginBottom | margin-bottom | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginRight | margin-right | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginLeft | margin-left | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginX | margin-left & margin-right | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| marginY | margin-top & margin-bottom | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| padding | padding | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingTop | padding-top | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingBottom | padding-bottom | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingRight | padding-right | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingLeft | padding-left | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingX | padding-left & padding-right | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| paddingY | padding-top & padding-bottom | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| whiteSpace | white-space | none | breakpoints |

### [Color](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-color)

```hd-code

<Div backgroundColor="primary-weak" color="neutral">
    Hopper
</Div>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| color | color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| backgroundColor | background-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| opacity | opacity | none | breakpoints & focus/hover/active |
| fill | fill | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover |
| stroke | stroke | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints |
| filter | filter | none | breakpoints |

### [Typography](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-typography)

```hd-code

<Header letterSpacing="0.3rem">Hopper</Header>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| fontSize | font-size | [Typography](https://hopper.workleap.design/tokens/semantic/typography) | breakpoints |
| fontWeight | font-weight | [Typography](https://hopper.workleap.design/tokens/semantic/typography) | breakpoints |
| lineHeight | line-height | [Typography](https://hopper.workleap.design/tokens/semantic/typography) | breakpoints |
| letterSpacing | letter-spacing | none | breakpoints |
| textAlign | text-align | none | breakpoints |
| textTransform | text-transform | none | breakpoints |
| textDecoration | text-decoration | none | breakpoints |
| textOverflow | text-overflow | none | breakpoints |
| wordBreak | word-break | none | breakpoints |
| fontStyle | font-style | none | breakpoints |

### [Layout](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-layout)

```hd-code

<Div UNSAFE_width="30rem">
    Hopper
</Div>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| width | width | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| height | height | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| minWidth | min-width | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| maxWidth | max-width | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| minHeight | min-height | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| maxHeight | max-height | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| display | display | none | breakpoints |
| verticalAlign | vertical-align | none | breakpoints |
| overflow | overflow | none | breakpoints |
| overflowX | overflow-x | none | breakpoints |
| overflowY | overflow-y | none | breakpoints |
| gap | gap | none | breakpoints |
| alignSelf | align-self | none | breakpoints |
| aspectRatio | aspect-ratio | none | breakpoints |
| justifyContent | justify-content | none | breakpoints |
| justifyItems | justify-items | none | breakpoints |
| justifySelf | justify-self | none | breakpoints |
| contentVisibility | content-visibility | none | breakpoints |
| transform | transform | none | breakpoints |
| transformOrigin | transform-origin | none | breakpoints |
| transformStyle | transform-style | none | breakpoints |

### [Flex Layout](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-flex-layout)

```hd-code

<Div alignItems="center">
    <Text>Tree frog</Text>
    <Text>Pond frog</Text>
</Div>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| alignItems | align-items | none | breakpoints |
| alignContent | align-content | none | breakpoints |
| flex | flex (shorthand) | none | breakpoints |
| flexBasis | flex-basis | none | breakpoints |
| flexDirection | flex-direction | none | breakpoints |
| flexFlow | flex-flow | none | breakpoints |
| flexGrow | flex-grow | none | breakpoints |
| flexShrink | flex-shrink | none | breakpoints |
| flexWrap | flex-wrap | none | breakpoints |
| order | order | none | breakpoints |

### [Grid Layout](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-grid-layout)

```hd-code

<Div gridAutoFlow="row dense">
    <Text>Tree frog</Text>
    <Text>Pond frog</Text>
</Div>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| grid | grid (shorthand) | none | breakpoints |
| gridArea | grid-area | none | breakpoints |
| gridAutoColumns | grid-auto-columns | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| gridAutoFlow | grid-auto-flow | none | breakpoints |
| gridAutoRows | grid-auto-rows | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| gridColumn | grid-column | none | breakpoints |
| gridColumnEnd | grid-column-end | none | breakpoints |
| gridColumnSpan | grid-column-span | none | breakpoints |
| gridColumnStart | grid-column-start | none | breakpoints |
| gridRow | grid-row | none | breakpoints |
| gridRowEnd | grid-row-end | none | breakpoints |
| gridRowSpan | grid-row-span | none | breakpoints |
| gridRowStart | grid-row-start | none | breakpoints |
| gridTemplate | grid-template | none | breakpoints |
| gridTemplateAreas | grid-template-areas | none | breakpoints |
| gridTemplateColumns | grid-template-columns | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| gridTemplateRows | grid-template-rows | [Dimensions](https://hopper.workleap.design/tokens/core/dimensions) | breakpoints |
| columnGap | column-gap | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| rowGap | row-gap | [Spacing](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |

### [Background](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-background)

```hd-code

<Div
  backgroundImage="url('/images/dog.png')"
  backgroundPosition="center"
  backgroundRepeat="no-repeat"
/>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| backgroundImage | background-image | none | breakpoints |
| backgroundPosition | background-position | none | breakpoints |
| backgroundRepeat | background-repeat | none | breakpoints |
| backgroundSize | background-size | none | breakpoints |

### [Border](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-border)

```hd-code

<Div
    border="primary"
    borderRadius="rounded-md"
>
    Tree frog
</Div>

```

Border props (border, borderBottom, borderTop, borderRight, borderLeft) uses an implicit style (solid) and width(1px). These properties only accepts colors for value.

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| border | border-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| borderBottom | border-bottom-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| borderTop | border-top-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| borderLeft | border-left-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| borderRight | border-right-color | [Colors](https://hopper.workleap.design/tokens/semantic/color) | breakpoints & focus/hover/active |
| borderRadius | border-radius | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| borderTopLeftRadius | border-top-left-radius | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| borderTopRightRadius | border-top-right-radius | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| borderBottomLeftRadius | border-bottom-left-radius | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| borderBottomRightRadius | border-bottom-right-radius | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints |
| outline | outline | none | breakpoints & focus |

### [Position](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-position)

```hd-code

<Div
    top="12px"
    position="absolute"
/>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| position | position | none | breakpoints |
| top | top | none | breakpoints |
| bottom | bottom | none | breakpoints |
| right | right | none | breakpoints |
| left | left | none | breakpoints |
| zIndex | z-index | none | breakpoints |
| objectFit | object-fit | none | breakpoints |
| objectPosition | object-position | none | breakpoints |

### [Shadow](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-shadow)

```hd-code

<Div
    boxShadow="lifted"
/>

```

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| boxShadow | box-shadow | [Shape](https://hopper.workleap.design/tokens/semantic/space) | breakpoints & focus/hover/active |

### [Miscellaneous](https://hopper.workleap.design/styled-system/concepts/styling\#properties-list-miscellaneous)

| Prop | CSS property | Scale | Supports |
| --- | --- | --- | --- |
| content | content | none | breakpoint |
| cursor | cursor | none | breakpoint & hover |
| pointerEvents | pointer-events | none | breakpoint |
| resize | resize | none | breakpoint |
| willChange | will-change | none | breakpoint |

# Responsive Styles

## [Introduction](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#introduction)

In addition to static values, all style props support object syntax to specify different values for the prop depending on a responsive breakpoint. Breakpoints are named following t-shirt sizing, and correspond to common device resolutions.

### [Example](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#introduction-example)

A `Div` with a default background color overridden at each breakpoint. Resize your browser window to see this in action.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No Preview

```

import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            backgroundColor={{
                base: "core_moss-200",
                xs: "core_sapphire-200",
                sm: "core_moss-200",
                md: "core_sapphire-200",
                lg: "core_rock-200",
                xl: "core_sunken-treasure-200"
            }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Resize the window to see the background color change!</Text>
        </Div>
    );
}


```

## [Breakpoints](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#breakpoints)

In addition to the base, there are five breakpoints inspired by typical device resolutions.

| Name | Media query |
| --- | --- |
| base | min-width: 0px |
| xs | min-width: 640px |
| sm | min-width: 768px |
| md | min-width: 1024px |
| lg | min-width: 1280px |
| xl | min-width: 1440px |

## [Mobile-first](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#mobilefirst)

Hopper uses a mobile-first breakpoint system, similar to those in frameworks like Bootstrap and Tailwind.

Don't use `sm:` to target mobile devices

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No Preview

```


import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            // This will only center text on screens 768px and wider, not on small screens
            backgroundColor="primary"
            textAlign={{ sm: "center" }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Text Content</Text>
        </Div>
    );
}


```

Use `base` to target mobile devices

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No Preview

```


import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            // This will center text on mobile, and left align it on screens 768px and wider
            backgroundColor="primary"
            textAlign={{ base: "center", sm: "left" }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Text Content</Text>
        </Div>
    );
}


```

It’s often best to start with the mobile first layout for a design, then add styles as the screen size increases, moving from small to larger screens.

## [Utility Methods](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#utility-methods)

### [useResponsiveValue](https://hopper.workleap.design/styled-system/concepts/responsive-styles\#utility-methods-useresponsivevalue)

To resolve a responsive value within a React component, Hopper provides a `useResponsiveValue` hook.

[Open in Stackblitz](https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx)

No Preview

```


import { Div, useResponsiveValue } from "@hopper-ui/components";

export default function Example() {
    const isFluidValue = useResponsiveValue({ base: true, lg: false });

    return (
        <Div
            UNSAFE_width={isFluidValue ? "100%" : "30rem"}
            backgroundColor="core_moss-200"
            maxWidth="100%"
            padding="inset-md"
        >
            Content
        </Div>
    );
}


```

# HTML Elements

Hopper provides a set of HTML element components already configured with Hopper styled system. You should choose these components over native HTML elements.

`<A>`, `<Address>`, `<Article>`, `<Aside>`, `<HtmlButton>`, `<Div>`, `<HtmlFooter>`, `<HtmlHeader>`, `<Img>`, `<Input>`, `<List>`, `<Main>`, `<Nav>`, `<Section>`, `<Span>`, `<Table>`

For text elements, prefer a `<Text>` or `<Paragraph>` component rather than `<Span>` or a `<Div>`.

## [Create missing HTML elements](https://hopper.workleap.design/styled-system/concepts/html-elements\#create-missing-html-elements)

Hopper only re-export the most used HTML elements. If you need to use a less common HTML element, you can create a custom component using the `htmlElement` function.

```hd-code

import { htmlElement } from "@hopper-ui/components";

const HtmlUnderline = htmlElement("u");

```

# Custom Components

Sometimes, you may find yourself needing to build a component that doesn't exist in Hopper, but this component would benefit from using Hopper's style props.

There are 2 ways to build a custom component with Hopper style properties, as seen below:

### [HTML Element](https://hopper.workleap.design/styled-system/concepts/custom-components\#html-element)

Instead of using a native HTML element to create your component, you can use one of the Hopper HTML Element components. This way, you can simply forward the style props to the component.

This is an example using a `Div`, but you can use any of the HTML Element components.

```

import { Div, type DivProps } from "@hopper-ui/components";

interface MyCustomComponentProps extends Omit<DivProps, "children"> {
    // your custom props here
}

function MyCustomComponent(props: MyCustomComponentProps) {
    return (
        <Div {...props} >
            My Custom component
        </Div>
    );
}

export default function Example() {
    return (
        <MyCustomComponent
            paddingY="inset-md"
        />
    );
}


```

### [useStyledSystem](https://hopper.workleap.design/styled-system/concepts/custom-components\#usestyledsystem)

If you need to build a more complex component, you can use the `useStyledSystem` function. This function allows you to create a custom component with Hopper style props.

The `useStyledSystem` function returns a `stylingProps` object containing a resulting style object and a className. You can then spread the `stylingProps` object on your component, or merge them with your existing className and style properties.

We don't automatically merge the `className` and `style` props because most of the className and style props in Hopper also accept a function.

```

import { type DivProps, useStyledSystem } from "@hopper-ui/components";

interface MyCustomComponentProps extends Omit<DivProps, "children"> {
    // your custom props here
}

function MyCustomComponent(props: MyCustomComponentProps) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, style } = ownProps;

    const classNames = `${stylingProps.className} ${className}`;
    const mergedStyles = { ...stylingProps.style, ...style };

    return (
        <div style={mergedStyles} className={classNames} >
            My Custom component
        </div>
    );
}

export default function Example() {
    return (
        <MyCustomComponent
            paddingY="inset-md"
        />
    );
}


```
