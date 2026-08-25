# Hopper validation rules

Every rule below is enforced by `scripts/validate-hopper-code.mjs`, the same linter the Hopper MCP
server runs. Run the script — this page is the reference for interpreting what it reports, and the
fallback for checking code by hand when no parser is available in the project.

```bash
node scripts/validate-hopper-code.mjs path/to/Component.tsx
cat Component.tsx | node scripts/validate-hopper-code.mjs
```

It exits `1` when any file has errors and `0` otherwise.

## Errors

### Native HTML elements

`div`, `span`, `button`, `input`, `p`, `h1`–`h6`, `a`, `img`, `ul`, `ol`, `li`, `form`, `section`,
`article`, `header`, `footer`, `nav`, `table`, `tr`, `td`, `th`, `tbody`, `thead`, `tfoot`, `svg`,
`path` and `iframe` may not be used directly.

Use the Hopper component instead — `Card`, `Stack`, `Text`, `Button`, and so on — or `Div`/`Span`
when you really do need a plain element. If nothing fits, use the `htmlElement` function.

### Prohibited props

`className` and `style` are rejected on every component. Style with Hopper's style props.

### Emojis

Emojis anywhere in the source are an error. Use `@hopper-ui/icons`, and find the name with
`node scripts/search-icons.mjs <query>` — see `references/icons/README.md`.

### Layout components with a single child

`Stack`, `Inline`, `Flex`, `Grid`, `Div` and `Box` wrapping exactly one child is flagged. Either drop
the wrapper or move its props onto the child.

### Token values on props that do not take tokens

Only certain props accept design tokens. Passing a token value to one that does not is an error, and
so is passing a token to an `UNSAFE_` prop when the safe prop accepts tokens directly.

### Malformed token values

The token _name_ and the prop _value_ are different strings. `hop-neutral-text` is the token;
`neutral` is the value. The validator reports the correct form when it can derive it. See
`references/tokens/README.md`.

### Core colour tokens

Core colour tokens are strongly discouraged for colour props. They are raw values with no dark-mode
or theming behaviour. Use semantic colours — `primary`, `danger`, `neutral-surface`, and so on.

### Component-specific structure

- **Button** with two children must include a `Text` component when one of them is text.
- **Modal** accepts only `Header`, `Content` and `ButtonGroup` as direct children, and is expected to
  have them.

### `UNSAFE_` misuse

- A percentage value on `width`, `height`, `maxWidth`, `minWidth`, `maxHeight` or `minHeight` never
  needs the prefix.
- A prop not on the whitelist below is used without the prefix.
- A value that has a token equivalent must use the token, not `UNSAFE_`.

## Warnings

- **`Box`** is strongly discouraged as a stand-in for a plain element. Use `Div` or `Span`.
- **`Div` with `display="flex"`** should usually be `Stack`, `Inline` or `Flex`.
- **`Div` with `display="grid"`** should usually be `Grid`.
- A layout component with a single child may simply be unnecessary.

---
