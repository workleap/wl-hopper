import fs from "fs";
import path from "path";

const THEMES_TO_IGNORE: string[] = [];

export function getAvailableThemes() {
    // read the `src/tokens/semantic/` directory and list all the folder names to get the available themes
    const themesDir = path.join("src", "tokens", "semantic");
    const themes = fs.readdirSync(themesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !THEMES_TO_IGNORE.includes(dirent.name))
        .map(dirent => dirent.name);
    return themes.filter(x => !THEMES_TO_IGNORE.includes(x));
}
