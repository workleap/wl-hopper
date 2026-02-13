---
"@hopper-ui/components": patch
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
---

Add Mark, Label component tokens and tactility shadows for themeable branding:
- Add `comp-mark` tokens for background, border, check icon colors across all states (default, hover, press, focus, selected, disabled, error)
- Add `comp-checkbox` and `comp-radio` tokens for border radius and box shadow overrides
- Add `comp-label` tokens for text and icon colors across all states (default, hover, press, selected, disabled, focus, error)
- Migrate Checkbox and Radio CSS from hardcoded semantic values to `--hop-comp-mark-*` and `--hop-comp-label-*` tokens
- Rename `inset-bevel` shadow to `tactility-button` and add `tactility-card` and `tactility-control` shadow tokens
