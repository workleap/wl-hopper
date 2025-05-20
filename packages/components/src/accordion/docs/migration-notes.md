Coming from Orbiter, you should be aware of the following changes:

- `expansionMode="multiple"` has been replaced with `allowsMultipleExpanded`.
- `borderless` and `bordered` variants are no more. `inline` and `standalone` are the new variants. There is no direct match; the new variants are context-based, depending on whether an accordion is contained or not.
- `autofocus` is removed. It did not make sense to have.
- The `disclosure` component is used instead of `Item`.
- `disabled` is renamed to `isDisabled` on the item/disclosure.
