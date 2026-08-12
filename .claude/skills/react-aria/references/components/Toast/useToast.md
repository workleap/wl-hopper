# useToast

Provides the behavior and accessibility implementation for a toast component. Toasts display
brief, temporary notifications of actions, errors, or other events in an application.

```tsx
import {ToastProvider, Button} from 'hooks-starter/Toast';

<ToastProvider>
  {state => (
    <Button onPress={() => state.add('Toast is done!')}>Show toast</Button>
  )}
</ToastProvider>
```

## API

```tsx
<ToastRegion>
  {({toast}) => (
    <Toast toast={toast}>
      <ToastContent>
        <Text slot="title" />
        <Text slot="description" />
      </ToastContent>
      <Button slot="close" />
    </Toast>
  )}
</ToastRegion>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useToastState, links: statelyDocs.links},
    {function: statelyDocs.exports.useToastQueue, links: statelyDocs.links},
    {function: docs.exports.useToastRegion, links: docs.links},
    {function: docs.exports.useToast, links: docs.links},
  ]}/>

### ToastState

### AriaToastRegionProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | 'Notifications' | An accessibility label for the toast region. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |

### ToastRegionAria

| Name | Type | Description |
|------|------|-------------|
| `regionProps` \* | `DOMAttributes<FocusableElement>` | Props for the landmark region element. |

### AriaToastProps

| Name | Type | Description |
|------|------|-------------|
| `toast` \* | `QueuedToast<T>` | The toast object. |
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |

### ToastAria

| Name | Type | Description |
|------|------|-------------|
| `closeButtonProps` \* | `AriaButtonProps<"button">` | Props for the toast close button. |
| `contentProps` \* | `DOMAttributes<FocusableElement>` | Props for the toast content alert message. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the toast description element, if any. |
| `titleProps` \* | `DOMAttributes<FocusableElement>` | Props for the toast title element. |
| `toastProps` \* | `DOMAttributes<FocusableElement>` | Props for the toast container, non-modal dialog element. |
