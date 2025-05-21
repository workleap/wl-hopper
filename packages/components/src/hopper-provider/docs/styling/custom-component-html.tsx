import { Div, type DivProps } from "@hopper-ui/components";

interface MyCustomComponentProps extends Omit<DivProps, "children"> {
    // your custom props here
}

function MyCustomComponent(props: MyCustomComponentProps) {
    return (
        <Div {...props} >
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
