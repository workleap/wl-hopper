import { getA11yAddonParameters } from "@hopper-ui/storybook-addon";
import { type TestRunnerConfig, getStoryContext } from "@storybook/test-runner";
import { checkA11y, configureAxe, injectAxe } from "axe-playwright";

/*
 * Automate accessibility tests with test runner
 * https://storybook.js.org/docs/writing-tests/accessibility-testing#automate-accessibility-tests-with-test-runner
 *
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
export const config = {
    async preVisit(page) {
        await injectAxe(page);
    },
    async postVisit(page, context) {
        // Get the entire context of a story, including parameters, args, argTypes, etc.
        const storyContext = await getStoryContext(page, context);

        const a11yParameters = getA11yAddonParameters(storyContext.parameters);

        // Do not run a11y tests on disabled stories.
        if (a11yParameters?.disable) {
            return;
        }

        // Apply story-level a11y rules
        await configureAxe(page, {
            rules: a11yParameters?.config?.rules
        });

        await checkA11y(page, "#storybook-root", {
            detailedReport: true,
            detailedReportOptions: {
                html: true
            }
        });
    }
} satisfies TestRunnerConfig;
