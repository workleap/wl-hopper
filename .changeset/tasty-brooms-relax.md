---
"@hopper-ui/components": patch
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
---

Add Button component tokens for themeable branding:
- Add `comp-button` tokens for all variants: primary, secondary, upsell, danger, ghost-primary, ghost-secondary, ghost-danger, and disabled states
- Migrate Button and ToggleButton CSS from hardcoded semantic values to `--hop-comp-button-*` tokens.
