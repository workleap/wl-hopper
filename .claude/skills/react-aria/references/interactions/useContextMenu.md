# useContextMenu

Handles context menu events across mouse, touch, keyboard, and screen reader interactions.

```tsx
import React from 'react';
import {useContextMenu} from 'react-aria/useContextMenu';

function Example() {
  let [events, setEvents] = React.useState<string[]>([]);

  /*- begin focus -*/
  let {contextMenuProps} = useContextMenu({
    onContextMenu: e => setEvents(
      events => [`context menu at (${e.x}, ${e.y})`, ...events]
    )
  });
  /*- end focus -*/

  return (
    <>
      <div
        {...contextMenuProps}
        tabIndex={0}
        style={{
          width: 250,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed gray',
          borderRadius: 10
        }}>
        Right click here
      </div>
      <ul
        style={{
          maxHeight: '200px',
          overflow: 'auto'
        }}>
        {events.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </>
  );
}
```

## Features

There is no standard way to trigger a context menu consistently across platforms, input devices, and assistive technologies. `useContextMenu` normalizes these differences into a single `onContextMenu` event.

- Handles mouse right click and <Keyboard>Control</Keyboard> + click on macOS
- Handles long press on touch devices, including iOS where the `contextmenu` event does not fire
- Handles keyboard shortcuts such as <Keyboard>Shift</Keyboard> + <Keyboard>F10</Keyboard> on Windows and Linux, and <Keyboard>Control</Keyboard> + <Keyboard>Enter</Keyboard> on macOS
- Handles screen reader specific gestures such as VoiceOver's context menu command
- Prevents the browser and OS context menus from appearing
- Reports the position the menu should be displayed relative to the target element

## Anatomy

`useContextMenu` returns props that you spread onto the element that should respond to context menu interactions. The `onContextMenu` handler is called with a [ContextMenuEvent](#contextmenuevent) that includes the target element and the `x` and `y` position where the menu should appear, relative to the target.

```tsx
import {useContextMenu} from 'react-aria/useContextMenu';

let {contextMenuProps} = useContextMenu(props);
```

## API

<FunctionAPI
  function={docs.exports.useContextMenu}
  links={docs.links}
/>

### ContextMenuProps

| Name | Type | Description |
|------|------|-------------|
| `onContextMenu` | `((e: ContextMenuEvent) => void) | undefined` | Event that is called when a context menu is triggered. |

### ContextMenuAria

| Name | Type | Description |
|------|------|-------------|
| `contextMenuProps` \* | `HTMLAttributes<HTMLElement>` | Props to spread on the target element. |

### ContextMenuEvent

The `onContextMenu` handler is fired with a `ContextMenuEvent`, which exposes the target element and the position the menu should be displayed relative to it.

| Name | Type | Description |
|------|------|-------------|
| `target` \* | `Element` | The target element on which the event was triggered. |
| `x` \* | `number` | X position relative to the target. |
| `y` \* | `number` | Y position relative to the target. |
