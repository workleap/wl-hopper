import { Div, type DivProps, useStyledSystem } from "@hopper-ui/components";

interface MyCustomComponentProps extends Omit<DivProps, "children"> {
    // your custom props here
}

function MyCustomComponent(props: MyCustomComponentProps) {
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const { className, style } = ownProps;

    const classNames = `${stylingProps.className} ${className}`;
    const mergedStyles = { ...stylingProps.style, ...style };

    return (
        <Div style={mergedStyles} className={classNames} >
            My Custom component
        </Div>
    );
}

export default function Example() {
    return (
        <MyCustomComponent
            paddingY="inset-md"
        />
    );
}
