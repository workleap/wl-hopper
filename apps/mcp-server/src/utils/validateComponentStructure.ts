import { parse } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";

interface ValidationError {
    message: string;
    line?: number;
    column?: number;
}

interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

/**
 * Validates component structure according to Hopper Design System rules
 */
export function validateComponentStructure(code: string): ValidationResult {
    const result: ValidationResult = {
        isValid: true,
        errors: [],
    };

    // First, check if the code is empty or whitespace only
    if (!code || code.trim().length === 0) {
        result.isValid = false;
        result.errors.push({
            message: "No code provided. Please provide valid TypeScript/JSX code to validate."
        });
        return result;
    }

    try {
        const ast = parse(code, {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true
            }
        });

        // Find all JSX elements in the code
        const jsxElements = findJSXElements(ast);

        if (jsxElements.length === 0) {
            result.isValid = false;
            result.errors.push({
                message: "No JSX components found in the provided code."
            });
            return result;
        }

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
                const instanceInfo = instances.length > 1 ? ` (instance ${i + 1} of ${instances.length})` : '';

                // Validate based on component type
                switch (componentName) {
                    case 'Button':
                        validateButtonComponent(element, result, instanceInfo);
                        break;
                    case 'Modal':
                        validateModalComponent(element, result, instanceInfo);
                        break;
                    // Add more component validations here as needed
                    default:
                        // For now, we only validate Button and Modal components
                        break;
                }
            }
        }

        // Add summary information
        const totalComponents = Array.from(componentInstances.values()).reduce((sum, instances) => sum + instances.length, 0);

        result.isValid = result.errors.length === 0;
    } catch (error) {
        result.isValid = false;

        // Provide more detailed parsing error information
        if (error instanceof Error) {
            // Check for common parsing issues and provide helpful messages
            let errorMessage = `Failed to parse code: ${error.message}`;

            if (error.message.includes('Unexpected token')) {
                errorMessage += "\n\nPlease ensure the code is valid TypeScript/JSX syntax. Common issues include:";
                errorMessage += "\n- Missing semicolons or brackets";
                errorMessage += "\n- Invalid JSX syntax";
                errorMessage += "\n- Incomplete component declarations";
            } else if (error.message.includes('Unexpected end of file')) {
                errorMessage += "\n\nThe code appears to be incomplete. Please provide the full component code.";
            }

            result.errors.push({
                message: errorMessage
            });
        } else {
            result.errors.push({
                message: "Failed to parse code due to unknown error. Please ensure the code is valid TypeScript/JSX."
            });
        }
    }

    return result;
}

/**
 * Recursively finds all JSX elements in the AST
 */
function findJSXElements(node: any): TSESTree.JSXElement[] {
    const elements: TSESTree.JSXElement[] = [];

    function traverse(n: any) {
        if (!n || typeof n !== 'object') return;

        if (n.type === 'JSXElement') {
            elements.push(n as TSESTree.JSXElement);
        }

        // Traverse all properties
        for (const key in n) {
            if (n.hasOwnProperty(key)) {
                const value = n[key];
                if (Array.isArray(value)) {
                    value.forEach(traverse);
                } else if (value && typeof value === 'object') {
                    traverse(value);
                }
            }
        }
    }

    traverse(node);
    return elements;
}

/**
 * Gets the component name from a JSX element
 */
function getComponentName(element: TSESTree.JSXElement): string | null {
    const openingElement = element.openingElement;
    if (openingElement.name.type === 'JSXIdentifier') {
        return openingElement.name.name;
    }
    return null;
}

/**
 * Gets direct children components from a JSX element
 */
function getDirectChildren(element: TSESTree.JSXElement): string[] {
    const children: string[] = [];

    for (const child of element.children) {
        if (child.type === 'JSXElement') {
            const childName = getComponentName(child);
            if (childName) {
                children.push(childName);
            }
        }
    }

    return children;
}

/**
 * Gets all direct children (components + text nodes) from a JSX element
 */
function getAllDirectChildren(element: TSESTree.JSXElement): Array<{ type: 'component' | 'text', name: string }> {
    const children: Array<{ type: 'component' | 'text', name: string }> = [];

    for (const child of element.children) {
        if (child.type === 'JSXElement') {
            const childName = getComponentName(child);
            if (childName) {
                children.push({ type: 'component', name: childName });
            }
        } else if (child.type === 'JSXText') {
            // Only count non-whitespace text nodes
            const text = child.value.trim();
            if (text.length > 0) {
                children.push({ type: 'text', name: 'text' });
            }
        } else if (child.type === 'JSXExpressionContainer') {
            // Handle expressions like {variable} or {someFunction()}
            children.push({ type: 'text', name: 'expression' });
        }
    }

    return children;
}

/**
 * Validates Button component structure
 * Rule: If the component is Button and if it has 2 children, one of them should be Text component.
 */
function validateButtonComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ''): void {
    const componentName = getComponentName(element);

    if (componentName !== 'Button') {
        return;
    }

    const allChildren = getAllDirectChildren(element);
    const componentChildren = getDirectChildren(element);

    // If Button has 2 total children (text + components), one of the components should be Text
    if (allChildren.length === 2) {
        const hasTextComponent = componentChildren.includes('Text');
        const hasTextContent = allChildren.some(child => child.type === 'text');

        if (!hasTextComponent && hasTextContent) {
            result.errors.push({
                message: `Button component${instanceInfo} with 2 children must include a Text component when containing text content. Found children: ${componentChildren.join(', ')}${componentChildren.length === 0 ? 'none' : ''} (plus text content)`,
                line: element.loc?.start.line,
                column: element.loc?.start.column
            });
        }
    }
}

/**
 * Validates Modal component structure
 * Rule: If the component is Modal, the direct children should be Header, Content and ButtonGroup.
 * If other components live as direct children, it should be an error.
 */
function validateModalComponent(element: TSESTree.JSXElement, result: ValidationResult, instanceInfo: string = ''): void {
    const componentName = getComponentName(element);

    if (componentName !== 'Modal') {
        return;
    }

    const children = getDirectChildren(element);
    const allowedChildren = ['Heading', 'Content', 'ButtonGroup'];

    // Check for invalid children
    const invalidChildren = children.filter(child => !allowedChildren.includes(child));

    if (invalidChildren.length > 0) {
        result.errors.push({
            message: `Modal component${instanceInfo} can only have Header, Content, and ButtonGroup as direct children. Found invalid children: ${invalidChildren.join(', ')}`,
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }

    // Optional: Check if required children are present (this could be a warning)
    const missingChildren = allowedChildren.filter(required => !children.includes(required));
    if (missingChildren.length > 0) {
        result.errors.push({
            message: `Modal component${instanceInfo} is missing recommended children: ${missingChildren.join(', ')}`,
            line: element.loc?.start.line,
            column: element.loc?.start.column
        });
    }
}
