import fs from "fs";

import { THEME_SRC_PATH } from "../constant.ts";

const THEMES_TO_IGNORE: string[] = [];

export function getAvailableThemes() {
    // read the `src/tokens/semantic/` directory and list all the folder names to get the available themes
    const themes = fs.readdirSync(THEME_SRC_PATH, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !THEMES_TO_IGNORE.includes(dirent.name))
        .map(dirent => dirent.name);
    return themes.filter(x => !THEMES_TO_IGNORE.includes(x));
}
