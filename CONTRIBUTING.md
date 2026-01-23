# Contributing <!-- omit in toc -->

The following documentation is only for the maintainers of this repository.

- [Monorepo setup](#monorepo-setup)
- [Installation](#installation)
- [Commands](#commands)
  - [doc:start](#docstart)
  - [dev:mcp](#devmcp)
  - [dev:basic](#devbasic)
  - [storybook](#storybook)
  - [test](#test)
  - [lint](#lint)
- [Contributing to packages](#contributing-to-packages)

## Monorepo setup

This repository is managed as a monorepo with [PNPM workspace](https://pnpm.io/workspaces) to handle the installation of the npm dependencies and manage the packages interdependencies.

It's important to note that PNPM workspace doesn't hoist the npm dependencies at the root of the workspace as most package manager does. Instead, it uses an advanced [symlinked node_modules structure](https://pnpm.io/symlinked-node-modules-structure). This means that you'll find a `node_modules` directory inside the packages folders as well as at the root of the repository.

The main difference to account for is that the `devDependencies` must now be installed locally in every package `package.json` file rather than in the root `package.json` file.

### Turborepo <!-- omit in toc -->

This repository use [Turborepo](https://turbo.build/repo/docs) to execute it's commands. Turborepo help saving time with it's built-in cache but also ensure the packages topological order is respected when executing commands.

To be understand the relationships between the commands, have a look at this repository [turbo.json](./turbo.json) configuration file.

## Installation

This project uses PNPM, therefore, you must install [PNPM](https://pnpm.io/installation) v9+ first:

```bash
npm install -g pnpm
```

To install the dependencies of this repository, open a terminal at the root of the workspace and execute the following commands:

```bash
pnpm i
```

You must then run the following command to run the following command to build all the packages:

```bash
pnpm build:pkg
```

Then, use any of the available [commands](#commands) to start developing.

## Commands

### doc:start

You need to run this once to generate the previews for components.

```bash
pnpm doc:generate
```

Then you can start a watch process for the documentation website.

```bash
pnpm doc:start
```

### dev:mcp

You have to build the docs first.

```bash
pnpm doc:generate
pnpm build:doc
pnpm build:ai-docs
```

Then you can start a watch process for the mcp server.

```bash
pnpm dev:mcp
```

### dev:basic

Start a watch process for the basic sample website. The main goal was to test that everything is properly exported from the Hopper.

```bash
pnpm dev:basic
```

### storybook

You can then run storybook to see the components in action:

```bash
pnpm storybook
```

### test

Run the unit tests.

```bash
pnpm test
```

### lint

Lint the files.

```bash
pnpm lint
```

## Contributing to packages

- [Tokens](./contributing/tokens.md)
- [Icons](./contributing/icons.md)
- [Hopper components](./contributing/components.md)
