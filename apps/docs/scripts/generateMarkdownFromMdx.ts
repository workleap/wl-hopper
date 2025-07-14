import fs from "fs/promises";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

// Import the getComponentProps function
import { getComponentProps } from "./getComponentPropsStandalone.js";

interface ProcessedFile {
    inputPath: string;
    outputPath: string;
    content: string;
}

// Type definitions for MDX attributes
interface MdxAttribute {
    name: string;
    value: string | boolean | string[] | null;
}

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "dist");

// Helper function to extract text content from children
function extractTextFromChildren(children: Node[]): string {
    let text = "";
    for (const child of children) {
        if (child.type === "text") {
            text += (child as unknown as { value: string }).value;
        } else if ((child as unknown as { children: Node[] }).children && Array.isArray((child as unknown as { children: Node[] }).children)) {
            text += extractTextFromChildren((child as unknown as { children: Node[] }).children);
        }
    }

    return text.trim();
}

// Helper function to read example file content
async function getExampleFileContent(srcPath: string): Promise<string | null> {
    try {
        // Convert the src path to actual file path
        // src="buttons/docs/button/preview" -> packages/components/src/buttons/docs/button/preview.tsx
        const filePath = path.join(process.cwd(), "..", "..", "packages", "components", "src", `${srcPath}.tsx`);
        console.log(`Attempting to read file: ${filePath}`);
        const content = await fs.readFile(filePath, "utf8");
        console.log(`✅ Successfully read file: ${filePath}`);

        return content;
    } catch (error) {
        console.warn(`❌ Could not read example file: ${srcPath}`, error);

        return null;
    }
}

// Simple plugin to remove MDX-specific elements
function remarkMdxToMarkdown() {
    return (tree: Node) => {
        let exampleCount = 0;

        visit(tree, (node: Node) => {
            const nodeData = node as unknown as Record<string, unknown>;

            // Remove MDX imports and exports
            if (nodeData.type === "mdxjsEsm") {
                nodeData.type = "html";
                nodeData.value = "";
            }

            // Convert JSX elements to more meaningful placeholders
            if (nodeData.type === "mdxJsxFlowElement" || nodeData.type === "mdxJsxTextElement") {
                const elementName = nodeData.name as string || "component";
                const attributes = (nodeData.attributes as MdxAttribute[]) || [];

                let placeholderText = "";

                // Extract meaningful information from specific components
                switch (elementName) {
                    case "Example": {
                        const srcAttr = attributes.find(attr => attr.name === "src");
                        const src = srcAttr?.value as string;

                        if (src) {
                            placeholderText = `**Example:** ${src}\n\n[EXAMPLE_CONTENT_${exampleCount}]`;
                            exampleCount++;
                        } else {
                            placeholderText = "**Example:** code example";
                        }
                        break;
                    }
                    case "PropTable": {
                        const componentAttr = attributes.find(attr => attr.name === "component");
                        const component = componentAttr?.value || "component";
                        // Use a placeholder that will be processed later
                        placeholderText = `[PROPS_TABLE_${component}]`;
                        break;
                    }
                    case "MigrateGuide": {
                        const srcAttr = attributes.find(attr => attr.name === "src");
                        const src = srcAttr?.value || "migration notes";
                        placeholderText = `**Migration Guide:** ${src}`;
                        break;
                    }
                    case "ComposedComponents": {
                        const componentsAttr = attributes.find(attr => attr.name === "components");
                        if (componentsAttr?.value && typeof componentsAttr.value === "object" && "value" in componentsAttr.value) {
                            try {
                                // Parse the string representation of the array
                                const valueStr = (componentsAttr.value as { value: string }).value;
                                if (typeof valueStr === "string") {
                                    const componentsArray = JSON.parse(valueStr.trim());
                                    if (Array.isArray(componentsArray)) {
                                        const components = componentsArray.join(",");
                                        placeholderText = `[COMPOSED_COMPONENTS_${components}]`;
                                    } else {
                                        placeholderText = "**Composed Components:** (invalid format)";
                                    }
                                } else {
                                    placeholderText = "**Composed Components:** (not a string)";
                                }
                            } catch (error) {
                                console.error("Error parsing components array:", error);
                                placeholderText = "**Composed Components:** (parsing error)";
                            }
                        } else {
                            placeholderText = "**Composed Components:** (list would appear here)";
                        }
                        break;
                    }
                    case "Callout": {
                        const variantAttr = attributes.find(attr => attr.name === "variant");
                        const variant = variantAttr?.value || "info";
                        placeholderText = `> **${variant.toString().toUpperCase()}:** `;

                        // If there are children, try to extract text content
                        if (nodeData.children && Array.isArray(nodeData.children)) {
                            const textContent = extractTextFromChildren(nodeData.children as Node[]);
                            placeholderText += textContent || "Callout content";
                        } else {
                            placeholderText += "Callout content";
                        }
                        break;
                    }
                    case "Figure": {
                        const srcAttr = attributes.find(attr => attr.name === "src");
                        const altAttr = attributes.find(attr => attr.name === "alt");
                        const captionAttr = attributes.find(attr => attr.name === "caption");

                        const src = srcAttr?.value || "";
                        const alt = altAttr?.value || "";
                        const caption = captionAttr?.value || "";

                        placeholderText = `![${alt}](${src})${caption ? `\n\n*${caption}*` : ""}`;
                        break;
                    }
                    case "FeatureFlag": {
                        // Remove FeatureFlag components entirely since they're conditional
                        // and we can't easily determine if they should be shown
                        nodeData.type = "html";
                        nodeData.value = "";
                        delete nodeData.children;
                        delete nodeData.name;
                        delete nodeData.attributes;

                        return;
                    }
                    default: {
                        // For unknown components, try to extract attributes
                        const attrStrings = attributes.map(attr => {
                            if (attr.name && attr.value) {
                                return `${attr.name}="${attr.value}"`;
                            }

                            return attr.name || "";
                        }).filter(Boolean);

                        const attrString = attrStrings.length > 0 ? ` (${attrStrings.join(", ")})` : "";
                        placeholderText = `**[${elementName}${attrString}]**`;
                        break;
                    }
                }

                nodeData.type = "paragraph";
                nodeData.children = [
                    {
                        type: "text",
                        value: placeholderText
                    }
                ];
                delete nodeData.name;
                delete nodeData.attributes;
            }

            // Remove MDX expressions
            if (nodeData.type === "mdxTextExpression" || nodeData.type === "mdxFlowExpression") {
                nodeData.type = "text";
                nodeData.value = "[expression]";
            }
        });
    };
}

// Find all MDX files in a directory
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

// Process a single MDX file using raw file reading (getComponentDetails has too many dependencies)
async function processMdxFile(filePath: string): Promise<ProcessedFile | null> {
    try {
        // Read the raw MDX content directly - this avoids Next.js context issues
        const rawContent = await fs.readFile(filePath, "utf8");

        // Use our existing remark pipeline
        const processor = unified()
            .use(remarkParse)
            .use(remarkFrontmatter, ["yaml"])
            .use(remarkMdx)
            .use(remarkMdxToMarkdown)
            .use(remarkStringify);

        const result = await processor.process(rawContent);
        let processedContent = String(result);

        //replace all \*\* with **
        processedContent = processedContent.replace(/\\\*\*/g, "**");

        console.log(processedContent);


        // Post-process to replace example placeholders with actual file content
        const exampleMatches = processedContent.match(/\\\[EXAMPLE\\_CONTENT\\_(\d+)\]/g);
        if (exampleMatches) {
            console.log(`Found ${exampleMatches.length} example placeholders in ${filePath}`);

            // Extract example sources from the original MDX content
            const exampleSources = extractExampleSources(rawContent);
            console.log(`Extracted ${exampleSources.length} example sources:`, exampleSources);

            for (let i = 0; i < exampleMatches.length; i++) {
                const placeholder = `\\[EXAMPLE\\_CONTENT\\_${i}]`;
                const src = exampleSources[i];

                console.log(`Processing placeholder ${i}: ${placeholder} -> ${src}`);

                if (src) {
                    const fileContent = await getExampleFileContent(src);
                    if (fileContent) {
                        const codeBlock = `\`\`\`tsx\n${fileContent}\n\`\`\``;
                        processedContent = processedContent.replace(placeholder, codeBlock);
                        console.log(`✅ Replaced ${placeholder} with file content`);
                    } else {
                        processedContent = processedContent.replace(placeholder, "");
                        console.log(`❌ Could not read file content for ${src}`);
                    }
                } else {
                    processedContent = processedContent.replace(placeholder, "");
                    console.log(`❌ No source found for placeholder ${i}`);
                }
            }
        }

        // Post-process to replace props table placeholders with actual tables
        const escapedPropsTableMatches = processedContent.match(/\\\[PROPS\\_TABLE\\_(.+?)\]/g);
        if (escapedPropsTableMatches) {
            for (const match of escapedPropsTableMatches) {
                const componentName = match.replace(/\\\[PROPS\\_TABLE\\_(.+?)\]/, "$1");

                try {
                    const propsTableContent = await generatePropsTable(componentName);
                    processedContent = processedContent.replace(match, propsTableContent);
                    console.log(`✅ Replaced props table for ${componentName}`);
                } catch (error) {
                    console.error(`❌ Error generating props table for ${componentName}:`, error);
                    processedContent = processedContent.replace(match, `**Props for ${componentName}:**\n\n(Error loading props data)`);
                }
            }
        }

        // Post-process to replace composed components placeholders with actual tables
        const escapedComposedComponentsMatches = processedContent.match(/\\\[COMPOSED\\_COMPONENTS\\_(.+?)\]/g);
        if (escapedComposedComponentsMatches) {
            for (const match of escapedComposedComponentsMatches) {
                const componentsString = match.replace(/\\\[COMPOSED\\_COMPONENTS\\_(.+?)\]/, "$1");
                const components = componentsString.split(",");

                try {
                    const composedComponentsTableContent = await generateComposedComponentsTable(components);
                    processedContent = processedContent.replace(match, composedComponentsTableContent);
                    console.log(`✅ Replaced composed components table for [${components.join(", ")}]`);
                } catch (error) {
                    console.error(`❌ Error generating composed components table for [${components.join(", ")}]:`, error);
                    processedContent = processedContent.replace(match, "**Composed Components:**\n\n(Error loading components data)");
                }
            }
        }

        // Convert file path to output path
        const relativePath = path.relative(CONTENT_DIR, filePath);
        const outputPath = path.join(OUTPUT_DIR, relativePath.replace(".mdx", ".md"));

        return {
            inputPath: filePath,
            outputPath,
            content: processedContent
        };
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);

        return null;
    }
}

// Helper function to extract example sources from original MDX content
function extractExampleSources(content: string): string[] {
    const sources: string[] = [];
    const exampleRegex = /<Example\s+src=["']([^"']+)["']/g;
    let match;

    while ((match = exampleRegex.exec(content)) !== null) {
        sources.push(match[1]);
    }

    return sources;
}

// Helper function to generate markdown table from props data
async function generatePropsTable(componentName: string): Promise<string> {
    try {
        const data = await getComponentProps(componentName);

        if (!data || !data.groups || data.groups.length === 0) {
            return `**Props for ${componentName}:**\n\n(No props found)`;
        }

        let markdownTable = `**Props for ${componentName}:**\n\n`;

        // Process each group
        for (const group of data.groups) {
            const groupName = group.name;
            const items = group.props;

            if (items.length === 0) {
                continue;
            }

            if (groupName !== "default") {
                markdownTable += `### ${groupName.charAt(0).toUpperCase() + groupName.slice(1)}\n\n`;
            }

            // Create table header
            markdownTable += "| Prop | Type | Default | Description |\n";
            markdownTable += "|------|------|---------|-------------|\n";

            // Add table rows
            for (const item of items) {
                const propItem = item as { name: string; required: boolean; type?: { name?: string } | string; defaultValue?: { value?: string } | string; description?: string };
                const name = propItem.name + (propItem.required ? "" : "?");
                const type = (typeof propItem.type === "string" ? propItem.type : propItem.type?.name || "-").replace(/\|/g, "\\|"); // Escape pipe characters
                const defaultValue = (typeof propItem.defaultValue === "string" ? propItem.defaultValue : propItem.defaultValue?.value || "-");
                const description = (propItem.description || "").replace(/\n/g, " ").replace(/\|/g, "\\|"); // Clean description

                markdownTable += `| ${name} | ${type} | ${defaultValue} | ${description} |\n`;
            }

            markdownTable += "\n";
        }

        return markdownTable;
    } catch (error) {
        console.error(`Error generating props table for ${componentName}:`, error);

        return `**Props for ${componentName}:**\n\n(Error loading props data)`;
    }
}

// Helper function to extract component information from MDX files
async function getComponentInfo(componentName: string): Promise<{ title: string; description: string } | null> {
    try {
        // Find the MDX file for this component
        const possiblePaths = [
            path.join(CONTENT_DIR, "components", "buttons", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "forms", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "content", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "collections", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "navigation", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "overlays", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "pickers", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "status", `${componentName}.mdx`),
            path.join(CONTENT_DIR, "components", "icons", `${componentName}.mdx`)
        ];

        for (const filePath of possiblePaths) {
            try {
                const content = await fs.readFile(filePath, "utf8");
                const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

                if (frontmatterMatch) {
                    const frontmatterContent = frontmatterMatch[1];
                    const titleMatch = frontmatterContent.match(/title:\s*(.+)/);
                    const descriptionMatch = frontmatterContent.match(/description:\s*(.+)/);

                    const title = titleMatch ? titleMatch[1].trim() : componentName;
                    const description = descriptionMatch ? descriptionMatch[1].trim() : "";

                    return { title, description };
                }
            } catch (error) {
                // Continue to next path if file doesn't exist
                continue;
            }
        }

        // If no MDX file found, return basic info
        return { title: componentName, description: "" };
    } catch (error) {
        console.error(`Error getting component info for ${componentName}:`, error);

        return { title: componentName, description: "" };
    }
}

// Helper function to generate composed components table
async function generateComposedComponentsTable(components: string[]): Promise<string> {
    const componentInfos = await Promise.all(
        components.map(async componentName => {
            const info = await getComponentInfo(componentName);

            return {
                name: componentName,
                title: info?.title || componentName,
                description: info?.description || ""
            };
        })
    );

    let table = "| Component | Title | Description |\n";
    table += "|-----------|-------|-------------|\n";

    for (const info of componentInfos) {
        const description = info.description || "No description available";
        table += `| ${info.name} | ${info.title} | ${description} |\n`;
    }

    return table;
}

// Write processed file to output directory
async function writeProcessedFile(processedFile: ProcessedFile): Promise<void> {
    try {
        // Ensure output directory exists
        await fs.mkdir(path.dirname(processedFile.outputPath), { recursive: true });

        // Write the file
        await fs.writeFile(processedFile.outputPath, processedFile.content);

        console.log(`✅ Generated: ${processedFile.outputPath}`);
    } catch (error) {
        console.error(`Error writing ${processedFile.outputPath}:`, error);
    }
}

// Main function
async function main() {
    try {
        console.log("🚀 Starting MDX to Markdown conversion...");

        // Ensure output directory exists
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        // Find all MDX files
        const mdxFiles = await findMdxFiles(CONTENT_DIR);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];

        for (const filePath of mdxFiles) {
            const processed = await processMdxFile(filePath);
            if (processed) {
                processedFiles.push(processed);
            }
        }

        // Write all processed files
        for (const processedFile of processedFiles) {
            await writeProcessedFile(processedFile);
        }

        // Generate package.json for the output
        const packageJson = {
            name: "hopper-docs-markdown",
            version: "1.0.0",
            description: "Generated markdown files from Hopper documentation",
            private: true,
            scripts: {},
            dependencies: {}
        };

        const packageJsonPath = path.join(OUTPUT_DIR, "package.json");
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`✅ Successfully converted ${processedFiles.length} MDX files to Markdown`);
        console.log(`📦 Output directory: ${OUTPUT_DIR}`);
    } catch (error) {
        console.error("❌ Error during conversion:", error);
        process.exit(1);
    }
}

// Run the script
main();
