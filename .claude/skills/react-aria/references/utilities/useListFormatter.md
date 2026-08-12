# useListFormatter

Provides localized list formatting for the current locale. Automatically updates when the locale
changes, and handles caching of the list formatter for performance.

## Introduction

`useListFormatter` wraps a builtin browser [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
object to provide a React Hook that integrates with the i18n system in React Aria. It handles formatting lists of values for the current locale,
updating when the locale changes, and caching of list formatters for performance. See the
[Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) docs for
information on formatting options.

## Example

This example joins a list of values into a single localized string for two locales: USA, and Spain. Two instances of the `List` component are rendered,
using the [I18nProvider](I18nProvider.md) to specify the locale to display.

```tsx
'use client';
import {I18nProvider} from 'react-aria/I18nProvider';
import {useListFormatter} from 'react-aria/useListFormatter';

function List({items}) {
  let formatter = useListFormatter({type: 'conjunction'});

  return (
    <p>{formatter.format(items)}</p>
  );
}

<>
  <I18nProvider locale="en-US">
    <List items={['Apples', 'Oranges', 'Bananas']} />
  </I18nProvider>
  <I18nProvider locale="es-ES">
    <List items={['manzanas', 'naranjas', 'plátanos']} />
  </I18nProvider>
</>
```

## API

<FunctionAPI
  function={docs.exports.useListFormatter}
  links={docs.links}
/>
