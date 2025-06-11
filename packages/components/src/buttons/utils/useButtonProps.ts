import { useResponsiveValue } from "@hopper-ui/styled-system";

import { type FormStyleProps, useFormProps } from "../../form/index.ts";
import type { FieldSize, SizeAdapter } from "../../utils/index.ts";
import type { ButtonProps } from "../src/Button.tsx";

import type { ButtonSize } from "./types.ts";

/**
 * Maps button sizes to form field sizes.
 * - Extra small buttons (xs) use small fields (sm)
 * - Small buttons (sm) use small fields (sm)
 * - Medium buttons (md) use medium fields (md)
 */
export const ButtonToFieldSizeAdapter: SizeAdapter<ButtonSize, FieldSize> = {
    xs: "sm",
    sm: "sm",
    md: "md"
};

export interface UseButtonProps extends Omit<FormStyleProps, "size"> {
    size?: ButtonProps["size"];
}

export function useButtonProps<T extends UseButtonProps>(props: T): T {
    // We don't default to "md" here because the button size is not always used in the form context.
    const buttonSize = useResponsiveValue(props.size);

    // useFormProps only handles "sm" or "md" sizes, so we adapt the button size to the form field size
    props = useFormProps({
        ...props,
        size: buttonSize ? ButtonToFieldSizeAdapter[buttonSize] : undefined
    });

    /**
    * Determine final size with this priority:
    *
    * 1. Use the size from props if provided
    * 2. Otherwise use size from form context if available
    * 3. Fall back to "md" as the default size
    */
    const size = useResponsiveValue(buttonSize ?? props.size) ?? "md";

    return {
        ...props,
        size
    };
}
