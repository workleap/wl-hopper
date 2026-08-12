# useModalOverlay

Provides the behavior and accessibility implementation for a modal component.
A modal is an overlay element which blocks interaction with elements outside it.

```tsx
import {Button} from 'react-aria-components/Button';
import {Dialog, ModalTrigger} from 'hooks-starter/Modal';

<ModalTrigger label="Open dialog">
  {close =>
    <Dialog title="Enter your name">
      <p>This dialog is built with <code>useModalOverlay</code> and <code>useDialog</code>.</p>
      <Button onPress={close} className="react-aria-Button button-base" data-variant="primary">Close</Button>
    </Dialog>}
</ModalTrigger>
```

## useDialog

`useDialog` is the dialog primitive itself, so the `Dialog` component is built from scratch. To render it interactively, this example reuses the [Modal](../Modal.md), [Button](../Button.md), and `DialogTrigger` components from React Aria Components to provide the overlay container and trigger. A dialog may also be placed within a [popover](../Popover/usePopover.md).

```tsx
import {CloseButton, Dialog, ModalTrigger} from 'hooks-starter/Modal';

<ModalTrigger label="Open dialog">
  {() =>
    <Dialog title="Notice">
      <p style={{marginTop: 0}}>This dialog is built with useDialog.</p>
      <CloseButton />
    </Dialog>}
</ModalTrigger>
```

A dialog consists of a container element and an optional title. `useDialog` handles exposing this to assistive technology using ARIA. It can be combined with `useModalOverlay` or [usePopover](../Popover/usePopover.md) to create modal dialogs, popovers, and other types of overlays.

If a dialog does not have a visible title element, an `aria-label` or `aria-labelledby` prop must be passed instead to identify the element to assistive technology.

Focus containment must be enabled from a component rendered *inside* the [\<Overlay>](../Popover.md) — `useDialog` does this automatically, which is why focus is contained in the examples above. If you render content that does not use `useDialog` (or another hook that enables containment), make sure `useModalOverlay` is called from a component rendered inside `<Overlay>` so that focus is properly contained.

## API

```tsx
<DialogTrigger>
  <Button />
  <ModalOverlay>
    <Modal>
      <Dialog>
        <Heading slot="title" />
        <Text slot="description" />
        <Button slot="close" />
      </Dialog>
    </Modal>
  </ModalOverlay>
</DialogTrigger>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useOverlayTriggerState, links: statelyDocs.links},
    {function: docs.exports.useModalOverlay, links: docs.links},
    {function: dialogDocs.exports.useDialog, links: dialogDocs.links},
  ]}/>

### OverlayTriggerState

### AriaModalOverlayProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isDismissable` | `boolean | undefined` | false | Whether to close the modal when the user interacts outside it. |
| `isKeyboardDismissDisabled` | `boolean | undefined` | false | Whether pressing the escape key to close the modal should be disabled. |
| `shouldCloseOnInteractOutside` | `((element: Element) => boolean) | undefined` | — | When user interacts with the argument element outside of the overlay ref, return true if onClose should be called.  This gives you a chance to filter out interaction with elements that should not dismiss the overlay. By default, onClose will always be called on interaction outside the overlay ref. |

### ModalOverlayAria

| Name | Type | Description |
|------|------|-------------|
| `modalProps` \* | `DOMAttributes<FocusableElement>` | Props for the modal element. |
| `underlayProps` \* | `DOMAttributes<FocusableElement>` | Props for the underlay element. |

### AriaDialogProps

### DialogAria
