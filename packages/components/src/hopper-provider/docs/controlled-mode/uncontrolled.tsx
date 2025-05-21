import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            selectionMode="multiple"
            defaultSelectedKeys={["designer", "developer"]}
        >
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}
