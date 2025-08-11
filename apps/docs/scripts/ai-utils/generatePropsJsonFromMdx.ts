import fs from "fs/promises";
import path from "path";
import { getComponentProps } from "./getComponentPropsStandalone.js";

interface PropItem {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
}

interface PropGroup {
    name: string;
    props: PropItem[];
}

interface ComponentPropsData {
    componentName: string;
    groups: PropGroup[];
}

interface GeneratePropsJsonOptions {
    files: string;
    outputPath: string;
}

// Raw prop data interface from getComponentProps
interface RawPropData {
    name: string;
    required: boolean;
    type?: { name?: string } | string;
    defaultValue?: { value?: string } | string;
    description?: string;
}

// Helper function to find all MDX files in a directory
async function findMdxFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subdirFiles = await findMdxFiles(fullPath);
                files.push(...subdirFiles);
            } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }

    return files;
}

// Helper function to extract PropTable components from MDX content
function extractPropTableComponents(content: string): string[] {
    const components: string[] = [];
    const propTableRegex = /<PropTable\s+component=["']([^"']+)["']/g;
    let match;

    while ((match = propTableRegex.exec(content)) !== null) {
        components.push(match[1]);
    }

    return components;
}

// Helper function to filter important props
function filterImportantProps(rawProps: RawPropData[]): PropItem[] {
    return rawProps.map((prop: RawPropData) => {
        const propItem = prop as {
            name: string;
            required: boolean;
            type?: { name?: string } | string;
            defaultValue?: { value?: string } | string;
            description?: string;
        };

        return {
            name: propItem.name,
            type: typeof propItem.type === "string" ? propItem.type : propItem.type?.name || "unknown",
            required: propItem.required || false,
            defaultValue: typeof propItem.defaultValue === "string"
                ? propItem.defaultValue
                : propItem.defaultValue?.value || undefined,
            description: propItem.description || undefined
        };
    });
}

// Helper function to get filtered component props data
async function getFilteredComponentProps(componentName: string): Promise<ComponentPropsData | null> {
    try {
        const data = await getComponentProps(componentName);

        if (!data || !data.groups || data.groups.length === 0) {
            console.warn(`No props data found for component: ${componentName}`);

            return null;
        }

        const filteredGroups: PropGroup[] = data.groups.map((group: { name: string; props: unknown[] }) => ({
            name: group.name,
            props: filterImportantProps(group.props as RawPropData[])
        })).filter((group: PropGroup) => group.props.length > 0);

        return {
            componentName,
            groups: filteredGroups
        };
    } catch (error) {
        console.error(`Error getting props for component ${componentName}:`, error);

        return null;
    }
}

// Main function to generate JSON files from MDX
export async function generatePropsJsonFromMdx(options: GeneratePropsJsonOptions): Promise<void> {
    try {
        console.log("🚀 Starting Props JSON generation from MDX files...");

        // Ensure output directory exists
        await fs.mkdir(options.outputPath, { recursive: true });

        // Find all MDX files
        const mdxFiles = await findMdxFiles(options.files);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Set to track unique components (avoid duplicates)
        const uniqueComponents = new Set<string>();

        // Extract PropTable components from all MDX files
        for (const filePath of mdxFiles) {
            try {
                const content = await fs.readFile(filePath, "utf8");
                const components = extractPropTableComponents(content);

                for (const component of components) {
                    uniqueComponents.add(component);
                }
            } catch (error) {
                console.error(`Error reading ${filePath}:`, error);
            }
        }

        console.log(`🔍 Found ${uniqueComponents.size} unique components with PropTable`);

        // Generate JSON files for each component
        const successfulComponents: string[] = [];
        const failedComponents: string[] = [];

        for (const componentName of uniqueComponents) {
            try {
                const componentData = await getFilteredComponentProps(componentName);

                if (componentData) {
                    const jsonPath = path.join(options.outputPath, `${componentName}.json`);
                    await fs.writeFile(jsonPath, JSON.stringify(componentData, null, 2));

                    console.log(`✅ Generated JSON for: ${componentName}`);
                    successfulComponents.push(componentName);
                } else {
                    console.warn(`⚠️ No data generated for: ${componentName}`);
                    failedComponents.push(componentName);
                }
            } catch (error) {
                console.error(`❌ Error generating JSON for ${componentName}:`, error);
                failedComponents.push(componentName);
            }
        }

        // Generate summary
        const summary = {
            totalComponents: uniqueComponents.size,
            successfulComponents: successfulComponents.length,
            failedComponents: failedComponents.length,
            successful: successfulComponents.sort(),
            failed: failedComponents.sort(),
            generatedAt: new Date().toISOString()
        };

        const summaryPath = path.join(options.outputPath, "_summary.json");
        await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));

        console.log(`✅ Successfully generated JSON for ${successfulComponents.length} components`);
        if (failedComponents.length > 0) {
            console.log(`❌ Failed to generate JSON for ${failedComponents.length} components: ${failedComponents.join(", ")}`);
        }
        console.log(`📦 Output directory: ${options.outputPath}`);
    } catch (error) {
        console.error("❌ Error during Props JSON generation:", error);
        process.exit(1);
    }
}
