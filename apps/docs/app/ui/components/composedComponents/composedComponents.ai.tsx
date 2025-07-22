import React from "react";
import { allComponents } from "../../../../.contentlayer/generated/index.mjs";

interface ComposedComponentsProps {
    components: string[];
}

const ComposedComponents = ({ components } : ComposedComponentsProps) => {
    // return <Mdx code={`
    //     | Component | Title | Description |
    //     |-----------|-------|-------------|
    //     ${sortedComponents.map(component => `| ${component} | ${component} | This is a composed component. |`).join("\r\n")}
    //     `}
    // />;

    const filteredComponents = allComponents
        .filter(component => components.includes(component.title))
        .sort((a, b) => a.title.localeCompare(b.title));


    return <table>
        <thead>
            <tr>
                <th>Component</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {filteredComponents.map(component => (
                <tr key={component.title}>
                    <td>{component.title}</td>
                    <td>{component.description}</td>
                </tr>
            ))}
        </tbody>
    </table>;
};

export default ComposedComponents;
