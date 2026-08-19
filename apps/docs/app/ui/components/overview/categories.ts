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
    "html elements",
    "building blocks"
];

/**
 * Shared by `util.ts` (website, backed by contentlayer) and `util.ai.ts` (AI docs pipeline, backed
 * by the MDX frontmatter reader). It takes the components as an argument so neither data source
 * leaks into the other — the pipeline runs outside Next.js and cannot use contentlayer, and the
 * website bundle cannot use `fs`.
 */
export function getCategories(components: { category?: string | null }[]) {
    return Array.from(new Set(components.map(component => component.category)))
        .filter(x => x && !ignoreCategories.includes(x))
        .sort((a, b) => {
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
}
