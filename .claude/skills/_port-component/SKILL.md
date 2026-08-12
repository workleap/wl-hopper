---
name: port-component
description: Port a new component into the Workleap Hopper design system (wl-hopper repo) from its React Spectrum S2 implementation. Use whenever the user wants to add, create, build, scaffold, or implement a brand-new Hopper component — especially when they name a React Spectrum / React Aria component to base it on. Trigger on phrasings like "port ActionBar from S2", "add a new Hopper component for X", "implement the RAC Toolbar in Hopper", "build a Hopper version of Tree", "we need a X component, base it on react-spectrum", or any request naming an Adobe React Spectrum / react-aria-components component that doesn't exist yet under packages/components/src/. Trigger on the name the user happens to use, whether that's Hopper's intended name or S2's/RAC's — these frequently differ (Hopper Divider is RAC Separator, Hopper Accordion is RAC DisclosureGroup, Hopper Callout is S2 InlineAlert), and the skill resolves the mapping itself. Not for editing or extending a component that already exists in Hopper — this skill is for brand-new components only.
---

# Port a component from React Spectrum S2 into Hopper

You are porting a component from Adobe's [React Spectrum S2](https://github.com/adobe/react-spectrum/tree/main/packages/%40react-spectrum/s2) into the Hopper design system (`wl-hopper` monorepo). S2 is always the reference implementation, even for components that also exist in plain `react-aria-components` — S2 is what a designer means when they name a component, and it's usually a more complete API than the bare RAC primitive. Your job is to reproduce the component's behavior and API shape using Hopper's own conventions: `useStyledSystem`, CSS modules, DTCG tokens, and the docs/stories/tests structure every other Hopper component follows.

This is a long job. Work through it **phase by phase, stopping for the user's review after each phase** — don't barrel through to a finished PR in one shot.

## Phase 0 — Guard: is this actually a new component?

Before anything else:

```bash
ls packages/components/src/ | grep -i "<kebab-name>"
grep -i "<PascalName>" packages/components/src/index.ts
```

If a directory or export already exists, **stop** and tell the user this skill only handles brand-new components — extending an existing one is a different job.

**A name miss is not proof of absence.** Because Hopper names diverge from S2/RAC (see Phase 1), the component may already exist under a different name — Hopper's `Divider` would not be found by grepping for RAC's `Separator`. So when the user names an S2/RAC component and the grep comes back empty, also check whether an existing Hopper component already *wraps* that primitive:

```bash
grep -rn "<RACPrimitiveName>" packages/components/src/*/src/*.tsx
```

If something already wraps it, stop and tell the user what you found rather than building a duplicate under a second name.

## Phase 1 — Research the S2 reference

### First: resolve the name

**Hopper's name for a component often differs from S2's and RAC's, and S2's often differs from RAC's.** Hopper tends to name by *purpose*, RAC by *mechanism*. Real examples in this repo:

| Hopper | RAC / S2 primitive it's built on |
|---|---|
| `Divider` | RAC `Separator` |
| `Accordion` | RAC `DisclosureGroup` |
| `SegmentedControl` | RAC `ToggleButtonGroup` |
| `Alert` | RAC `Dialog` + `DialogTrigger` |
| `ErrorMessage`, `HelperMessage` | RAC `FieldError` |
| `Callout` | S2 `InlineAlert` |
| `Select` | S2 `Picker` → RAC `Select` |

So there are up to **three** names in play, and a name that doesn't resolve means nothing about whether the component exists. Never conclude "S2 doesn't have this" from a failed fetch of a guessed name.

Resolve it before fetching anything:

1. **Try the literal name** the user gave, at both the S2 and RAC paths.
2. **If that misses, search rather than guess.** List the S2 source directory and the vendored RAC references to see the real inventory — both are cheap:
   ```bash
   ls .claude/skills/react-aria/references/components/
   ```
   plus a WebFetch of `https://github.com/adobe/react-spectrum/tree/main/packages/%40react-spectrum/s2/src` for the S2 file list.
3. **Match on behavior and anatomy, not on the name** — what it renders, what states it has, what it's for. A Hopper "Callout" and an S2 "InlineAlert" are the same component wearing different labels.
4. **State the mapping explicitly** and carry it into Phase 2's proposal: *"Hopper `X` ← S2 `Y` ← RAC `Z`."* If you can't confidently resolve it, ask the user which S2/RAC component they have in mind rather than porting the wrong thing.

Once resolved, the **Hopper name governs everything on the Hopper side** — directory, component name, `GlobalXCssSelector`, CSS classes, token namespace, docs page, story title. The S2/RAC name appears only in two places: the URLs you fetch, and the `as RACX` import aliases in the implementation.

### Then: gather the sources

Layer the sources — each is optional, but do them in this order:

1. **S2 source (required).** WebFetch the real implementation, using the **S2 name** resolved above (not the Hopper name). This is the only place it lives:
   ```
   https://raw.githubusercontent.com/adobe/react-spectrum/main/packages/@react-spectrum/s2/src/<S2Name>.tsx
   ```
   Also fetch its sibling `stories/<S2Name>.stories.tsx` and any `docs/<S2Name>.mdx` in the same S2 package — they reveal the intended anatomy and states. If the fetch 404s, go back to the name-resolution steps before concluding anything; if the network itself fails, tell the user and ask them to paste the source rather than guessing at the API.

2. **RAC primitive reference (use it).** The `react-aria` skill ships 94 component references at `.claude/skills/react-aria/references/components/<Primitive>.md`, checked into this repo — no network needed. Read the one(s) matching what S2 wraps (e.g. ActionBar wraps Toolbar; ComboBox wraps a Popover + ListBox). This is your source for render props, `data-*` attributes, and keyboard/a11y behavior.

3. **Exact prop types (bonus, best-effort).** If `node_modules/react-aria-components` is present (pinned at `1.13.0` in `packages/components/package.json`), read its `.d.ts` for exact prop signatures. Skip silently if absent — never block on this layer.

Trace the full dependency chain — note every RAC primitive and every sub-component S2 pulls in (e.g. ActionBar → Toolbar, entry/exit animations, collection rendering). Report this chain to the user before moving on.

## Phase 2 — Propose the Hopper API, then get the visual spec → **stop here for review**

Present, in plain terms:

- **The name mapping** — *"Hopper `X` ← S2 `Y` ← RAC `Z`"* — and, when the Hopper name is yours to choose rather than given, the name you propose and why. Hopper names by purpose; prefer the word a designer would use over the mechanism RAC exposes. Get this confirmed before building: the name is baked into the directory, CSS classes, token namespace, and the public export, so renaming later touches every file.
- The proposed `<X>Props` surface, mapped against S2's props (what's kept, renamed, or dropped and why).
- Sub-components and slots (e.g. `Tag` + `TagGroup`, or `Avatar` + `AvatarGroup`).
- Sizes and variants, if S2 has them — but note that Hopper's actual scale, spacing, and colors cannot come from S2, since S2 uses Spectrum's design language, not Hopper's.
- Which docs `section` (directory under `apps/docs/content/components/`) and which `category` (frontmatter value) it belongs to — see `references/docs-stories-tests.md` for the list; these are two different axes and often don't match (e.g. `Tag.mdx` lives in `status/` but declares `category: "collections"`).

Then **ask the user for the visual spec** — a Figma link, or a description of sizes/variants/states/spacing — and wait for it. Do not invent colors, spacing, or sizing values; S2 cannot supply them and guessing produces tokens that need to be redone.

Do not proceed to Phase 3 until the user has responded to both the API proposal and the visual-spec request.

## Phase 3 — Build source, CSS, and tokens → **stop here for review**

Read `references/file-layout.md` for where every file goes, `references/component-anatomy.md` for the exact `.tsx` patterns (the `useContextProps` → `useStyledSystem` → `cssModule` chain, props conventions, exports), and `references/css-and-tokens.md` for the CSS module conventions.

For component tokens specifically: **invoke the `_update-tokens` skill** rather than hand-rolling the DTCG JSON yourself — it already owns the token format, brand-symmetry rules (Workleap + ShareGate), and the token changeset. Feed it the visual spec from Phase 2.

Build everything in Phase 3 as one unit — don't stage another checkpoint mid-phase, even for a large port like ActionBar. Present the finished `.tsx` / `.module.css` / token diffs together.

## Phase 4 — Docs, stories, tests, i18n, changeset → **stop here for review**

Read `references/docs-stories-tests.md` in full and follow it for:

- The MDX docs page under `apps/docs/content/components/<section>/<PascalName>.mdx`
- Storybook chromatic stories under `tests/chromatic/<PascalName>.stories.tsx`
- Vitest unit + SSR tests under `tests/vitest/`
- i18n strings in **both** `packages/components/src/i18n/intl/en-US.json` and `fr-CA.json` if the component needs any localized strings (aria-labels, warnings, etc.)
- A changeset in `.changeset/`

## Phase 5 — Verify

Run, in this order, and fix anything that fails before reporting done:

```bash
pnpm doc:generate      # regenerates apps/docs/examples/Preview.ts and apps/docs/datas/ — gitignored, don't commit
pnpm lint              # turbo: eslint, stylelint, typecheck, syncpack
pnpm test              # vitest
pnpm build:tokens      # only if token files changed
```

Then a visual pass:

- Launch Storybook (`pnpm storybook`) and actually look at the new stories in the browser, in both light and dark, both brands. Report what you saw, not just that it built.
- Run the axe accessibility check locally, per `contributing/components.md`: `pnpm storybook-nolazy` in one terminal, `pnpm test-storybook` in another. This is local-only and not part of CI.

Report the outcome of each check plainly. Don't claim the component "works" from lint/tsc alone — say explicitly whether you visually verified it.

## Pitfalls to actively prevent

- **Concluding a component doesn't exist because the name didn't match** — in either direction. A 404 on the S2 URL usually means the S2 name differs, not that S2 lacks the component; an empty grep of `packages/components/src/` doesn't rule out an existing Hopper component wrapping the same primitive under another name.
- **Letting the S2/RAC name leak onto the Hopper side** — the directory, `GlobalXCssSelector`, CSS classes, `comp-<name>` token namespace, docs filename, and story title all use the *Hopper* name. The S2/RAC name belongs only in fetch URLs and `as RAC<Primitive>` import aliases.
- **Forgetting `pnpm doc:generate`** — `<PropTable>` and `<Example>` on the docs page render empty with no build error.
- **Multiple components in one `export` statement** (e.g. `export { _ComboBox as ComboBox, ListBoxItem as ComboBoxItem }`) — `react-docgen-typescript` cross-wires props from one component onto another in the generated docs table. Always assign and export separately; see `contributing/components.md`.
- **Tokens added to only one brand** — Workleap-only tokens leave ShareGate falling back to unstyled or wrong values. `_update-tokens` defaults to both; don't override that without the user explicitly scoping it.
- **Borrowing another component's `--hop-comp-<other>-*` token** instead of defining one in this component's own token file — breaks encapsulation (see repo `CLAUDE.md`).
- **Style properties (`fontWeight`, `color`, etc.) set directly in a `SlotProvider`/context object** instead of in the CSS module — see repo `CLAUDE.md`.
- **Hand-writing `:hover`/`:focus` CSS** instead of RAC's `[data-hovered]`/`[data-focus-visible]` attribute selectors — misses keyboard-vs-pointer distinctions RAC already handles.
- **Committing gitignored generated output** — `apps/docs/datas/` and `apps/docs/examples/Preview.ts` are regenerated by `pnpm doc:generate`; don't `git add` them.
- **Adding a `## Migration Notes` section with no Orbiter predecessor** — only add it if an equivalent Orbiter component actually existed; several current Hopper components correctly omit this section entirely.
- **Skipping the visual-spec gate** — proceeding to CSS/tokens without an explicit spec from the user produces values that have to be redone later.

## References

- `references/file-layout.md` — directory/file structure a new component needs, and every registry file that must be updated
- `references/component-anatomy.md` — the `.tsx` implementation patterns: props, the styled-system chain, className/style composition, context, exports
- `references/css-and-tokens.md` — CSS module selector conventions, two-tier CSS variables, RAC data-attribute states, and how the token step defers to `_update-tokens`
- `references/docs-stories-tests.md` — MDX docs page frontmatter and section order, Storybook story shape, vitest test shape, changeset format
