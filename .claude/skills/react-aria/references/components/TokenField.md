# TokenField

A token field allows users to enter text with inline tokens. Use it to build AI prompt fields,
tag inputs, structured search fields, mention inputs, and multi-select comboboxes.

## Vanilla CSS example

```tsx
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {TokenizingFieldValue} from './TokenizingFieldValue';

<TokenField
  
  defaultValue={TokenizingFieldValue.tokenize(
    'This example automatically tokenizes #hashtags and @usernames in the text.',
    /(?<=\s|^)[#@]\S+(?=\s)/g
  )}>
  {segment => <Token>{segment.text}</Token>}
</TokenField>
```

### TokenField.tsx

```tsx
'use client';
import {
  TokenField as AriaTokenField,
  TokenInput as AriaTokenInput,
  Token as AriaToken,
  type TokenFieldProps as AriaTokenFieldProps,
  type TokenInputProps,
  type TokenProps,
  type TokenFieldValue
} from 'react-aria-components/TokenField';
import {Label, Description} from './Form';
import './TokenField.css';
import type React from 'react';

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue> extends Omit<
  AriaTokenFieldProps<T>,
  'children'
> {
  label?: string;
  description?: string;
  placeholder?: string;
  inputRef?: React.Ref<HTMLDivElement>;
  children: TokenInputProps['children'];
}

export function TokenField<T extends TokenFieldValue = TokenFieldValue>({
  label,
  description,
  placeholder,
  inputRef,
  style,
  children,
  ...props
}: TokenFieldProps<T>) {
  return (
    <AriaTokenField {...props}>
      {label && <Label>{label}</Label>}
      <AriaTokenInput
        ref={inputRef}
        style={style}
        data-placeholder={placeholder}
        className="react-aria-TokenInput inset">
        {children}
      </AriaTokenInput>
      {description && <Description>{description}</Description>}
    </AriaTokenField>
  );
}

export function Token(props: TokenProps) {
  return <AriaToken {...props} />;
}

```

### TokenField.css

```css
@import './theme.css';
@import './utilities.css';

.react-aria-TokenField {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.react-aria-TokenInput {
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2.5);
  outline: none;
  border-radius: var(--radius);
  outline: none;
  box-sizing: border-box;
  font: var(--font-size) system-ui;
  line-height: 1.5em;
  color: var(--text-color);

  &:empty::before {
    content: attr(data-placeholder);
    color: var(--text-color-placeholder);
  }

  &[aria-multiline='true'] {
    min-height: 100px;
    padding: calc(var(--spacing) * 2.5) var(--spacing-3);
  }

  &[data-focused] {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: -1px;
  }

  &[data-disabled] {
    color: var(--text-color-disabled);
    user-select: none;
  }
}

.react-aria-Token {
  background-color: var(--tint-200);
  color: var(--tint-1200);
  border-radius: 9999px;
  height: var(--spacing-5);
  padding: 1px var(--spacing-2);
  margin: 0 2px;
  cursor: default;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;

  &[data-selected] {
    background-color: var(--highlight-background);
    color: white;
  }

  &::selection {
    background-color: transparent;
  }

  &[data-disabled] {
    background-color: var(--gray-200);
    color: var(--text-color-disabled);
  }
}

```

### TokenizingFieldValue.ts

```ts
import {type TokenFieldSegment, TokenFieldValue} from 'react-aria-components/TokenField';

export class TokenizingFieldValue extends TokenFieldValue {
  tokenRegex: RegExp;

  constructor(tokens: TokenFieldSegment[], tokenRegex: RegExp) {
    super(tokens);
    this.tokenRegex = tokenRegex;
  }

  static tokenize(text: string, tokenRegex: RegExp): TokenFieldValue {
    let list = new this([], tokenRegex);
    let segments = list.tokenize(text);
    return new this(segments, tokenRegex);
  }

  createFieldValue(segments: TokenFieldSegment[]): this {
    let Constructor = this.constructor as new (
      tokens: TokenFieldSegment[],
      tokenRegex: RegExp
    ) => this;
    return new Constructor(segments, this.tokenRegex);
  }

  tokenize(text: string): TokenFieldSegment[] {
    if (text.length === 0) {
      return [{type: 'text', text}];
    }

    let tokenRegex = this.tokenRegex;
    tokenRegex.lastIndex = 0;

    let match: RegExpExecArray | null = null;
    let start = 0;
    let segments: TokenFieldSegment[] = [];
    while ((match = tokenRegex.exec(text))) {
      if (match.index > start) {
        segments.push({type: 'text', text: text.slice(start, match.index)});
      }
      segments.push({type: 'token', text: match[0]});
      start = match.index + match[0].length;
    }

    if (start < text.length) {
      segments.push({type: 'text', text: text.slice(start)});
    }

    return segments;
  }
}

```

## Tailwind example

```tsx
import {Token, TokenField} from 'tailwind-starter/TokenField';
import {TokenizingFieldValue} from './TokenizingFieldValue';

<TokenField
  
  defaultValue={TokenizingFieldValue.tokenize(
    'This example automatically tokenizes #hashtags and @usernames in the text.',
    /(?<=\s|^)[#@]\S+(?=\s)/g
  )}>
  {segment => <Token>{segment.text}</Token>}
</TokenField>
```

### TokenField.tsx

```tsx
'use client';
import {
  TokenField as AriaTokenField,
  TokenInput as AriaTokenInput,
  Token as AriaToken,
  type TokenFieldProps as AriaTokenFieldProps,
  type TokenInputProps,
  type TokenProps,
  type TokenFieldValue
} from 'react-aria-components/TokenField';
import {Label, Description} from './Form';
import './TokenField.css';
import type React from 'react';

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue> extends Omit<
  AriaTokenFieldProps<T>,
  'children'
> {
  label?: string;
  description?: string;
  placeholder?: string;
  inputRef?: React.Ref<HTMLDivElement>;
  children: TokenInputProps['children'];
}

export function TokenField<T extends TokenFieldValue = TokenFieldValue>({
  label,
  description,
  placeholder,
  inputRef,
  style,
  children,
  ...props
}: TokenFieldProps<T>) {
  return (
    <AriaTokenField {...props}>
      {label && <Label>{label}</Label>}
      <AriaTokenInput
        ref={inputRef}
        style={style}
        data-placeholder={placeholder}
        className="react-aria-TokenInput inset">
        {children}
      </AriaTokenInput>
      {description && <Description>{description}</Description>}
    </AriaTokenField>
  );
}

export function Token(props: TokenProps) {
  return <AriaToken {...props} />;
}

```

### TokenField.css

```css
@import './theme.css';
@import './utilities.css';

.react-aria-TokenField {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.react-aria-TokenInput {
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2.5);
  outline: none;
  border-radius: var(--radius);
  outline: none;
  box-sizing: border-box;
  font: var(--font-size) system-ui;
  line-height: 1.5em;
  color: var(--text-color);

  &:empty::before {
    content: attr(data-placeholder);
    color: var(--text-color-placeholder);
  }

  &[aria-multiline='true'] {
    min-height: 100px;
    padding: calc(var(--spacing) * 2.5) var(--spacing-3);
  }

  &[data-focused] {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: -1px;
  }

  &[data-disabled] {
    color: var(--text-color-disabled);
    user-select: none;
  }
}

.react-aria-Token {
  background-color: var(--tint-200);
  color: var(--tint-1200);
  border-radius: 9999px;
  height: var(--spacing-5);
  padding: 1px var(--spacing-2);
  margin: 0 2px;
  cursor: default;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;

  &[data-selected] {
    background-color: var(--highlight-background);
    color: white;
  }

  &::selection {
    background-color: transparent;
  }

  &[data-disabled] {
    background-color: var(--gray-200);
    color: var(--text-color-disabled);
  }
}

```

### TokenizingFieldValue.ts

```ts
import {type TokenFieldSegment, TokenFieldValue} from 'react-aria-components/TokenField';

export class TokenizingFieldValue extends TokenFieldValue {
  tokenRegex: RegExp;

  constructor(tokens: TokenFieldSegment[], tokenRegex: RegExp) {
    super(tokens);
    this.tokenRegex = tokenRegex;
  }

  static tokenize(text: string, tokenRegex: RegExp): TokenFieldValue {
    let list = new this([], tokenRegex);
    let segments = list.tokenize(text);
    return new this(segments, tokenRegex);
  }

  createFieldValue(segments: TokenFieldSegment[]): this {
    let Constructor = this.constructor as new (
      tokens: TokenFieldSegment[],
      tokenRegex: RegExp
    ) => this;
    return new Constructor(segments, this.tokenRegex);
  }

  tokenize(text: string): TokenFieldSegment[] {
    if (text.length === 0) {
      return [{type: 'text', text}];
    }

    let tokenRegex = this.tokenRegex;
    tokenRegex.lastIndex = 0;

    let match: RegExpExecArray | null = null;
    let start = 0;
    let segments: TokenFieldSegment[] = [];
    while ((match = tokenRegex.exec(text))) {
      if (match.index > start) {
        segments.push({type: 'text', text: text.slice(start, match.index)});
      }
      segments.push({type: 'token', text: match[0]});
      start = match.index + match[0].length;
    }

    if (start < text.length) {
      segments.push({type: 'text', text: text.slice(start)});
    }

    return segments;
  }
}

```

## Value

`TokenField` is controlled via a `TokenFieldValue` value, which represents a sequence of text and token segments. Use the `value` or `defaultValue` prop to set the value, and `onChange` to handle user input.

```tsx
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {TokenFieldValue} from 'react-stately/useTokenFieldState';
import {useState} from 'react';

function Example() {
  let [value, setValue] = useState(
    new TokenFieldValue([
      {type: 'text', text: 'Hello '},
      {type: 'token', text: '@username'},
      {type: 'text', text: '!'}
    ])
  );

  return (
    <>
      {/*- begin highlight -*/}
      <TokenField value={value} onChange={setValue} label="Message">
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      {/*- end highlight -*/}
      <p>Value: {value.toString()}</p>
    </>
  );
}
```

## Tokenization

Extend the `TokenFieldValue` class to customize how text is converted into tokens. Override the `tokenize` method to parse user input, and use `createFieldValue` to return new instances of your subclass when the value changes.

```tsx
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {TokenizingFieldValue} from './TokenizingFieldValue';

<TokenField
  allowsNewlines
  defaultValue={TokenizingFieldValue.tokenize(
    'This example automatically tokenizes #hashtags and @usernames in the text.',
    /(?<=\s|^)[#@]\S+(?=\s)/g
  )}
  label="Message">
  {segment => <Token>{segment.text}</Token>}
</TokenField>
```

## Autocomplete

Combine `TokenField` with [Autocomplete](Autocomplete.md) to provide inline completions such as @mentions and slash commands. Use `TokenFieldValue.findText` to locate the anchor character, and `tokenFieldPositionToDOMRange` to position a [Popover](Popover.md) relative to the filter text.

```tsx
import {Autocomplete} from 'react-aria-components/Autocomplete';
import {Text} from 'react-aria-components/Text';
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {tokenFieldPositionToDOMRange} from 'react-aria/useTokenField';
import {TokenFieldValue} from 'react-aria-components/TokenField';
import {Menu, MenuItem} from 'vanilla-starter/Menu';
import {Popover} from 'vanilla-starter/Popover';
import {useMemo, useRef, useState} from 'react';

type Item = {username: string} | {command: string; description: string};

/*- begin collapse -*/
const usernames = [
  {username: 'alexmiller'},
  {username: 'sarahjones'},
  {username: 'davidkim'},
  {username: 'emmawatson'},
  {username: 'oliverliu'},
  {username: 'ellagreen'},
  {username: 'lucasbrown'},
  {username: 'amandarivera'},
  {username: 'masonlee'},
  {username: 'nataliasmith'},
  {username: 'benjamintaylor'},
  {username: 'zoewilson'},
  {username: 'henrywalker'},
  {username: 'madelineyoung'},
  {username: 'noahscott'},
  {username: 'lucygonzalez'},
  {username: 'jacobmartin'},
  {username: 'averymoore'},
  {username: 'loganmurphy'},
  {username: 'miahernandez'},
  {username: 'danieladair'},
  {username: 'sofiacox'},
  {username: 'jackharris'},
  {username: 'chloebaker'},
  {username: 'liamrodriguez'}
];
/*- end collapse -*/

/*- begin collapse -*/
const slashCommands = [
  {command: 'gif', description: 'Insert a GIF'},
  {command: 'todo', description: 'Add a todo list item'},
  {command: 'mention', description: 'Mention a user with @username'},
  {command: 'date', description: 'Insert the current date'},
  {command: 'quote', description: 'Insert a quote block'}
];
/*- end collapse -*/

function Example() {
  let inputRef = useRef(null);
  let [value, setValue] = useState(
    new TokenFieldValue([
      {type: 'text', text: 'This example has autocomplete for '},
      {type: 'token', text: '@usernames'},
      {type: 'text', text: ' and '},
      {type: 'token', text: '/commands'}
    ])
  );

  let [filterAnchor, filterValue] = useMemo(() => {
    let filterAnchor = value.findText(value.caretPosition, TokenFieldValue.Direction.Backward, /(?<=^|\s)[@/]/);
    if (filterAnchor != null) {
      let filterValue = value.slice(filterAnchor, value.caretPosition).toString();
      return [filterAnchor, filterValue];
    }
    return [null, null];
  }, [value]);

  let items: Item[] = [];
  if (filterValue != null && filterValue.startsWith('/')) {
    items = slashCommands.filter(item => item.command.includes(filterValue.slice(1)));
  } else if (filterValue != null && filterValue.startsWith('@')) {
    items = usernames.filter(item => item.username.includes(filterValue.slice(1)));
  }

  return (
    /*- begin highlight -*/
    <Autocomplete>
      <TokenField value={value} onChange={setValue} label="Prompt" allowsNewlines inputRef={inputRef}>
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      <Popover
        triggerRef={inputRef}
        isOpen={filterAnchor != null && items.length > 0}
        isNonModal
        hideArrow
        placement="bottom start"
        trigger="MenuTrigger"
        getTargetRect={target => {
          return tokenFieldPositionToDOMRange(target, filterAnchor!).getBoundingClientRect();
        }}>
        <Menu items={items} dependencies={[filterAnchor]}>
          {item => (
            <MenuItem
              id={'username' in item ? item.username : item.command}
              onAction={() => {
                setValue(value =>
                  value.replaceRangeWithSegments(
                    filterAnchor!,
                    value.caretPosition,
                    [
                      {
                        type: 'token',
                        text: 'username' in item ? '@' + item.username : item.command
                      },
                      {type: 'text', text: ' '}
                    ],
                    false
                  )
                );
              }}>
              <Text slot="label">{'username' in item ? item.username : item.command}</Text>
              {'description' in item ? <Text slot="description">{item.description}</Text> : null}
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </Autocomplete>
    /*- end highlight -*/
  );
}
```

## Tag field

Use a custom `TokenFieldValue` to build a tag input. This example converts comma, space, or newline separated text into tokens.

```tsx
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {TagFieldValue} from './TagFieldValue';

<TokenField
  allowsNewlines
  defaultValue={
    new TagFieldValue([
      {type: 'token', text: 'Architecture'},
      {type: 'token', text: 'Design'},
      {type: 'token', text: 'Development'},
      {type: 'token', text: 'Marketing'},
      {type: 'token', text: 'Sales'}
    ])
  }
  label="Categories">
  {segment => <Token>{segment.text}</Token>}
</TokenField>
```

## Search

Token fields can be used to build advanced search UIs with structured query tokens. This example suggests filters based on the current text segment.

```tsx
import {Autocomplete} from 'react-aria-components/Autocomplete';
import {Collection} from 'react-aria-components/Collection';
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {Header, Menu, MenuItem, MenuSection} from 'vanilla-starter/Menu';
import {Popover} from 'vanilla-starter/Popover';
import {useRef, useState} from 'react';
import {TokenFieldValue} from 'react-stately/useTokenFieldState';

/*- begin collapse -*/
const usernames = [
  {username: 'alexmiller'},
  {username: 'sarahjones'},
  {username: 'davidkim'},
  {username: 'emmawatson'},
  {username: 'oliverliu'},
  {username: 'ellagreen'},
  {username: 'lucasbrown'},
  {username: 'amandarivera'},
  {username: 'masonlee'},
  {username: 'nataliasmith'},
  {username: 'benjamintaylor'},
  {username: 'zoewilson'},
  {username: 'henrywalker'},
  {username: 'madelineyoung'},
  {username: 'noahscott'},
  {username: 'lucygonzalez'},
  {username: 'jacobmartin'},
  {username: 'averymoore'},
  {username: 'loganmurphy'},
  {username: 'miahernandez'},
  {username: 'danieladair'},
  {username: 'sofiacox'},
  {username: 'jackharris'},
  {username: 'chloebaker'},
  {username: 'liamrodriguez'}
];
/*- end collapse -*/

function Example() {
  let inputRef = useRef(null);
  let [value, setValue] = useState(
    new TokenFieldValue([{type: 'token', text: 'From: Alice Smith'}])
  );

  let last = value.segments[value.caretPosition.index];
  let filterText = last?.type === 'text' ? last.text : null;
  let suggestions: {name: string; items: string[]}[] = [];
  if (filterText != null) {
    let users = usernames
      .filter(item => item.username.includes(filterText))
      .map(u => u.username)
      .slice(0, 5);
    if (users.length > 0) {
      if (
        !value.segments.some(
          segment => segment.type === 'token' && segment.text.startsWith('From: ')
        )
      ) {
        suggestions.push({
          name: 'From',
          items: users
        });
      }

      suggestions.push({
        name: 'To',
        items: users
      });
    }

    suggestions.push({
      name: 'Subject',
      items: [filterText]
    });
  }

  return (
    <Autocomplete>
      <TokenField role="searchbox" value={value} onChange={setValue} label="Search" inputRef={inputRef}>
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      <Popover
        triggerRef={inputRef}
        isOpen={suggestions.length > 0}
        isNonModal
        hideArrow
        placement="bottom start"
        style={{width: 'var(--trigger-width)'}}
        trigger="MenuTrigger">
        <Menu items={suggestions}>
          {section => (
            <MenuSection>
              <Header>{section.name}</Header>
              <Collection items={section.items}>
                {item => (
                  <MenuItem
                    id={section.name + '-' + item}
                    onAction={() => {
                      setValue(value =>
                        value.replaceRangeWithSegments(
                          {index: value.caretPosition.index, offset: 0},
                          value.caretPosition,
                          [{type: 'token', text: section.name + ': ' + item}],
                          false
                        )
                      );
                    }}>
                    {item}
                  </MenuItem>
                )}
              </Collection>
            </MenuSection>
          )}
        </Menu>
      </Popover>
    </Autocomplete>
  );
}
```

## ComboBox

Use `TokenField` as the input for a [ComboBox](ComboBox.md) to build a multi-select field with tokens. Synchronize the `TokenFieldValue` with the ComboBox `value` and `inputValue` props using a custom segment list class.

```tsx
import {ComboBox} from 'react-aria-components/ComboBox';
import {Token, TokenField} from 'vanilla-starter/TokenField';
import {ComboBoxItem, ComboBoxListBox} from 'vanilla-starter/ComboBox';
import {FieldButton, Label} from 'vanilla-starter/Form';
import {Popover} from 'vanilla-starter/Popover';
import {ComboBoxTokenFieldValue} from './ComboBoxTokenFieldValue';
import {ChevronDown} from 'lucide-react';
import {useState} from 'react';

/*- begin collapse -*/
const usernames = [
  {username: 'alexmiller'},
  {username: 'sarahjones'},
  {username: 'davidkim'},
  {username: 'emmawatson'},
  {username: 'oliverliu'},
  {username: 'ellagreen'},
  {username: 'lucasbrown'},
  {username: 'amandarivera'},
  {username: 'masonlee'},
  {username: 'nataliasmith'},
  {username: 'benjamintaylor'},
  {username: 'zoewilson'},
  {username: 'henrywalker'},
  {username: 'madelineyoung'},
  {username: 'noahscott'},
  {username: 'lucygonzalez'},
  {username: 'jacobmartin'},
  {username: 'averymoore'},
  {username: 'loganmurphy'},
  {username: 'miahernandez'},
  {username: 'danieladair'},
  {username: 'sofiacox'},
  {username: 'jackharris'},
  {username: 'chloebaker'},
  {username: 'liamrodriguez'}
];
/*- end collapse -*/

function Example() {
  let [value, setValue] = useState(new ComboBoxTokenFieldValue([]));

  return (
    <ComboBox
      selectionMode="multiple"
      style={{width: 500, maxWidth: '100%'}}
      value={value.getSelectedKeys()}
      inputValue={value.getInputValue()}
      onChange={keys => setValue(value.setSelectedKeys(keys))}>
      <Label>Users</Label>
      <div className="combobox-field">
        <TokenField value={value} onChange={setValue} placeholder="Select users" style={{paddingInlineEnd: 36}}>
          {segment => <Token>{segment.text}</Token>}
        </TokenField>
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox items={usernames}>
          {state => <ComboBoxItem id={state.username}>{state.username}</ComboBoxItem>}
        </ComboBoxListBox>
      </Popover>
    </ComboBox>
  );
}
```

## API

```tsx
<TokenField>
  <Label />
  <TokenInput>{segment => <Token />}</TokenInput>
  <Text slot="description" />
</TokenField>
```

### TokenField

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsNewlines` | `boolean | undefined` | — | Whether the token field allows newlines. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `children` | `ChildrenOrFunction<TokenFieldRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<TokenFieldRenderProps> | undefined` | 'react-aria-TokenField' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `defaultValue` | `T | undefined` | — | The default value (uncontrolled). |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `isDisabled` | `boolean | undefined` | — | Whether the token field is disabled. |
| `isReadOnly` | `boolean | undefined` | — | Whether the token field is read only. |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: T) => void) | undefined` | — | Handler that is called when the value changes. |
| `onClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onCopy` | `React.ClipboardEventHandler<T> | undefined` | — | Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy). |
| `onCut` | `React.ClipboardEventHandler<T> | undefined` | — | Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onKeyDown` | `((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined` | — | Handler that is called when a key is released. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPaste` | `React.ClipboardEventHandler<T> | undefined` | — | Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). |
| `onPointerCancel` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onSubmit` | `(() => void) | undefined` | — | A function that is called when the user presses the Enter key. |
| `onTouchCancel` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"div", TokenFieldRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `role` | `"combobox" | "searchbox" | "textbox" | undefined` | 'textbox' | The accessibility role of the token field. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `StyleOrFunction<TokenFieldRenderProps> | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |
| `value` | `T | undefined` | — | The current value (controlled). |

### TokenInput

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(segment: TokenSegment<T extends TokenFieldValue<infer V> ? V : never>) => React.ReactElement` | — | A function that renders a token for each segment in the token field. |
| `className` | `ClassNameOrFunction<TokenInputRenderProps> | undefined` | 'react-aria-TokenInput' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `isDisabled` | `boolean | undefined` | — | Whether the hover events should be disabled. |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onHoverChange` | `((isHovering: boolean) => void) | undefined` | — | Handler that is called when the hover state changes. |
| `onHoverEnd` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction ends. |
| `onHoverStart` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction starts. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"div", TokenInputRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `StyleOrFunction<TokenInputRenderProps> | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### Token

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenOrFunction<TokenRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<TokenRenderProps> | undefined` | 'react-aria-Token' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLSpanElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLSpanElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"span", TokenRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style` | `StyleOrFunction<TokenRenderProps> | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### TokenFieldValue

### Constructor

| Parameter | Type | Description |
|-----------|------|-------------|
| `tokens` | `readonly TokenFieldSegment<T>[]` | — |
| `options` | `TokenFieldValueOptions` | — |
