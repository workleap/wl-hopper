import type {
    ResponsiveProp
} from "@hopper-ui/styled-system";
import type { AriaLabelingProps, DOMProps as SharedDOMProps, ValidationResult } from "@react-types/shared";
import type { CSSProperties, ReactNode } from "react";
import type { SlotProps } from "react-aria-components";

/**
 * Taken from https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
 */

export interface StyleProps {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
    className?: string;
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
    style?: CSSProperties;
}

export interface DOMProps extends StyleProps, SharedDOMProps {
    /** The children of the component. */
    children?: ReactNode;
}

export type AccessibleSlotProps = AriaLabelingProps & SlotProps;

export interface StyleRenderProps<T> {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
    className?: string | ((values: T & { defaultClassName: string | undefined }) => string);
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
    style?: CSSProperties | ((values: T & { defaultStyle: CSSProperties }) => CSSProperties | undefined);
}

export interface RenderProps<T> extends StyleRenderProps<T> {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode);
}

export interface RenderPropsHookOptions<T> extends RenderProps<T>, SharedDOMProps, AriaLabelingProps {
    values: T;
    defaultChildren?: ReactNode;
    defaultClassName?: string;
    defaultStyle?: CSSProperties;
}

export type BaseComponentDOMProps = DOMProps & AccessibleSlotProps;

/** Added these for when we need to force an interactive state like for radios inside list box items */
export interface InteractionProps {
    /**
     * Whether or not the component is currently pressed.
     */
    isPressed?: boolean;
    /**
     * Whether or not the component is currently focused.
     */
    isFocused?: boolean;
    /**
     * Whether or not the component is currently focus visible.
     */
    isFocusVisible?: boolean;
    /**
     * Whether or not the component is currently hovered.
     */
    isHovered?: boolean;
    /**
     * Whether or not the component is currently selected.
     */
    isSelected?: boolean;
    /**
     * Whether or not the component is currently disabled.
     */
    isDisabled?: boolean;
    /**
     * Whether or not the component is currently read-only.
     */
    isReadOnly?: boolean;
    /**
     * Whether or not the component is currently invalid.
     */
    isInvalid?: boolean;
    /**
     * Whether or not the component is currently required.
     */
    isRequired?: boolean;
}

export type Align = "start" | "end" | "center";
export type FieldSize = "sm" | "md";
export type NecessityIndicator = "asterisk" | "label";
export type InputGroupVariant = "borderless" | "bordered";
export type MenuAlignment = "start" | "end";
export type MenuDirection = "top" | "bottom";

export interface FieldProps {
    /**
     * The helper message of the field.
     */
    description?: ReactNode;
    /**
     * The error message of the field.
     */
    errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
    /**
     * The label of the field.
     */
    label?: ReactNode;
    /**
     * Whether the required state should be shown as an asterisk or a label, which would display (Optional) on all non required field labels.
     */
    necessityIndicator?: NecessityIndicator;
    /**
     * A Field can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
    /**
     * A ContextualHelp element to place next to the label.
     */
    contextualHelp?: ReactNode;
}
