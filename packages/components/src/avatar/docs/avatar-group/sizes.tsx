import { Avatar, AvatarGroup, Stack } from "@hopper-ui/components";

export default function Example() {
    const avatars = [
        <Avatar name="John Doe" />,
        <Avatar name="Alex Turner" />,
        <Avatar name="Chris Dalton" />
    ];

    return (
        <Stack>
            <AvatarGroup size="xs">
                {avatars}
            </AvatarGroup>
            <AvatarGroup size="sm">
                {avatars}
            </AvatarGroup>
            <AvatarGroup size="md">
                {avatars}
            </AvatarGroup>
            <AvatarGroup size="lg">
                {avatars}
            </AvatarGroup>
            <AvatarGroup size="xl">
                {avatars}
            </AvatarGroup>
            <AvatarGroup size="2xl">
                {avatars}
            </AvatarGroup>
        </Stack>
    );
}
