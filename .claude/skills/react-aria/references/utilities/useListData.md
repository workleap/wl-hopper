# useListData

Manages state for an immutable list data structure, and provides convenience methods to
update the data over time.

## Introduction

React requires all data structures passed as props to be immutable. This enables them to be diffed correctly to determine
what has changed since the last render. This can be challenging to accomplish from scratch in a performant way in JavaScript.

`useListData` helps manage an immutable list data structure, with helper methods to update the data in an efficient way.
Since the data is stored in React state, calling these methods to update the data automatically causes the component
to re-render accordingly.

In addition, `useListData` stores selection state for the list, based on unique item keys. This can be updated programmatically,
and is automatically updated when items are removed from the list.

## API

<FunctionAPI
  function={docs.exports.useListData}
  links={docs.links}
/>

## Options

## Interface

## Example

To construct a list, pass an initial set of items along with a function to get a key for each item.
You can use the state returned by `useListData` to render a [collection component](collections.md).

This example renders a `ListBox` using the items managed by `useListData`. It uses the `name` property of each item
as the unique key for that item, and the `items` property as the children. In addition, it manages the selection state
for the listbox, which will automatically be updated when items are removed from the tree.

```tsx
let list = useListData({
  initialItems: [
    {name: 'Aardvark'},
    {name: 'Kangaroo'},
    {name: 'Snake'}
  ],
  initialSelectedKeys: ['Kangaroo'],
  getKey: item => item.name
});

<ListBox
  items={list.items}
  selectedKeys={list.selectedKeys}
  onSelectionChange={list.setSelectedKeys}>
  {item => <Item key={item.name}>{item.name}</Item>}
</ListBox>
```

### Inserting items

To insert a new item into the list, use the `insert` method or one of the other convenience methods.
Each of these methods also accepts multiple items, so you can insert multiple items at once.

```tsx
// Insert an item after the first one
list.insert(1, {name: 'Horse'});

// Insert multiple items
list.insert(1, {name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Insert an item before another item
list.insertBefore('Kangaroo', {name: 'Horse'});

// Insert multiple items before another item
list.insertBefore('Kangaroo', {name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Insert an item after another item
list.insertAfter('Kangaroo', {name: 'Horse'});

// Insert multiple items after another item
list.insertAfter('Kangaroo', {name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Append an item
list.append({name: 'Horse'});

// Append multiple items
list.append({name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Prepend an item
list.prepend({name: 'Horse'});

// Prepend multiple items
list.prepend({name: 'Horse'}, {name: 'Giraffe'});
```

### Removing items

```tsx
// Remove an item
list.remove('Kangaroo');

// Remove multiple items
list.remove('Kangaroo', 'Snake');
```

```tsx
// Remove all selected items
list.removeSelectedItems();
```

### Moving items

```tsx
list.move('Snake', 0);
```

### Updating items

```tsx
list.update('Snake', {name: 'Rattle Snake'});
```
