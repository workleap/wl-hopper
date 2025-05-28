import { Tag, TagGroup, type Selection } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup
            aria-label="Jobs"
            onRemove={(ids: Selection) => {
                alert(`Remove: ${[...ids]}`);
            }}
        >
            <Tag id="manager" isLoading>Manager</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="designer">Designer</Tag>
        </TagGroup>
    );
}
