
import fs from "fs/promises";
import React from "react";


const ComponentExample = async ({ src }: { src: string }) => {
    const fileContent = await fs.readFile(src, "utf8");

    return (
        <pre>
            <code className="language-tsx">
                {fileContent}
            </code>
        </pre>);
};

export default ComponentExample;
