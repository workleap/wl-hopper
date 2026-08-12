# usePopover

Provides the behavior and accessibility implementation for a popover component.
A popover is an overlay element positioned relative to a trigger.

```tsx
import {Dialog, Heading} from 'react-aria-components/Dialog';
import {PopoverTrigger} from 'hooks-starter/Popover';

<PopoverTrigger label="Open popover" placement="bottom">
  <Dialog>
    <Heading slot="title">Popover title</Heading>
    <p style={{margin: 0}}>This is the content of the popover.</p>
  </Dialog>
</PopoverTrigger>
```

**Note**: `usePopover` only handles the overlay itself. It should be combined with [useDialog](../Modal/useModalOverlay.md#usedialog) to create fully accessible popovers. Other overlays such as menus may also be placed in a popover.

## API

```tsx
<DialogTrigger>
  <Button />
  <Popover>
    <OverlayArrow />
  </Popover>
</DialogTrigger>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useOverlayTriggerState, links: statelyDocs.links},
    {function: docs.exports.useOverlayTrigger, links: docs.links},
    {function: docs.exports.usePopover, links: docs.links},
  ]}/>

### OverlayTriggerState

### AriaPopoverProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `popoverRef` \* | `RefObject<Element | null>` | — | The ref for the popover element. |
| `triggerRef` \* | `RefObject<Element | null>` | — | The ref for the element which the popover positions itself with respect to. |
| `arrowBoundaryOffset` | `number | undefined` | 0 | The minimum distance the arrow's edge should be from the edge of the overlay element. |
| `arrowRef` | `RefObject<Element | null> | undefined` | — | A ref for the popover arrow element. |
| `arrowSize` | `number | undefined` | 0 | Cross size of the overlay arrow in pixels. |
| `boundaryElement` | `Element | undefined` | document.body | Element that that serves as the positioning boundary. |
| `containerPadding` | `number | undefined` | 12 | The placement padding that should be applied between the element and its surrounding container. |
| `crossOffset` | `number | undefined` | 0 | The additional offset applied along the cross axis between the element and its anchor element. |
| `getTargetRect` | `((target: Element) => DOMRect | undefined) | null | undefined` | target.getBoundingClientRect() | Overrides the target element's bounding rectangle. Useful for positioning relative to a specific point such as the mouse cursor (e.g. context menus) or text selection. |
| `groupRef` | `RefObject<Element | null> | undefined` | — | An optional ref for a group of popovers, e.g. submenus. When provided, this element is used to detect outside interactions and hiding elements from assistive technologies instead of the popoverRef. |
| `isKeyboardDismissDisabled` | `boolean | undefined` | false | Whether pressing the escape key to close the popover should be disabled. Most popovers should not use this option. When set to true, an alternative way to close the popover with a keyboard must be provided. |
| `isNonModal` | `boolean | undefined` | — | Whether the popover is non-modal, i.e. elements outside the popover may be interacted with by assistive technologies. Most popovers should not use this option as it may negatively impact the screen reader experience. Only use with components such as combobox, which are designed to handle this situation carefully. |
| `maxHeight` | `number | undefined` | — | The maxHeight specified for the overlay element. By default, it will take all space up to the current viewport height. |
| `offset` | `number | undefined` | 0 | The additional offset applied along the main axis between the element and its anchor element. |
| `onBlurWithin` | `((e: FocusEvent) => void) | undefined` | — | Handler that is called when the target element and all descendants lose focus. |
| `onFocusWithin` | `((e: FocusEvent) => void) | undefined` | — | Handler that is called when the target element or a descendant receives focus. |
| `onFocusWithinChange` | `((isFocusWithin: boolean) => void) | undefined` | — | Handler that is called when the the focus within state changes. |
| `placement` | `Placement | undefined` | 'bottom' | The placement of the element with respect to its anchor element. |
| `scrollRef` | `RefObject<Element | null> | undefined` | overlayRef | A ref for the scrollable region within the overlay. |
| `shouldCloseOnInteractOutside` | `((element: Element) => boolean) | undefined` | — | When user interacts with the argument element outside of the popover ref, return true if onClose should be called. This gives you a chance to filter out interaction with elements that should not dismiss the popover. By default, onClose will always be called on interaction outside the popover ref. |
| `shouldFlip` | `boolean | undefined` | true | Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely. |
| `shouldUpdatePosition` | `boolean | undefined` | true | Whether the overlay should update its position automatically. |

### PopoverAria

| Name | Type | Description |
|------|------|-------------|
| `arrowProps` \* | `DOMAttributes<FocusableElement>` | Props for the popover tip arrow if any. |
| `placement` \* | `PlacementAxis | null` | Placement of the popover with respect to the trigger. |
| `popoverProps` \* | `DOMAttributes<FocusableElement>` | Props for the popover element. |
| `triggerAnchorPoint` \* | `{ x: number; y: number; } | null` | The origin of the target in the overlay's coordinate system. Useful for animations. |
| `underlayProps` \* | `DOMAttributes<FocusableElement>` | Props to apply to the underlay element, if any. |
