---
"@hopper-ui/icons": patch
---

Added focus-visible styles to icons. Icons are not intended to be focusable, but since some product codebases use them as focusable elements, a consistent focus ring using the design system's focus token is now applied on `:focus-visible`, replacing the default browser outline.
