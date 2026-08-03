# Icons

Never invent an icon name and never use an emoji. Look the name up first.

## Finding an icon

`references/icons/data.json` lists every Hopper icon with its name, description and keywords. Search
it by keyword rather than by the name you expect:

```bash
# any icon matching "delete"
jq '[.[] | select((.name + " " + .description + " " + (.keywords | join(" "))) | test("delete"; "i"))]' \
  references/icons/data.json

# without jq
grep -i -B2 -A4 '"delete"' references/icons/data.json
```

Names are suffixed by type: standard icons end in `Icon` (`AddIcon`, `DeleteIcon`), rich icons end
in `RichIcon` (`AddRichIcon`). If a search misses, try a synonym — the `keywords` field exists
precisely because the obvious word is often not the name.

## Choosing the right type

- **Standard icons** (`@hopper-ui/icons`) — monochrome, inherit the current colour, sized by the
  component. The default choice.
- **Rich icons** (`@hopper-ui/icons`) — multicolour and decorative, for empty states and feature
  highlights. Not for buttons or inline text.
- **SVG icons** (`@hopper-ui/svg-icons`) — the raw assets, for non-React consumers.

`references/icons/index.md` covers usage, sizing and accessibility for each type.
`references/icons/designing-an-icon.md` covers authoring a new one.

## If nothing matches

Do not substitute an emoji, a Unicode glyph, or a raw `<svg>` — all three fail validation. Use the
closest real icon, or raise the gap with the Hopper team.
