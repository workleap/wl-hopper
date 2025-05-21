import { TextFieldContext } from "@hopper-ui/components";
import type { ReactNode } from "react";

export interface FieldGroupProps {
    children?: ReactNode;
    isDisabled?: boolean;
}

export function FieldGroup({ children, isDisabled }: FieldGroupProps) {
    return (
        <TextFieldContext.Provider value={{ isDisabled }}>
            {children}
        </TextFieldContext.Provider>
    );
}
