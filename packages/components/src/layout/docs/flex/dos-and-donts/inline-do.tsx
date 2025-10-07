import { Avatar, Inline, Text } from "@hopper-ui/components";

export function Example() {
    return (
        <Inline alignY="center" gap="inline-sm">
            <Avatar name="Sarah Chen" src="https://i.pravatar.cc/96?img=5" size="sm" />
            <Text>Sarah Chen</Text>
            <Text>Product Designer</Text>
        </Inline>
    );
}
