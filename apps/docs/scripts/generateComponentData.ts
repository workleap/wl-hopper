import crypto from "crypto";
import fs from "fs";
import path from "path";
import docgenTs, { type ComponentDoc, type PropItem } from "react-docgen-typescript";

// Cache storage
interface CacheEntry {
    hash: string;
    data: ComponentDocWithGroups[];
}

interface Cache {
    [key: string]: CacheEntry;
}

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
const CACHE_FILE = path.join(process.cwd(), "datas", "components", ".cache.json");

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

            // Remove props from StyledSystemProps
            if (prop?.parent?.name === "StyledSystemProps") {
                return false;
            }

            return true;
        }
    }
);

// Ensure component data directory exists
function ensureComponentDataDir() {
    if (!fs.existsSync(COMPONENT_DATA)) {
        fs.mkdirSync(COMPONENT_DATA, { recursive: true });
    }
}

// Write file with Promise support
function writeFileAsync(filename: string, data: ComponentDocWithGroups[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const filePath = `${COMPONENT_DATA}/${filename}.json`;
        fs.writeFile(filePath, JSON.stringify(data), err => {
            if (err) {
                console.error(`Error writing ${filename}:`, err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Load cache from disk
function loadCache(): Cache {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const cacheData = fs.readFileSync(CACHE_FILE, "utf8");

            return JSON.parse(cacheData);
        }
    } catch (error) {
        console.warn("Failed to load cache, will regenerate:", error);
    }

    return {};
}

// Save cache to disk
function saveCache(cache: Cache): void {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
    } catch (error) {
        console.warn("Failed to save cache:", error);
    }
}

// Debounced cache save to reduce disk I/O
let cacheSaveTimeout: NodeJS.Timeout | null = null;
function debouncedSaveCache(cache: Cache): void {
    if (cacheSaveTimeout) {
        clearTimeout(cacheSaveTimeout);
    }

    cacheSaveTimeout = setTimeout(() => {
        try {
            fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
        } catch (error) {
            console.warn("Failed to save cache:", error);
        }
        cacheSaveTimeout = null;
    }, 500);
}

// Calculate hash for a file
function calculateFileHash(filePath: string): string {
    try {
        const content = fs.readFileSync(filePath, "utf8");

        return crypto.createHash("md5").update(content).digest("hex");
    } catch (error) {
        console.warn(`Failed to calculate hash for ${filePath}:`, error);

        // Return a unique value to force regeneration
        return Date.now().toString();
    }
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

// Memoized groups configuration
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

// Optimized lookup maps for faster property categorization
const stringTermsMap = new Map<string, string>();
const regexTerms = new Map<string, RegExp[]>();

// Initialize lookup maps
for (const [group, terms] of Object.entries(groupsConfig)) {
    const stringTerms: string[] = [];
    const regexList: RegExp[] = [];

    for (const term of terms) {
        if (typeof term === "string") {
            stringTerms.push(term);
        } else if (term instanceof RegExp) {
            regexList.push(term);
        }
    }

    // Add string terms to map
    for (const term of stringTerms) {
        stringTermsMap.set(term, group);
    }

    // Add regex terms to map
    if (regexList.length > 0) {
        regexTerms.set(group, regexList);
    }
}

function getFormattedData(data: ComponentDoc[]): ComponentDocWithGroups[] {
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

        // Process props more efficiently
        for (const [key, prop] of Object.entries(props)) {
            let added = false;

            // Special handling for the "id" prop
            if (key === "id") {
                if (prop.type?.name === "string") {
                    groups.Accessibility[key] = prop;
                } else {
                    groups.default[key] = prop;
                }
                delete props[key];
                continue;
            }

            // Fast lookup for string terms
            const group = stringTermsMap.get(prop.name);
            if (group) {
                groups[group][key] = prop;
                added = true;
            } else {
                // Check regex terms only if string lookup failed
                for (const [groupName, patterns] of regexTerms.entries()) {
                    for (const pattern of patterns) {
                        if (pattern.test(prop.name)) {
                            groups[groupName][key] = prop;
                            added = true;
                            break;
                        }
                    }
                    if (added) {break;}
                }
            }

            // Handle exceptions
            if (!added) {
                for (const [propName, groupKey] of groupsExceptions) {
                    if (prop.name === propName && groups.hasOwnProperty(groupKey)) {
                        for (const [groupName, groupProps] of Object.entries(groups)) {
                            if (groupProps.hasOwnProperty(propName)) {
                                groups[groupKey][propName] = groupProps[propName];
                                delete groups[groupName][propName];
                                added = true;
                                break;
                            }
                        }
                        if (added) {break;}
                    }
                }
            }

            // If the prop wasn't added to any group, add it to the default group
            if (!added) {
                groups.default[key] = prop;
            }
        }

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

// In-memory content processing to avoid temp files when possible
function preprocessFileContent(filePath: string) {
    const content = fs.readFileSync(filePath, "utf8");

    return content.replace(/export\s*{\s*_(\w+)\s*as\s*(\w+)\s*}/g, "export { $1 }");
}

// Create a temp file only if necessary
function createTempFile(content: string, originalFilePath: string) {
    // Use memory-based approach for smaller files
    if (content.length < 1024 * 1024) { // 1MB threshold
        return { content, isTemp: false };
    }

    // Fall back to file-based approach for larger files
    const tempFilePath = path.join(
        path.dirname(originalFilePath),
        path.basename(originalFilePath, ".tsx") + ".temp.tsx"
    );
    fs.writeFileSync(tempFilePath, content, "utf8");

    return { path: tempFilePath, isTemp: true };
}

// Clean up temp file if it exists
function deleteFile(fileInfo: { path?: string; isTemp: boolean } | string) {
    if (typeof fileInfo === "string") {
        if (fs.existsSync(fileInfo)) {
            fs.unlinkSync(fileInfo);
        }
    } else if (fileInfo.isTemp && fileInfo.path && fs.existsSync(fileInfo.path)) {
        fs.unlinkSync(fileInfo.path);
    }
}

// Process a single component and return processing results
async function processComponent(
    component: ComponentData,
    cache: Cache
): Promise<{
        name: string;
        fromCache: boolean;
        cacheEntry?: CacheEntry;
    }> {
    try {
        const fileHash = calculateFileHash(component.filePath);
        const { name } = component;

        // Check if we have a valid cached version
        if (cache[name] && cache[name].hash === fileHash) {
            return {
                name,
                fromCache: true,
                cacheEntry: cache[name]
            };
        }

        // Process the component if not in cache or hash changed
        const fileContent = preprocessFileContent(component.filePath);
        const fileInfo = createTempFile(fileContent, component.filePath);

        try {
            let data;
            if (typeof fileInfo === "string") {
                // Handle string case (old implementation)
                data = tsConfigParser.parse(fileInfo);
            } else if (fileInfo.isTemp && fileInfo.path) {
                // Use file-based parsing for large files
                data = tsConfigParser.parse(fileInfo.path);
            } else if (!fileInfo.isTemp && "content" in fileInfo) {
                // Use in-memory parsing for smaller files
                try {
                    // Try to use the in-memory content
                    const tempFilePath = path.join(
                        path.dirname(component.filePath),
                        path.basename(component.filePath, ".tsx") + ".temp.tsx"
                    );
                    fs.writeFileSync(tempFilePath, fileContent, "utf8");
                    data = tsConfigParser.parse(tempFilePath);
                    deleteFile(tempFilePath);
                } catch (e) {
                    console.warn(`Failed to parse ${component.name} in memory, falling back to file-based parsing`);
                    // Fallback to file-based parsing
                    const tempFilePath = path.join(
                        path.dirname(component.filePath),
                        path.basename(component.filePath, ".tsx") + ".temp.tsx"
                    );
                    fs.writeFileSync(tempFilePath, fileContent, "utf8");
                    data = tsConfigParser.parse(tempFilePath);
                    deleteFile(tempFilePath);
                }
            } else {
                // Fallback for unexpected cases
                const tempFilePath = path.join(
                    path.dirname(component.filePath),
                    path.basename(component.filePath, ".tsx") + ".temp.tsx"
                );
                fs.writeFileSync(tempFilePath, fileContent, "utf8");
                data = tsConfigParser.parse(tempFilePath);
                deleteFile(tempFilePath);
            }

            const formattedData = getFormattedData(data);

            // Create cache entry
            const cacheEntry = {
                hash: fileHash,
                data: formattedData
            };

            // Write to file
            await writeFileAsync(name, formattedData);

            return {
                name,
                fromCache: false,
                cacheEntry
            };
        } finally {
            deleteFile(fileInfo);
        }
    } catch (error) {
        console.error(`Error generating documentation for ${component.name}:`, error);

        return { name: component.name, fromCache: false };
    }
}

async function generateComponentData() {
    console.log("Start API generation for components and Icon");
    const startTime = Date.now();

    // Ensure the component data directory exists once at the beginning
    ensureComponentDataDir();

    // Load cache
    const cache: Cache = loadCache();
    const newCache: Cache = {};
    let cacheHits = 0;
    let processedCount = 0;
    let cacheChanged = false;

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

    // Process components in parallel with concurrency control
    const concurrencyLimit = Math.max(4, Math.min(10, Math.floor(components.length / 2)));
    const chunks = [];

    // Split components into chunks for controlled parallelism
    for (let i = 0; i < components.length; i += concurrencyLimit) {
        chunks.push(components.slice(i, i + concurrencyLimit));
    }

    const totalCount = components.length;

    // Process each chunk of components in parallel
    for (const chunk of chunks) {
        const results = await Promise.all(
            chunk.filter((component): component is ComponentData => !!component)
                .map(component => processComponent(component, cache))
        );

        // Process results
        for (const result of results) {
            if (!result.name) {continue;}

            if (result.fromCache) {
                newCache[result.name] = cache[result.name];
                cacheHits++;
                processedCount++;
                console.log(`${result.name} API loaded from cache (${processedCount}/${totalCount})`);
            } else if (result.cacheEntry) {
                newCache[result.name] = result.cacheEntry;
                cacheChanged = true;
                processedCount++;
                console.log(`${result.name} API is created! (${processedCount}/${totalCount})`);
            }
        }

        // Save cache incrementally after each chunk if it changed
        if (cacheChanged) {
            debouncedSaveCache(newCache);
        }
    }

    // Ensure final cache is saved
    if (cacheChanged) {
        saveCache(newCache);
    } else {
        console.log("No changes detected, using cached data");
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`🎉 Success! Generated documentation for ${totalCount} components - ⚡ ${cacheHits} components loaded from cache - ⏱️ Completed in ${duration.toFixed(2)} seconds`);
}

// Run the generator
generateComponentData().catch(err => console.error("Fatal error:", err));
