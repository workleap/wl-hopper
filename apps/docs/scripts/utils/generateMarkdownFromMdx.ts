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
function remarkMdxToMarkdown(options: GenerateMarkdownOptions) {
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
                            placeholderText = `[EXAMPLE_CONTENT_${exampleCount}]`;
                            exampleCount++;
                        } else {
                            placeholderText = "";
                        }
                        break;
                    }
                    case "PropTable": {
                        if (options.props) {
                            const componentAttr = attributes.find(attr => attr.name === "component");
                            const component = componentAttr?.value || "component";
                            // Use a placeholder that will be processed later
                            placeholderText = `[PROPS_TABLE_${component}]`;
                        } else {
                            // When options.props is false, remove the PropTable entirely
                            placeholderText = "";
                        }
                        break;
                    }
                    case "MigrateGuide": {
                        const srcAttr = attributes.find(attr => attr.name === "src");
                        const src = srcAttr?.value as string;
                        if (src) {
                            placeholderText = `[MIGRATION_GUIDE_${src}]`;
                        } else {
                            placeholderText = "";
                        }
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
async function processMdxFile(filePath: string, options: GenerateMarkdownOptions): Promise<ProcessedFile | null> {
    try {
        // Read the raw MDX content directly - this avoids Next.js context issues
        const rawContent = await fs.readFile(filePath, "utf8");

        // Extract frontmatter before processing
        const { frontmatter, contentWithoutFrontmatter } = extractAndParseFrontmatter(rawContent);

        // Use our existing remark pipeline
        const processor = unified()
            .use(remarkParse)
            .use(remarkFrontmatter, ["yaml"])
            .use(remarkMdx)
            .use(remarkMdxToMarkdown, options)
            .use(remarkStringify);

        const result = await processor.process(contentWithoutFrontmatter);
        let processedContent = String(result);

        //replace all \*\* with **
        processedContent = processedContent.replace(/\\\*\*/g, "**");

        // Remove any remaining example placeholders
        processedContent = processedContent.replace(/\\\*\*Example:\\\*\*[^\n]*\n\n?/g, "");

        // Convert frontmatter to markdown and prepend to content
        const frontmatterMarkdown = frontmatterToMarkdown(frontmatter);
        processedContent = frontmatterMarkdown + processedContent;

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

                if (options.props) {
                    try {
                        const propsTableContent = await generatePropsTable(componentName);
                        processedContent = processedContent.replace(match, propsTableContent);
                        console.log(`✅ Replaced props table for ${componentName}`);
                    } catch (error) {
                        console.error(`❌ Error generating props table for ${componentName}:`, error);
                        processedContent = processedContent.replace(match, `**Props for ${componentName}:**\n\n(Error loading props data)`);
                    }
                } else {
                    // Remove the props table placeholder entirely when RENDER_PROPS is false
                    processedContent = processedContent.replace(match, "");
                    console.log(`⏭️ Skipped props table for ${componentName} (RENDER_PROPS is false)`);
                }
            }
        }

        // When options.props is false, also remove "## Props" headings
        if (!options.props) {
            // Remove "## Props" heading that typically appears before PropTable
            processedContent = processedContent.replace(/^## Props\s*$/gm, "");
            console.log("⏭️ Removed \"## Props\" headings (RENDER_PROPS is false)");
        }

        // Post-process to replace composed components placeholders with actual tables
        const escapedComposedComponentsMatches = processedContent.match(/\\\[COMPOSED\\_COMPONENTS\\_(.+?)\]/g);
        if (escapedComposedComponentsMatches) {
            for (const match of escapedComposedComponentsMatches) {
                const componentsString = match.replace(/\\\[COMPOSED\\_COMPONENTS\\_(.+?)\]/, "$1");
                const components = componentsString.split(",");

                try {
                    const composedComponentsTableContent = await generateComposedComponentsTable(components, options);
                    processedContent = processedContent.replace(match, composedComponentsTableContent);
                    console.log(`✅ Replaced composed components table for [${components.join(", ")}]`);
                } catch (error) {
                    console.error(`❌ Error generating composed components table for [${components.join(", ")}]:`, error);
                    processedContent = processedContent.replace(match, "**Composed Components:**\n\n(Error loading components data)");
                }
            }
        }

        // Post-process to replace migration guide placeholders with actual content
        const escapedMigrationGuideMatches = processedContent.match(/\\\[MIGRATION\\_GUIDE\\_(.+?)\]/g);
        if (escapedMigrationGuideMatches) {
            for (const match of escapedMigrationGuideMatches) {
                const srcPath = match.replace(/\\\[MIGRATION\\_GUIDE\\_(.+?)\]/, "$1");

                try {
                    const migrationNotesContent = await getMigrationNotesContent(srcPath);
                    if (migrationNotesContent) {
                        processedContent = processedContent.replace(match, migrationNotesContent);
                        console.log(`✅ Replaced migration guide for ${srcPath}`);
                    } else {
                        processedContent = processedContent.replace(match, "");
                        console.log(`❌ No migration notes found for ${srcPath}`);
                    }
                } catch (error) {
                    console.error(`❌ Error loading migration notes for ${srcPath}:`, error);
                    processedContent = processedContent.replace(match, "");
                }
            }
        }

        // Convert file path to output path
        const relativePath = path.relative(options.contentDir, filePath);
        const outputPath = options.flattenOutput
            ? path.join(options.outputDir, path.basename(relativePath.replace(".mdx", ".md")))
            : path.join(options.outputDir, relativePath.replace(".mdx", ".md"));

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
async function getComponentInfo(componentName: string, options: GenerateMarkdownOptions): Promise<{ title: string; description: string } | null> {
    try {
        // Find the MDX file for this component
        const possiblePaths = [
            path.join(options.contentDir, "components", "buttons", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "forms", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "content", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "collections", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "navigation", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "overlays", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "pickers", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "status", `${componentName}.mdx`),
            path.join(options.contentDir, "components", "icons", `${componentName}.mdx`)
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
async function generateComposedComponentsTable(components: string[], options: GenerateMarkdownOptions): Promise<string> {
    const componentInfos = await Promise.all(
        components.map(async componentName => {
            const info = await getComponentInfo(componentName, options);

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

// Helper function to read migration notes file content
async function getMigrationNotesContent(srcPath: string): Promise<string | null> {
    try {
        // Convert the src path to actual file path
        // src="buttons/docs/migration-notes" -> packages/components/src/buttons/docs/migration-notes.md
        const filePath = path.join(process.cwd(), "..", "..", "packages", "components", "src", `${srcPath}.md`);
        console.log(`Attempting to read migration notes file: ${filePath}`);
        const content = await fs.readFile(filePath, "utf8");
        console.log(`✅ Successfully read migration notes file: ${filePath}`);

        return content;
    } catch (error) {
        console.warn(`❌ Could not read migration notes file: ${srcPath}`, error);

        return null;
    }
}

// Helper function to extract and parse frontmatter
function extractAndParseFrontmatter(content: string): { frontmatter: Record<string, unknown> | null; contentWithoutFrontmatter: string } {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!frontmatterMatch) {
        return { frontmatter: null, contentWithoutFrontmatter: content };
    }

    const frontmatterContent = frontmatterMatch[1];
    const contentWithoutFrontmatter = frontmatterMatch[2];

    // Simple YAML parsing for our use case
    const frontmatter: Record<string, unknown> = {};
    const lines = frontmatterContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
            continue;
        }

        if (line.includes(":")) {
            const [key, ...valueParts] = line.split(":");
            const value = valueParts.join(":").trim();

            if (key.trim() === "links") {
                // Handle links object
                frontmatter.links = {};
                i++; // Move to next line
                while (i < lines.length && lines[i].startsWith("    ")) {
                    const linkLine = lines[i].trim();
                    if (linkLine.includes(":")) {
                        const [linkKey, ...linkValueParts] = linkLine.split(":");
                        const linkValue = linkValueParts.join(":").trim();
                        (frontmatter.links as Record<string, string>)[linkKey.trim()] = linkValue;
                    }
                    i++;
                }
                i--; // Adjust for the outer loop increment
            } else {
                frontmatter[key.trim()] = value.replace(/^["']|["']$/g, ""); // Remove quotes
            }
        }
    }

    return { frontmatter, contentWithoutFrontmatter };
}

// Helper function to convert frontmatter to markdown
function frontmatterToMarkdown(frontmatter: Record<string, unknown> | null): string {
    if (!frontmatter) {
        return "";
    }

    let markdown = "";

    // Add title as H1
    if (frontmatter.title) {
        markdown += `# ${frontmatter.title}\n\n`;
    }

    // Add description
    if (frontmatter.description) {
        markdown += `${frontmatter.description}\n\n`;
    }

    // Add links without header
    if (frontmatter.links) {
        for (const [key, value] of Object.entries(frontmatter.links as Record<string, string>)) {
            const linkKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
            markdown += `[${linkKey}](${value})\n\n`;
        }
    }

    return markdown;
}

interface GenerateMarkdownOptions {
    contentDir: string;
    outputDir: string;
    props: boolean;
    flattenOutput?: boolean;
}


// Main function
export async function generateMarkdownFromMdx(options: GenerateMarkdownOptions): Promise<void> {
    try {
        console.log("🚀 Starting MDX to Markdown conversion...");

        // Ensure output directory exists
        await fs.mkdir(options.outputDir, { recursive: true });

        // Find all MDX files
        const mdxFiles = await findMdxFiles(options.contentDir);
        console.log(`📁 Found ${mdxFiles.length} MDX files`);

        // Process files
        const processedFiles: ProcessedFile[] = [];

        for (const filePath of mdxFiles) {
            const processed = await processMdxFile(filePath, options);
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

        const packageJsonPath = path.join(options.outputDir, "package.json");
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`✅ Successfully converted ${processedFiles.length} MDX files to Markdown`);
        console.log(`📦 Output directory: ${options.outputDir}`);
    } catch (error) {
        console.error("❌ Error during conversion:", error);
        process.exit(1);
    }
}


