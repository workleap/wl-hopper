/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";

// Function to recursively get all tsx files in a directory
function getAllRelevantFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllRelevantFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith(".tsx")) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

// Function to find imported types from react-aria in a file
function findImportedTypesFromReactAria(filePath: string): string[] {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const importTypeRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]*react-aria[^'"]*)['"]/g;
    const importTypeOnlyRegex = /import\s+type\s+{([^}]+)}\s+from\s+['"]([^'"]*react-aria[^'"]*)['"]/g;
    const importSingleTypeRegex = /import\s+type\s+([^\s,]+)\s+from\s+['"]([^'"]*react-aria[^'"]*)['"]/g;
    let match: RegExpExecArray | null;
    const importedTypes = new Set<string>();

    // Match import { ... } from 'react-aria'
    while ((match = importTypeRegex.exec(fileContent)) !== null) {
        const types = match[1].split(",").map(type => type.trim());
        types.forEach(type => {
            const typeMatch = /^\s*type\s+([^\s,]+)/.exec(type);
            if (typeMatch) {
                importedTypes.add(typeMatch[1]);
            }
        });
    }

    // Match import type { ... } from 'react-aria'
    while ((match = importTypeOnlyRegex.exec(fileContent)) !== null) {
        const types = match[1].split(",").map(type => type.trim());
        types.forEach(type => {
            importedTypes.add(type);
        });
    }

    // Match import type ... from 'react-aria'
    while ((match = importSingleTypeRegex.exec(fileContent)) !== null) {
        importedTypes.add(match[1]);
    }

    // Filter out types that end with "Props"
    const filteredTypes = Array.from(importedTypes).filter(type => !type.endsWith("Props"));

    return filteredTypes;
}

// Main function to find imported types from react-aria in relevant files
function findTypesFromReactAriaInRelevantFiles(directory: string): string[] {
    const relevantFiles = getAllRelevantFiles(directory);
    const importedTypes = new Set<string>();

    relevantFiles.forEach(file => {
        const types = findImportedTypesFromReactAria(file);
        types.forEach(type => importedTypes.add(type));
    });

    return Array.from(importedTypes);
}

// Run the script
const directoryPath = "src"; // Adjust the path as needed
const typesInRelevantFiles = findTypesFromReactAriaInRelevantFiles(directoryPath);
console.log(typesInRelevantFiles);
