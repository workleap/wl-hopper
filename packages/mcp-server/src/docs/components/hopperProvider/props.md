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
