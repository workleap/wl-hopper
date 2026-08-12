import { readFile } from "fs/promises";
import path from "node:path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import type { Options } from "tsup";

type EsbuildPlugin = NonNullable<Options["esbuildPlugins"]>[number];
type PostCSSModulesOptions = Parameters<typeof postcssModules>[0];
export type CustomizablePostCSSModulesOptions = Omit<PostCSSModulesOptions, "getJSON">;

// could we move this plugin in wl configs?
export function createCssModuleEsbuildPlugin(options: CustomizablePostCSSModulesOptions): EsbuildPlugin {
    return {
        name: "css-module",
        setup(build) {
            build.onResolve({ filter: /\.module\.css$/, namespace: "file" }, args => ({
                path: `${args.path}#css-module`,
                namespace: "css-module",
                pluginData: {
                    pathDir: path.join(args.resolveDir, args.path)
                }
            }));
            build.onLoad({ filter: /#css-module$/, namespace: "css-module" }, async args => {
                const { pluginData } = args as {
                    pluginData: { pathDir: string };
                };

                const source = await readFile(pluginData.pathDir, "utf8");

                let cssModule = {};
                const result = await postcss([
                    postcssModules({
                        getJSON(_, json) {
                            cssModule = json;
                        },
                        ...options
                    })
                ]).process(source, { from: pluginData.pathDir });

                return {
                    pluginData: { css: result.css },
                    contents: `import "${pluginData.pathDir}"; export default ${JSON.stringify(cssModule)}`
                };
            });
            build.onResolve({ filter: /\.module\.css$/, namespace: "css-module" }, args => ({
                path: path.join(args.resolveDir, args.path, "#css-module-data"),
                namespace: "css-module",
                pluginData: args.pluginData as { css: string }
            }));
            build.onLoad({ filter: /#css-module-data$/, namespace: "css-module" }, args => ({
                contents: (args.pluginData as { css: string }).css,
                loader: "css"
            }));
        }
    };
}
