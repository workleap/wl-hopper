import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "storybook-react-rsbuild";

const require = createRequire(import.meta.url);
const configDir = dirname(fileURLToPath(import.meta.url));

// We sometimes need to disable the lazyCompilation to properly run the test runner on stories
const isLazyCompilation = !(process.env.STORYBOOK_NO_LAZY === "true");

const storybookConfig: StorybookConfig = {
    stories: ["../packages/**/*.stories.@(ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-docs")
    ],
    framework: {
        name: getAbsolutePath("storybook-react-rsbuild"),
        options: {
            builder: {
                rsbuildConfigPath: join(configDir, "rsbuild.config.ts"),
                lazyCompilation: isLazyCompilation ? undefined : false
            }
        }
    }
};

export default storybookConfig;

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, "package.json")));
}
