# Migrating from Orbiter to Hopper

Orbiter (`@sharegate/orbiter-ui`) is the previous Workleap design system. Hopper replaces it. Do not
migrate by hand — Workleap ships a codemod CLI that does the bulk of the work.

## 1. Run the migration CLI

```bash
pnpx "@workleap/migrations"@latest
```

The CLI analyses Hopper and Orbiter usage across a codebase and applies automated transformations
(Orbiter → Hopper, OV → Hopper). It can also produce usage reports and a migration plan before you
change anything, which is worth doing on a large codebase.

Full documentation, including every command and flag:
<https://github.com/workleap/wl-design-systems-migrations>

Point it at the narrowest scope that makes sense — a file or a folder — rather than the whole
repository in one pass.

## 2. Review what it produced

The codemod is deliberately conservative and leaves markers behind:

- **`Migration TODO` comments** in the code. Work through each one.
- **`migration-notes.md`**, if generated. Read it; it explains the decisions the tool could not make.
- **Missing components.** If a component did not migrate because Hopper does not have it yet, check
  whether a newer Hopper version does and update the packages before working around it.

## 3. Finish the components the tool skipped

`references/guides/orbiter-to-hopper-mapping.md` lists every Orbiter component and its Hopper
equivalent, including the ones Hopper does not have yet.

For each component the CLI left alone, read `references/components/<Name>.md`. Component docs
include migration notes where the Orbiter and Hopper APIs diverge. Map the props by hand from there.

## 4. Bring the result up to Hopper standards

A mechanical migration produces working code, not idiomatic code. Before calling it done:

- Replace any surviving raw HTML elements, `className` and `style` with Hopper components and style
  props.
- Replace hardcoded values with tokens — see `references/tokens/README.md`.
- Prefer semantic tokens over core tokens.
- Check the `UNSAFE_*` whitelist in `references/guides/validation-rules.md`; the codemod may have
  produced `UNSAFE_` props that are not needed.

Then validate:

```bash
node scripts/validate-hopper-code.mjs <migrated files>
```
