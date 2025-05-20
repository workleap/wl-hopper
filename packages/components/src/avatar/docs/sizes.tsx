import { Avatar, Stack, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Inline>
                <Avatar name="John Doe" size="xs" />
                <Avatar name="John Doe" size="sm" />
                <Avatar name="John Doe" size="md" />
                <Avatar name="John Doe" size="lg" />
                <Avatar name="John Doe" size="xl" />
                <Avatar name="John Doe" size="2xl" />
            </Inline>
            <Inline>
                <Avatar name="John Doe" size="xs" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="sm" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="md" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="lg" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="xl" src="https://i.pravatar.cc/96?img=1" />
                <Avatar name="John Doe" size="2xl" src="https://i.pravatar.cc/96?img=1" />
            </Inline>
            <Inline>
                <Avatar name="John Doe" size="xs" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="sm" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="md" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="lg" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="xl" src="https://example.com/image.jpg" />
                <Avatar name="John Doe" size="2xl" src="https://example.com/image.jpg" />
            </Inline>
        </Stack>
    );
}
