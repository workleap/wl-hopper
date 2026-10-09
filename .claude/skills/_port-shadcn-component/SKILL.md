---
name: port-shadcn-component
description: Port a component into @hopper-ui/shadcn-extension from the shadcn/ui React Aria registry (wl-hopper repo). Use when the user wants a component that shadcn/ui has and Hopper does not — phrasings like "port the shadcn Slider", "add Carousel from shadcn", "we need a shadcn-style Rating", "a designer wants the shadcn Calendar", or any request naming a shadcn/ui component alongside Hopper. Also trigger when the user asks for a component that does not exist under packages/components/src/ and explicitly does not want to wait for a full Hopper port. NOT for porting from React Spectrum S2 into @hopper-ui/components — that is the `_port-component` skill, and it is the right one whenever the component is meant to become a real Hopper component.
---

# Port a component from the shadcn React Aria registry

You are adding a component to `@hopper-ui/shadcn-extension` (`packages/shadcn-extension/`). The
source is shadcn/ui's **React Aria base**, and the job is mechanical on purpose: copy the structure,
keep the API untouched, and rewrite the Tailwind as token-backed CSS.

Read [ADR 0010](../../../docs/adr/0010-shadcn-flavoured-extension-package.md) and
`packages/shadcn-extension/AGENTS.md` before you start. This package inverts several repo-wide
conventions and the rest of `AGENTS.md` will actively mislead you here.

**Pick the right skill.** If the component is meant to become a real Hopper component with Hopper's
API conventions, style props and component tokens, use `_port-component` instead. This skill is for
the cheap path: a component Hopper lacks, shipped as shadcn's.

Work phase by phase and **stop for the user's review where marked**.

## Phase 0 — Guard: enforce the no-overlap invariant

A component name lives in exactly one package. Check both:

```bash
ls packages/components/src/ | grep -i "<kebab-name>"
grep -rn "<PascalName>" packages/components/src/index.ts packages/shadcn-extension/src/index.ts
```

If it already exists in `@hopper-ui/components`, **stop**. The consumer should use that one, and
shipping a second is the one thing ADR 0010 forbids outright.

Hopper names by purpose and shadcn by mechanism, so an empty grep is not proof. Check whether an
existing Hopper component already wraps the same React Aria primitive under a different name:

```bash
grep -rn "<RACPrimitiveName>" packages/components/src/*/src/*.tsx
```

## Phase 1 — Fetch the registry source

The registry URL shape is:

```
https://ui.shadcn.com/r/styles/aria-nova/<name>.json
```

`aria` is the base and **`nova` is this package's house style** — do not port from another style.
The documented `/r/<name>.json` and `/r/aria/<name>.json` shapes both 404; only the
`/r/styles/aria-<style>/` form resolves.

Take `.files[0].content` from that JSON. That is the **distributed** form, with Tailwind utilities
flattened out of the `cn-*` classes — it is what you want. The GitHub authoring form at
`https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/bases/aria/ui/<name>.tsx`
keeps the semantic `cn-*` classes, which you would then have to resolve against
`apps/v4/registry/styles/style-nova.css` yourself. Fetch it only as a cross-check.

If the fetch fails, ask the user to paste the source. Never reconstruct it from memory — you will
invent props that do not exist.

Also read the React Aria reference for the primitive it wraps. The `react-aria` skill ships them
checked in, no network needed:

```bash
ls .claude/skills/react-aria/references/components/
```

And read the real prop types from `node_modules`, which is where the truth lives:

```bash
d=$(ls -d node_modules/.pnpm/react-aria-components@*/node_modules/react-aria-components | head -1)
cat "$d/dist/types/src/<Primitive>.d.ts"
```

## Phase 2 — Report the API, then → **stop for review**

Present:

- Every export, and whether the component is **closed** (structure baked in, like Slider) or open.
- The full prop surface, and what shadcn changed versus raw React Aria — usually almost nothing.
- Anything shadcn **drops** from the React Aria anatomy, and the consequence. Slider drops `Label`
  and `SliderOutput`, which makes `aria-label` or `aria-labelledby` mandatory. Say so explicitly;
  the user may decide the omission is unacceptable for that particular component.
- The Tailwind-to-token mapping you intend, as a table. shadcn's theme variables map roughly:

  | shadcn | Hopper |
  | --- | --- |
  | `--primary` | `--hop-primary-surface-strong` |
  | `--muted` | `--hop-neutral-surface-weak` |
  | `--border`, `--input` | `--hop-neutral-border` |
  | `--ring` | `--hop-primary-border-focus` |
  | `--background` | `--hop-neutral-surface` |
  | `--foreground` | `--hop-neutral-text` |
  | `rounded-full` | `--hop-shape-pill` / `--hop-shape-circle` |
  | a literal `bg-white` | `--hop-neutral-surface`, never `#fff` |

  Treat these as a starting point, not a lookup table. The semantic slot grid is **irregular** —
  `primary` has no `border-hover`, `success`/`warning`/`information` have about nine tokens each.
  Verify each name exists before using it; do not generate `{family}-{slot}-{state}` combinations.

Do not proceed until the user has responded.

## Phase 3 — Build → **stop for review**

Layout, mirroring `packages/shadcn-extension/src/slider/`:

```
src/<component>/
  index.ts                         # export * from "./src/index.ts";
  src/index.ts                     # export * from "./<Name>.tsx";
  src/<Name>.tsx
  src/<Name>.module.css
  docs/<component>/*.tsx           # one file per docs example, default-exporting `Example`
```

Add the barrel to `src/index.ts` at the package root.

### The `.tsx`

- Import the React Aria primitives with a `RAC` prefix, exactly as shadcn imports them.
- Keep shadcn's prop type verbatim, with two corrections: omit `children` when the component supplies
  its own render function and would discard it, and export the props type.
- Compose classes with `clsx`. **Two classes per element**: the hashed module class, which carries
  the rules, and the unhashed `hop-<Name>__element` string, which is a public hook. Export each
  unhashed name as a `Global<Name>...CssSelector` constant.
- Keep shadcn's `data-slot` attributes.
- Keep shadcn's attribute order — `className`, then `data-slot`, then `{...props}` — so a consumer
  can still override `data-slot`.
- Plain function component: no `forwardRef`, no `displayName`. React Aria 1.20 takes `ref` as a prop.
- One export per statement. Grouped exports cross-wire props in `react-docgen-typescript` output.

### The `.module.css`

- Wrap the **entire file** in `@layer hopper-shadcn-extension { … }`. This is what makes a consumer's
  `className` win. Without it the package's styling contract is a coin flip on stylesheet order.
- Declare geometry as `--hop-<Name>-*` locals on the root class, and document them in the MDX.
  Nothing goes into `packages/tokens`.
- Stylelint over `packages/**/*.css` will reject `px` (Tailwind's rem output is already fine —
  `size-3` is `0.75rem`; a `1px` border becomes the sanctioned `0.0625rem` hairline), enforce
  `hop-ComponentName__element--modifier` class names and `hop-ComponentName-*` custom properties,
  and require **logical properties** — `inline-size`, `block-size`, `inset-block-start`.
- Use React Aria's `data-*` attributes for state, never CSS pseudo-classes. This is not a style
  preference: React Aria moves focus to a visually hidden input inside the interactive element, so
  shadcn's `focus-visible:` and `disabled:` rules on the wrapper silently never match.

  | shadcn | Hopper |
  | --- | --- |
  | `hover:` | `[data-hovered]` |
  | `focus-visible:` | `[data-focus-visible]` |
  | `active:` | `[data-dragging]`, `[data-pressed]` |
  | `disabled:`, `data-disabled:` | `[data-disabled]` |

- **Check what React Aria already sets inline before writing a rule.** Inline styles beat classes, so
  a Tailwind class duplicating them is dead weight. For Slider, `SliderFill` gets
  `position`/`insetInlineStart`/`width`/`height` inline and `SliderThumb` gets
  `position: absolute`, the offset and a `translate(-50%, -50%)` — so their layout utilities port to
  nothing at all. Grep the compiled source:

  ```bash
  d=$(ls -d node_modules/.pnpm/react-aria-components@*/node_modules/react-aria-components | head -1)
  grep -n "defaultStyle\|position: 'absolute'" "$d/dist/private/<Primitive>.mjs"
  ```

- Drop dead upstream declarations rather than porting them faithfully, and say which ones you dropped.

## Phase 4 — Docs and changeset → **stop for review**

- `apps/docs/content/shadcn-extension/components/<PascalName>.mdx`. Frontmatter is `title`,
  `description`, `order`. Model it on `Slider.mdx`: the anatomy table of Hopper selectors versus
  shadcn slots, a labelling note if the component drops `Label`, usage examples, the custom-property
  table, and `<PropTable component="<PascalName>" />`.
- **Examples take the package prefix**: `<Example src="shadcn-extension/<component>/docs/<component>/preview" />`.
  Without it `generatePreviewRef.ts` resolves the path into `packages/components` and the preview
  renders empty.
- Examples may use `@hopper-ui/components` for layout, but **never pass a style prop to an extension
  component** — it has none. Wrap it in a `Stack` instead. Non-token sizes on a Hopper wrapper need
  `UNSAFE_width`, not `width`.
- Lead with a correctly labelled example if the component has no built-in label.
- Add the route to `apps/docs/ai-pipeline/ai-docs.config.tsx` only if you created a new subsection;
  the existing `shadcn-extension` route already globs `content/shadcn-extension`. The
  `shadcn-extension/index.md` merge list is explicit — add the new page to it.
- Add a changeset.

## Phase 5 — Verify

```bash
pnpm exec turbo run build typecheck stylelint --filter=@hopper-ui/shadcn-extension
pnpm doc:generate
pnpm lint
pnpm --filter=docs test     # asserts every skills.config pattern has an ai-docs route
pnpm build:doc
```

Then look at it. `pnpm doc:start`, open
`http://localhost:3000/shadcn-extension/components/<PascalName>`, and check:

1. Colours resolve — unresolved `var()`s mean the subtree escaped `HopperProvider`.
2. Keyboard interaction and a visible focus indicator.
3. Light and dark, which is what proves you tokenized instead of hardcoding.
4. A consumer `className` with a competing declaration actually wins, which proves the `@layer`.

Report what you saw. Do not call it working on the basis of a green build.

## Pitfalls to actively prevent

- **Porting a component that already exists in `@hopper-ui/components`.** The no-overlap invariant is
  the load-bearing rule of this package.
- **Using this skill for something that should be a real Hopper component.** If the answer is "this
  should have Hopper's API", it is `_port-component`.
- **Reaching for a Hopper convention out of habit** — `useStyledSystem`, `StyledComponentProps`,
  `UNSAFE_*`, `cssModule()`, a `--hop-comp-*` token. None of them belong here.
- **Forgetting the `@layer` wrapper.** Everything still looks right locally and the override contract
  is quietly broken.
- **Porting `focus-visible:` / `disabled:` as pseudo-classes.** They will not match, and it will look
  fine until someone tabs to the component.
- **Inventing a semantic token name.** The slot grid is irregular; grep the generated CSS.
- **Omitting the `shadcn-extension/` prefix on an `<Example src>`.** Silently empty preview.
- **Renaming a prop to match Hopper's conventions.** ADR 0007 does not apply here, and the whole
  value of the package is that React Aria's documentation stays correct.
- **Adding a convenience prop shadcn does not have.** Once you start designing the API, the cheap
  path is gone.
- **Committing generated output** — `apps/docs/datas/` and `apps/docs/examples/Preview.ts` are
  gitignored.
