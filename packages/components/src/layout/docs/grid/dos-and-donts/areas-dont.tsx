import { Div, Flex } from "@hopper-ui/components";

export function Example() {
    return (
        <Flex direction="column" gap="core_160">
            <Div backgroundColor="decorative-option1" padding="inset-md" />
            <Flex gap="core_160">
                <Div backgroundColor="decorative-option2" padding="inset-md" width="core_1280" />
                <Div backgroundColor="decorative-option3" padding="inset-md" flex={1} />
            </Flex>
            <Div backgroundColor="decorative-option4" padding="inset-md" />
        </Flex>
    );
}
