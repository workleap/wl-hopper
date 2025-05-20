import { AnonymousAvatar, Avatar, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Avatar name="John Doe" size="lg" isDisabled />
            <Avatar name="John Doe" size="lg" isDisabled src="https://i.pravatar.cc/96?img=1" />
            <AnonymousAvatar aria-label="anonymous" size="lg" isDisabled />
        </Inline>
    );
}
