import { createContext } from "react";

import type { FormStyleProps } from "./Form.tsx";

export const FormContext = createContext<FormStyleProps | null>(null);

FormContext.displayName = "FormContext";
