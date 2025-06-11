import { AnonymousAvatar, Avatar, BrokenAvatar, DeletedAvatar, Inline } from "@hopper-ui/components";
import { useCallback } from "react";

export default function Example() {
    const handlePress = useCallback(() => {
        alert("Avatar pressed!");
    }, []);

    return (
        <Inline>
            <Avatar name="John Doe" onPress={handlePress} />
            <DeletedAvatar aria-label="Deleted User" onPress={handlePress} />
            <AnonymousAvatar aria-label="Anonymous User" onPress={handlePress} />
            <BrokenAvatar aria-label="Broken User" onPress={handlePress} />
        </Inline>
    );
}
