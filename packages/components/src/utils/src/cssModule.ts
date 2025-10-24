import clsx, { type ClassValue } from "clsx";

/**
 * Generates CSS module classnames for a given component with modifiers.
 * Utilizes the provided CSS modules object and component name to create classnames.
 * @param cssModules - The CSS modules object to use for classname lookups.
 * @example
 * const result = cssModule(styles, 'hop-button', 'lg', 'primary');
 * // result = "hop-button--lg hop-button--primary"
 */
export function cssModule(cssModules: { [key: string]: string }, componentName: string, ...modifiers: ClassValue[]) {
    const classes = clsx(modifiers).split(" ").filter(x => x && x !== "");

    return classes.reduce<string[]>((acc, className) => {
        const mergedClassName = `${componentName}--${className}`;
        if (cssModules[mergedClassName]) {
            acc.push(cssModules[mergedClassName]);
        }

        return acc;
    }, [cssModules[componentName]]).join(" ");
}
