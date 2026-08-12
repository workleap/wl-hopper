import { Div, type DivProps, Flex } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-sm">
                <Square backgroundColor="decorative-option1" />
                <Square backgroundColor="decorative-option3" />
                <Square backgroundColor="decorative-option4" />
            </Flex>
        </Div>
    );
}
