---
"@hopper-ui/styled-system": major
"@hopper-ui/components": major
"@hopper-ui/tokens": minor
---

- Added theme-able typography support for the `Button` component via new `comp-button-text-*` tokens (font, font-weight, text-transform, and per-size font-size / line-height / letter-spacing)
- Added a new `caption` semantic typography scale (`xl`, `lg`, `md`, `sm`) for both Workleap and ShareGate (light and dark)
- Added `md` and `xs` sizes for `accent` semantic typography scale (Workleap and ShareGate)
- Added `accent.md` and `accent.xs` semantic typography sizes (Workleap and ShareGate)
- Added new core `font.size` tokens: `100` (10px)
- Added new core `line-height` tokens: `1-1666`, `1-40`
- Added a new core `letter-spacing` token category with `dense-10`, `dense-5`, `0`, `wide-5`, `wide-10`, `wide-15`, `wide-20`, `wide-25`, `wide-30`
- Added `letterSpacing` styled-system prop support backed by the new `letter-spacing` core scale, plus a matching `UNSAFE_letterSpacing` escape hatch
- **BREAKING**: the `letterSpacing` styled-system prop is now restricted to values from the new `letter-spacing` core scale. Consumers passing raw CSS values (e.g. `"2px"`, `"3.5px"`) must migrate to `UNSAFE_letterSpacing` or use a token from the scale.
