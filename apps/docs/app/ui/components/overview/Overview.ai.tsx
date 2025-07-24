
import { capitalize } from "@/app/lib/capitalize";
import { allComponents } from "../../../../.contentlayer/generated/index.mjs";
import type { Components } from "../../../../.contentlayer/generated/types";


const ignoreCategories = ["application"];
const sortOrder = [
    "layout",
    "buttons",
    "collections",
    "forms",
    "icons",
    "navigation",
    "overlays",
    "pickers",
    "status",
    "content",
    "placeholders",
    "building blocks"
];

const components = allComponents as Components[];

const categories = Array.from(new Set(components.map(component => component.category))).filter(x => x && !ignoreCategories.includes(x)).sort((a, b) => {
    const aIndex = sortOrder.indexOf(a!);
    const bIndex = sortOrder.indexOf(b!);

    if (aIndex === -1 && bIndex === -1) {
        return 0;
    }

    if (aIndex === -1) {
        return 1;
    }

    if (bIndex === -1) {
        return -1;
    }

    return aIndex - bIndex;
});

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
