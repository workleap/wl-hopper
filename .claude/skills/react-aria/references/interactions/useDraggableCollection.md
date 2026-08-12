# useDraggableCollection

Handles drag interactions for a collection component, with support for traditional mouse and
touch based drag and drop, in addition to full parity for keyboard and screen reader users.

```tsx
import React from 'react';
import {useListBox, useOption} from 'react-aria/useListBox';
import {useListState} from 'react-stately/useListState';
import {Item} from 'react-stately/Item';
import type {Node} from '@react-types/shared';
import {useFocusRing} from 'react-aria/useFocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {useDraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {useDraggableCollection, useDraggableItem} from 'react-aria/useDraggableCollection';
import {useDrop} from 'react-aria/useDrop';
import {useButton} from 'react-aria/useButton';
import 'vanilla-starter/theme.css';

function ListBox(props: Parameters<typeof useListState>[0] & Parameters<typeof useListBox>[0] & {label?: React.ReactNode}) {
  // Set up the list box as normal. See the useListBox docs for details.
  let state = useListState(props);
  let ref = React.useRef<HTMLUListElement>(null);
  let {listBoxProps} = useListBox({...props, shouldSelectOnPressUp: true}, state, ref);

  // Set up drag state for the collection, providing data for each dragged item.
  let dragState = useDraggableCollectionState({
    ...props,
    collection: state.collection,
    selectionManager: state.selectionManager,
    getItems: keys => [...keys].map(key => ({'text/plain': state.collection.getItem(key)?.textValue ?? ''}))
  });
  useDraggableCollection(props, dragState, ref);

  return (
    <ul
      {...listBoxProps}
      ref={ref}
      style={{padding: 0, margin: 0, listStyle: 'none', width: 180, border: '1px solid var(--gray-300)', borderRadius: 8, color: 'var(--text-color)'}}>
      {[...state.collection].map(item => (
        <Option key={item.key} item={item} state={state} dragState={dragState} />
      ))}
    </ul>
  );
}

function Option({item, state, dragState}: {item: Node<unknown>, state: ReturnType<typeof useListState>, dragState: ReturnType<typeof useDraggableCollectionState>}) {
  let ref = React.useRef<HTMLLIElement>(null);
  let {optionProps} = useOption({key: item.key}, state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  // Register the item as a drag source.
  let {dragProps} = useDraggableItem({key: item.key}, dragState);

  return (
    <li
      {...mergeProps(optionProps, dragProps, focusProps)}
      ref={ref}
      style={{padding: '8px 12px', cursor: 'grab', outline: isFocusVisible ? '2px solid var(--focus-ring-color)' : 'none', outlineOffset: -2}}>
      {item.rendered}
    </li>
  );
}

function DropTarget() {
  let [dropped, setDropped] = React.useState('');
  let ref = React.useRef<HTMLDivElement>(null);
  let {dropProps, isDropTarget} = useDrop({
    ref,
    async onDrop(e) {
      let texts = await Promise.all(
        e.items.map(item => item.kind === 'text' ? item.getText('text/plain') : null)
      );
      setDropped(texts.filter(Boolean).join(', '));
    }
  });
  let {buttonProps} = useButton({elementType: 'div'}, ref);

  return (
    <div
      {...mergeProps(dropProps, buttonProps)}
      ref={ref}
      style={{
        width: 180,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        color: 'var(--text-color)',
        border: `2px dashed ${isDropTarget ? 'var(--focus-ring-color)' : 'var(--gray-300)'}`
      }}>
      {dropped || 'Drop here'}
    </div>
  );
}

<div style={{display: 'flex', gap: 16, alignItems: 'start'}}>
  <ListBox aria-label="Categories" selectionMode="multiple">
    <Item>Animals</Item>
    <Item>People</Item>
    <Item>Plants</Item>
  </ListBox>
  <DropTarget />
</div>
```

## API

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useDraggableCollectionState, links: statelyDocs.links},
    {function: docs.exports.useDraggableCollection, links: docs.links},
    {function: docs.exports.useDraggableItem, links: docs.links},
  ]}/>
