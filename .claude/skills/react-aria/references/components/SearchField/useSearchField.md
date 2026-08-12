# useSearchField

Provides the behavior and accessibility implementation for a search field.

```tsx
import {SearchField} from 'hooks-starter/SearchField';

<SearchField label="Search" onSubmit={text => alert(text)} />
```

## API

```tsx
<SearchField>
  <Label />
  <Input />
  <Button />
  <Text slot="description" />
  <FieldError />
</SearchField>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useSearchFieldState, links: statelyDocs.links},
    {function: docs.exports.useSearchField, links: docs.links},
  ]}/>

### SearchFieldState

### AriaSearchFieldProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-activedescendant` | `string | undefined` | — | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |
| `aria-autocomplete` | `"both" | "inline" | "list" | "none" | undefined` | — | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |
| `aria-controls` | `string | undefined` | — | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-haspopup` | `boolean | "true" | "false" | "dialog" | "grid" | "listbox" | "menu" | "tree" | undefined` | — | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoComplete` | `string | undefined` | — | Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). |
| `autoCorrect` | `string | undefined` | — | An attribute that takes as its value a space-separated string that describes what, if any, type of autocomplete functionality the input should provide. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete). |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `defaultValue` | `string | undefined` | — | The default value (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `enterKeyHint` | `"done" | "enter" | "go" | "next" | "previous" | "search" | "send" | undefined` | — | An enumerated attribute that defines what action label or icon to preset for the enter key on virtual keyboards. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint). |
| `errorMessage` | `((v: ValidationResult) => ReactNode) | ReactNode` | — | An error message for the field. |
| `excludeFromTabOrder` | `boolean | undefined` | — | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inputMode` | `"decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" | undefined` | — | Hints at the type of data that might be entered by the user while editing the element or its contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `maxLength` | `number | undefined` | — | The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). |
| `minLength` | `number | undefined` | — | The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength). |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onBeforeInput` | `FormEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event). |
| `onBlur` | `((e: FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: string) => void) | undefined` | — | Handler that is called when the value changes. |
| `onClear` | `(() => void) | undefined` | — | Handler that is called when the clear button is pressed. |
| `onCompositionEnd` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event). |
| `onCompositionStart` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event). |
| `onCompositionUpdate` | `CompositionEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event). |
| `onCopy` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy). |
| `onCut` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). |
| `onFocus` | `((e: FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onInput` | `FormEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event). |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). |
| `onSelect` | `ReactEventHandler<HTMLInputElement> | undefined` | — | Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event). |
| `onSubmit` | `((value: string) => void) | undefined` | — | Handler that is called when the SearchField is submitted. |
| `pattern` | `string | undefined` | — | Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). |
| `placeholder` | `string | undefined` | — | Temporary text that occupies the text input when it is empty. |
| `spellCheck` | `string | undefined` | — | An enumerated attribute that defines whether the element may be checked for spelling errors. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck). |
| `type` | `"email" | "password" | "search" | "tel" | "text" | "url" | (string & {}) | undefined` | 'search' | The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). |
| `validate` | `((value: string) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'aria' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `string | undefined` | — | The current value (controlled). |

### SearchFieldAria

| Name | Type | Description |
|------|------|-------------|
| `clearButtonProps` \* | `AriaButtonProps<"button">` | Props for the clear button. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the searchfield's description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the searchfield's error message element, if any. |
| `inputProps` \* | `InputHTMLAttributes<HTMLInputElement>` | Props for the input element. |
| `isInvalid` \* | `boolean` | Whether the input value is invalid. |
| `labelProps` \* | `LabelHTMLAttributes<HTMLLabelElement>` | Props for the text field's visible label element (if any). |
| `validationDetails` \* | `ValidityState` | The native validation details for the input. |
| `validationErrors` \* | `string[]` | The current error messages for the input if it is invalid, otherwise an empty array. |
