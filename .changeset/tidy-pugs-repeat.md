---
"@hopper-ui/components": minor
---

feat(ActionBar): remove the `totalItemCount` prop

BREAKING: `ActionBar` no longer accepts `totalItemCount`. The selection text now reads
"12 items selected" instead of "12 of 230 items selected", and "All items selected" when
`selectedItemCount` is `"all"`. The `ActionBar.selectedOfTotal` localized string is gone too, and
the `selectionText` callback receives only `{ selectedItemCount }`.

To keep a total in the sentence, pass it yourself through `selectionText`:

```tsx
<ActionBar
    selectedItemCount={12}
    selectionText={({ selectedItemCount }) => `${selectedItemCount} of ${items.length} items selected`}
>
```
