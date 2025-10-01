import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "datas", "components");

// Standalone version of getComponentProps that doesn't use Next.js aliases
export const getComponentProps = async (componentName: string, includeFullProps: boolean = false) => {
    try {
        const componentPath = path.join(filePath, includeFullProps ? `${componentName}-full.json` : `${componentName}.json`);
        const data = await fs.readFile(componentPath, "utf-8");
        const parsedData = JSON.parse(data);

        // The data is an array with one object containing the component info
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            const componentData = parsedData[0];

            // Convert the groups object to an array format
            if (componentData.groups) {
                const groupsArray = Object.keys(componentData.groups).map(groupName => ({
                    name: groupName,
                    props: Object.values(componentData.groups[groupName])
                }));

                return { groups: groupsArray };
            }
        }

        return null;
    } catch (error) {
        console.error(`Error loading component data for ${componentName}:`, error);

        return null;
    }
};
