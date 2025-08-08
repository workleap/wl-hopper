import fs from "fs";
import path from "path";
import docgenTs, { type ComponentDoc, type PropItem } from "react-docgen-typescript";

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

const tsConfigParser = docgenTs.withCustomConfig(
    "./tsconfig.json",
    {
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
    }
);

async function writeFile(filename: string, data: ComponentDocWithGroups[]) {
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
            component.props[propName].parent!.fileName = originalFilePath;
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

    return content.replace(/export\s*{\s*_(\w+)\s*as\s*(\w+)\s*}/g, "export { $1 }");
}

function createTempFile(content: string, originalFilePath: string) {
    const tempFilePath = path.join(path.dirname(originalFilePath), path.basename(originalFilePath, ".tsx") + ".temp.tsx");
    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
}

function deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
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

    for (const component of components) {
        if (component) {
            const fileContent = preprocessFileContent(component.filePath);
            const tempFilePath = createTempFile(fileContent, component.filePath);

            try {
                const data = tsConfigParser.parse(tempFilePath);
                const { name } = component;
                const formattedData = getFormattedData(data);

                await writeFile(name, formattedData);
                console.log(`${name} API is created!`);
            } catch (error) {
                console.error(`Error generating documentation for ${component.name}:`, error);
            } finally {
                deleteFile(tempFilePath);
            }
        }
    }

    return;
}

generateComponentData().then(() => console.log("🎉 Success")).catch(err => console.error(err));
