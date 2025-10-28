import type { GuideSection, TokenCategory } from "../config/constants";
import { GuideFiles, TokenGuideFiles } from "../config/fileMappings";
import { getLocalMdContent, getRemoteMdContent } from "../utils/fileReader";

export async function getGuide(section: GuideSection, pageSize?: number, cursor?: string) {
    if (!Object.keys(GuideFiles).includes(section)) {
        throw new Error(`Invalid guide section requested: ${section}`);
    }

    const guideFile = GuideFiles[section];

    if ("url" in guideFile) {
        return getRemoteMdContent(guideFile.url, pageSize, cursor);
    }

    return getLocalMdContent(guideFile.path, pageSize, cursor);
}

export async function getDesignTokenGuide(category: TokenCategory, pageSize?: number, cursor?: string) {
    if (!Object.keys(TokenGuideFiles).includes(category)) {
        throw new Error(`Invalid design token category requested: ${category}`);
    }

    return await getLocalMdContent(TokenGuideFiles[category].path, pageSize, cursor);
}
