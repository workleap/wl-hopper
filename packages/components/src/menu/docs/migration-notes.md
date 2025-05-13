Coming from Orbiter, you should be aware of the following changes:

## MenuTrigger

- `allowPreventOverflow` has been removed.
- `closeOnSelect` has been removed.
- `open` has been renamed to `isOpen`.

## Menu

- `autoFocusTarget` has been removed.
- `disabled` has been removed, set the disabled items as `disabledKeys` instead.
- `fluid` has been removed.
- `nodes` has been removed.

## MenuItem

- `disabled` has been renamed to `isDisabled`

## MenuSection

- `title` has been removed from `MenuSection`, use `Header` as a children instead

## Miscellaneous

- `Item` has been renamed `MenuItem`
- `Section` has been renamed `MenuSection`
- We cannot add a tooltip on a MenuItem anymore
