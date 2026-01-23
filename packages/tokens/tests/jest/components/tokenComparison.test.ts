import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const componentsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "src", "tokens", "components");

const isDirectory = (targetPath: string): boolean => fs.statSync(targetPath).isDirectory();

const getThemeFolders = (root: string): string[] => fs.readdirSync(root).filter(entry => isDirectory(path.join(root, entry)));

const getJsonFiles = (themePath: string): string[] => {
    const files: string[] = [];

    const walk = (current: string): void => {
        fs.readdirSync(current).forEach(entry => {
            const fullPath = path.join(current, entry);
            if (isDirectory(fullPath)) {
                walk(fullPath);
            } else if (entry.endsWith(".json")) {
                files.push(path.relative(themePath, fullPath));
            }
        });
    };

    walk(themePath);

    return files.sort();
};

const collectKeys = (jsonPath: string): string[] => {
    const content = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const keys: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visit = (node: any, prefix = ""): void => {
        if (node === null || typeof node !== "object") {
            return;
        }

        Object.keys(node).forEach(key => {
            const currentPath = prefix ? `${prefix}.${key}` : key;
            keys.push(currentPath);
            visit((node)[key], currentPath);
        });
    };

    visit(content);

    return keys.sort();
};

describe("component token themes", () => {
    const themes = getThemeFolders(componentsDir);

    if (themes.length < 2) {
        throw new Error("At least two component themes are required to perform comparison tests");
    }

    const [referenceTheme, ...otherThemes] = themes;
    const referenceThemePath = path.join(componentsDir, referenceTheme);
    const referenceFiles = getJsonFiles(referenceThemePath);

    test("all themes share the exact same token files", () => {
        otherThemes.forEach(theme => {
            const themePath = path.join(componentsDir, theme);
            const files = getJsonFiles(themePath);
            expect(files).toEqual(referenceFiles);
        });
    });

    test("corresponding token files expose identical key structure", () => {
        referenceFiles.forEach(relativeFile => {
            const referenceKeys = collectKeys(path.join(referenceThemePath, relativeFile));

            otherThemes.forEach(theme => {
                const themePath = path.join(componentsDir, theme);
                const themeKeys = collectKeys(path.join(themePath, relativeFile));
                expect(themeKeys).toEqual(referenceKeys);
            });
        });
    });
});
