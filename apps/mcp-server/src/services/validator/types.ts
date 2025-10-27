export interface ValidationMessage {
    message: string;
    line?: number;
    column?: number;
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationMessage[];
    warnings: ValidationMessage[];
}

export function mergeResults(target: ValidationResult, source: ValidationResult): void {
    target.isValid = target.isValid && source.isValid;
    target.errors.push(...source.errors);
    target.warnings.push(...source.warnings);
}
