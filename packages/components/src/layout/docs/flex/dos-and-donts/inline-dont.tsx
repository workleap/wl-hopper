import { Avatar, Flex, Text } from "@hopper-ui/components";

export function Example() {
    return (
        <Flex direction="row" alignItems="center" gap="inline-sm">
            <Avatar name="Sarah Chen" src="https://i.pravatar.cc/96?img=5" size="sm" />
            <Text>Sarah Chen</Text>
            <Text>Product Designer</Text>
        </Flex>
    );
}
