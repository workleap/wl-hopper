---
"@hopper-ui/components": minor
"@hopper-ui/icons": patch
---

Added support for `allowsEmptyCollection` prop on `MultiSelect` and `Select`. This allows the dropdown to open even when there are no items, enabling consumers to render empty states inside the listbox via `listBoxProps.renderEmptyState`. Requires upgrading `react-aria-components` peer dependency to `^1.14.0`.
