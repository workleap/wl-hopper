---
name: update-tokens
description: Add, update, delete, or deprecate design tokens (core, semantic, or component) in the Workleap Hopper design system (wl-hopper repo). Use whenever the user wants to introduce, modify, rename, change a reference of, remove, or phase out a design token — colors, spacing, shape/border-radius, typography/fonts, elevation, motions, or any per-component token like Button, Tag, Badge, etc. Trigger whenever the user mentions tokens, design tokens, semantic tokens, component tokens, asks to add/change a CSS variable like `--hop-*`, asks to tweak a value in any `*.tokens.json` file, or shares a Figma variables / token-table screenshot. Also trigger when the user says things like "make the danger color stronger", "add a new spacing value", "the ShareGate Button font is wrong", "introduce a rounded-xm token", "deprecate this color", "delete the old palette tokens", or "here's the token table from Figma" — these are all token operations even when the user doesn't say the word "token".
---

# Hopper Design Tokens — Add / Update Workflow

You are helping someone change design tokens in the [wl-hopper](https://github.com/workleap/wl-hopper) monorepo. Tokens live in three layers (core → semantic → component), each referencing the one below. Your job is to translate a design intent into the right edits across the right files, run the build and validation, and add a changeset — autonomously, so the user doesn't have to think about the mechanics.

## Who you're working with

The person invoking this skill is **usually a designer**, not an engineer. They know the design system intimately, but may not be fluent in `pnpm`, `git`, changesets, generated files, or which validation commands to run. Behave accordingly:

- **Handle dev mechanics autonomously.** Run `pnpm install` (if needed), `pnpm build:pkg`, lint, tsc, and tests yourself. Don't ask "should I run the build?" — just run it, then report pass/fail in plain language.
- **Ask clarifying questions in design terms**, not file paths. Instead of "do you want to edit `semantic/sharegate/dark/colors.tokens.json`?", ask "should this also apply to ShareGate, and to dark mode as well as light?".
- **Report results in design terms.** "The new border radius `rounded-1-5` (6px) is available across both brands" beats "added `1_5` entry to `core/shape.tokens.json` and the build regenerated the styled-system mapping".
- **Don't assume git or Jira knowledge.** If a ticket ID wasn't mentioned, just leave it out — don't ask. Stage files yourself when relevant; don't make the designer think about git.
- **Surface design implications proactively.** If a token they're changing is referenced by many components, say so before making the change — the designer may not know the blast radius.
- **Keep dev jargon out of replies** unless the designer brings it in. Talk about "the danger color", "the button background", "rounded corners" — not "the `comp-button.danger.background` token reference".

Engineers using this skill benefit from the same behavior — explicit scoping and automatic validation are good for both audiences. This persona note is about tone and autonomy, not technical depth: the workflow rules below still apply in full.

## How to start a token conversation

Before any file edit, use this opening pattern:

1. **Restate what you understood** in design language so they can correct any misreading.
   *"Got it — you'd like a new 6px border-radius, sitting between the existing 4px and 8px values."*
2. **State your plan in one sentence**: which layer, which brand/theme scope, and any non-obvious decision you're about to make.
   *"I'll add this as a core token (brand-agnostic), named `1_5` to fit the existing numeric scale."*
3. **Ask at most one clarifying question** if scope or intent is genuinely ambiguous. If it's clear, just proceed.

Then execute autonomously. The designer wants the change done with a single check-in if needed, not a multi-step Q&A.

## When the designer provides a screenshot of a token table

Designers may share a screenshot of a token table exported from Figma variables. Names or values in that table can differ slightly from the repository token names.

- Treat the screenshot as intent input and map it to the closest real token(s) in the repo.
- Use surrounding context (category, brand, theme, component usage, and neighboring values) to resolve naming differences.
- If confidence is low or multiple mappings are plausible, pause and ask one clarifying question before editing.

Do not guess when ambiguous. A quick clarification is better than shipping the wrong token mapping.

## The three token layers

| Layer | Path | Purpose | References |
|---|---|---|---|
| **Core** | `packages/tokens/src/tokens/core/*.tokens.json` | Brand-agnostic primitives: raw colors, base spacing, border-radii, font sizes, motions, elevation | none (raw values) |
| **Semantic** | `packages/tokens/src/tokens/semantic/{workleap,sharegate}/{light,dark}/*.tokens.json` | Brand- and theme-specific aliases like `danger-surface`, `neutral-text`, `status.option6.text` | references **core** via `{path.to.token}` |
| **Component** | `packages/tokens/src/tokens/components/{workleap,sharegate}/<comp>.tokens.json` | Per-component values, namespaced `comp-<name>` (e.g., `comp-button`, `comp-tag`) | references **semantic** (preferred) or core |

**Picking the right layer** — translate the designer's intent into a layer:
- "Add a 12px border-radius" or "I want a new spacing size" → **core** (a new raw value everyone can use)
- "We need a softer red for danger" or "Add a selected state for the danger surface" → **semantic** (a new named slot in the brand's palette)
- "The ShareGate Button text feels too big at medium size" → **component** (a per-component tweak)
- "Make the Danger button use the Rose palette in ShareGate" → **multi-layer** cascade across core + semantic + component. PRs like this are normal — see `references/multi-layer-example.md`.

When in doubt, pick the **highest layer that solves it**. Adding a new core token to fix a one-off component issue pollutes the shared vocabulary that all components draw from.

### Prefer semantic references in component tokens — especially for colors

Component tokens should reference **semantic** tokens, not core tokens, whenever the value should adapt between light and dark mode. Semantic tokens are theme-aware by definition (one entry in `semantic/<brand>/light/`, another in `semantic/<brand>/dark/`); core tokens are raw values that look the same in both themes.

This matters most for **colors**. A component token like `comp-button.background: {primary.surface}` adapts automatically when the user switches themes. A component token like `comp-button.background: {rock.500}` (a core color) stays the same in dark mode and will look wrong.

If a designer asks for a color in a component token and the right semantic alias doesn't exist yet, **flag it to them**: "I can add this, but I'd recommend creating a semantic token first so it adapts to dark mode — want me to do that?". Don't silently wire a core color into a component without surfacing the trade-off.

Non-color properties (spacing, border-radius, font-size, etc.) are less affected since they typically don't change between themes — referencing a core token there is usually fine.

## Brand symmetry rules

Hopper ships two brands (Workleap, ShareGate) and two themes (light, dark). When in doubt, ask the designer in plain terms: "should this apply to ShareGate too, and to dark mode as well as light?" — don't surface file paths. Then apply this default:

- **Core tokens**: brand-agnostic. One file. No symmetry needed.
- **Semantic tokens**: brand × theme. Default to editing **all four** (workleap light + dark, sharegate light + dark) unless the designer scoped it. After confirming, just do it — don't keep asking per-file.
- **Component tokens**: brand-specific. Default to editing **both** brand files unless they explicitly said "ShareGate only" / "Workleap only".

Asymmetric edits are sometimes correct (the recent ShareGate Button font fix touched only sharegate). Don't force symmetry blindly — but if you end up editing only one side, briefly mention it in your reply so the designer can correct you.

## Token JSON format

Every leaf has `$type` and `$value`:
```json
{
    "border-radius": {
        "2_5": {
            "$type": "borderRadius",
            "$value": 12
        }
    }
}
```

**`$type` values actually used in this repo** — match what neighbors use, never invent a new one:

- **Color & gradient**: `color`, `gradient`
- **Shape & spacing**: `borderRadius`, `border`, `marginSize`, `paddingSize`, `size`, `topOffset`, `bottomOffset`
- **Typography**: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textCase`, `textTransform`
- **Motion**: `duration`, `timingFunction`
- **Visual effects**: `shadow`, `backdropFilter`

Don't use `boxShadow`, `cubicBezier`, `dimension`, `number`, or `string` — none of these appear in this repo and using them will produce incorrect output.

**References use curly braces and dot notation** to navigate the nested JSON:
```json
"$value": "{status.option6.text-disabled}"   // ✅ correct — dots between nested objects
"$value": "{status.option6-text-disabled}"   // ❌ wrong — flattens what should be nested
```

Within a leaf category, individual property names use dashes (`text-disabled`, `surface-hover`, `border-strong`). The dot/dash distinction is: **dot = traverse a nested object**, **dash = leaf property name**.

Common nested categories where this matters:
- `status.{progress|positive|caution|negative|neutral|inactive|option1-6}.{property}`
- `decorative.{option1-9}.{property}`
- `font.weight.{125-525}` and typography scales like `body.{sm|md|lg}.{font-size|line-height|...}`

Before writing a reference, **open the referenced file and confirm the path exists** with that exact structure. A typo in a reference name does not fail the build loudly — it just produces a broken CSS variable.

### Two special-case patterns

**Empty `$type` to pass a literal value through without conversion.** When the value is a CSS keyword or other unsupported format that the build pipeline would otherwise try to convert (e.g., `"normal"` for letter-spacing, `"auto"` for a dimension), set `$type` to an empty string:

```json
"text-font-letterspacing-md": {
    "$type": "",
    "$value": "normal"
}
```

This tells the token pipeline "ship this value verbatim, don't try to interpret it".

**Empty `$value` to make the token undefined in output.** When the token should be intentionally absent — so it falls back to the consumer's default or simply isn't applied — keep the proper `$type` but set `$value` to an empty string:

```json
"box-shadow": {
    "$type": "shadow",
    "$value": ""
}
```

The output CSS variable will be undefined. Use this for component variants that intentionally suppress a property the base variant defines (e.g., a flat button variant that opts out of the elevation shadow).

## File and style conventions

- **Indent**: 4 spaces (every token file in the repo uses this)
- **Strings**: double quotes
- **Property order within a token entry**: `$type` then `$value`
- **Insertion order**: place new entries near their numeric/semantic neighbors so the file stays readable (e.g., `2_5` goes between `2` and `3`, not at the end)
- **Component file namespace**: top-level key is `comp-<component-name>` (e.g., `comp-button`, `comp-tag`, `comp-segmented-control`)

### Naming new tokens

Match the existing scale. **Always look at neighbors before inventing a name:**

- **Numeric scales** (border-radius, spacing): insert into the existing scheme. Neighbors `1`, `2`, `3` → use `1_5` for a value between 1 and 2 (underscore for fractional). Neighbors `100`, `200`, `300` → use `150`. Don't invent a parallel naming scheme.
- **Named t-shirt scales** (sizes, weights): use the existing pattern (`xs / sm / md / lg / xl`, or `25 / 50 / 75 / 100`, or whatever the file uses). Don't mix.
- **Semantic and component tokens**: name describes purpose, not value. Prefer `danger-surface-weak-selected` to `red-light-1`. State suffixes typically read `-hover`, `-press`, `-selected`, `-disabled` and are appended in that order.

If the designer suggests a name that doesn't fit the established pattern, surface the convention and propose the conventional alternative — don't silently rename their suggestion.

## The workflow — do these in order, autonomously

The designer should mostly experience this as "I asked for a change → it's done and validated". You drive the mechanics; only surface a question when something requires their judgment.

1. **Identify the layer** internally (core, semantic, or component). Only ask if it's genuinely ambiguous from their intent — and ask in plain language, e.g., "Should this be a new shared color, or only for the Button component?".
2. **Confirm brand/theme scope** in plain language if not already clear. Don't read file paths out loud.
3. **Read the target file(s)** to match `$type`, naming, ordering, and reference style of the surrounding entries.
4. **For references**: open the file the reference points into and confirm the path exists. A typo here causes a silent broken CSS variable later.
5. **Make the edits.** Match indentation, $type, and where in the file the new entry belongs (numeric order, alphabetical, or grouped with siblings).
6. **Run the build** — `pnpm build:pkg`. This regenerates `packages/styled-system/src/tokens/generated/styledSystemToTokenMappings.ts` and other generated files. **Never hand-edit anything under `generated/`**; the build owns it. Build failing = a token name or reference is wrong; fix and rebuild.
7. **Run validation**: `pnpm lint`, `pnpm tsc --noEmit`, `pnpm test` (in parallel when possible). Treat `pnpm test` as a key safety check: it often catches when a token update was forgotten in another theme or when token file structure is incorrect. If anything genuinely related to your edit fails, fix it. If a pre-existing unrelated failure appears (e.g., lint warnings in `.claude/settings.local.json`), note it briefly and move on — don't pretend the change broke something it didn't.
8. **Add a changeset** (see next section). Do this yourself; the designer doesn't need to think about it.
9. **Stage the changes** (`git add`) — token JSONs, the changeset, regenerated files. **Don't commit** unless the designer explicitly asks. Just summarize what's staged at the end so they can review and decide.

When you report back, lead with the design outcome ("Added a new `rounded-1-5` border radius at 6px, available in both brands") and only mention validation/build details if something failed or is worth flagging.

### What to say at the end

Close with two short bits so the designer knows their options and what to verify.

**Next git step** — make it clear they don't have to figure out git themselves, but don't push or open a PR uninvited:

> "Everything is staged locally. If you'd like to ship this, just say so and I'll commit and open a PR. Otherwise the change is ready for you to preview/test."

**Visual review** — point them at the design review surfaces (in plain language, no setup instructions):

- Storybook is the place to eyeball the change once implementation runs locally.
- If a PR gets created, Chromatic will show the visual diff — ask them to confirm nothing looks wrong in either Workleap or ShareGate (light and dark).
- They approve once both Storybook and Chromatic look good.

## Deleting or deprecating tokens

If the designer asks to remove a token, first check references across semantic and component token files before deleting anything. List all consumers and confirm with the designer before proceeding.

Deletion is a breaking change. Use a `major` bump unless the token is confirmed unused.

If deprecation is preferred, keep the token and add a clear deprecation note instead of removing it immediately.

## Changesets

Every token change needs a changeset. Create `.changeset/<some-name>.md` (pick any unused kebab-case slug — e.g., `bright-pandas-jump.md`). Format:

```markdown
---
"@hopper-ui/tokens": patch
"@hopper-ui/styled-system": patch
"@hopper-ui/components": patch
---

<one-line or bullet summary of the change>
```

**All three packages get a `patch` bump together** — tokens always cascade. Default to `patch` for both additions and updates; for the add/update operations this skill covers, `patch` is almost always the right call. Use `minor` or `major` only when the designer explicitly asks for it.

**Why all three?** The packages depend on each other in a chain:
- `@hopper-ui/tokens` owns the source-of-truth token JSON definitions.
- `@hopper-ui/styled-system` is built **from** tokens — it generates the `--hop-*` CSS variables and the styled-system prop mappings (`packages/styled-system/src/tokens/generated/`).
- `@hopper-ui/components` consumes styled-system and references CSS variables in component styles.

A change to a token in the first package propagates through both downstream packages, so all three need a synchronized version bump for consumers to pick up the change cleanly.

The body should describe **what changed**, not how. Style examples from real PRs:
- "Added a new core border-radius token `--hop-border-radius-2-5` (12px)."
- "Fix the Button medium font-size, line-height, and letter-spacing for ShareGate"
- Multi-item changes use a bullet list (see the Danger/Status PR for the pattern)

If a `.changeset/<name>.md` for the same logical change already exists on the branch, update that one — don't create a second.

## Commit message style (only when the designer explicitly asks you to commit)

Default behavior is **don't commit** — just stage and summarize. If the designer says "commit it" or similar, match this pattern:

- `feat: add rounded-xm shape token (12px) [SGPLTD-1743]`
- `fix: ShareGate Button medium font tokens [SGPLTD-1189]`
- `feat(tokens): update Danger and Status semantic tokens [SGPLTD-2049]`

The `[SGPLTD-XXXX]` Jira tag is the team's convention. If the designer didn't mention a ticket ID, **leave it off rather than asking** — engineers can add it later if needed. Don't pester them about it.

## Pitfalls to actively prevent

These are the mistakes you must catch yourself — the designer can't be expected to:

- **Reference path typos**: silent failure — the build doesn't error, but the CSS variable resolves to empty. Always cross-check by opening the referenced file.
- **Editing generated files**: anything under a `generated/` folder is regenerated by `pnpm build:pkg` and will be wiped. Most commonly affected file: `packages/styled-system/src/tokens/generated/styledSystemToTokenMappings.ts`. Never hand-edit it.
- **Forgetting a brand or theme file** when editing semantic tokens — default is to edit all four, only skip after explicit scoping.
- **Forgetting the other brand** for component tokens — default is to edit both.
- **Wrong `$type`**: e.g., setting `$type: "color"` on a value like `"12px"`. Always match sibling entries' type.
- **Missing changeset**: PR CI will fail without one. Always add one yourself.
- **Asking the designer to choose between `patch`/`minor`/`major`**: default to `patch` for all three packages. Use `minor`/`major` only on explicit instruction.

## References

- `references/multi-layer-example.md` — walkthrough of a typical multi-layer change (core → semantic → component cascade)
- `references/file-map.md` — quick map of which token file holds what

When you're unsure about which file holds a category, grep first:
```bash
grep -r "danger-surface" packages/tokens/src/tokens/
```
