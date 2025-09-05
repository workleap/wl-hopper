Coming from Orbiter, you should be aware of the following changes:

- `onChange` signature has been changed – no events are passed.
- `disabled` has been renamed to `isDisabled`.
- `required` has been renamed to `isRequired`.
- `fluid` has been renamed to `isFluid`.
- `reverse` is not supported, use `flex-direction` or `row-reverse` instead.
- `autofocus` is not supported. You must put `autofocus` on the actual Checkbox.
- The default orientation is now vertical instead of horizontal.
- `validationState` is removed. use `isInvalid` instead. There is no `isValid`.
- `wrap` is removed. If horizontal, radios will wrap.
- There is no `align` prop. If needed, the styled system can be used.
- The `inline` prop is not available.
