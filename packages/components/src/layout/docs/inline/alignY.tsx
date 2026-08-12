import { Div, type DivProps, Inline } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Inline alignY="flex-end" UNSAFE_height="10rem">
                <Square backgroundColor="decorative-option1" />
                <Square height="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Inline>
        </Div>
    );
}
