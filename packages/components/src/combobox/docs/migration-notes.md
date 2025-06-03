Coming from Orbiter, you should be aware of the following changes:

Assuming you will use ComboBox for the `Autocomplete` of Orbiter.

- `allowFlip` has been renamed `shouldFlip`.
- `allowPreventOverflow` has been removed.
- `boundaryElement` has been removed.
- `clearOnSelect` has been removed.
- `defaultOpen` has been removed.
- `defaultValue` has been renamed `defaultInputValue`.
- `fluid` has been renamed `isFluid`.
- `icon` has been removed.
- `loading` has been renamed `isLoading`.
- `noResultsMessage` has been removed. [See new usage](/components/ComboBox#usage-allow-empty-collection).
- `onSearch` has been removed.
- `wrapperProps` has been removed. There is now `popoverProps` for the Popover and `listboxProps` for the Listbox.
