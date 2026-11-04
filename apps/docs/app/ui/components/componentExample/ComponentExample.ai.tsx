import { resolveExampleSource } from "@/configs/examplePackages";
import { Mdx } from "@/components/mdx/Mdx.ai";
import fs from "fs/promises";
import path from "path";

function formatComponentExamplePath(uri: string) {
    const { packagePath, rest } = resolveExampleSource(uri);

    return path.join(process.cwd(), "..", "..", "packages", ...packagePath.split("/"), rest);
}

async function getFileContent(src: string) {
    const examplePath = formatComponentExamplePath(src);
    const fileContent = await fs.readFile(`${examplePath}.tsx`, "utf8");

    return fileContent;
}

const ComponentExample = async ({ src }: { src: string }) => {
    const fileContent = await getFileContent(src);

    return (
        <Mdx>
            ```tsx ${fileContent}
            ```
        </Mdx>
    );
};

export default ComponentExample;
