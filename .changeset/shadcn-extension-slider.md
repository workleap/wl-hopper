---
"@hopper-ui/shadcn-extension": major
---

Initial release. `@hopper-ui/shadcn-extension` ports components from the shadcn/ui React Aria registry and paints them with Hopper semantic tokens, filling the gap when a design calls for a component shadcn has and Hopper does not.

It differs from `@hopper-ui/components` on two axes, both deliberate: the API is React Aria's verbatim, and styling goes through `className` rather than style props. A component name lives in exactly one package — if it exists in `@hopper-ui/components`, use that one. See [ADR 0010](https://github.com/workleap/wl-hopper/blob/main/docs/adr/0010-shadcn-flavoured-extension-package.md).

Ships one component:

- `Slider` — a port of shadcn's `nova` Slider. A single closed component with no `Label` or `SliderOutput`, so it takes `aria-label` or `aria-labelledby`.

Requires a `HopperProvider` ancestor: the `--hop-*` properties are declared on a version-stamped root class, not on `:root`.
