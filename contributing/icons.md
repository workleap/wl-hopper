# Contributing to icons <!-- omit in toc -->

- [Adding a new icon](#adding-a-new-icon)
- [Updating or removing an icon](#updating-or-removing-an-icon)

## Adding a new icon

1. Add SVGs to Size-Specific and Metadata Folders
- Get the three versions (16px, 24px, 32px) of the SVG icon you want to add. Having 3 versions of the icon is mandatory.
- Place each version in the following folders:
  - `packages/svg-icons/src/icons/16px`
  - `packages/svg-icons/src/icons/24px`
  - `packages/svg-icons/src/icons/32px`
- For each icon, create a JSON metadata file `<YourIconName>.json` in the metadata directory - `packages/svg-icons/src/icons/metadata`. Having a metadata of the icon is mandatory. This is the following structure:
 
```
{
  "name": "YourIconName",
  "description": "Concise description of what the icon represents",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

2. Test the source SVGs
- Run the following command to test the source SVGs:
```sh
pnpm test
```
- If one or more of the source SVGs fail the test, you will need to fix the SVGs before proceeding to the next step.

3. Optimization and Generation of icons
- To generate optimized SVGs and React components, run the following command:

```sh
pnpm generate-icons
```

- This command will optimize the SVGs and create React components in the respective folders.
- Commit the changes to the repository.

4. Run Changeset Command

- After manually generating the icons, you will need to create two changesets for the new icons:
  - One for the `@hopper-ui/svg-icons` package
  - One for the `@hopper-ui/icons` package

You can do this by running the following command twice:
```sh
pnpm changeset
```

- Follow the prompts to describe the changes made and choose the appropriate version bump. Choose `patch` for minor changes, `minor` for new features, and `major` for breaking changes.

You can follow the template for the changeset to ensure that you provide the correct information for the release. The templates are located in the `.changeset-templates` folder.
1- For the icons release, you can follow [this template](.changeset-templates\icons-release.md)
2- For the svg-icons release, you can follow [this template](.changeset-templates\svg-icons-release.md)

## Updating or removing an icon

- Updating or removing an icon is similar to adding a new icon. The only difference is that you will need to delete or replace the SVGs from the following folders:
  - `packages/svg-icons/src/icons/16px`
  - `packages/svg-icons/src/icons/24px`
  - `packages/svg-icons/src/icons/32px`

- You will also need to delete or update the metadata of the icon in `packages/svg-icons/src/icons/metadata`.

- Steps 2-5 are the same as adding a new icon.
