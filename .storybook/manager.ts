import { addons } from "storybook/manager-api";

addons.setConfig({
    sidebar: {
        filters: {
            patterns: item => {
                // Hide individual stories in the sidebar when a stories file is for documentation purposes only
                // This should only exist while we don't have a documentation website up and running
                const shouldSkip = item.tags?.includes("autodocs") && item.tags?.includes("story");

                return !shouldSkip;
            }
        }
    }
});
