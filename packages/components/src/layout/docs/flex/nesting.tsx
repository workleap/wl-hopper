import { Div, type DivProps, Flex } from "@hopper-ui/components";

function Square(props: DivProps) {
    return <Div backgroundColor="decorative-option1" height="core_640" width="core_640" {...props} />;
}

export default function Example() {
    return (
        <Div width="100%">
            <Flex gap="stack-md">
                <Flex>
                    <Square backgroundColor="decorative-option1-weak" />
                    <Square backgroundColor="decorative-option3-weak" />
                </Flex>
                <Flex direction="column">
                    <Square backgroundColor="decorative-option1" />
                    <Square backgroundColor="decorative-option3" />
                </Flex>
                <Flex>
                    <Square backgroundColor="decorative-option1-strong" />
                    <Square backgroundColor="decorative-option3-strong" />
                </Flex>
            </Flex>
        </Div>
    );
}
