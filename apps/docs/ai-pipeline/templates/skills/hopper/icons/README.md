# Icons

Never invent an icon name and never use an emoji. Search for one.

## Finding an icon

```bash
node scripts/search-icons.mjs --limit 5 delete
node scripts/search-icons.mjs --type rich --limit 5 "empty state"
node scripts/search-icons.mjs add "new product"        # one query per argument
```

This is the same fuzzy search the Hopper MCP's `get_icons` tool runs — the script bundles that
service, so results and ranking are identical. It matches on name, description and keywords, which
is why searching a synonym works when the obvious name does not. Each argument is a separate query,
and a query may hold several space-separated keywords.

`--type` takes `standard`, `rich` or `all` (default). `--limit` caps results per query; 5 is a good
default. With no query it lists every icon of the given type.

The raw data is `references/icons/data.json` if you would rather grep it, but prefer the script —
exact-substring grep misses matches the fuzzy search finds.

## Choosing the right type

- **Standard icons** (`@hopper-ui/icons`) — monochrome, inherit the current colour, sized by the
  component. The default choice. Names end in `Icon`.
- **Rich icons** (`@hopper-ui/icons`) — multicolour and decorative, for empty states and feature
  highlights. Not for buttons or inline text. Names end in `RichIcon`.
- **SVG icons** (`@hopper-ui/svg-icons`) — the raw assets, for non-React consumers.

`references/icons/index.md` covers usage, sizing and accessibility for each type.
`references/icons/designing-an-icon.md` covers authoring a new one.

## If nothing matches

Do not substitute an emoji, a Unicode glyph, or a raw `<svg>` — all three fail validation. Use the
closest real icon, or raise the gap with the Hopper team.
