Coming from Orbiter, you should be aware of the following changes:

- Disclosure now has two children components called `DisclosureHeader` and `DisclosurePanel`.
- `DisclosurePanel` is optional and most likely wouldn't be used for Orbiter. A custom header can be used by using a Button component inside Disclosure.
- `defaultOpen` is renamed to `defaultExpanded`.
- `open` is renamed to `isExpanded`.
- `onOpenChange` is renamed to `onExpandedChange`.