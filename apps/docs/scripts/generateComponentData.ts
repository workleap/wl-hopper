import crypto from "crypto";
import fs from "fs";
import path from "path";
import docgenTs, { type ComponentDoc, type PropItem } from "react-docgen-typescript";
import { promisify } from "util";

// Convert callback-based fs methods to Promise-based
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const mkdirAsync = promisify(fs.mkdir);

// Type definitions
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

// Cache-related interfaces
interface ComponentCache {
    [filePath: string]: {
        hash: string;
        timestamp: number;
        outputPath: string;
    };
}

interface CacheFile {
    version: string;
    components: ComponentCache;
    lastUpdated: number;
}

// Constants
const PACKAGES = path.join(process.cwd(), "..", "..", "packages", "components", "src");
const ICON_FILE = path.join(process.cwd(), "..", "..", "packages", "icons", "src", "Icon.tsx");
const RICH_ICON_FILE = path.join(process.cwd(), "..", "..", "packages", "icons", "src", "RichIcon.tsx");
const COMPONENT_DATA = path.join(process.cwd(), "datas", "components");
const CACHE_FILE = path.join(process.cwd(), "node_modules", ".cache", "component-data-cache.json");

// Group configurations
const GROUPS_CONFIG: GroupsConfig = {
    Events: [/^on[A-Z]/],
    Layout: [
        "flex", "flexGrow", "flexShrink", "flexBasis", "alignSelf", "justifySelf", "order", "flexOrder",
        "gridArea", "gridColumn", "gridRow", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "slot",
        "overflow"
    ],
    Spacing: [
        "margin", "marginTop", "marginLeft", "marginRight", "marginBottom", "marginStart", "marginEnd", "marginX", "marginY",
        "padding", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "paddingStart", "paddingEnd", "paddingX", "paddingY"
    ],
    Sizing: ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "defaultWidth"],
    Background: [
        "background", "backgroundColor", "backgroundImage", "backgroundSize", "backgroundPosition", "backgroundRepeat",
        "opacity"
    ],
    Borders: [
        "border", "borderX", "borderY", "borderStyle", "borderTop", "borderLeft", "borderRight", "borderBottom",
        "borderWidth", "borderStartWidth", "borderEndWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth",
        "borderBottomWidth", "borderXWidth", "borderYWidth", "borderColor", "borderStartColor", "borderEndColor",
        "borderLeftColor", "borderRightColor", "borderTopColor", "borderBottomColor", "borderXColor", "borderYColor",
        "borderRadius", "borderTopStartRadius", "borderTopEndRadius", "borderBottomStartRadius", "borderBottomEndRadius",
        "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"
    ],
    Shadows: ["boxShadow", "textShadow"],
    Positioning: ["position", "top", "bottom", "left", "right", "start", "end", "zIndex", "isHidden", "hidden", "display"],
    Typography: ["font", "fontFamily", "fontSize", "fontStyle", "textAlign", "verticalAlign", "lineHeight", "letterSpacing"],
    Accessibility: ["role", "id", "tabIndex", "excludeFromTabOrder", "preventFocusOnPress", /^aria-/]
};

// Constants for filtering
const GROUPS_EXCEPTIONS = [["type", "default"], ["autoFocus", "default"], ["dangerouslySetInnerHTML", "default"]];
const EXCLUDED_COMPONENTS = ["H1", "H2", "H3", "H4", "H5", "H6"];
const ALWAYS_INCLUDE_PROPS = ["children", "className", "id", "style"];

// Configure the TypeScript parser
const tsConfigParser = docgenTs.withCustomConfig(
    "./tsconfig.json",
    {
        shouldRemoveUndefinedFromOptional: true,
        componentNameResolver: exp => {
            const name = exp.getName();

            return name.startsWith("_") ? name.slice(1) : name;
        },
        propFilter: prop => {
            // Always include these props
            if (ALWAYS_INCLUDE_PROPS.includes(prop.name)) {
                return true;
            }

            // Remove props from React
            if (prop?.parent?.fileName.includes("node_modules/@types/react")) {
                return false;
            }

            // Remove props from StyledSystemProps
            if (prop?.parent?.name === "StyledSystemProps") {
                return false;
            }

            return true;
        }
    }
);

/**
 * Writes component data to a JSON file
 */
async function writeFile(filename: string, data: ComponentDocWithGroups[]): Promise<void> {
    try {
        if (!fs.existsSync(COMPONENT_DATA)) {
            fs.mkdirSync(COMPONENT_DATA, { recursive: true });
        }

        await writeFileAsync(`${COMPONENT_DATA}/${filename}.json`, JSON.stringify(data));
    } catch (err) {
        console.error(`Error writing file ${filename}.json:`, err);
        throw err;
    }
}

/**
 * Gets the component name from a file path
 */
function getComponentName(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
}

/**
 * Updates the file paths in the component props
 */
function updatePropsFileName(component: ComponentDoc, originalFilePath: string): void {
    component.filePath = originalFilePath;

    Object.values(component.props).forEach(prop => {
        if (prop.declarations) {
            prop.declarations.forEach(declaration => {
                declaration.fileName = originalFilePath;
            });
        }
        if (prop.parent) {
            prop.parent.fileName = originalFilePath;
        }
    });
}

/**
 * Formats the component data by organizing props into groups
 */
function getFormattedData(data: ComponentDoc[]): ComponentDocWithGroups[] {
    // Filter out excluded components
    const filteredData = data.filter(component =>
        !EXCLUDED_COMPONENTS.includes(component.displayName)
    );

    return filteredData.map(component => {
        // Normalize file path
        const originalFilePath = ("/packages/" + component.filePath.split("/packages/")[1]).replace(".temp", "");
        updatePropsFileName(component, originalFilePath);

        // Destructure and ignore id and ref from component.props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key: _key, ref: _ref, ...props } = component.props;

        // Initialize the groups
        const groups: Groups = {
            default: {},
            ...Object.keys(GROUPS_CONFIG).reduce((acc, group) => ({ ...acc, [group]: {} }), {})
        };

        // Process each prop
        Object.entries(props).forEach(([key, prop]) => {
            let added = false;

            // Special handling for the "id" prop
            if (key === "id") {
                groups[prop.type?.name === "string" ? "Accessibility" : "default"][key] = prop;
                added = true;
                delete props[key];

                return;
            }

            // Check each group to see if the prop should be added to it
            for (const [group, terms] of Object.entries(GROUPS_CONFIG)) {
                for (const term of terms) {
                    if ((typeof term === "string" && prop.name === term) ||
                        (term instanceof RegExp && term.test(prop.name))) {
                        groups[group][key] = prop;
                        added = true;
                        break;
                    }
                }
                if (added) {break;}
            }

            // Handle exceptions
            if (!added) {
                for (const [propName, groupKey] of GROUPS_EXCEPTIONS) {
                    if (prop.name === propName && groupKey in groups) {
                        for (const [groupName, groupProps] of Object.entries(groups)) {
                            if (propName in groupProps) {
                                groups[groupKey][propName] = groupProps[propName];
                                delete groups[groupName][propName];
                                added = true;
                                break;
                            }
                        }
                    }
                    if (added) {break;}
                }
            }

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

/**
 * Recursively generates a list of components from a directory
 */
async function generateComponentList(source: string, options: Options = {}): Promise<ComponentData[]> {
    const exclude = options.exclude ?? [];

    try {
        const subdirs = await fs.promises.readdir(source);
        const filesPromises = subdirs.map(async subdir => {
            const res = path.resolve(source, subdir);

            // Skip if in exclude list
            if (exclude.some(ex => res.includes(ex))) {
                return null;
            }

            const stats = fs.statSync(res);

            // Recursively process directories
            if (stats.isDirectory()) {
                return generateComponentList(res, { exclude });
            }

            // Process TypeScript files
            if (/\.tsx?$/.test(res)) {
                return { name: getComponentName(res), filePath: res };
            }

            return null;
        });

        const files = await Promise.all(filesPromises);

        return files.flat().filter(Boolean) as ComponentData[];
    } catch (error) {
        console.error(`Error generating component list from ${source}:`, error);

        return [];
    }
}

/**
 * Converts a path segment to a directory path with separators
 */
function toDirectoryPath(partialPath: string): string {
    return `${path.sep}${partialPath}${path.sep}`;
}

/**
 * Preprocesses file content to handle special export syntax
 */
function preprocessFileContent(filePath: string): string {
    try {
        const content = fs.readFileSync(filePath, "utf8");

        return content.replace(/export\s*{\s*_(\w+)\s*as\s*(\w+)\s*}/g, "export { $1 }");
    } catch (error) {
        console.error(`Error preprocessing file ${filePath}:`, error);
        throw error;
    }
}

/**
 * Creates a temporary file for processing
 */
function createTempFile(content: string, originalFilePath: string): string {
    const tempFilePath = path.join(
        path.dirname(originalFilePath),
        path.basename(originalFilePath, ".tsx") + ".temp.tsx"
    );
    fs.writeFileSync(tempFilePath, content, "utf8");

    return tempFilePath;
}

/**
 * Deletes a temporary file
 */
function deleteFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

/**
 * Calculates a hash for a file's content
 */
function calculateFileHash(filePath: string): string {
    try {
        const content = fs.readFileSync(filePath, "utf8");

        return crypto.createHash("md5").update(content).digest("hex");
    } catch (error) {
        console.error(`Error calculating hash for ${filePath}:`, error);

        return "";
    }
}

/**
 * Loads the cache file if it exists
 */
async function loadCache(): Promise<CacheFile> {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const cacheData = await readFileAsync(CACHE_FILE, "utf8");

            return JSON.parse(cacheData);
        }
    } catch (error) {
        console.warn("Error loading cache file:", error);
    }

    // Return empty cache if file doesn't exist or there was an error
    return {
        version: "1.0.0",
        components: {},
        lastUpdated: Date.now()
    };
}

/**
 * Saves the cache to disk
 */
async function saveCache(cache: CacheFile): Promise<void> {
    try {
        // Ensure the cache directory exists
        const cacheDir = path.dirname(CACHE_FILE);
        if (!fs.existsSync(cacheDir)) {
            await mkdirAsync(cacheDir, { recursive: true });
        }

        cache.lastUpdated = Date.now();
        await writeFileAsync(CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (error) {
        console.error("Error saving cache file:", error);
    }
}

/**
 * Checks if a component needs to be processed based on cache
 */
function needsProcessing(component: ComponentData, cache: CacheFile): boolean {
    const { filePath, name } = component;
    const outputPath = `${COMPONENT_DATA}/${name}.json`;

    // Always process if output doesn't exist
    if (!fs.existsSync(outputPath)) {
        return true;
    }

    const currentHash = calculateFileHash(filePath);
    const cachedComponent = cache.components[filePath];

    // Process if not in cache or hash has changed
    if (!cachedComponent || cachedComponent.hash !== currentHash) {
        return true;
    }

    return false;
}

/**
 * Parses a component file and generates its documentation
 */
async function processComponent(component: ComponentData): Promise<void> {
    let tempFilePath = "";

    try {
        // Preprocess the file content
        const fileContent = preprocessFileContent(component.filePath);

        // Create a temporary file
        tempFilePath = createTempFile(fileContent, component.filePath);

        // Parse the component
        const data = tsConfigParser.parse(tempFilePath);

        if (!data || data.length === 0) {
            console.warn(`No documentation generated for ${component.name}`);

            return;
        }

        const formattedData = getFormattedData(data);

        // Write the formatted data to a file
        await writeFile(component.name, formattedData);
        console.log(`${component.name} API is created!`);
    } catch (error) {
        console.error(`Error generating documentation for ${component.name}:`, error);
    } finally {
        // Clean up the temporary file
        if (tempFilePath) {
            deleteFile(tempFilePath);
        }
    }
}

/**
 * Main function to generate component data
 */
async function generateComponentData(): Promise<void> {
    console.log("Start API generation for components and Icon");

    try {
        // Load cache
        const cache = await loadCache();
        console.log(`Loaded cache with ${Object.keys(cache.components).length} cached components`);

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

        // Manually add Icon components to the list
        const iconComponents: ComponentData[] = [
            { name: "Icon", filePath: ICON_FILE },
            { name: "RichIcon", filePath: RICH_ICON_FILE }
        ];

        const components = [...componentList, ...iconComponents];

        if (!components.length) {
            console.error("No components found");

            return;
        }

        // Filter components that need processing
        const componentsToProcess = components.filter(component => needsProcessing(component, cache));

        if (componentsToProcess.length === 0) {
            console.log("All components are up to date. Nothing to process.");

            return;
        }

        console.log(`Processing ${componentsToProcess.length} of ${components.length} components (${components.length - componentsToProcess.length} from cache)`);

        // Process components in parallel with a concurrency limit
        const concurrencyLimit = 5;
        for (let i = 0; i < componentsToProcess.length; i += concurrencyLimit) {
            const batch = componentsToProcess.slice(i, i + concurrencyLimit);
            await Promise.all(batch.map(async component => {
                await processComponent(component);

                // Update cache after successful processing
                cache.components[component.filePath] = {
                    hash: calculateFileHash(component.filePath),
                    timestamp: Date.now(),
                    outputPath: `${COMPONENT_DATA}/${component.name}.json`
                };
            }));
        }

        // Save updated cache
        await saveCache(cache);

        console.log("🎉 Success: All components processed successfully");
    } catch (error) {
        console.error("Failed to generate component data:", error);
        throw error;
    }
}

// Run the script
generateComponentData().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});
