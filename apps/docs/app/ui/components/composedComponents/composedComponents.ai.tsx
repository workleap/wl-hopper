import { allComponents } from "@/.contentlayer/generated";

interface ComposedComponentsProps {
    components: string[];
}

const ComposedComponents = ({ components }: ComposedComponentsProps) => {
    const filteredComponents = allComponents
        .filter(component => components.includes(component.title))
        .sort((a, b) => a.title.localeCompare(b.title));

    return (
        <table>
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
        </table>
    );
};

export default ComposedComponents;
