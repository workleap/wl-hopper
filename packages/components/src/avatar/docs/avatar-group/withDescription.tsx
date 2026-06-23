import { Avatar, AvatarGroup, DeletedAvatar } from "@hopper-ui/components";

export default function Example() {
    return (
        <AvatarGroup>
            <Avatar name="John Doe" description="Software Engineer" />
            <Avatar name="Alex Turner" description="Product Designer" />
            <Avatar name="Chris Dalton" description="Engineering Manager" />
            <Avatar name="Ada Lovelace" description="Principal Engineer" />
            <Avatar name="Grace Hopper" description="Staff Engineer" />
            <DeletedAvatar aria-label="Deleted user" />
        </AvatarGroup>
    );
}
