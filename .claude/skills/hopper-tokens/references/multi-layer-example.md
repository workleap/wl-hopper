# Multi-layer token change — worked example

This walks through a realistic multi-layer change so you can recognize the pattern and follow the same shape on similar work.

## Example: "Update the Danger semantic tokens to use the Rose palette in ShareGate, and update the ShareGate Danger button accordingly"

This kind of request cascades through all three layers. Drawing the dependency tree first prevents missed edits.

### Step 1 — what changes at each layer?

- **Core** (`core/colors.tokens.json`): the `rose` palette may need new shades or tweaked values to support the new Danger usage. Tokens like `rose.300`, `rose.500`, `rose.600`.
- **Semantic** (`semantic/sharegate/{light,dark}/colors.tokens.json`): the `danger.*` block — `danger-surface`, `danger-surface-hover`, `danger-text`, `danger-border`, etc. — should now reference `{rose.X}` instead of whatever it used before. The full set of states (`-hover`, `-press`, `-selected`, `-disabled`, `-weak`, `-strong`) must be considered together. Also adjust dependent status tokens (`status.negative.*`) if they were aliased to Danger.
- **Component** (`components/sharegate/button.tokens.json`): `comp-button.danger.*` — background may switch from solid to a gradient (`linear-gradient(...rose.300...rose.600)`), hover/press states updated similarly, box-shadow inset adjusted. Look at how the `primary` variant in the same file is structured for the gradient pattern.

### Step 2 — order of operations

1. Read each file you'll touch end-to-end first. Understand the current shape before changing it.
2. Edit core first (so the values exist), then semantic (so the aliases resolve), then component (so it picks up the semantic).
3. Mirror to the dark theme **at the same time** as light when editing semantic — easy to forget the dark file otherwise.
4. After each layer's edits, you can run `pnpm build:pkg` to catch broken references early — but a final build at the end is what matters.
5. Validation: `pnpm lint && pnpm tsc --noEmit && pnpm test`.
6. **One changeset** for the whole cascade, with a bullet list summarising each layer's change. Example:
   ```
   - Updated "rose" core color tokens
   - Added `danger-surface-weak-selected` semantic token (Workleap and ShareGate, light and dark)
   - Updated ShareGate Danger semantic tokens to use the Rose palette
   - Updated ShareGate Status semantic tokens (Neutral, Progress, Positive, Caution, Inactive, Option1–6)
   - Updated ShareGate Button Danger component tokens: ...
   ```

### Step 3 — symmetry sanity check before finishing

Run this mental checklist:

- Did I touch a semantic token in `light` but forget `dark` (or vice versa)? Grep the token name across both folders.
- Did I update a component token in one brand but forget the other? If the user explicitly scoped to one brand (e.g., "ShareGate only"), that's fine — note it in the changeset body so it's visible.
- Did the build succeed? Did `styledSystemToTokenMappings.ts` regenerate?
- Are there any new tokens whose CSS variable name (`--hop-...`) the user might expect to see documented or wired into a component? (Out of scope for this skill, but worth flagging to the user.)

## When the change is single-layer

Most changes aren't multi-layer. A pure "add a new core spacing token" is one file plus one changeset. Don't manufacture cross-layer work that isn't needed — the user will tell you if downstream wiring matters for their case.
