import { allComponents } from "@/.contentlayer/generated";

const ignoreCategories = ["application", "utilities"];
const sortOrder = [
    "layout",
    "buttons",
    "collections",
    "date and time",
    "forms",
    "icons",
    "navigation",
    "overlays",
    "pickers",
    "status",
    "content",
    "placeholders",
    "utilities",
    "html elements",
    "building blocks"
];

export const categories = Array.from(new Set(allComponents.map(component => component.category))).filter(x => x && !ignoreCategories.includes(x)).sort((a, b) => {
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

export { allComponents } from "@/.contentlayer/generated";
