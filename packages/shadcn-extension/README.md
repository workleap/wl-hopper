# @hopper-ui/shadcn-extension

Components ported from the [shadcn/ui React Aria registry](https://ui.shadcn.com/docs/changelog/2026-07-react-aria),
styled with Hopper design tokens. Fills the gap when a design calls for a component shadcn has and
Hopper does not.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](../../LICENSE)
[![npm version](https://img.shields.io/npm/v/@hopper-ui/shadcn-extension)](https://www.npmjs.com/package/@hopper-ui/shadcn-extension)

Two things set it apart from `@hopper-ui/components`: the API is React Aria's verbatim, and styling
goes through `className` rather than style props. It requires a `HopperProvider` — the `--hop-*`
tokens resolve only inside that subtree.

A component name lives in exactly one package. If it is in `@hopper-ui/components`, use that one.

## Usage

View the [user's documentation](https://hopper.workleap.design/shadcn-extension/overview/introduction).

## 🤝 Contributing

View the [contributor's documentation](https://github.com/workleap/wl-hopper/blob/main/CONTRIBUTING.md).

## License

Copyright © 2023, Workleap. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/workleap/workleap-license/blob/master/LICENSE.
