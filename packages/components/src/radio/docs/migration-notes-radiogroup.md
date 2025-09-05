Coming from Orbiter, you should be aware of the following changes:

- `required` has been renamed to `isRequired`.
- `onChange` signature has changed (no event are passed).
- `disabled` has been renamed to `isDisabled`.
- `autofocus` is not supported. You must use `autofocus` on the actual Radio.
- `fluid` has been renamed to `isFluid`.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- The default orientation is now vertical instead of horizontal.
- `validationState` has been removed. Use `isInvalid` instead. There is no `isValid`.
- `wrap` has been removed. If `horizontal`, radios will wrap.
- There is no `align` prop. If needed, the styled system can be used.
- `inline` prop is not available.
