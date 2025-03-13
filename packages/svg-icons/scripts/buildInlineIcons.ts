import fs from "fs";
import path from "path";

import { IconsInlineDistDirectory, IconSizes, IconsOptimizedDirectory } from "./constants.ts";

const optimizedIconsPath = IconsOptimizedDirectory;

/**
 * Converts a file path to a file name.
 * @example fileNameConverter("C:\Dev\wl-hopper\packages\svg-icons\src\optimized-rich-icons\action-list-24.svg") // ActionListIcon24
 */
function fileNameConverter(filePath: string) {
    let fileName = path.basename(filePath, ".svg");

    // action-list-24.svg becomes ActionList24
    fileName = fileName.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    const size = IconSizes.find(s => fileName.includes(s.toString()))!;

    // ActionList24 becomes ActionListIcon24
    fileName = fileName.replace(size.toString(), `Icon${size}`);

    //remove the Icon{size} at the end of the name to create the "group" value
    const group = fileName.replace(/Icon\d+/, "Icon");

    return {
        name: fileName,
        group,
        size
    };
}

const files = fs.readdirSync(optimizedIconsPath, { recursive: true, withFileTypes: true });
const svgFiles = files.filter(file => file.isFile() && file.name.endsWith(".svg"));

// Clear directory (It also removes the directory itself)
fs.rmSync(IconsInlineDistDirectory, { recursive: true, force: true });
fs.mkdirSync(IconsInlineDistDirectory, { recursive: true });

const inlinedSvgs = svgFiles.map(file => {
    const contents = fs.readFileSync(path.resolve(file.path, file.name), "utf8");
    const { name, group, size } = fileNameConverter(file.name);
    const fileName = `${name}.js`;
    const location = path.resolve(IconsInlineDistDirectory, fileName);
    fs.writeFileSync(location, `export default \`${contents}\``);

    return {
        name,
        fileName,
        location,
        group,
        size
    };
});

const groupedSvgs = inlinedSvgs.reduce((acc, file) => {
    if (!acc[file.group]) {
        acc[file.group] = {} as Record<typeof IconSizes[number], string>;
    }

    acc[file.group][file.size] = file.name;

    return acc;
}, {} as Record<string, Record<typeof IconSizes[number], string>>);


// index barrel file
let indexContent = inlinedSvgs.map(file => {
    const name = file.name;

    return `import { default as ${name} } from "./${file.fileName}";\n`;
}).join("");

indexContent += `export { ${inlinedSvgs.map(file => file.name).join(", ")} }\n`;

indexContent += Object.entries(groupedSvgs).map(([group, icons]) => {
    return `export const ${group} = {${IconSizes.map(size => `${size}: ${icons[size]}`).join(", ")}, displayName: "${group}" };\n`;
}).join("");

fs.writeFileSync(path.resolve(IconsInlineDistDirectory, "index.js"), indexContent);


// types barrel file
let indexDeclarationFileContent = `export type IconObject = Record<${IconSizes.map(s => `"${s}"`).join(" | ")} | "displayName", string>;\n`;
indexDeclarationFileContent += inlinedSvgs.map(file => {
    const name = file.name;

    return `export const ${name}: string;\n`;
}).join("");

indexDeclarationFileContent += Object.keys(groupedSvgs).map(group => {
    return `export const ${group}: IconObject;\n`;
}).join("");

fs.writeFileSync(path.resolve(IconsInlineDistDirectory, "index.d.ts"), indexDeclarationFileContent);

console.log("✨ The inline icons have been generated!\n");
