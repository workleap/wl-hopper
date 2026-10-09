---
"@hopper-ui/components": patch
---

Fixed `TooltipTrigger` anchoring the tooltip to the wrong element when the trigger is a disabled React Aria component, such as a disabled `Checkbox`. `Focusable` is no longer needed as a workaround.
