# Hopper Design System

Hopper is Workleap's React design system. It ships as `@hopper-ui/components`,
`@hopper-ui/styled-system`, `@hopper-ui/tokens`, `@hopper-ui/icons` and `@hopper-ui/svg-icons`,
and supports two themes (`workleap`, `sharegate`) in light and dark mode.

**Read the reference file for a component before you use it.** Hopper components do not accept
arbitrary HTML or CSS props — each has its own API, and guessing produces code that compiles and
looks wrong.

## Non-negotiable rules

1. **No raw HTML elements.** `<div>`, `<span>`, `<button>`, `<p>`, `<h1>`, `<a>`, `<img>`, `<table>`
   and friends are rejected. Use the Hopper component, or `Div`/`Span` when you genuinely need a
   plain element. For anything else, use the `htmlElement` helper.
2. **No `className` and no `style`.** Both props are prohibited. Style with Hopper's style props.
3. **No emojis as icons.** Use `@hopper-ui/icons`, and find the name with
   `node scripts/search-icons.mjs <query>` — never invent one.
4. **Token names are not prop values.** `hop-neutral-text` is the token; the prop value is
   `neutral`. Look it up with `node scripts/search-tokens.mjs --name hop-neutral-text` — see
   `references/tokens/README.md` for the other lookups.
5. **Prefer semantic tokens over core tokens.** `gap="core_80"` is wrong when a semantic spacing
   value exists. Core tokens are raw values with no dark-mode or theming behaviour.
6. **`UNSAFE_` is a last resort.** Only for props on the whitelist in
   `references/guides/validation-rules.md`, and only for custom values no token covers. A prop
   that is not on that list is used _without_ the prefix. Percentages and CSS keywords
   (`auto`, `inherit`, `fit-content`, …) never need it.
7. **Layout components need more than one child.** `Stack`, `Inline`, `Flex`, `Grid`, `Div` and
   `Box` wrapping a single child is almost always a mistake.

## Running the scripts

Every `scripts/…` and `references/…` path in this skill is relative to the directory holding this
file. **Run the scripts from the user's project root, not from that directory** — file arguments
resolve against the working directory, and so does the validator's search for a TypeScript parser.
Prefix the script with the skill's path:

```bash
node <skill-path>/scripts/search-icons.mjs --limit 5 delete
```

The scripts read their own data from the skill directory, so they work from any working directory.
The examples below drop the prefix for readability.

## Workflow

1. Not installed yet? Follow `references/guides/getting-started/installation.md`, then wrap the app
   in `HopperProvider` (`references/guides/concepts/theming.md`) and set up light/dark
   (`references/guides/concepts/color-schemes.md`). Do not write components until the CSS is wired up.
2. Pick components from `references/components/index.md`.
3. Read `references/components/<Name>.md` for each one. Read `references/api/<Name>.json` only when
   you need an exact prop type or default.
4. Resolve every value and icon name with the scripts before writing them:

   ```bash
   node scripts/search-tokens.mjs --name hop-neutral-text   # or --css 16px
   node scripts/search-icons.mjs --limit 5 delete
   ```

5. Validate what you wrote:

   ```bash
   node scripts/validate-hopper-code.mjs path/to/Component.tsx
   ```

   It exits non-zero when there are errors. Fix them all and re-run — do not consider the task done
   while any remain. If the script cannot find a parser it will say so; in that case check your code
   against `references/guides/validation-rules.md` by hand.

For bigger jobs, start from a workflow: `references/workflows/build-app.md` for a screen or feature,
`references/workflows/figma-to-code.md` for a Figma frame.

## Relationship to the Hopper MCP server

Hopper also publishes an MCP server at `https://hopper.workleap.design/mcp`. If it is configured,
prefer it — it is always current and serves the full component API. This skill is the offline,
zero-configuration path and is a snapshot taken when you installed it; run
`npx skills add https://hopper.workleap.design` again to refresh it.

The three scripts above bundle the very same services the MCP tools call, so validation, token
lookup and icon search give identical answers either way.

Things this skill deliberately does not carry: the full props JSON (available at
`https://hopper.workleap.design/ai-docs/components/api/full/<Name>.json`) and the package
changelogs (`https://hopper.workleap.design/changelogs.md`).
