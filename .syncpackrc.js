// @ts-check

/** @type {import("syncpack").RcFile} */
export default {
    "lintFormatting": false,
    "dependencyTypes": ["prod", "dev"],
    "semverGroups": [
        {
            "packages": ["@hopper-ui/*", "@internals/*"],
            "dependencyTypes": ["prod", "peer"],
            "range": "^",
            "label": "Packages should use ^ for dependencies and peerDependencies."
        },
        {
            "packages": ["@hopper-ui/*", "@internals/*"],
            "dependencyTypes": ["dev"],
            "range": "",
            "label": "Packages should pin devDependencies."
        },
        {
            "packages": ["@apps/*", "@samples/*"],
            "dependencyTypes": ["prod", "dev"],
            "range": "",
            "label": "Apps and Samples should pin dependencies and devDependencies."
        },
        {
            "packages": ["workspace-root"],
            "dependencyTypes": ["dev"],
            "range": "",
            "label": "Workspace root should pin devDependencies."
        },
    ],
    "versionGroups": [
        {
            "packages": ["**"],
            "dependencyTypes": ["prod", "dev"],
            "preferVersion": "highestSemver",
            "label": "All packages should have a single version across the repository"
        }
    ]
};
