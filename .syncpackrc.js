// @ts-check

/** @type {import("syncpack").RcFile} */
export default {
    "lintFormatting": false,
    "semverGroups": [
        {
            "packages": ["@hopper-ui/*", "!@hopper-ui/mcp-server"],
            "dependencyTypes": ["prod", "peer"],
            "range": "^",
            "label": "Packages should use ^ for dependencies and peerDependencies."
        },
        {
            "packages": ["@hopper-ui/*", "!@hopper-ui/mcp-server"],
            "dependencyTypes": ["dev"],
            "range": "",
            "label": "Packages should pin devDependencies."
        },
        {
            "packages": ["docs", "basic", "@hopper-ui/mcp-server"],
            "dependencyTypes": ["prod", "dev"],
            "range": "",
            "label": "Apps and Samples should pin dependencies and devDependencies."
        },
        {
            "packages": ["wl-hopper"],
            "dependencyTypes": ["dev"],
            "range": "",
            "label": "Workspace root should pin devDependencies."
        },
    ],
    "versionGroups": [
        {
            // "@hopper-ui/" is not used with workspace:*, since we want to allow a range.
            // It's messing up with syncpack.
            "packages": ["**"],
            "dependencies": ["@hopper-ui/*"],
            "dependencyTypes": ["prod", "peer"],
            "isIgnored": true
        },
        {
            // "react" and "react-dom" declares ranges to support React 18 and 19.
            // It's messing up with syncpack.
            "packages": ["**"],
            "dependencies": ["react", "react-dom"],
            "dependencyTypes": ["peer"],
            "isIgnored": true
        },
        {
            "packages": ["**"],
            "dependencyTypes": ["prod", "dev", "peer"],
            "preferVersion": "highestSemver",
            "label": "Packages, Apps and Samples should have a single version across the repository."
        }
    ]
};
