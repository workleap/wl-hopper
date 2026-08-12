# useDisclosure

Provides the behavior and accessibility implementation for a disclosure component.

```tsx
import {Disclosure} from 'hooks-starter/Disclosure';

<Disclosure title="System Requirements">
  Details about system requirements here.
</Disclosure>
```

## API

```tsx
<Disclosure>
  <Heading>
    <Button slot="trigger" />
  </Heading>
  <DisclosurePanel />
</Disclosure>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useDisclosureState, links: statelyDocs.links},
    {function: statelyDocs.exports.useDisclosureGroupState, links: statelyDocs.links},
    {function: docs.exports.useDisclosure, links: docs.links},
  ]}/>

### DisclosureState

### AriaDisclosureProps

| Name | Type | Description |
|------|------|-------------|
| `defaultExpanded` | `boolean | undefined` | Whether the disclosure is expanded by default (uncontrolled). |
| `isDisabled` | `boolean | undefined` | Whether the disclosure is disabled. |
| `isExpanded` | `boolean | undefined` | Whether the disclosure is expanded (controlled). |
| `onExpandedChange` | `((isExpanded: boolean) => void) | undefined` | Handler that is called when the disclosure's expanded state changes. |

### DisclosureAria

| Name | Type | Description |
|------|------|-------------|
| `buttonProps` \* | `AriaButtonProps<"button">` | Props for the disclosure button. |
| `panelProps` \* | `HTMLAttributes<HTMLElement>` | Props for the disclosure panel. |
