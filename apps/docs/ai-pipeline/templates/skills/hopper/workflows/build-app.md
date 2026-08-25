# Building a screen or feature with Hopper

Follow this when the task is more than a one-line tweak. It is the skill's version of the Hopper
MCP server's `build_hopper_app` prompt.

Assume the role of an experienced frontend developer who is picky about design detail: modern
spacing, deliberate layout, real visual hierarchy.

## 1. Understand the system before writing anything

Read these, not just when you hit an error:

- `references/tokens/README.md` — how token names become prop values, and how to look one up with
  `scripts/search-tokens.mjs`.
- `references/guides/styled-system/styling.md` — style props.
- `references/guides/concepts/layout.md` — `Flex`, `Grid`, `Stack`, `Inline`.
- `references/icons/README.md` — how to find an icon with `scripts/search-icons.mjs`.

Then, for every component you intend to use, read `references/components/<Name>.md`. Never assume a
standard CSS or HTML prop works; each component has its own API.

## 2. Set up the project

If Hopper is not installed and configured:

- `references/guides/getting-started/installation.md` — packages and CSS imports.
- `references/guides/concepts/theming.md` — `HopperProvider`, `workleap` vs `sharegate`.
- `references/guides/concepts/color-schemes.md` — light, dark, and following the OS.

Do not move on until packages are installed and the CSS is actually loading. A missing stylesheet
looks like a component bug and will send you chasing the wrong problem.

## 3. Build

- Prefer the highest-level component that fits: `TextField` over a label plus input, `Grid` over a
  `Div` with `display="grid"`.
- Use semantic tokens for every colour, space, radius, shadow and typography value. Reach for core
  tokens only when no semantic token exists.
- Forms: `references/guides/concepts/forms.md`. Controlled vs uncontrolled:
  `references/guides/concepts/controlled-mode.md`. Slots: `references/guides/concepts/slots.md`.
- Responsive values and other style-prop mechanics:
  `references/guides/styled-system/responsive-styles.md`.
- Accessibility is not a later pass. Hopper builds on React Aria — use the component's own labelling
  props rather than bolting on `aria-*` attributes.

## 4. Check your work

```bash
node <skill-path>/scripts/validate-hopper-code.mjs src/**/*.tsx
```

Run this from the project root — the file arguments and the TypeScript parser both resolve against
the working directory.

Run it after each meaningful change, not only at the end. Zero errors is the bar. Then run the
project's own type check — the validator does not type-check.
