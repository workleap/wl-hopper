# useTreeData

Manages state for an immutable tree data structure, and provides convenience methods to
update the data over time.

## Introduction

React requires all data structures passed as props to be immutable. This enables them to be diffed correctly to determine
what has changed since the last render. This can be challenging to accomplish from scratch in a performant way in JavaScript.

`useTreeData` helps manage an immutable tree data structure, with helper methods to update the data in an efficient way.
Since the data is stored in React state, calling these methods to update the data automatically causes the component
to re-render accordingly.

In addition, `useTreeData` stores selection state for the tree, based on unique item keys. This can be updated programmatically,
and is automatically updated when items are removed from the tree.

## API

<FunctionAPI
  function={docs.exports.useTreeData}
  links={docs.links}
/>

## Options

## Interface

## Example

To construct a tree, pass an initial set of items along with functions to get a key for each item, and its children.
`useTreeData` processes these items into nodes, which you can use to render a [collection component](collections.md).
Each node has `key`, `value`, and `children` properties.

This example renders a `ListBox` with two sections, each with three child items. It uses the `name` property of each item
as the unique key for that item, and the `items` property as the children. In addition, it manages the selection state
for the listbox, which will automatically be updated when items are removed from the tree.

```tsx
interface ItemValue {
  name: string;
  items?: Array<ItemValue>;
}

let tree = useTreeData<ItemValue>({
  initialItems: [
    {
      name: 'People',
      items: [
        {name: 'David'},
        {name: 'Sam'},
        {name: 'Jane'}
      ]
    },
    {
      name: 'Animals',
      items: [
        {name: 'Aardvark'},
        {name: 'Kangaroo'},
        {name: 'Snake'}
      ]
    }
  ],
  initialSelectedKeys: ['Sam', 'Kangaroo'],
  getKey: item => item.name,
  getChildren: item => item.items || []
});

<ListBox
  aria-label="List organisms"
  items={tree.items}
  selectionMode="multiple"
  selectedKeys={tree.selectedKeys}
  onSelectionChange={(keys) => {
    if (keys !== 'all') {
      tree.setSelectedKeys(keys);
    }
  }}>
  {node =>
    <Section title={node.value.name} items={node.children}>
      {node => <Item>{node.value.name}</Item>}
    </Section>
  }
</ListBox>
```

### Inserting items

To insert a new item into the tree, use the `insert` method or use one of the other convenience methods.
Pass a `parentKey` to insert into, or `null` to insert a root item.

```tsx
// Insert an item into the root, after 'People'
tree.insert(null, 1, {name: 'Plants'});

// Insert an item into the 'People' node, after 'David'
tree.insert('People', 1, {name: 'Judy'});
```

```tsx
// Insert an item before another item
tree.insertAfter('Kangaroo', {name: 'Horse'});

// Insert multiple items before another item
tree.insertAfter('Kangaroo', {name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Insert an item after another item
tree.insertAfter('Kangaroo', {name: 'Horse'});

// Insert multiple items after another item
tree.insertAfter('Kangaroo', {name: 'Horse'}, {name: 'Giraffe'});
```

```tsx
// Append an item to the root
tree.append(null, {name: 'Plants'});

// Append an item to the 'People' node
tree.append('People', {name: 'Plants'});
```

```tsx
// Prepend an item to the root
tree.prepend(null, {name: 'Plants'});

// Prepend an item at the start of the 'People' node
tree.prepend('People', {name: 'Plants'});
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
// Move an item within the same parent
tree.move('Sam', 'People', 0);

// Move an item to a different parent
tree.move('Sam', 'Animals', 1);

// Move an item to the root
tree.move('Sam', null, 1);
```

### Updating items

```tsx
tree.update('Sam', {name: 'Samantha'});
```
