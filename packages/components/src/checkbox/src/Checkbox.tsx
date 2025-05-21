import { CheckmarkIcon, IconContext, MinusIcon } from "@hopper-ui/icons";
import {
    type ResponsiveProp,
    type StyledComponentProps,
    useResponsiveValue,
    useStyledSystem
} from "@hopper-ui/styled-system";
import { type ForwardedRef, forwardRef } from "react";
import {
    Checkbox as RACCheckbox,
    type CheckboxProps as RACCheckboxProps,
    composeRenderProps,
    useContextProps
} from "react-aria-components";

import { useFormProps } from "../../form/index.ts";
import { IconListContext } from "../../icon-list/index.ts";
import { TextContext } from "../../typography/Text/index.ts";
import {
    ClearContainerSlots,
    type FieldSize,
    SlotProvider,
    composeClassnameRenderProps,
    cssModule,
    ensureTextWrapper
} from "../../utils/index.ts";

import { CheckboxContext } from "./CheckboxContext.ts";

import styles from "./Checkbox.module.css";

export const GlobalCheckboxCssSelector = "hop-Checkbox";

export interface CheckboxProps extends StyledComponentProps<RACCheckboxProps> {
    /**
     * A checkbox can vary in size.
     * @default "md"
     */
    size?: ResponsiveProp<FieldSize>;
}

function Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
    [props, ref] = useContextProps(props, ref, CheckboxContext);
    props = useFormProps(props);
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        className,
        children: childrenProp,
        size: sizeProp = "md",
        style: styleProp,
        ...otherProps
    } = ownProps;

    const size = useResponsiveValue(sizeProp) ?? "md";

    const classNames = composeClassnameRenderProps(
        className,
        GlobalCheckboxCssSelector,
        cssModule(
            styles,
            "hop-Checkbox",
            size
        ),
        stylingProps.className
    );

    const style = composeRenderProps(styleProp, prev => {
        return {
            ...stylingProps.style,
            ...prev
        };
    });

    const children = composeRenderProps(childrenProp, prev => {
        return ensureTextWrapper(prev);
    });

    return (
        <RACCheckbox
            ref={ref}
            className={classNames}
            style={style}
            {...otherProps}
        >
            {checkboxProps => {
                const checkboxIconClassName = styles["hop-Checkbox__check"];
                const icon = checkboxProps.isIndeterminate ?
                    <MinusIcon size="sm" className={checkboxIconClassName} /> :
                    <CheckmarkIcon size="sm" className={checkboxIconClassName} />;

                return (
                    <>
                        <div className={styles["hop-Checkbox__box"]}>{icon}</div>
                        <ClearContainerSlots>
                            <SlotProvider
                                values={[
                                    [TextContext, {
                                        className: styles["hop-Checkbox__text"],
                                        size: size
                                    }],
                                    [IconListContext, {
                                        className: styles["hop-Checkbox__icon-list"],
                                        size: size
                                    }],
                                    [IconContext, {
                                        className: styles["hop-Checkbox__icon"],
                                        size: size
                                    }]
                                ]}
                            >
                                {children(checkboxProps)}
                            </SlotProvider>
                        </ClearContainerSlots>
                    </>
                );
            }}
        </RACCheckbox>
    );
}

/**
 * The Checkbox component indicates the selection state of an option. It displays either one of three states: checked, unchecked, or indeterminate.
 *
 * [View Documentation](https://hopper.workleap.design/components/Checkbox)
 */
const _Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(Checkbox);
_Checkbox.displayName = "Checkbox";

export { _Checkbox as Checkbox };
