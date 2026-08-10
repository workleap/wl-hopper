# Figma frame to Hopper JSX

Generate a JSX implementation of a Figma frame using Hopper components, with visual and structural
fidelity. This is the skill's version of the Hopper MCP server's `generate_code_from_figma_design`
prompt.

It assumes the Figma MCP server is available for `#get_design_context` and `#get_screenshot`. Those
are Figma's tools, not Hopper's — everything Hopper-specific below is a file in this skill.

Open with a short checklist (5-10 bullets) of what you are about to do, conceptual not
implementation-level.

## 1. Extract

- Use `#get_screenshot` to see the frame and map what you see onto Hopper components.
- Use `#get_design_context` mainly for styling values — colours, sizes, fonts — not for structure.
- **Preserve every string from Figma exactly.** Do not rewrite copy.

## 2. Before writing any code

Do not start implementing until all three maps below exist and you have shown them.

### 2.1 Component map

Map every `data-name` attribute from `#get_design_context` to a Hopper component, a Hopper icon, or
a preserved product asset, following `references/guides/figma-conventions.md`.

- Prefer higher-level, semantic components: `TextField` over `HtmlInput`, `Grid` over `Div`.
- Product icons, logos, images and avatars are **preserved exactly as delivered**. List every
  occurrence with its image URL.

### 2.2 Token map

Extract every unique token name from the `#get_design_context` response and record its `propValue`:

```bash
node scripts/search-tokens.mjs --name hop-neutral-text --name hop-space-stack-md
```

### 2.3 CSS value map

Extract every unique raw CSS value (`16px`, `24px`, `2rem`, `400`, `#3C3C3C`, …) and find the token
that already covers it — for example `16px` → `core_160`:

```bash
node scripts/search-tokens.mjs --css 16px --css 24px --css "#3C3C3C" --with-css-values
```

A raw value that maps to a token must use the token. Add `--theme sharegate` or `--scheme dark` when
the frame targets those.

### 2.4 Icons

Resolve every icon by search, never by guessing a name:

```bash
node scripts/search-icons.mjs --limit 5 "close" "chevron down"
```

## 3. Implement

- Use tokens for every value that has one. Never use `UNSAFE_` for a value a token covers.
- Semantic over core, always. `gap="core_80"` is wrong when a semantic spacing value exists.
- Check `references/guides/validation-rules.md` for the complete `UNSAFE_*` whitelist before using
  the prefix. A prop that is not on that list — `position`, `overflow`, `cursor`, `opacity`, `left`,
  `top`, `inset` — is used without it.
- Implement every product asset from your map. None may be dropped.
- Re-run `#get_screenshot` and compare against your result. Iterate until it matches.

## 4. QA

- [ ] Every `UNSAFE_*` prop used is on the whitelist.
- [ ] Every icon matches the `data-name` it came from.
- [ ] Every product icon, logo, image and avatar from the design is present.
- [ ] No core token used where a semantic token exists.
- [ ] Visual comparison against the Figma screenshot — colour-perfect and pixel-perfect. If a
      browser automation tool is available, snapshot the rendered result and diff it.
- [ ] The project's TypeScript compilation passes with zero errors.
- [ ] `node scripts/validate-hopper-code.mjs <files>` reports **zero errors**. This is the gate;
      if anything remains, fix it and re-run.

## Output

The complete JSX implementation. No commentary, no validation report.
