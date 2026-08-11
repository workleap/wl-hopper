/* eslint-disable no-prototype-builtins */
import fs from "fs";
import path from "path";
import docgenTs, { type ComponentDoc, type PropItem } from "react-docgen-typescript";
import ts from "typescript";

interface ComponentData {
    name: string;
    filePath: string;
}

interface Group {
    [key: string]: PropItem;
}

interface Groups {
    [key: string]: Group;
}

interface GroupsConfig {
    [key: string]: (string | RegExp)[];
}

export interface ComponentDocWithGroups extends ComponentDoc {
    groups: Groups;
}

export interface Options {
    exclude?: string[];
}

const PACKAGES = path.join(process.cwd(), "..", "..", "packages", "components", "src");
const ICON_FILE = path.join(process.cwd(), "..", "..", "packages", "icons", "src", "Icon.tsx");
const RICH_ICON_FILE = path.join(process.cwd(), "..", "..", "packages", "icons", "src", "RichIcon.tsx");
const COMPONENT_DATA = path.join(process.cwd(), "datas", "components");

const parserConfig = {
    shouldRemoveUndefinedFromOptional: true,
    componentNameResolver: exp => {
        const name = exp.getName();
        if (name.startsWith("_")) {
            return name.slice(1);
        }

        return name;
    },
    propFilter: prop => {
        const alwaysIncludeProps = ["children", "className", "id", "style"];

        // Always include these props
        if (alwaysIncludeProps.includes(prop.name)) {
            return true;
        }

        // Remove props from React
        if (prop?.parent?.fileName.includes("node_modules/@types/react")) {
            return false;
        }

        // Remove props from StyledSystemProps and UnsafeStyledSystemProps
        if (prop?.parent?.name === "StyledSystemProps" || prop?.parent?.name === "UnsafeStyledSystemProps") {
            return false;
        }

        return true;
    }
} satisfies docgenTs.ParserOptions;

// Components are declared as `const _Button = ...; export { _Button as Button };`. The parser
// needs to see the underscore-prefixed binding (`componentNameResolver` above strips the `_`),
// so the export statement is rewritten before it reaches TypeScript.
//
// The rewrite cannot simply be applied to every file of a shared program: components import each
// other through barrels (`typography/index.ts` -> `text/index.ts` -> `Text.tsx`) which re-export
// the *aliased* name, so stripping the alias everywhere would break cross-component type
// resolution. `HOPPER_DOCGEN_ALIAS_MODE` selects how that is handled:
//
//   virtual-temp (default) - the rewritten file is exposed under an extra in-memory `.temp.tsx`
//                            path and the real file is left untouched, reproducing exactly what
//                            the previous on-disk temp files produced.
//   additive               - rewrite in place to `export { _X as X, _X }`, keeping the alias.
//   none                   - no rewrite; rely on `componentNameResolver` alone.
type AliasMode = "virtual-temp" | "additive" | "none";

const ALIAS_MODE = (process.env.HOPPER_DOCGEN_ALIAS_MODE ?? "virtual-temp") as AliasMode;

const EXPORT_ALIAS_RE = /export\s*{\s*_(\w+)\s*as\s*(\w+)\s*}/g;

function loadCompilerOptions(tsconfigPath: string): ts.CompilerOptions {
    const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

    if (error) {
        throw new Error(ts.flattenDiagnosticMessageText(error.messageText, "\n"));
    }

    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, path.dirname(tsconfigPath), {}, tsconfigPath);

    return { ...options, noEmit: true, skipLibCheck: true, skipDefaultLibCheck: true };
}

const compilerOptions = loadCompilerOptions(path.resolve("./tsconfig.json"));

const tsConfigParser = docgenTs.withCompilerOptions(compilerOptions, parserConfig);

const tsConfigFullPropsParser = docgenTs.withCompilerOptions(
    compilerOptions,
    {
        ...parserConfig,
        propFilter: prop => {
            const result = parserConfig.propFilter(prop);

            // Get back StyledSystemProps and UnsafeStyledSystemProps
            if (result === false && (prop?.parent?.name === "StyledSystemProps" || prop?.parent?.name === "UnsafeStyledSystemProps")) {
                return true;
            }

            return result;
        }
    }
);

function writeFile(filename: string, data: ComponentDocWithGroups[]) {
    if (!fs.existsSync(COMPONENT_DATA)) {
        fs.mkdirSync(COMPONENT_DATA, { recursive: true });
    }

    fs.writeFile(`${COMPONENT_DATA}/${filename}.json`, JSON.stringify(data), function (err) {
        if (err) {
            console.error(err);
            throw err;
        }
    });
}

function getComponentName(filePath: string) {
    return path.basename(filePath, path.extname(filePath));
}

function updatePropsFileName(component: ComponentDoc, originalFilePath: string) {
    component.filePath = originalFilePath;

    Object.keys(component.props).forEach(propName => {
        if (component.props[propName].declarations) {
            component.props[propName]?.declarations?.forEach(declaration => {
                declaration.fileName = originalFilePath;
            });
        }
        if (component.props[propName].parent) {
            component.props[propName].parent.fileName = originalFilePath;
        }
    });
}

function getFormattedData(data: ComponentDoc[]): ComponentDocWithGroups[] {
    // Define the groups and their corresponding terms

    const groupsConfig: GroupsConfig = {
        Events: [
            /^on[A-Z]/
        ],
        Layout: [
            "flex", "flexGrow", "flexShrink", "flexBasis", "alignSelf", "justifySelf", "order", "flexOrder",
            "gridArea", "gridColumn", "gridRow", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "slot",
            "overflow"
        ],
        Spacing: [
            "margin", "marginTop", "marginLeft", "marginRight", "marginBottom", "marginStart", "marginEnd", "marginX", "marginY",
            "padding", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "paddingStart", "paddingEnd", "paddingX", "paddingY"
        ],
        Sizing: [
            "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "defaultWidth"
        ],
        Background: [
            "background", "backgroundColor", "backgroundImage", "backgroundSize", "backgroundPosition", "backgroundRepeat",
            "opacity"
        ],
        Borders: [
            "border",
            "borderX",
            "borderY",
            "borderStyle",
            "borderTop",
            "borderLeft",
            "borderRight",
            "borderTop",
            "borderBottom",
            "borderWidth", "borderStartWidth", "borderEndWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "borderXWidth", "borderYWidth",
            "borderColor", "borderStartColor", "borderEndColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor", "borderXColor", "borderYColor",
            "borderRadius", "borderTopStartRadius", "borderTopEndRadius", "borderBottomStartRadius", "borderBottomEndRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"
        ],
        Shadows: [
            "boxShadow",
            "textShadow"
        ],
        Positioning: [
            "position", "top", "bottom", "left", "right", "start", "end", "zIndex", "isHidden", "hidden", "display"
        ],
        Typography: [
            "font",
            "fontFamily",
            "fontSize",
            "fontStyle",
            "textAlign",
            "verticalAlign",
            "lineHeight",
            "letterSpacing"
        ],
        Accessibility: [
            "role", "id", "tabIndex", "excludeFromTabOrder", "preventFocusOnPress", /^aria-/
        ]
    };

    // Define the exceptions that should be added to a specific group
    // The first element is the prop name and the second is the group key
    const groupsExceptions = [["type", "default"], ["autoFocus", "default"], ["dangerouslySetInnerHTML", "default"]];
    const excludedComponentsByDisplayName = ["H1", "H2", "H3", "H4", "H5", "H6"];

    const filteredData = data.filter(component => {
        // Check if the component is excluded
        return !excludedComponentsByDisplayName.includes(component.displayName);
    });

    return filteredData.map(component => {
        // Remove the local or server path from the filePath
        const originalFilePath = ("/packages/" + component.filePath.split("/packages/")[1]).replace(".temp", "");
        updatePropsFileName(component, originalFilePath);

        // Destructure and ignore id and ref from component.props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key: _key, ref: _ref, ...props } = component.props;

        // Initialize the groups
        const groups: Groups = {
            default: {},
            ...Object.keys(groupsConfig).reduce((acc, group) => ({ ...acc, [group]: {} }), {})
        };

        Object.entries(props).forEach(([key, prop]) => {
            let added = false;

            // Special handling for the "id" prop
            if (key === "id") {
                if (prop.type?.name === "string") {
                    groups.Accessibility[key] = prop;
                    added = true;
                } else {
                    groups.default[key] = prop;
                    added = true;
                }
                delete props[key];

                return;
            }

            // Check each group to see if the prop should be added to it
            Object.entries(groupsConfig).forEach(([group, terms]) => {
                if (Array.isArray(terms)) {
                    terms.forEach(term => {
                        if (
                            (typeof term === "string" && prop.name === term) ||
                            (term instanceof RegExp && term.test(prop.name))
                        ) {
                            groups[group][key] = prop;
                            added = true;
                        }
                    });
                }
            });

            // Validates if the props that are in the groupsExceptions array then adds them to the corresponding group
            groupsExceptions.forEach(([propName, groupKey]) => {
                if (prop.name === propName && groups.hasOwnProperty(groupKey)) {
                    Object.entries(groups).forEach(([groupName, groupProps]) => {
                        if (groupProps.hasOwnProperty(propName)) {
                            groups[groupKey][propName] = groupProps[propName];
                            delete groups[groupName][propName];
                            added = true;
                        }
                    });
                }
            });

            // If the prop wasn't added to any group, add it to the default group
            if (!added) {
                groups.default[key] = prop;
            }
        });

        return {
            ...component,
            groups
        };
    });
}

async function generateComponentList(source: string, options: Options = {}): Promise<(ComponentData | undefined)[]> {
    const exclude = options.exclude ?? [];
    const subdirs = await fs.promises.readdir(source);
    const files = await Promise.all(subdirs.map(async subdir => {
        const res = path.resolve(source, subdir);

        // Checks if the path corresponds to a directory
        if (fs.statSync(res).isDirectory()) {
            return generateComponentList(res, { exclude });
        }

        // Checks whether the file or directory is in the exclude list
        if (exclude.some(ex => res.includes(ex))) {
            return;
        }

        // Checks whether the file is a .ts or .tsx file
        if (/\.tsx?$/.test(res)) {
            const name = getComponentName(res);

            return { name, filePath: res };
        }
    }));

    return files.flat().filter(Boolean) as ComponentData[];
}

// input: docs
// output: /docs/
function toDirectoryPath(partialPath: string) {
    return `${path.sep}${partialPath}${path.sep}`;
}

function preprocessFileContent(filePath: string) {
    const content = fs.readFileSync(filePath, "utf8");

    if (ALIAS_MODE === "additive") {
        return content.replace(EXPORT_ALIAS_RE, "export { _$1 as $2, _$1 }");
    }

    return content.replace(EXPORT_ALIAS_RE, "export { $1 }");
}

// Mirrors the path the previous on-disk temp files used, `.temp` included, because
// `getFormattedData` strips it back out of the reported file path.
function toVirtualTempPath(originalFilePath: string) {
    return path.join(path.dirname(originalFilePath), path.basename(originalFilePath, ".tsx") + ".temp.tsx");
}

// Resolves the path each component is parsed under, and the in-memory content served for it.
function createParseTargets(filePaths: string[]) {
    const parsePathByFilePath = new Map<string, string>();
    const contentByParsePath = new Map<string, string>();

    for (const filePath of filePaths) {
        const parsePath = ALIAS_MODE === "virtual-temp" ? toVirtualTempPath(filePath) : filePath;

        parsePathByFilePath.set(filePath, parsePath);

        if (ALIAS_MODE !== "none") {
            contentByParsePath.set(parsePath, preprocessFileContent(filePath));
        }
    }

    return { parsePathByFilePath, contentByParsePath };
}

// Serves the rewritten sources from memory so nothing is ever written to another package's
// source tree. In `virtual-temp` mode the rewritten file is served under an additional path,
// leaving the real file — and therefore every barrel that re-exports it — untouched.
function createProgramHost(options: ts.CompilerOptions, contentByParsePath: Map<string, string>): ts.CompilerHost {
    const host = ts.createCompilerHost(options, true);

    if (contentByParsePath.size === 0) {
        return host;
    }

    const originalGetSourceFile = host.getSourceFile.bind(host);
    const originalFileExists = host.fileExists.bind(host);
    const originalReadFile = host.readFile.bind(host);

    host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
        const content = contentByParsePath.get(path.resolve(fileName));

        if (content !== undefined) {
            // scriptKind is omitted on purpose: TypeScript infers TS vs TSX from the extension.
            return ts.createSourceFile(fileName, content, languageVersion, true);
        }

        return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    };

    host.fileExists = fileName => contentByParsePath.has(path.resolve(fileName)) || originalFileExists(fileName);

    host.readFile = fileName => contentByParsePath.get(path.resolve(fileName)) ?? originalReadFile(fileName);

    return host;
}

async function generateComponentData() {
    console.log("Start API generation for components and Icon");

    const options = {
        exclude: [
            toDirectoryPath("docs"),
            toDirectoryPath("tests"),
            toDirectoryPath("utils"),
            toDirectoryPath("i18n"),
            "index.ts",
            "Context.ts"
        ]
    };

    // Generate component list for 'components' directory
    const componentList = await generateComponentList(PACKAGES, options);

    // Manually add Icon.tsx to the component list
    const iconComponent: ComponentData = { name: "Icon", filePath: ICON_FILE };
    const richIconComponent: ComponentData = { name: "RichIcon", filePath: RICH_ICON_FILE };
    const components = [...componentList, iconComponent, richIconComponent];

    if (!components.length) {
        console.error("No components found");

        return;
    }

    const definedComponents = components.filter(Boolean) as ComponentData[];
    const filePaths = definedComponents.map(component => path.resolve(component.filePath));
    const { parsePathByFilePath, contentByParsePath } = createParseTargets(filePaths);
    const rootFileNames = filePaths.map(filePath => parsePathByFilePath.get(filePath)!);

    // A single program serves both parsers. They differ only by `propFilter`, a predicate applied
    // after type resolution, and building one program instead of two per component is what makes
    // this script fast: each program re-binds the whole React + react-aria .d.ts closure.
    console.log(`Building TypeScript program for ${rootFileNames.length} components (alias mode: ${ALIAS_MODE})...`);
    const host = createProgramHost(compilerOptions, contentByParsePath);
    const program = ts.createProgram(rootFileNames, compilerOptions, host);
    const programProvider = () => program;

    for (const component of definedComponents) {
        const parsePath = parsePathByFilePath.get(path.resolve(component.filePath))!;

        try {
            const data = tsConfigParser.parseWithProgramProvider([parsePath], programProvider);
            const fullData = tsConfigFullPropsParser.parseWithProgramProvider([parsePath], programProvider);
            const { name } = component;

            writeFile(name, getFormattedData(data));
            writeFile(`${name}-full`, getFormattedData(fullData));
            console.log(`${name} API is created!`);
        } catch (error) {
            console.error(`Error generating documentation for ${component.name}:`, error);
        }
    }

    return;
}

generateComponentData().then(() => console.log("🎉 Success")).catch(err => console.error(err));
