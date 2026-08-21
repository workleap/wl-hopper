---
"@hopper-ui/components": patch
"@hopper-ui/styled-system": patch
"@hopper-ui/icons": patch
---

Replaced tsup with rslib as the build tool. The public API is unchanged — `exports`, `main`, `types`, `style` and `sideEffects` all resolve exactly as before — but the shape of the emitted `dist` changes in three ways worth knowing about:

- **Generated CSS-module class names changed.** They now read `hop-Button___3-3-0___VG0H1`, embedding the package version literally so two Hopper versions on one page cannot collide. These class names have always been an internal detail regenerated on every release; only code that hardcoded a generated class string is affected.
- **The emitted JavaScript now imports its own CSS.** Previously all styles reached you only through `<pkg>/index.css`. With the bundleless output each module imports the stylesheet it needs, so a bundler pulls in the CSS for the components you actually use. `<pkg>/index.css` is still published and still contains the full stylesheet, so nothing breaks — but importing it *and* consuming the components now delivers those rules twice. You can drop the `index.css` import to get only the CSS you use.
- **`index.css` is now fully self-contained.** It no longer relies on `@import` statements pointing at sibling packages, so it works without a bundler that resolves bare specifiers in CSS.

CSS nesting is now lowered with `:is()` rather than by duplicating selectors, which is the spec-correct lowering and matches what Storybook has been rendering.
