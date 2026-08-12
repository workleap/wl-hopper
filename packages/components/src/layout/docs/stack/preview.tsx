import { Div, type DivProps, Stack } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Stack>
                <Square backgroundColor="decorative-option1" />
                <Square width="core_800" backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Stack>
        </Div>
    );
}
