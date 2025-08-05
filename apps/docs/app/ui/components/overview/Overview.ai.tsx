
import type { Components } from "@/.contentlayer/generated";
import { capitalize } from "@/app/lib/capitalize";
import { allComponents, categories } from "./util";

const components = allComponents as Components[];

const Overview = () => {
    const overviewSection = categories.map(category => {
        if (!category) {
            return null;
        }

        return (
            <div key={category}>
                <h2>{capitalize(category)}</h2>
                <ComponentListRender
                    items={components.filter(component =>
                        component.category &&
                        component.category === category &&
                        (component.status === "ready" ||
                        component.status === undefined)
                    )}
                />
            </div>
        );
    });

    return overviewSection;
};

interface Item {
    title: string;
    description?: string | undefined;
}

function ComponentListRender({ items }: { items: Item[] }) {
    return <table>
        <thead>
            <tr>
                <th>Component Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.title}>
                    <td><code>{item.title}</code></td>
                    <td>{item.description}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

export default Overview;
