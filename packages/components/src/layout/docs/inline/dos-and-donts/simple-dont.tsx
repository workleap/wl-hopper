import { Button, Flex, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export function Example() {
    return (
        <Flex direction="row" alignItems="center" gap="inline-sm">
            <SparklesIcon />
            <Text>AI Assist</Text>
            <Button variant="primary" size="sm">Try it</Button>
        </Flex>
    );
}
