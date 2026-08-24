---
"@hopper-ui/components": patch
"@hopper-ui/styled-system": patch
"@hopper-ui/icons": patch
---

Replaced tsup with rslib as the build tool. The public API is unchanged — `exports`, `main`, `types`, `style` and `sideEffects` all resolve exactly as before, `<pkg>/index.css` still carries the full stylesheet, and the emitted JavaScript still leaves CSS out of the module graph.
