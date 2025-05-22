import { AnonymousAvatar, Avatar, AvatarGroup, DeletedAvatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <AvatarGroup>
            <Avatar name="John Doe" />
            <Avatar name="Alex Turner" />
            <Avatar name="Chris Dalton" />
            <Avatar name="Alan Turing" />
            <Avatar name="Ada Lovelace" />
            <Avatar name="Grace Hopper" />
            <Avatar name="Marie Curie" />
            <Avatar name="Rosalind Franklin" />
            <DeletedAvatar aria-label="Alan Sheppard" />
            <AnonymousAvatar aria-label="Anonymous" />
        </AvatarGroup>
    );
}
