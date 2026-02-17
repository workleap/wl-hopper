---
"@hopper-ui/components": patch
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
---

Add Segmented Control and Switch component tokens for themeable branding:
- Add `comp-control` tokens for background and border colors across all states (default, hover, press, selected, disabled, error, focus)
- Add `comp-segmented-control` tokens for border radius, text color, icon color, and box shadow across states (default, selected)
- Add `comp-switch` tokens for border radius, track filter, track box shadow, thumb filter, background color, and icon colors across all states (default, hover, press, selected, disabled)
- Migrate SegmentedControl and SegmentedControlItem CSS from hardcoded semantic values to `--hop-comp-control-*` and `--hop-comp-segmented-control-*` tokens
- Migrate Switch CSS from hardcoded semantic values to `--hop-comp-control-*` and `--hop-comp-switch-*` tokens
