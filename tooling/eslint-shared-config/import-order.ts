import importPlugin from "eslint-plugin-import";
import { Config } from "eslint/config";

export default {
    plugins: {
        import: importPlugin
    },
    rules: {
        "import/order": ["error", {
            "newlines-between": "always",
            "groups": [
                ["builtin", "external"],
                "parent",
                ["sibling", "index"]
            ],
            "pathGroups": [
                {
                    "pattern": "./*.module.css", // CSS comes in a group after the last group
                    "group": "object",
                    "position": "after"
                }
            ],
            "pathGroupsExcludedImportTypes": ["builtin"],
            "alphabetize": {
                "order": "asc",
                "caseInsensitive": true
            }
        }]
    }
} satisfies Config;
