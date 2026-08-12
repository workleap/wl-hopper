# useToolbar

Provides the behavior and accessibility implementation for a toolbar.
A toolbar is a container for a set of interactive controls with arrow key navigation.

```tsx
import {Toolbar} from 'hooks-starter/Toolbar';
import {Button} from 'hooks-starter/Button';

<Toolbar aria-label="Actions">
  <Button variant="secondary">Copy</Button>
  <Button variant="secondary">Cut</Button>
  <Button variant="secondary">Paste</Button>
</Toolbar>
```

## API

```tsx
<Toolbar>
  <Button />
  <ToggleButtonGroup>
    <ToggleButton />
  </ToggleButtonGroup>
  <Separator />
  <Group>
    <Button />
  </Group>
  <Select />
</Toolbar>
```

<FunctionAPI
  function={docs.exports.useToolbar}
  links={docs.links}
/>

### AriaToolbarProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the entire toolbar. |

### ToolbarAria

| Name | Type | Description |
|------|------|-------------|
| `toolbarProps` \* | `HTMLAttributes<HTMLElement>` | Props for the toolbar container. |
