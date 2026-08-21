---
"@hopper-ui/components": patch
"@hopper-ui/styled-system": patch
"@hopper-ui/icons": patch
---

Replaced tsup with rslib as the build tool. The public API is unchanged — `exports`, `main`, `types`, `style` and `sideEffects` all resolve exactly as before, `<pkg>/index.css` still carries the full stylesheet, and the emitted JavaScript still leaves CSS out of the module graph. Two details of the output are worth knowing about:

- **Generated CSS-module class names changed.** They now read `hop-Button___3-3-0___VG0H1`, embedding the package version literally so two Hopper versions loaded on one page cannot collide. These names have always been an internal detail regenerated on every release; only code that hardcoded a generated class string is affected.
- **`index.css` is now fully self-contained.** It previously pulled in `@hopper-ui/icons` and `@hopper-ui/styled-system` through `@import` statements; those stylesheets are now inlined. It no longer needs a bundler that resolves bare package specifiers inside CSS, so it works from a plain `<link>` too. The file grows accordingly.

CSS nesting is now lowered with `:is()` rather than by duplicating selectors, which is the spec-correct lowering and matches what Storybook has been rendering all along.
