---
"@hopper-ui/components": patch
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
---

Add Card, Select, and Combobox component tokens for themeable branding:
- Add `comp-card` tokens for border radius, background color, border color, and box shadow across both variants (main, second-level)
- Migrate Card CSS from hardcoded semantic values to `--hop-comp-card-*` tokens
- Add `comp-select` tokens for active and hover states (background, border, text colors)
- Migrate Select and ComboBox CSS from hardcoded semantic values to `--hop-comp-select-*` and `--hop-comp-input-*` tokens.
