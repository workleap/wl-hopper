import { files } from "@docs/ai";

/**
 * Get all component names dynamically from the files structure
 * This ensures the resource list stays in sync with available documentation
 * without manual maintenance when new components are added
 */
export function getComponentNames(): string[] {
    const componentKeys = Object.keys(files.components.full);

    return componentKeys
        .map(key => {
            // Convert camelCase to PascalCase (e.g., "accordion" -> "Accordion", "avatarGroup" -> "AvatarGroup")
            return key.charAt(0).toUpperCase() + key.slice(1);
        })
        .sort(); // Sort alphabetically for consistent ordering
}