---
"@hopper-ui/tokens": major
---

This update introduces a theming system in Hopper, allowing applications to customize the appearance of Hopper components to match different brands.
Workleap application's will need to import a new CSS file for the `workleap` theme to ensure proper styling, but no changes are expected to the visual appearance.
A Sharegate theme as been introduced, but will be updated in future updates, for now it's mostly identical to the `workleap` theme.

BREAKING
- The tokens files needs to be imported from the proper theme now.
- Before : `@hopper-ui/tokens/tokens.css` and `@hopper-ui/tokens/dark/tokens.css`
- Now : `@hopper-ui/tokens/workleap/tokens.css` and `@hopper-ui/tokens/workleap/dark/tokens.css`

