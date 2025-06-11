import { Avatar, AvatarGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <AvatarGroup>
            <Avatar name="John Doe" onPress={() => alert("John Doe")} />
            <Avatar name="Alex Turner" />
            <Avatar name="Chris Dalton" onPress={() => alert("Chris Dalton")} />
        </AvatarGroup>
    );
}
