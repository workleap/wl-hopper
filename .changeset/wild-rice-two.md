---
"@hopper-ui/styled-system": major
"@hopper-ui/components": major
---

This update introduces a theming system in Hopper, allowing applications to customize the appearance of Hopper components to match different brands.
Workleap application's will need to import a new CSS file for the `workleap` theme to ensure proper styling, but no changes are expected to the visual appearance.
A Sharegate theme as been introduced, but will be updated in future updates, for now it's mostly identical to the `workleap` theme.

BREAKING
- You need to import the css files for the themes you want to support in your application (@hopper-ui/styled-system/theme/workleap.css)
- The `HopperProvider` component now accepts a `theme` that needs to match the selected theme. The default theme is `workleap` but the CSS file is still required to be imported.

