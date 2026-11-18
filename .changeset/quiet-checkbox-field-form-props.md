---
"@hopper-ui/components": patch
---

Stop `CheckboxField` from forwarding the `isFluid` and `necessityIndicator` props it inherits from a parent `Form` to its DOM element, which made React warn about unknown DOM props.
