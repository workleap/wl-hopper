---
"@hopper-ui/components": patch
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
---

Add Input component tokens for themeable branding:
- Add `-comp-field` tokens for background, border, text, icon, placeholder, and prefill colors across all states (default, hover, focus, disabled, error)
- Migrate Input, InputGroup, TextArea, TextField, SearchField, NumberField, and RemainingCharacterCount CSS from hardcoded semantic values to `--hop-comp-field-*` tokens.
