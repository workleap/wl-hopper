Coming from Orbiter, you should be aware of the following changes:

- `Item` has been renamed to `SelectItem`.
- The selected value only includes text. If an icon or avatar is needed, customize it using the `renderValue` function.
- There is no `allowFlip`. Use `shouldFlip`.
- There is no `allowPreventOverflow`. This is done automatically.
- There is no `allowResponsiveMenuWidth`. Use `isAutoMenuWidth`.
- `disabled` has been renamed to `isDisabled`.
- `fluid` has been renamed to `isFluid`.
- `open` has been renamed to `isOpen`..
- `required` has been renamed to `isRequired`.
- A select cannot be read-only.
- `overlayProps` has been removed. Use `popoverProps` instead.
- Use `isInvalid` instead of `validationState`.
- `variant` has been removed.
- `zIndex` has been removed.
- Custom tooltips are not supported.