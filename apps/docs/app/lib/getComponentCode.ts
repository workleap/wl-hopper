import { resolveExampleSource } from "@/configs/examplePackages";
import { highlightCode } from "@/components/highlightCode";
import fs from "fs/promises";
import path from "path";

function formatComponentExamplePath(uri: string) {
    const { packagePath, rest } = resolveExampleSource(uri);

    return path.join(process.cwd(), "..", "..", "packages", ...packagePath.split("/"), rest);
}

export async function getFileContent(filePath: string) {
    return await fs.readFile(filePath, "utf8");
}

export function getFormattedCode(code: string) {
    return `
\`\`\`tsx showLineNumbers
${code}
\`\`\`
`;
}

export async function getComponentCode(filePath: string) {
    const examplePath = formatComponentExamplePath(filePath);
    const fileContent = await getFileContent(`${examplePath}.tsx`);
    const formattedCode = getFormattedCode(fileContent);

    return await highlightCode(formattedCode);
}
