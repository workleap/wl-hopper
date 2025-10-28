import { useStyledSystem } from "@hopper-ui/components";
import type { StyledComponentProps } from "@hopper-ui/styled-system";
import { Button as RACButton, ButtonProps as RACButtonProps } from "react-aria-components";

interface MyCustomButtonProps extends StyledComponentProps<RACButtonProps> {
    // your custom props here
}

function MyCustomButton(props: MyCustomButtonProps) {
    const { stylingProps, children, className, style, ...otherProps } = useStyledSystem(props);

    // append or use "classnames" or "clsx" to merge classes
    const classNames = `${stylingProps.className ?? ""} ${className ?? ""}`;
    const mergedStyles = { ...stylingProps.style, ...style };

    return (
        <RACButton style={mergedStyles} className={classNames} {...otherProps}>
            {children}
        </RACButton>
    );
}

export default function Example() {
    return (
        <MyCustomButton
            paddingY="inset-md"
        >
            My Styled Button
        </MyCustomButton>
    );
}
