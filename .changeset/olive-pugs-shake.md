---
"@hopper-ui/components": minor
"@hopper-ui/styled-system": patch
"@hopper-ui/icons": patch
---

Updated the react-aria dependency set: `react-aria` to 3.51.0, `react-aria-components` to 1.20.0, and the `@react-aria/*`, `@react-stately/*`, `@react-types/*` and `@internationalized/*` packages to their latest versions. The `react-aria` and `react-aria-components` peer ranges move to `^3.51.0` and `^1.20.0`.

Note one upstream behaviour change this brings to filterable `Select` and `MultiSelect`: react-aria-components 1.20 no longer focuses the first option when the popover opens. Autocomplete now only auto-focuses after a filter is typed, so keyboard navigation starts from the first option on the initial <kbd>ArrowDown</kbd> rather than the second.
