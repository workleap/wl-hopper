import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import { extractAllConstantStrings, getAllDirectChildren, getComponentName, getDirectComponentChildren } from "./jsxHelpers";
import type { ValidationResult } from "./types";
import { validationMessage } from "./validationMessages";

/**
 * Validates component-specific rules by grouping components by type and applying appropriate validation
 */
export function validateComponentSpecificRules(jsxElements: TSESTree.JSXElement[], result: ValidationResult): void {
    // Group components by type for better validation reporting
    const componentInstances = new Map<string, TSESTree.JSXElement[]>();

    for (const element of jsxElements) {
        const componentName = getComponentName(element);
        if (componentName) {
            if (!componentInstances.has(componentName)) {
                componentInstances.set(componentName, []);
            }
            componentInstances.get(componentName)!.push(element);
        }
    }

    // Apply validation rules to all instances of each component type
    for (const [componentName, instances] of componentInstances) {
        for (let i = 0; i < instances.length; i++) {
            const element = instances[i];
            const instanceInfo = instances.length > 1 ? ` (instance ${i + 1} of ${instances.length})` : "";

            // Validate based on component type
            switch (componentName) {
                case "Button":
                    validateButtonComponent(element, result, instanceInfo);
                    break;
                case "Modal":
                    validateModalComponent(element, result, instanceInfo);
                    break;
                case "Div":
                    validateDivComponent(element, result, instanceInfo);
                    break;
            }
        }
    }
}

/**
 * Validates Button component structure
 * Rule: If the component is Button and if it has 2 children, one of them should be Text component.
 */
function validateButtonComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    const componentName = getComponentName(element);

    if (componentName !== "Button") {
        return;
    }

    const allChildren = getAllDirectChildren(element);
    const componentChildren = getDirectComponentChildren(element);

    // If Button has 2 total children (text + components), one of the components should be Text
    if (allChildren.length === 2) {
        const hasTextComponent = componentChildren.includes("Text");
        const hasTextContent = allChildren.some(child => child.type === "text");

        if (!hasTextComponent && hasTextContent) {
            result.errors.push({
                message: validationMessage("button-two-children-rule", {
                    instanceInfo,
                    children: componentChildren.length === 0 ? "none" : componentChildren.join(", ")
                }),
                line: element.loc?.start.line,
                column: element.loc?.start.column
            });
        }
    }
}

function validateModalComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    const componentName = getComponentName(element);

    if (componentName !== "Modal") {
        return;
    }

    const children = getDirectComponentChildren(element);
    const allowedChildren = ["Heading", "Content", "ButtonGroup"];

    // Check for invalid children
    const invalidChildren = children.filter(child => !allowedChildren.includes(child));

    if (invalidChildren.length > 0) {
        result.errors.push({
            message: validationMessage("modal-invalid-children", {
                instanceInfo,
                invalidChildren: invalidChildren.join(", ")
            }),
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }

    // Optional: Check if required children are present (this could be a warning)
    const missingChildren = allowedChildren.filter(required => !children.includes(required));
    if (missingChildren.length > 0) {
        result.errors.push({
            message: validationMessage("modal-missing-children", {
                instanceInfo,
                missingChildren: missingChildren.join(", ")
            }),
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }
}

/**
 * Validates Div component structure
 * Rule: If Div has display="flex" or display="grid", suggest using appropriate layout components
 */
function validateDivComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ""): void {
    // Check if the Div has display="flex" or display="grid" prop
    const openingElement = element.openingElement;
    if (openingElement.attributes) {
        for (const attribute of openingElement.attributes) {
            if (attribute.type === AST_NODE_TYPES.JSXAttribute &&
                attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
                attribute.name.name === "display") {
                // Extract all constant string values from the display prop
                const displayValues = extractAllConstantStrings(attribute.value);

                // Check each display value
                for (const displayValue of displayValues) {
                    if (displayValue === "flex") {
                        result.warnings.push({
                            message: validationMessage("div-flex-warning", { instanceInfo }),
                            line: element.loc?.start.line,
                            column: element.loc?.start.column
                        });
                    } else if (displayValue === "grid") {
                        result.warnings.push({
                            message: validationMessage("div-grid-warning", { instanceInfo }),
                            line: element.loc?.start.line,
                            column: element.loc?.start.column
                        });
                    }
                }
            }
        }
    }
}
